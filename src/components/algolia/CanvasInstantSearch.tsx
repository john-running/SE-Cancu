import React from 'react';
import { ComponentProps, registerUniformComponent, UniformSlot } from '@uniformdev/canvas-react';
import algoliasearch from 'algoliasearch/lite';
import { useScores } from '@uniformdev/context-react';
import { InstantSearch } from 'react-instantsearch-hooks-web';
import CanvasAlgoliaProvider from './context/CanvasAlgoliaProvider';
import ErrorPropertyCallout from './ErrorPropertyCallout';
import { buildEnrichmentFilters, buildSubcategoryFilters } from './buildEnrichmentFilters';

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
);

type CanvasInstantSearchProps = {
  title?: string;
  categoryFilter?: string;
  instantSearchParams?: {
    instantSearchProps?: {
      indexName?: string;
      stalledSearchDelay?: number;
    };
  };
};

const CanvasInstantSearch = ({ categoryFilter, instantSearchParams }: ComponentProps<CanvasInstantSearchProps>) => {
  const { instantSearchProps } = instantSearchParams || {};
  const scores = useScores();
  if (!instantSearchProps?.indexName) {
    return (
      <div className="m-auto max-w-[1136px]">
        <ErrorPropertyCallout title="Property 'indexName' was not defined for InstantSearch component." />
      </div>
    );
  }

  console.log('Current scores:', { scores });

  const searchClient = {
    ...algoliaClient,
    search(requests: any) {
      if (requests.every(({ params }: any) => !params.query)) {
        const enrichmentFilter = buildEnrichmentFilters(scores);
        const subcategoryFilter = buildSubcategoryFilters(scores);
        if (categoryFilter) {
          requests[0].facetFilters = [[`topCategory:${categoryFilter}`], enrichmentFilter, subcategoryFilter];
        } else {
          requests[0].facetFilters = [enrichmentFilter];
        }

        requests[0].sumOrFiltersScores = true;
        requests[0].getRankingInfo = true;
        console.log('filters:' + requests[0].facetFilters);
      }
      return algoliaClient.search(requests);
    },
  };

  return (
    <div className="m-auto max-w-[1136px] py-6 sm:py-8">
      <CanvasAlgoliaProvider defaultIndexName={instantSearchProps.indexName}>
        <InstantSearch {...instantSearchProps} indexName={instantSearchProps.indexName} searchClient={searchClient}>
          <UniformSlot name="widgets" />
        </InstantSearch>
      </CanvasAlgoliaProvider>
    </div>
  );
};

registerUniformComponent({
  type: 'algolia-instantSearch',
  component: CanvasInstantSearch,
});

export default CanvasInstantSearch;
