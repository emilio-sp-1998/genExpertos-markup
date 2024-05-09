import React from "react";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ToggleInput({label, value, name, handleChange}) {

  const handleChangeToggle = (event) => {
    console.log("holaaaaa");
    handleChange({
      target: {
        name: name,
        value: !value,
      },
    });
  };

  return (
    <Switch.Group as="div" className="flex items-center w-full">
      <Switch.Label as="span" className="text-sm pr-5">
        <span className="text-gray-500">
          {label}
        </span>{" "}
      </Switch.Label>
      <Switch
        checked={value}
        onChange={handleChangeToggle}
        className={classNames(
          value ? "bg-azulredmedica-200" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-azulredmedica-200 focus:ring-offset-2"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            value ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
    </Switch.Group>
  );
}

export default ToggleInput;
