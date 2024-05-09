import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function FloatingInput({name, id, value, handleChange, label, limitImput=0, disabled, formInit=false, type="text"}) {

  const handleChangex = (e) => {
    formInit.precio=e.target.value;
    handleChange({
      target: {
        name: name,
        value: e.target.value,
      },
    });
  };

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={id}
        className= {classNames(
          "text-xs text-gray-500",
        )}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={formInit!==false ? handleChangex : handleChange}
        className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primarymarkup-100 rounded-lg"
        placeholder=""
        maxLength={limitImput===0 ? null : limitImput}
        readOnly={disabled}
      />
    </div>
  );
}

export default FloatingInput;
