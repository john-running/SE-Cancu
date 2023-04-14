import { createEnhancer, AlgoliaClient } from '@uniformdev/canvas-algolia';

export const algoliaConfigured: boolean = ![process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY].includes(
  undefined
);

const client = new AlgoliaClient({
  applicationId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  searchKey: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
});

export const algoliaEnhancer = () =>
  createEnhancer({
    clients: client,
  });
