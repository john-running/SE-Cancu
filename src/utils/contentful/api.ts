import { SimpleProduct, SimpleTaxon, SimpleTaxonomy } from '@/types/commerce';
import { parseLanguage } from '@/utils/parser';
import { countryLangConfig } from '@/constants';
import { request, gql } from 'graphql-request';
import { ContentfulCountry, ContentfulProduct, ContentfulTaxon, ContentfulTaxonomy } from '@/utils/contentful/typings';

const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!;
const environment = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT!;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_CDA_ACCESS_TOKEN!;
const previewAccessToken = process.env.NEXT_PUBLIC_CONTENTFUL_CPA_ACCESS_TOKEN!;

const makeRequest = <ReturnType>(query: string, variables?: any, preview?: boolean) => {
  return request<ReturnType>(
    `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environment}?access_token=${
      preview ? previewAccessToken : accessToken
    }`,
    query,
    variables
  );
};

const parseProduct = (product: ContentfulProduct): SimpleProduct => {
  return {
    name: product.name ?? '',
    description: product.description ?? '',
    slug: product.slug ?? '',
    images: product.imagesCollection.items,
    variants: product.skusCollection.items.map(variant => {
      return {
        code: variant.code,
        name: variant.code,
      };
    }),
    reference: product.code ?? '',
    enrichments: product.unfrmOptEnrichmentTag || [],
    subcategories: product.subcategoriesCollection?.items.map((c: any) => c.name) || [],
  };
};

const allCountries = async (language = 'en-US') => {
  const lang = parseLanguage(language, '_', '-', 'lowercase');
  const {
    countryCollection: { items: countries },
  } = await makeRequest<{ countryCollection: { items: ContentfulCountry[] } }>(
    gql`
      query ($language: String!) {
        countryCollection(locale: $language) {
          items {
            name
            code
            marketId
            defaultLocale
            image {
              url
            }
            catalog {
              id
            }
          }
        }
      }
    `,
    {
      language: lang.split('_').at(0),
    }
  );

  return countries;
};

const allTaxonomies = async (catalogId: string, language = 'en-US'): Promise<SimpleTaxonomy[]> => {
  const lang = parseLanguage(language, '_', '-', 'lowercase');
  const {
    catalogCollection: { items },
  } = await makeRequest<{
    catalogCollection: {
      items: {
        taxonomiesCollection: {
          items: ContentfulTaxonomy[];
        };
      }[];
    };
  }>(
    gql`
      query ($catalogId: String!, $language: String!) {
        catalogCollection(where: { id: $catalogId }, limit: 1, locale: $language) {
          items {
            taxonomiesCollection(limit: 5) {
              items {
                id
                name
                taxonsCollection(limit: 10) {
                  items {
                    label
                    slug
                    description
                    referencesCollection(limit: 20) {
                      items {
                        name
                        description
                        slug
                        imagesCollection(limit: 3) {
                          items {
                            url
                          }
                        }
                        skusCollection(limit: 5) {
                          items {
                            code
                          }
                        }
                        code
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    {
      catalogId,
      language: lang.split('_').at(0),
    }
  );
  return (items.at(0)?.taxonomiesCollection?.items ?? []).map(taxonomy => {
    return {
      name: taxonomy.name ?? '',
      taxons: taxonomy.taxonsCollection.items.map(taxon => {
        return {
          name: taxon.label ?? '',
          slug: taxon.slug ?? '',
          description: taxon.description ?? '',
          products: taxon.referencesCollection.items.map(parseProduct),
          taxons: [],
        };
      }),
    };
  });
};

const getProduct = async (slug: string, language = 'en-US', preview = false): Promise<SimpleProduct | null> => {
  const lang = parseLanguage(language, '_', '-', 'lowercase');
  const {
    productCollection: { items },
  } = await makeRequest<{
    productCollection: {
      items: ContentfulProduct[];
    };
  }>(
    gql`
      query ($slug: String!, $language: String!, $preview: Boolean!) {
        productCollection(where: { slug: $slug }, limit: 1, locale: $language, preview: $preview) {
          items {
            name
            description
            slug
            imagesCollection(limit: 3) {
              items {
                url
              }
            }
            skusCollection(limit: 5) {
              items {
                code
              }
            }
            code
            unfrmOptEnrichmentTag
            subcategoriesCollection(limit: 5) {
              items {
                name
              }
            }
          }
        }
      }
    `,
    {
      slug,
      language: lang.split('_').at(0),
      preview: Boolean(preview),
    },
    preview
  );

  return items.at(0) ? parseProduct(items.at(0)!) : null;
};

const getProductById = async (
  productId: string,
  language = 'en-US',
  preview = false
): Promise<SimpleProduct | null> => {
  const lang = parseLanguage(language, '_', '-', 'lowercase');
  const { product } = await makeRequest<{
    product: ContentfulProduct | null;
  }>(
    gql`
      query ($productId: String!, $language: String!, $preview: Boolean!) {
        product(id: $productId, locale: $language, preview: $preview) {
          name
          description
          slug
          imagesCollection(limit: 3) {
            items {
              url
            }
          }
          skusCollection(limit: 5) {
            items {
              code
            }
          }
          code
          unfrmOptEnrichmentTag
          subcategoriesCollection(limit: 5) {
            items {
              name
            }
          }
        }
      }
    `,
    {
      productId,
      language: lang.split('_').at(0),
      preview: Boolean(preview),
    },
    preview
  );

  return product ? parseProduct(product) : null;
};

const getProductSlugs = async () => {
  // Slugs in Contentful are not localized so we do just a single query and map
  // slugs afterwards to every language code
  const {
    productCollection: { items },
  } = await makeRequest<{
    productCollection: {
      items: Pick<ContentfulProduct, 'slug'>[];
    };
  }>(
    gql`
      query {
        productCollection(limit: 100) {
          items {
            slug
          }
        }
      }
    `
  );

  const languages = Array.from(new Set<string>(Array.from(countryLangConfig.values()).flat()));

  const localizedSlugs = new Map<string, string[]>();
  languages.forEach(language => {
    localizedSlugs.set(
      language,
      items.map(s => s.slug ?? '')
    );
  });

  return localizedSlugs;
};

const getProductByTaxon = async (taxonId: string, language = 'en-US', preview = false): Promise<SimpleTaxon | null> => {
  const lang = parseLanguage(language, '_', '-', 'lowercase');
  const { taxon } = await makeRequest<{
    taxon: ContentfulTaxon;
  }>(
    gql`
      query ($taxonId: String!, $language: String!, $preview: Boolean!) {
        taxon(id: $taxonId, locale: $language, preview: $preview) {
          label
          slug
          description
          referencesCollection(limit: 20) {
            items {
              name
              description
              slug
              imagesCollection(limit: 3) {
                items {
                  url
                }
              }
              skusCollection(limit: 5) {
                items {
                  code
                }
              }
              code
            }
          }
        }
      }
    `,
    {
      taxonId,
      language: lang.split('_').at(0),
      preview: Boolean(preview),
    },
    preview
  );
  return taxon
    ? {
        name: taxon.label ?? '',
        slug: taxon.slug ?? '',
        description: taxon.description ?? '',
        products: taxon.referencesCollection.items.map(parseProduct),
        taxons: [],
      }
    : null;
};

const contentfulApi = {
  allCountries,
  allTaxonomies,
  getProduct,
  getProductSlugs,
  getProductByTaxon,
  getProductById,
};

export default contentfulApi;
