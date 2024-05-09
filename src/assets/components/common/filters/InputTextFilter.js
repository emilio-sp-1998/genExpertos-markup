import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

function InputTextFilter({ searchText, setSearchText, label="Buscar" }) {
  return (
    <div className="flex flex-col px-2 py-2 items-center justify-between w-full">
      <div className="flex w-full justify-start">
        <label htmlFor="search" className="text-xs font-medium text-gray-900">
          {label}
        </label>
      </div>

      <div className="relative mt-2 w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          name="search"
          id="search"
          className="block w-64 h-12 border-2 border-gray-200 appearance-none py-2 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 text-xs sm:leading-6 focus:border-primarymarkup-100 focus:outline-none focus:ring-0 rounded-lg"
          placeholder="Buscar"
          autoComplete="off"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {searchText && (
          <button
            onClick={(e) => setSearchText("")}
            className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

export default InputTextFilter;
