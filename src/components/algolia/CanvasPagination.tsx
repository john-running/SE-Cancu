import React from 'react';
import { Pagination, useInstantSearch } from 'react-instantsearch-hooks-web';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';

type Props = {
  paginationParams?: {
    paginationProps?: {
      totalPages?: number;
      padding?: number;
      showFirst?: boolean;
      showPrevious?: boolean;
      showNext?: boolean;
      showLast?: boolean;
    };
  };
};

const CanvasPagination: React.FC<ComponentProps<Props>> = ({ paginationParams }) => {
  const { paginationProps } = paginationParams || {};

  const {
    results: { hits },
  } = useInstantSearch();

  return (
    <>
      {Boolean(hits.length) && (
        <div className="flex justify-center items-center sm:pr-8">
          <Pagination
            {...paginationProps}
            classNames={{
              disabledItem: 'pointer-events-none opacity-60',
              link: 'm-auto hover:bg-gray leading-none ',
              list: 'flex justify-center items-center',
              pageItem: 'flex-col flex justify-center items-center text-sm w-7 h-7',
              lastPageItem: 'ml-2 sm:ml-4',
              nextPageItem: 'ml-2 sm:ml-4',
              firstPageItem: 'mr-2 sm:mr-4',
              previousPageItem: 'mr-2 sm:mr-4',
              selectedItem: 'bg-[#55493b] text-white rounded-full font-bold mx-2',
            }}
          />
        </div>
      )}
    </>
  );
};

registerUniformComponent({
  type: 'algolia-pagination',
  component: CanvasPagination,
});

export default CanvasPagination;
