import React from "react";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function InputComboBoxFilter({
  comboBoxOption,
  setComboBoxOption,
  changeImputComboBox,
  dataComboBox,
  comboBoxName,
}) {
  return (
    <Combobox
      as="div"
      className="flex-col px-2 py-2 items-center justify-between"
      value={comboBoxOption}
      onChange={setComboBoxOption}
    >
      <Combobox.Label className="text-xs font-medium text-gray-900">
        {comboBoxName}
      </Combobox.Label>
      <div className="relative">
        <Combobox.Input
          className="block border-0 border-b-2 border-gray-400 appearance-none bg-white pl-3 pr-10 text-gray-900 text-xs sm:leading-6 focus:border-azulredmedica-100 focus:outline-none focus:ring-0"
          onChange={(event) => {
            changeImputComboBox(event.target.value);
          }}
          displayValue={(data) => data.value}
          autoComplete="off"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>
        {dataComboBox.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-xs">
            {dataComboBox.map((data, idx) => (
              <Combobox.Option
                key={idx}
                value={data}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 px-2 text-xs",
                    active ? "bg-azulredmedica-100 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {data.value}
                    </span>
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}

export default InputComboBoxFilter;
