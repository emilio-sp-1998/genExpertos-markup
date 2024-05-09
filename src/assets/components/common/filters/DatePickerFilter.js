import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import moment from "moment";
import { CalendarIcon } from "@heroicons/react/24/outline";
import "../../../css/calendar.css";
import "../../../css/datePicker.css";

const DatePickerFilter = ({
  selectedDate,
  handleDateChange,
  label=null,
  disabled=false,
  minDate,
  maxDate,
  startingDate = new Date(),
}) => {
  const [displayDate, setDisplayDate] = useState("");
  const [format, setFormat] = useState("dd MM yyyy");

  const onChange = (date) => {
    setFormat("dd/MM/yyyy");
    handleDateChange(date);
  };

  useEffect(() => {
    if (!!selectedDate) {
      setFormat("dd/MM/yyyy");
      setDisplayDate(moment(selectedDate).format("YYYY/MM/DD"));
    }else{
      setDisplayDate("");
      setFormat("dd MM yyyy");
    }

  }, [selectedDate]);
  return (
    <div className="flex flex-col w-60 px-2 py-2">
      {label ? <label className="text-xs font-medium text-gray-900">{label}</label> : null}
      <DatePicker
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
        className="block py-1 px-3 w-64 h-12 text-xs text-gray-900 bg-transparent border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-primarymarkup-100 rounded-lg mt-2"
      />
    </div>
  );
};

export default DatePickerFilter;