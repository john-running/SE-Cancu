import React, { useEffect, useState } from 'react';
import { RefinementList, useConnector, useInstantSearch } from 'react-instantsearch-hooks-web';
import { connectRatingMenu } from 'instantsearch.js/es/connectors';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import classnames from 'classnames';
import ErrorPropertyCallout from './ErrorPropertyCallout';
import { StarIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';

type Props = {
  title: string;
  isExpanded: boolean;
  refinementListParams?: {
    refinementListProps?: RefinementListProp;
  };
};

type RefinementListProp = {
  allowedIndex?: string;
  attribute: string;
  operator: 'and' | 'or';
  limit?: number;
  showMore?: boolean;
  showMoreLimit?: number;
  searchable?: boolean;
  searchablePlaceholder?: string;
  escapeFacetValues?: boolean;
};

const CanvasRefinementList: React.FC<ComponentProps<Props>> = ({
  refinementListParams,
  component,
  title = '',
  isExpanded = false,
}) => {
  const [listVisibility, setListVisibility] = useState<boolean>(isExpanded);

  useEffect(() => setListVisibility(isExpanded), [isExpanded]);

  const refinementListProps: RefinementListProp = refinementListParams?.refinementListProps || {
    attribute: 'attribute',
    operator: 'and',
  };
  if (!refinementListProps.attribute) {
    refinementListProps.attribute = 'attribute';
  }

  const {
    results: { hits },
  } = useInstantSearch();

  const toggleVisibility = () => setListVisibility(prevState => !prevState);
  const rating = useConnector(connectRatingMenu, refinementListProps);

  if (!rating || !refinementListProps || !refinementListProps.attribute) {
    return (
      <ErrorPropertyCallout
        classNames="lg:mr-6 mt-2"
        title={`Property 'attribute' was not defined for ${component.type} component.`}
      />
    );
  }

  return (
    <>
      {Boolean(hits.length) && (
        <div className="bg-[#f9f9fa] text-slate-700">
          <div className="pl-8 pr-5">
            <hr className="h-px bg-[#dee1ec] m-0 p-0" />
            <div className="inline-flex flex-col lg:w-full">
              <button onClick={toggleVisibility}>
                <div className="pl-2 py-5 pr-16 relative text-left">
                  <span className="font-extrabold text-lg capitalize text-slate-700">
                    {title || refinementListProps?.attribute}
                  </span>
                  <em className={classnames('collapsedArrow', { '!rotate-45': listVisibility })}></em>
                </div>
              </button>
              <div className={classnames('block', { hidden: !listVisibility })}>
                {rating?.canRefine ? (
                  <RatingMenu rating={rating} />
                ) : (
                  <RefinementList
                    {...refinementListProps}
                    sortBy={['name:asc']}
                    classNames={{
                      item: 'hover:underline underline-offset-4 cursor-pointer pb-2.5',
                      checkbox: 'w-4 h-4 mr-2.5 cursor-pointer',
                      showMore: 'capitalize font-bold text-center mb-2.5 text-[#55493b]',
                      disabledShowMore: 'pointer-events-none hidden',
                      searchBox: 'refinementSearchBox searchForm',
                      label: 'cursor-pointer px-3 text-sm text-center align-middle',
                      labelText: 'capitalize mr-1 flex-1.5',
                      count: 'bg-light_gray rounded-full text-[#7a7a7a]',
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

registerUniformComponent({
  type: 'algolia-refinementList',
  component: CanvasRefinementList,
});

export default CanvasRefinementList;

type RatingItem = {
  stars: boolean[];
  name: string;
  label: string;
  value: string;
  count: number;
  isRefined: boolean;
};

type Rating = {
  items: RatingItem[];
  hasNoResults: boolean;
  canRefine: boolean;
  refine: (value: string) => void;
};

const RatingMenu = ({ rating }: { rating: Record<string, unknown> | undefined }) => {
  const { refine, items } = (rating as Rating) || {};

  return (
    <div className="pb-2.5">
      {items.map(item => (
        <button
          key={item.value}
          className="flex my-1.5 group cursor-pointer align-middle px-3"
          onClick={() => {
            refine(item.value);
          }}
        >
          {item.stars.map((isFilled, index) => (
            <StarIcon
              key={index}
              className={classNames(isFilled ? 'text-blue-600' : 'text-gray-200', 'h-5 w-5 flex-shrink-0')}
              aria-hidden="true"
            />
          ))}
          <p className={classNames('group-hover:text-blue-600 pl-3', { 'font-bold': item.isRefined })}>& Up</p>
        </button>
      ))}
    </div>
  );
};
