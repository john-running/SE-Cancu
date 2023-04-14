import React, { useEffect } from 'react';
import classnames from 'classnames';
import { SearchBox, SortBy, useInstantSearch } from 'react-instantsearch-hooks-web';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import ProductLoadingSkeleton from './ProductLoadingSkeleton';
import ErrorPropertyCallout from './ErrorPropertyCallout';

type Props = {
  searchBoxParams?: {
    searchBoxProps?: {
      placeholder?: string;
      searchAsYouType?: boolean;
    };
  };
};

const CanvasSearchBox: React.FC<ComponentProps<Props>> = ({ searchBoxParams }) => {
  const { searchBoxProps } = searchBoxParams || {};

  const {
    results: { hits },
    status,
    error,
    refresh,
  } = useInstantSearch();

  useEffect(() => refresh(), [refresh]);

  const resetClasses = 'absolute right-3 bottom-1/2 translate-y-1/2';

  const iconClasses = 'w-6 h-6 fill-[#55493b] stroke-inherit stroke-2';

  const sortDropDownClasses =
    "after:content-['^'] after:bottom-1/2 after:absolute after:text-red-500 after:bg-[#55493b] after:text-white after:h-full after:translate-y-1/2 after:w-[40px] after:right-0 after:rounded-l after:justify-center after:rotate-180 after:flex after:items-center";

  if (error) {
    return (
      <div className="m-auto max-w-[1136px]">
        <ErrorPropertyCallout title={error.name} text={error.message} classNames="sm:mx-8 mx-6" />
      </div>
    );
  }

  return (
    <>
      <div className="pb-8">
        <SearchBox
          {...searchBoxProps}
          defaultRefinement="coffee beans"
          classNames={{
            input:
              'px-2.5 py-2 placeholder:text-[#55493b] w-full border border-[#55493b] rounded focus-visible:outline-0 text-xl',
            form: `relative searchForm`,
            submit: 'absolute right-2 bottom-1/2 translate-y-1/2',
            submitIcon: iconClasses,
            resetIcon: 'hidden',
            loadingIndicator: resetClasses,
          }}
        />
        <div className="pt-5 flex justify-end relative">
          <SortBy
            items={[
              { label: 'Relevance', value: 'Products' },
              { label: 'Best Sellers', value: 'Products' },
              { label: 'Top Rated', value: 'Products' },
              { label: 'Price: High To Low', value: 'Products' },
              { label: 'Price: Low To High', value: 'Products' },
              { label: 'New Arrivals', value: 'Products' },
            ]}
            classNames={{
              root: classnames('relative', sortDropDownClasses),
              option: 'text-sm font-medium m-4',
              select: 'py-3 pr-10 pl-2 bg-white border border-[#dee1ec] rounded text-xs font-bold',
            }}
          />
        </div>
        {!hits.length &&
          (status !== 'idle' ? (
            <div className="pt-5">
              <ProductLoadingSkeleton />
            </div>
          ) : (
            <h2 className="pt-3 sm:pt-5 text-carbon font-bold text-center">{`We couldn't find a match for your search.`}</h2>
          ))}
      </div>
    </>
  );
};

registerUniformComponent({
  type: 'algolia-searchBox',
  component: CanvasSearchBox,
});

export default CanvasSearchBox;
