import React, { useEffect, useState } from "react";
import "../../../css/calendar.css";
import "../../../css/datePicker.css";
import DatePicker from "react-date-picker";
import moment from "moment";
import { CalendarIcon } from "@heroicons/react/24/outline";

function FloatingInputDate({
  name,
  id,
  value,
  handleChange,
  label,
  disabled,
  minDate,
  maxDate,
  startingDate = new Date(1990, 0, 1),
}) {
  const [displayDate, setDisplayDate] = useState("");
  const [format, setFormat] = useState("dd MM yyyy");

  const onChange = (date) => {
    setFormat("dd/MM/yyyy");
    handleChange({
      target: {
        name: name,
        value: date,
      },
    });
  };

  useEffect(() => {
    if (!!value) {
      setFormat("dd/MM/yyyy");
      setDisplayDate(moment(value).format("YYYY/MM/DD"));
    }
  }, [value]);
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="text-xs text-gray-500">
        {label}
      </label>
      <DatePicker
        id={id}
        onChange={(date) => onChange(date)}
        value={displayDate}
        calendarIcon={
          <CalendarIcon
            className="h-6 w-6 px-1 text-gray-400"
            aria-hidden="true"
          />
        }
        clearIcon={null}
        defaultActiveStartDate={startingDate}
        format={format}
        dayPlaceholder=""
        yearPlaceholder=""
        monthPlaceholder=""
        minDate={minDate}
        disabled={disabled}
        maxDate={maxDate}
        className={
          "block mb-2 py-1.5 px-2 w-full text-sm text-gray-900 border-2 border-gray-300 focus:border-primarymarkup-100 rounded-lg"
        }
      />
    </div>
  );
}
export default FloatingInputDate;
