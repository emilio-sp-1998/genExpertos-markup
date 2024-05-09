import React, { useEffect, useState } from "react";
import {
  DocumentArrowUpIcon,
  TrashIcon,
  BarsArrowUpIcon,
} from "@heroicons/react/24/solid";

export default function CheckInput({
  value,
  name,
  handleChange,
  listCheck,
  disabled = false,
  label,
}) {
  const handleCheckChange = (event) => {
    const selectCheck = event.target.value;
    handleChange({
      target: {
        name: name,
        value: listCheck[selectCheck],
      },
    });
  };

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="text-sm text-gray-500">
        {label}
      </label>
      <ul className="w-full text-sm font-medium text-gray-900 bg-white">
        {listCheck.map((item, index) => (
          <li className="w-full" key={index}>
            <div className="flex items-center pl-1">
              <input
                id={"option" + index}
                type="radio"
                checked={value === item}
                name={"tipoIdentificacion"}
                value={index}
                onChange={handleCheckChange}
                disabled={disabled}
                className="w-4 h-4 text-primarymarkup-100 bg-gray-100 focus:ring-primarymarkup-100 dark:focus:ring-primarymarkup-100 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600"
              />
              <label
                htmlFor={"option" + index}
                className="w-full py-1 ml-2 text-xs font-medium text-gray-500 dark:text-gray-300"
              >
                {item}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
