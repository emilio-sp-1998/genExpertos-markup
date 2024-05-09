import React, { useEffect, useState } from "react";
import moment from "moment";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const listHours = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];

function FloatingInputTime24({ name, value, handleChange, label }) {
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");
  useEffect(() => {
    if (value != "") {
      const valueSplit = value.split(":");
      let valueHour = "";
      let valueMinute = "";
      if (valueSplit.length > 1) {
        valueHour = valueSplit[0];
        valueMinute = valueSplit[1];
        setSelectedHour(valueHour);
        setSelectedMinute(valueMinute);
      }
    }
  }, [value]);
  const handelTimeChange = (event) => {
    const selectHour =
      event.target.name === "hour" ? event.target.value : selectedHour;
    const selectMinute =
      event.target.name === "minute" ? event.target.value : selectedMinute;
    event.target.name === "hour"
      ? setSelectedHour(event.target.value)
      : setSelectedMinute(event.target.value);
    handleChange({
      target: {
        name: name,
        value: selectHour + ":" + selectMinute,
      },
    });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full">
        <label className="text-xs text-gray-500">{label}</label>
      </div>

      <div className="flex w-full">
        {/* Selector de horas */}
        <select
          value={selectedHour}
          onChange={handelTimeChange}
          name="hour"
          className="flex w-full text-sm text-gray-500 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-azulredmedica-100 hover:border-azulredmedica-100"
        >
          {selectedHour ? (
            <option value={selectedHour}>{selectedHour}</option>
          ) : (
            <option value="" disabled>
              H
            </option>
          )}
          {listHours.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
          {/* Agrega más opciones de horas según sea necesario */}
        </select>
        {/* Selector de minutos */}
        <select
          value={selectedMinute}
          onChange={handelTimeChange}
          name="minute"
          className="flex w-full  px-4 text-sm text-gray-500 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-azulredmedica-100 hover:border-azulredmedica-100"
        >
          {selectedMinute ? (
            <option value={selectedMinute}>{selectedMinute}</option>
          ) : (
            <option value="" disabled>
              M
            </option>
          )}
          <option value="00">00</option>
          <option value="05">05</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
          <option value="35">35</option>
          <option value="40">40</option>
          <option value="45">45</option>
          <option value="50">50</option>
          <option value="55">55</option>
          {/* Agrega más opciones de minutos según sea necesario */}
        </select>
      </div>
    </div>
  );
}

export default FloatingInputTime24;
