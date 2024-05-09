import React, { useEffect, useState } from "react";
import "../../../css/calendar.css";
import "../../../css/datePicker.css";
import DatePicker from "react-date-picker";
import { CalendarIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function DateRangePickerFilter({
  value,
  setValue,
  label,
  minDate,
  maxDate
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [miniDate, setMiniDate] = useState(minDate);
  const [maxiDate, setMaxiDate] = useState(maxDate);
  const [miniDate2, setMiniDate2] = useState(minDate);
  const [maxiDate2, setMaxiDate2] = useState(maxDate);
  const [format, setFormat] = useState("dd MM yyyy");
  const [formatEnd, setFormatEnd] = useState("dd MM yyyy");

  useEffect(() => {
    if (value === "") {
      setValue("");
      setStartDate("");
      setEndDate("");
      setMiniDate(minDate);
      setMaxiDate(maxDate);
      setMiniDate2(minDate);
      setMaxiDate2(maxDate);
      setFormat("dd MM yyyy");
      setFormatEnd("dd MM yyyy");
    }
  }, [value]);

  //[startDate, endDate];
  const onChangeStart = (date) => {
    setStartDate(date);
    setMiniDate2(date);
    setFormat("dd/MM/yyyy");
    if (endDate !== "") {
      setValue([date, endDate]);
    }
  };

  const onChangeEnd = (date) => {
    setEndDate(date);
    setMaxiDate2(date);
    setFormatEnd("dd/MM/yyyy");
    if(startDate !== ""){
      setValue([startDate, date]);
    }
  };

  return (
    <div className="flex flex-col px-2 py-2 items-center justify-between">
      <div className="flex">
        <div className="flex flex-col mx-1">
          <div className="flex w-full justify-start">
            <label
              htmlFor="search"
              className="text-xs font-medium text-gray-900"
            >
              {label} Inicio
            </label>
          </div>
          <DatePicker
            onChange={(date) => {
              onChangeStart(date);
            }}
            value={startDate}
            calendarIcon={
              <CalendarIcon className="h-6 w-6 px-1" aria-hidden="true" />
            }
            clearIcon={null}
            minDate={miniDate}
            maxDate={maxiDate2}
            format={format}
            dayPlaceholder=""
            yearPlaceholder=""
            monthPlaceholder=""
            className={
              "block mb-2 py-1.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300"
            }
          />
        </div>
        <div className="flex flex-col mx-1">
          <div className="flex w-full justify-start">
            <label
              htmlFor="search"
              className="text-xs font-medium text-gray-900"
            >
              {label} Fin
            </label>
          </div>
          <DatePicker
            onChange={(date) => {
              onChangeEnd(date);
            }}
            value={endDate}
            calendarIcon={
              <CalendarIcon className="h-6 w-6 px-1" aria-hidden="true" />
            }
            clearIcon={null}
            format={formatEnd}
            dayPlaceholder=""
            yearPlaceholder=""
            monthPlaceholder=""
            minDate={miniDate2}
            maxDate={maxiDate}
            className={
              "block mb-2 py-1.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300"
            }
          />
        </div>
      </div>
    </div>
  );
}
export default DateRangePickerFilter;
