import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function ListBoxFilterProvincias({ listBoxOption, setListBoxOption, dataListBox, name, dissabled=false, onChange }) {
  return (
    <Listbox
      value={listBoxOption}
      onChange={(e)=>{setListBoxOption(e);onChange(e)}}
      className="flex flex-col px-2 py-2 items-center w-full"
      disabled={dissabled}
    >
      {({ open }) => (
        <div className="flex flex-col">
          <div className="flex justify-start w-full">
            <Listbox.Label className="text-xs font-medium text-gray-900 pr-3">
              {name}
            </Listbox.Label>
          </div>
          <div className="relative mt-2">
            <Listbox.Button className="relative cursor-default pl-3 pr-10 text-left text-gray-900 sm:text-sm sm:leading-6 w-64 h-12 border-2 focus:border-primarymarkup-200 rounded-lg">
              <span className="block truncate">
                {listBoxOption.name === ""
                  ? "Escoja una opción"
                  : listBoxOption.name}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400 focus:text-primarymarkup-200"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-64 overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm bg-white">
                {dataListBox.map((dato) => (
                  <Listbox.Option
                    key={dato.id}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "bg-primarymarkup-100 text-white"
                          : "text-gray-900",
                        "relative cursor-default select-none py-2 px-3 text-xs"
                      )
                    }
                    value={dato}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            listBoxOption.name === dato.name ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {dato.name === "" ? "Escoja una opción" : dato.name}
                        </span>

                        {listBoxOption.name === dato.name ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-primarymarkup-100",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}

export default ListBoxFilterProvincias;
