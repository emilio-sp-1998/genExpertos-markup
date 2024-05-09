import React from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@mui/material";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function TextArea({
  name,
  id,
  value,
  handleChange,
  disabled,
  rows = 4,
  label,
  tooltip,
}) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center pb-3">
        <label htmlFor={id} className="block text-xs text-gray-500">
          {label}
        </label>
        {tooltip && (
          <div className="flex items-center px-2">
            <Tooltip
              title={<h1 className="text-sm">{tooltip}</h1>}
              placement="top"
            >
              <QuestionMarkCircleIcon
                className="h-4 w-4 cursor-pointer"
                aria-hidden="true"
              />
            </Tooltip>
          </div>
        )}
      </div>
      <div className="flex flex-col border shadow-md border-gray-200 rounded-lg px-4 py-2">
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          rows={rows}
          disabled={disabled}
          className="block w-full px-0 text-base text-gray-800 bg-white border-0 focus:ring-0"
          placeholder="Redacta aquí"
        ></textarea>
      </div>
    </div>
  );
}

export default TextArea;
