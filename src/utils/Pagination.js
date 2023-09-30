import React from 'react';
import {usePagination, DOTS } from './hooks/usePagination';
import PaginationContainer from './Pagination.styled';

const Pagination = props => {
  const {
    onPageChange,
    totalPageCount,
    pagesShowed = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalPageCount,
    pagesShowed,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage < totalPageCount) onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  return (
    <PaginationContainer>
    <ul
      className={"pagination-container " + className}
    >
      <li key={"prev"}
        className={'pagination-item' + (currentPage === 1 ? ' disabled' : '')}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <li key={index} className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li key={index}
            className={'pagination-item' + (currentPage === pageNumber ? ' selected' : '')}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li key={"next"}
        className={'pagination-item' + (currentPage === totalPageCount ? ' disabled' : '')}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
    </PaginationContainer>
  );
};

export default Pagination;