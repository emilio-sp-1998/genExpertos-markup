import React from "react";
import { Tooltip } from "@mui/material";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { PatternFormat, NumericFormat } from "react-number-format";

function FloatingInputTextFormatFormik({
  name,
  id,
  value,
  handleChange,
  label,
  disabled = false,
  tooltip,
  placeholder = "",
  format = "####",
  type,
  thousandSeparator = true,
  prefix = "$",
  decimalScale = 2,
  allowNegative = false,
}) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="text-xs text-gray-500">
        {label}
      </label>
      {tooltip && (
        <div className="flex items-center px-2">
          <Tooltip
            title={<h1 className="text-sm">{tooltip}</h1>}
            placement="top"
          >
            <QuestionMarkCircleIcon
              className="h-4 w-4 cursor-pointer text-gray-400"
              aria-hidden="true"
            />
          </Tooltip>
        </div>
      )}
      {type === "pattern" ? (
        <PatternFormat
          value={value}
          format={format}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => {
            e.target.value = e.target.value.toUpperCase();
            handleChange({
              target: {
                name: name,
                value: e.target.value,
              },
            });
          }}
          className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primarymarkup-100 rounded-lg"
        />
      ) : (
        <NumericFormat
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          thousandSeparator={thousandSeparator}
          prefix={prefix}
          decimalScale={decimalScale}
          allowNegative={allowNegative}
          onChange={(e) => {
            handleChange({
              target: {
                name: name,
                value: e.target.value.indexOf(".") === -1 ? 
                ((e.target.value === "" || e.target.value === 0) ? "$0.00": e.target.value + ".00") : e.target.value,
              },
            });
          }}
          className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primarymarkup-100 rounded-lg"
        />
      )}
    </div>
  );
}

export default FloatingInputTextFormatFormik;
