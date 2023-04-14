import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import algoliasearch from 'algoliasearch';
import { createClient } from 'contentful';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = req.query.secret as string | undefined;
  const id = req.query.id as string | undefined;

  const {
    previewSecret,
    algoliaAppId,
    algoliaAdminKey,
    algoliaIndex,
    contentfulSpaceId,
    contentfulEnvironment,
    contentfulCdaToken,
  } = getConfig().serverRuntimeConfig;

  if (secret !== previewSecret) {
    return res.status(401).json({ message: 'Secret was not provided or it does not match' });
  }

  const algoliaClient = algoliasearch(algoliaAppId, algoliaAdminKey);
  const index = algoliaClient.initIndex(algoliaIndex);

  const contentfulClient = createClient({
    space: contentfulSpaceId,
    accessToken: contentfulCdaToken,
    environment: contentfulEnvironment,
  });

  try {
    try {
      let indexables: Array<any>;
      if (id) {
        const entry = await contentfulClient.getEntry(id);
        indexables = [entry];
      } else {
        const { items } = await contentfulClient.getEntries({
          content_type: 'product',
          limit: 100,
        });
        indexables = items;
      }

      const products = indexables.map(p => ({
        objectID: p.fields.code ?? p.sys.id,
        name: p.fields.name,
        slug: p.fields.slug,
        code: p.fields.code,
        description: p.fields.description,
        images: p.fields.images.map((i: any) => i.fields.file.url.replace('//', 'https://')),
        variants: p.fields.skus.map((s: any) => s.fields.code),
        subcategories: p.fields.subcategories?.map((s: any) => s.fields.name),
        image:
          p.fields.images && p.fields.images.length > 0
            ? p.fields.images[0]?.fields.file.url.replace('//', 'https://')
            : '',
        brand: p.fields.brand?.fields?.name,
        topCategory: p.fields.topCategory?.fields?.name,
        interest: p.fields.unfrmOptEnrichmentTag?.map((e: any) => `${e.cat}_${e.key}`) || [],
      }));

      const indexedContent = await index.saveObjects(products);
      //console.log(JSON.stringify(indexables));
      //console.log('Indexed Content:', { indexedContent, products });
      return res.json(indexedContent);
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    return res.status(500).send('Error indexing!');
  }
}
