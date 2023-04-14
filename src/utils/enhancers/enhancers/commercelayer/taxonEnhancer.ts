import { first } from 'lodash';
import { SimpleTaxon } from '@/types/commerce';
import { AvailabilityRecord, getAvailabilityForSkus, withCommerceLayerClient } from '@/utils/commerceLayer';
import { cms } from '@/utils/cms';

const taxonEnhancer = async ({ component, context }: any) => {
  const { parameters } = component || {};
  const { sortBy, category, sortOrder, productDisplayLimit } = parameters || {};
  const sort = sortBy?.value;
  const cat = category?.value.entryId ?? category?.value;
  const order = sortOrder?.value;
  const count = Number.parseInt(productDisplayLimit?.value ?? -1);

  let taxonData: SimpleTaxon | undefined;
  if (cat) {
    taxonData = (await cms().getProductByTaxon(cat, context.language, context.preview)) ?? undefined;
  }

  if (!taxonData) {
    return {};
  }

  const skuCodes = taxonData.products.map(p => first(p.variants)?.code) as string[];

  await withCommerceLayerClient(
    { market: context.market },
    async ({ client: clSDK, addToQueue: queue, paginateIds }) => {
      if (!taxonData) {
        return {};
      }

      const skuPrices = new Map();
      const PAGE_SIZE = 12;

      const prices = (
        await paginateIds(skuCodes, PAGE_SIZE, async paginatedSkuCodes => {
          return await queue(() =>
            clSDK.prices.list({
              filters: { sku_code_in: paginatedSkuCodes.join(',') },
              pageSize: PAGE_SIZE,
            })
          );
        })
      ).flat();

      prices.forEach(p => skuPrices.set(p.sku_code, { ...p }));

      const availability = (
        await paginateIds(skuCodes, PAGE_SIZE, async paginatedSkuCodes => {
          return getAvailabilityForSkus(clSDK, paginatedSkuCodes);
        })
      ).flat();

      const skuInventory = new Map(
        availability.filter((a): a is AvailabilityRecord => Boolean(a)).map(a => [a.skuCode, a.quantity])
      );

      const products = taxonData.products.map(p => {
        const code = first(p.variants)?.code;
        const prices = skuPrices.get(code);
        return {
          ...p,
          price: skuPrices.get(code)?.amount_cents ?? 0,
          formattedPrice: prices?.formatted_amount ?? 0,
          comparePrice: prices?.compare_at_amount_cents ?? 0,
          formattedComparePrice: prices?.formatted_compare_at_amount ?? 0,
          availability: code ? skuInventory.get(code) ?? 0 : 0,
        };
      });

      if (sort) {
        products.sort((a: any, b: any) => {
          if (order === 'asc') {
            return a[sort] - b[sort];
          } else {
            return b[sort] - a[sort];
          }
        });
      }

      if (count >= 0) {
        taxonData.products = products.slice(0, count);
      } else {
        taxonData.products = products;
      }
    }
  );

  return taxonData;
};

export default taxonEnhancer;
