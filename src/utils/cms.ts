import contentfulApi from './contentful/api';
import { Country, SimpleProduct, SimpleTaxon, SimpleTaxonomy } from '@/types/commerce';

const cmsApis: Record<
  string,
  {
    allCountries: (language?: string) => Promise<(Country & { marketId: string | null })[]>;
    allTaxonomies: (catalogId: string, language?: string) => Promise<SimpleTaxonomy[]>;
    getProductSlugs: () => Promise<Map<string, string[]>>;
    getProductByTaxon: (taxonId: string, language?: string, preview?: boolean) => Promise<SimpleTaxon | null>;
    getProductById: (productId: string, language?: string, preview?: boolean) => Promise<SimpleProduct | null>;
    getProduct: (slug: string, language?: string, preview?: boolean) => Promise<SimpleProduct | null>;
  }
> = {
  contentful: contentfulApi,
};

export const cms = () => {
  if (typeof process.env.NEXT_PUBLIC_CMS !== 'string' || !(process.env.NEXT_PUBLIC_CMS in cmsApis)) {
    throw new Error('CMS not set or not supported');
  }

  return cmsApis[process.env.NEXT_PUBLIC_CMS as keyof typeof cmsApis];
};

export const cmsFunctions: Record<string, any> = {
  ...contentfulApi,
};
