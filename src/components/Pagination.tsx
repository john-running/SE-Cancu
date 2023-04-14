import React, { useCallback, useMemo } from 'react';
import ButtonArrow from '@/components/_atoms/ButtonArrow';
import usePagination from '@/hooks/usePagination';

interface Props {
  onPageChange(pageNumber: number): void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

const Pagination: React.FC<Props> = ({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize }) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const lastPage = useMemo(() => paginationRange[paginationRange.length - 1], [paginationRange]);

  const onPrevious = useCallback(() => onPageChange(currentPage - 1), [currentPage, onPageChange]);

  const onNext = useCallback(() => onPageChange(currentPage + 1), [currentPage, onPageChange]);

  if (currentPage === 0 || paginationRange.length < 2) return null;
  return (
    <div className="flex justify-between items-center w-full">
      <ButtonArrow onClick={onPrevious} direction="left" disabled={currentPage === 1} />
      <div className="flex items-center font-bold">
        <div className="flex items-center justify-center w-10 h-12 bg-light_gray mr-4">
          <p>{currentPage}</p>
        </div>
        <p>of {lastPage}</p>
      </div>
      <ButtonArrow onClick={onNext} direction="right" disabled={currentPage === lastPage} />
    </div>
  );
};

export default Pagination;
