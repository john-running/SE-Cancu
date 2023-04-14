import { getSalesChannelToken } from '@commercelayer/js-auth';
import { SkuInventory } from '@commercelayer/react-components/lib/reducers/AvailabilityReducer';
import Sdk, { ApiError, CommerceLayerClient } from '@commercelayer/sdk';
import PQueue from 'p-queue';

// CommerceLayer has two separate rate limits so we implement
// both of them here.
// https://docs.commercelayer.io/core/handling-errors#rate-limits
const commerceLayerQueueStricter = new PQueue({
  interval: 60_000 * 5,
  intervalCap: 600,
});
const commerceLayerQueueLooser = new PQueue({
  interval: 10_000,
  intervalCap: 50,
});

export type CommerceLayerAddToQueueFn = <QueueFN extends () => any>(fnToQueue: QueueFN) => Promise<ReturnType<QueueFN>>;

const addToQueue: CommerceLayerAddToQueueFn = async fn =>
  commerceLayerQueueStricter.add(
    () =>
      commerceLayerQueueLooser.add(fn, {
        throwOnTimeout: true,
      }),
    { throwOnTimeout: true }
  );

type CommerceLayerPaginateIdsFN = <PaginatedFN extends (ids: string[]) => Promise<any>>(
  ids: string[],
  pageSize: number,
  fn: PaginatedFN
) => Promise<Array<Awaited<ReturnType<PaginatedFN>>>>;

const paginateIds: CommerceLayerPaginateIdsFN = async (ids, pageSize, fn) => {
  const pages = ids.reduce((pages, id, index) => {
    const pageIndex = Math.floor(index / pageSize);

    pages[pageIndex] = [...(pages[pageIndex] ?? []), id];

    return pages;
  }, [] as string[][]);

  return await Promise.all(pages.map(page => fn(page)));
};

const clientsCache = new Map<string, { client: CommerceLayerClient }>();

export async function withCommerceLayerClient<
  FN extends ({
    client,
    addToQueue,
  }: {
    client: CommerceLayerClient;
    addToQueue: CommerceLayerAddToQueueFn;
    paginateIds: CommerceLayerPaginateIdsFN;
  }) => any
>({ market }: { market: string }, fn: FN, attempt = 0): Promise<ReturnType<FN>> {
  if (attempt > 4) {
    throw new Error('Failed after 4 attempts');
  }

  const clientCacheKey = market;
  let { client } = clientsCache.get(clientCacheKey) ?? {};

  try {
    if (client === undefined) {
      client = await addToQueue(() => getSdk(market));

      clientsCache.set(clientCacheKey, {
        client,
      });
    }

    const result = await fn({
      client,
      addToQueue,
      paginateIds,
    });
    return result;
  } catch (error: unknown) {
    const isApiError = (potentialApiError: unknown): potentialApiError is ApiError => {
      return (
        typeof potentialApiError === 'object' &&
        potentialApiError !== null &&
        'errors' in potentialApiError &&
        Array.isArray((potentialApiError as ApiError).errors)
      );
    };

    if (isApiError(error) && error.status === 401) {
      // Token expired, delete client from cache and try again
      console.info('Token expired, recreating client');
      clientsCache.delete(clientCacheKey);

      return withCommerceLayerClient<FN>({ market }, fn, attempt + 1);
    }

    if ((error as Error).message.includes('429')) {
      // Too many requests, wait for 11 secs and retry again (https://docs.commercelayer.io/core/handling-errors#rate-limits)
      console.info('Too many requests, waiting for 11 secs and retrying again');
      await new Promise(resolve => setTimeout(resolve, 11_000));

      return withCommerceLayerClient<FN>({ market }, fn, attempt + 1);
    }

    console.log('Unrecognized error', error);

    throw error;
  }
}

export function getOrganizationSlug(): {
  organization: string;
  domain: string;
} {
  const endpoint = process.env.CL_ENDPOINT!;
  if (!endpoint) {
    throw 'no cL endpoint';
  }
  const org = {
    organization: '',
    domain: 'commercelayer.io',
  };
  if (endpoint.search('commercelayer.io') === -1) org.domain = 'commercelayer.co';
  org.organization = endpoint.replace('https://', '').replace(`.${org.domain}`, '');
  return org;
}

export async function getSdk(market: string): Promise<CommerceLayerClient> {
  const endpoint = process.env.CL_ENDPOINT!;
  if (!endpoint) {
    throw 'no cL endpoint';
  }

  const clientId = process.env.CL_CLIENT_ID!;
  if (!clientId) {
    throw 'no cL clientId';
  }

  const auth = await getSalesChannelToken({
    clientId,
    endpoint,
    scope: `market:${market}`,
  });

  const accessToken = auth?.accessToken as string;

  if (accessToken == null || endpoint == null) throw new Error('accessToken and endpoint are required parameters');
  const org = getOrganizationSlug();
  return Sdk({
    accessToken,
    ...org,
  });
}

export async function getSdkWithToken(accessToken: string) {
  const endpoint = process.env.CL_ENDPOINT!;
  if (!endpoint) {
    throw 'no cL endpoint';
  }

  if (accessToken == null || endpoint == null) throw new Error('accessToken and endpoint are required parameters');
  const org = getOrganizationSlug();
  return Sdk({
    accessToken,
    ...org,
  });
}

export type AvailabilityRecord = {
  skuCode: string;
  quantity: number;
};

export async function getAvailabilityForSkus(
  sdk: CommerceLayerClient,
  skuCodes: string[]
): Promise<Array<AvailabilityRecord>> {
  const skus = await sdk.skus.list({
    fields: { skus: ['id', 'code'] },
    filters: { code_in: skuCodes.join(',') },
  });

  const skusAvailability: Array<AvailabilityRecord> = [];

  const inventories = await Promise.all(
    skus.map(async sku => {
      return (await sdk.skus.retrieve(sku.id, {
        fields: { skus: ['inventory'] },
      })) as SkuInventory;
    })
  );

  skuCodes.forEach(skuCode => {
    const sku = skus.find(s => s.code === skuCode);

    if (!sku) {
      return;
    }

    const skuInventory = inventories.find(s => s.id === sku.id);

    if (!skuInventory) {
      return;
    }

    const [level] = skuInventory.inventory?.levels || [];

    skusAvailability.push({ skuCode, quantity: level?.quantity ?? 0 });
  });

  return skusAvailability;
}
