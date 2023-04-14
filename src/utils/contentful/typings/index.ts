import { Country } from '@/types/commerce';

export interface ContentfulCountry extends Country {
  marketId: string | null;
}

export interface ContentfulTaxonomy {
  id: string | null;
  name: string | null;
  taxonsCollection: {
    items: ContentfulTaxon[];
  };
}

export interface ContentfulTaxon {
  label: string | null;
  slug: string | null;
  description: string | null;
  referencesCollection: {
    items: ContentfulProduct[];
  };
}

export interface ContentfulProduct {
  name: string | null;
  description: string | null;
  slug: string | null;
  imagesCollection: {
    items: {
      url: string;
    }[];
  };
  skusCollection: {
    items: {
      code: string;
    }[];
  };
  code: string | null;
  unfrmOptEnrichmentTag: Array<{ cat: string; key: string; str: number }>;
  subcategoriesCollection: {
    items: {
      name: string;
    }[];
  };
}
