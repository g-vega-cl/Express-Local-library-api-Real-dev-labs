import "../css/pagination.scss";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import usePagination, { DOTS } from "../hooks/usePagination";
import { calculateLastPage } from "./utils";

import PropTypes from "prop-types";
import React, {useMemo} from "react";

function Pagination({
  onPageChange,
  onPageSizeOptionChange,
  totalCount,
  currentPage,
  pageSize,
  pageSizeOptions,
}) {
  const paginationRange = useMemo(() => usePagination({
    currentPage,
    totalCount,
    pageSize,
  }));

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <ul
      className="wrapper"
      aria-label="Blog post pagination list"
    >
      <li className="paginationItem">
        <button
          type="button"
          className="arrowButton left"
          aria-label="Goto previous page"
          onClick={onPrevious}
          disabled={currentPage === 1} // Disable left arrow when in first page
        >
          <ChevronLeftIcon />
        </button>
      </li>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={`li-dots-key-${index}`} className="dots">
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={`li-key-${index}`}
            className="paginationItem"
            aria-current={pageNumber === currentPage ? "page" : "false"} // change this line to highlight a current page.
          >
            <button
              type="button"
              aria-label={`Goto page ${pageNumber}`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}

      <li className="paginationItem">
        <button
          type="button"
          className="arrowButton right"
          aria-label="Goto next page"
          onClick={onNext}
          disabled={calculateLastPage(totalCount, pageSize) === currentPage} // Disable if next page would be empty.
        >
          <ChevronRightIcon />
        </button>
      </li>

      <select
        className="paginationSelector"
        aria-label="Select page size"
        value={pageSize}
        onChange={(e) => {
          onPageSizeOptionChange(parseInt(e.target.value)); //e.target.value is a string, will be parsed to integer. Typescript is good for catching this cases
        }}
      >
        {pageSizeOptions.map((size) => (
          <option key={size} defaultValue={pageSize === size} value={size}>
            {size} per page
          </option>
        ))}
      </select>
    </ul>
  );
}

Pagination.propTypes = {
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  pageSizeOptions: PropTypes.instanceOf(Array),
  onPageChange: PropTypes.func,
  onPageSizeOptionChange: PropTypes.func,
};

Pagination.defaultProps = {
  totalCount: 0,
  currentPage: 1,
  pageSize: 1,
  pageSizeOptions: [15, 25, 50, 100],
  onPageChange: () => {},
  onPageSizeOptionChange: () => {},
};

export default Pagination;
