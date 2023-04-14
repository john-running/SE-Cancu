export interface Country {
  name: string;
  defaultLocale: string;
  code: string;
  domain: string;
  catalog: Catalog;
  image: Image;
}

export interface Catalog {
  id: string;
}

export interface Taxonomy {
  name: string;
  taxons: Taxon[];
}

export interface SimpleTaxonomy {
  name: string;
  taxons: SimpleTaxon[];
}

export interface Taxon {
  name: string;
  slug: string;
  description: string;
  products: Product[];
  taxons: Taxon[];
}

export interface SimpleTaxon {
  name: string;
  slug: string;
  description: string;
  products: SimpleProduct[];
  taxons: SimpleTaxon[];
}

export interface Image {
  file?: {
    url?: string;
  };
  url: string;
}

export interface Product {
  name: string;
  slug: string;
  variants: Variant[];
  reference: string;
  description: string;
  images: Image[];
  price: number;
  comparePrice: number;
  formattedPrice: string;
  formattedComparePrice: string;
  availability: number;
  taxonomies?: string[];
}

export interface SimpleProduct {
  name: string;
  slug: string;
  variants: SimpleVariant[];
  reference: string;
  description: string;
  images: Image[];
  taxonomies?: string[];
  enrichments?: object[];
  subcategories?: string[];
}

export interface Variant {
  name: string;
  code: string;
  description: string;
  images: Image[];
}

export interface SimpleVariant {
  name: string;
  code: string;
}

export interface Size {
  name: string;
}

export interface SelectorObject {
  code: string;
  imageUrl: string;
}
