import React, { useEffect, useState } from "react";
import {
  DocumentArrowUpIcon,
  TrashIcon,
  BarsArrowUpIcon,
} from "@heroicons/react/24/solid";

export default function CheckGroupInput({ value, name, handleChange, listCheck }) {
  const handleCheckChange = (event) => {
    const selectCheck = listCheck[event.target.value];
    const newValues = [...value];
    //Si selectCheck está en el array, lo saco
    if (value.includes(selectCheck)) {
      const index = value.indexOf(selectCheck);
      newValues.splice(index, 1);
    } else {
      //Si no está en el array, lo meto
      newValues.push(selectCheck);
    }
    handleChange({
      target: {
        name: name,
        value: newValues,
      },
    });

  };
  return (
    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {listCheck.map((item, index) => (
        <li
        className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
          key={index}
        >
          <div className="flex items-center pl-2">
            <input
              id={"option" + index}
              type="checkbox"
              checked={value.includes(item)}
              name={"tipoIdentificacion"}
              value={index}
              onChange={handleCheckChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor={"option" + index}
              className="w-full py-3 ml-2 text-xs font-medium text-gray-900 dark:text-gray-300"
            >
              {item}
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
}
