import React from "react";
import "../../../css/calendar.css";
import "../../../css/datePicker.css";
import DatePicker from "react-date-picker";
import { CalendarIcon } from "@heroicons/react/24/outline";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function FloatingInputDateRange({
  name,
  id,
  value,
  handleChange,
  label,
  disabled,
  minDate,
  maxDate,
}) {
  const onChange = (date) => {
    handleChange({
      target: {
        name: name,
        value: date,
      },
    });
  };
  return (
    <div className="relative z-0 w-full">
      <div className="absolute -translate-y-8 top-3 origin-[0] -z-10">
        <label htmlFor={id} className="text-xs text-gray-500">
          {label}
        </label>
      </div>
      <DatePicker
        id={id}
        onChange={(date) => onChange(date)}
        value={value}
        calendarIcon={
          <CalendarIcon className="h-6 w-6 px-1" aria-hidden="true" />
        }
        clearIcon={null}
        format={"yyyy/MM/dd"}

        
        
        selectRange={true} 
        minDate={minDate}
        returnValue="range"
        disabled={disabled}
        maxDate={maxDate}
        className={
          "block mb-2 py-1.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300"
        }
      />
    </div>
  );
}
export default FloatingInputDateRange;
