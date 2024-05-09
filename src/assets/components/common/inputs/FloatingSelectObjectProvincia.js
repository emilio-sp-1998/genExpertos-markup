import React, { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function FloatingSelectObjectProvincia({
  name,
  value,
  handleChange,
  label,
  list,
  disabled=false,
  onChange
}) {
  const handleChangex = (e) => {
    handleChange({
      target: {
        name: name,
        value: e,
      },
    });
  }
  
  return (
    <div className="flex flex-col w-full">
      <Listbox value={value} onChange={(e)=>{handleChangex(e);onChange(e);}} disabled={disabled}>
        {({ open }) => ( 
          <>
            <Listbox.Label className="text-xs text-gray-500">
              {label}
            </Listbox.Label>
            <div className="relative">
              <Listbox.Button className="relative w-full h-12 cursor-default pl-3 pr-10 text-left text-gray-900 sm:text-sm sm:leading-6 border-2 border-gray-300 focus:border-primarymarkup-100 rounded-lg">
                <span className="block truncate">{typeof(value)==="object"? value.name: value}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 justify-center">
                  <ChevronDownIcon
                    className="h-5 w-5 text-gray-400 focus:text-primarymarkup-100"
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
                <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm bg-white">
                  {list.map((object, idx) => (
                    <Listbox.Option
                      key={idx}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-primarymarkup-100 text-white" : "text-gray-500",
                          "relative cursor-default select-none py-2 pl-3 pr-9 text-xs"
                        )
                      }
                      value={object}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {typeof(object)==="object"?object.name: object}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-primarymarkup-100",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}

export default FloatingSelectObjectProvincia;