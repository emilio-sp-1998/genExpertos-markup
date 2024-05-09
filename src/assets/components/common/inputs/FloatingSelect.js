import React from "react";

function FloatingSelect({ name, id, value, handleChange, label, list,disabled }) {
  return (
    <div className="relative w-full">
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-azulredmedica-100 focus:outline-none focus:ring-0 focus:border-azulredmedica-100 peer"
        disabled={disabled}
      >
        {list.map((dato) => (
          <option className="hover:bg-azulredmedica-200" value={dato.value} key={dato.value}>
            {dato.name}
          </option>
        ))}
      </select>

      <label
        htmlFor={id}
        className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-azulredmedica-100 peer-focus:dark:text-azulredmedica-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
      >
        {label}
      </label>
    </div>
  );
}

export default FloatingSelect;
