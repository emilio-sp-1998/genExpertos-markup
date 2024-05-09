import React from "react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/20/solid";

const Paguination = ({
  currentPage,
  totalPage,
  page,
  setPage,
  limit,
  setLimit,
  min,
  max,
  count,
}) => {
  const changePage = (page, opcion) => {
    if (opcion === "previous") {
      const previousPage = page - 1;
      if (previousPage >= 1) {
        setPage(previousPage);
      }
    } else if (opcion === "next") {
      const nextPage = page + 1;
      if (nextPage <= totalPage) {
        setPage(nextPage);
      }
    } else if (opcion === "first") {
      const firstPage = 1;
      setPage(firstPage);
    } else {
      const lastpage = totalPage;
      setPage(lastpage);
    }
  };

  const changeLimit = (e) => {
    setLimit(e.target.value);
  };

  return (
    // <div className="flex items-center justify-between border-t border-gray-200 px-4 py-5 sm:px-6">
    <div className="flex items-center justify-between mt-2">
      <div className="flex flex-1 justify-between sm:hidden py-4 pl-4 pr-3 sm:pl-6">
        <a
          onClick={() => changePage(page, "previous")}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Anterior
        </a>
        <a
          onClick={() => changePage(page, "next")}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Siguiente
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="pl-4 pr-3 sm:pl-6">
          <p className="text-sm text-gray-700">
            Mostrando del <span className="font-medium">{min}</span> al{" "}
            <span className="font-medium">{max}</span> de{" "}
            <span className="font-medium">{count}</span> resultados
          </p>
        </div>
        <div className="pl-4 pr-3 sm:pl-6">
          <select
            id="limit"
            name="limit"
            className="block w-full rounded-md border border-gray-300 bg-white px-2 py-2 text-sm placeholder-gray-300 focus:ring-gray-700 focus:border-gray-700 sm:text-sm text-black-100"
            onChange={changeLimit}
          >
            <option value={limit}>
              {limit}
            </option>
            {limit !== "5" && <option className="py-1" value={5}>5</option>}
            {limit !== "10" && <option className="py-1" value={10}>10</option>}
            {limit !== "25" && <option className="py-1" value={25}>25</option>}
            {limit !== "50" && <option className="py-1" value={50}>50</option>}
            {limit !== "100" && <option className="py-1" value={100}>100</option>}
          </select>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              onClick={() => changePage(page, "first")}
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer"
            >
              <span className="sr-only">First Page</span>
              <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              onClick={() => changePage(page, "previous")}
              className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            <a className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
              {currentPage}
            </a>
            <a
              onClick={() => changePage(page, "next")}
              className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              onClick={() => changePage(page, "last")}
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer"
            >
              <span className="sr-only">Last Page</span>
              <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Paguination;
