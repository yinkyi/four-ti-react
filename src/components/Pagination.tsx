/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React from "react";

interface PaginatedNumbersProps {
  totalPages: number;
  page: number;
  changePage: (index: number) => void;
}
const PaginatedNumbers: React.FC<PaginatedNumbersProps> = ({
  totalPages,
  page,
  changePage,
}) => {
  return Array.from({ length: totalPages }, (_, index: number) => {
    return (
      <button
        key={index}
        onClick={() => changePage(index + 1)}
        className={`${
          page === index + 1 ? "bg-black text-white" : "hover:bg-gray-500"
        } border-gray-300 relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
      >
        {index + 1}{" "}
      </button>
    );
  });
};

interface PaginationProps extends PaginatedNumbersProps {
  pageSize: number;
  totalItems: number;
  incrementPage: () => void;
  decrementPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  pageSize,
  totalItems,
  page,
  changePage,
  incrementPage,
  decrementPage,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="flex justify-between flex-1 sm:hidden">
        <a
          href="/"
          onClick={decrementPage}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="/"
          onClick={incrementPage}
          className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">{(page - 1) * pageSize + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(page * pageSize, totalItems)}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              disabled={page === 1}
              onClick={decrementPage}
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            </button>
            <PaginatedNumbers
              totalPages={totalPages}
              changePage={changePage}
              page={page}
            />
            <button
              disabled={page === totalPages}
              onClick={incrementPage}
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
