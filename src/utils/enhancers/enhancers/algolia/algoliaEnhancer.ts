import { createEnhancer, AlgoliaClient } from '@uniformdev/canvas-algolia';

export const algoliaConfigured: boolean = ![process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_KEY].includes(
  undefined
);

const client = new AlgoliaClient({
  applicationId: process.env.ALGOLIA_APP_ID!,
  searchKey: process.env.ALGOLIA_SEARCH_KEY!,
});

export const algoliaEnhancer = () =>
  createEnhancer({
    clients: client,
  });
