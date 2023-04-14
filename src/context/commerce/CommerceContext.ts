import { createContext } from 'react';
import { cms } from '@/utils/cms';
import { compact, isEmpty } from 'lodash';
import { parseLanguageCode } from '@/utils/parser';
import { Country, Product, SimpleProduct, SimpleTaxonomy } from '@/types/commerce';
import { getAvailabilityForSkus, withCommerceLayerClient } from '@/utils/commerceLayer';

export const CommerceContext = createContext<CommerceData | undefined>(undefined);

export type CommerceData = {
  lang: string;
  cms: string;
  filters: any;
  country: {
    code: string;
    defaultLocale: string;
    marketId: string | null;
  };
  clientId: string;
  endpoint: string;
  buildLanguages: Country[];
  countries: Country[];
  languageCode: string;
  product:
    | (SimpleProduct & {
        availability?: number;
      })
    | null;
};

export async function getCommerceContext(
  preview: boolean,
  language: string,
  countryCode: string,
  productSlug: string = ''
): Promise<CommerceData> {
  const countries = await cms().allCountries(language);
  const country = countries.find((country: Country) => country.code.toLowerCase() === countryCode)!;

  const buildLanguages = compact(
    process.env.BUILD_LANGUAGES?.split(',').map(l => {
      const country = countries.find((country: Country) => country.code === parseLanguageCode(l));
      return !isEmpty(country) ? country : null;
    })
  );

  const filters: SimpleTaxonomy[] = country ? await cms().allTaxonomies(country.catalog.id, language) : [];

  const languageCode = parseLanguageCode(language, 'toLowerCase', true);
  const clientId = process.env.CL_CLIENT_ID!;
  const endpoint = process.env.CL_ENDPOINT!;

  let product:
    | (SimpleProduct & {
        availability?: number;
      })
    | undefined = undefined;
  if (productSlug) {
    product =
      (await cms().getProduct(productSlug === 'pdp' ? 'cervello-di-caffe' : productSlug, language, preview)) ??
      undefined;

    if (product) {
      product.taxonomies = findProductTaxonomies(filters, product.slug);

      product.availability = await withCommerceLayerClient(
        {
          market: country.marketId!,
        },
        async ({ client: clSDK }) => {
          const availability = await getAvailabilityForSkus(clSDK, [product?.variants.at(0)?.code!]);

          return availability.at(0)?.quantity ?? 0;
        }
      );
    }
  }

  return {
    lang: language,
    cms: process.env.NEXT_PUBLIC_CMS!,
    filters,
    country,
    clientId,
    endpoint,
    languageCode,
    countries,
    buildLanguages,
    product: product ?? null,
  };
}

export async function getProductAvailability(sku: string, marketId: string) {
  return await withCommerceLayerClient(
    {
      market: marketId,
    },
    async ({ client: clSDK }) => {
      const availability = await getAvailabilityForSkus(clSDK, [sku]);
      return availability.at(0)?.quantity ?? 0;
    }
  );
}

const findProductTaxonomies = (taxonomy: Array<SimpleTaxonomy>, productSlug: string) => {
  let productTaxonomies: string[] = [];
  taxonomy.forEach(t => {
    // console.log('Processing taxonomy: ' + t.name);
    t.taxons.forEach(taxon => {
      //console.log('Processing taxon: ' + taxon.name);
      taxon.products.forEach(p => {
        if (p.slug === productSlug) {
          productTaxonomies.push(
            taxon.name.replace('All', '').replace('Products', '').toLowerCase().trim().replace(/ /g, '-')
          );
        }
      });
    });
  });

  //console.log(productTaxonomies);
  return productTaxonomies;
};
