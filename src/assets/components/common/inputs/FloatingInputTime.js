import React, { useEffect, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const listHours = [
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
];

function FloatingInputTime({ name, value, handleChange, label, defaultHorario }) {
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");
  const [selectedHorario, setSelectedHorario] = useState(defaultHorario);
  useEffect(() => {
    const valueSplit = value.split(":");
    let valueHour = "";
    let valueMinute = "";
    let valueHorario = "";
    if (valueSplit.length > 1) {
      valueHour = valueSplit[0];
      const valueSplit2 = valueSplit[1].split(" ");
      if (valueSplit2.length > 1) {
        valueMinute = valueSplit2[0];
        valueHorario = valueSplit2[1];
      }
      setSelectedHour(valueHour);
      setSelectedMinute(valueMinute);
      setSelectedHorario(valueHorario);
    }
    
  }, []);

  const handelTimeChange = (event) => {
    const selectHour =
      event.target.name === "hour" ? event.target.value : selectedHour;
    const selectMinute =
      event.target.name === "minute" ? event.target.value : selectedMinute;
    const selectHorario =
      event.target.name === "horario" ? event.target.value : selectedHorario;
    event.target.name === "hour"
      ? setSelectedHour(event.target.value)
      : event.target.name === "minute"
      ? setSelectedMinute(event.target.value)
      : setSelectedHorario(event.target.value);
    handleChange({
      target: {
        name: name,
        value: selectHour + ":" + selectMinute + " " + selectHorario,
      },
    });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full mb-2">
        <label className="text-xs text-gray-500">{label}</label>
      </div>

      <div className="flex w-full">
        {/* Selector de horas */}
        <select
          value={selectedHour}
          onChange={handelTimeChange}
          name="hour"
          className="flex w-full py-2.5 px-4 text-sm text-gray-900 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-azulredmedica-100 hover:border-azulredmedica-100"
        >
          {selectedHour ? (
            <option value={selectedHour}>{selectedHour}</option>
          ) : (
            <option value="" disabled>
              Horas
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
          className="flex w-full py-2.5 px-4 text-sm text-gray-900 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-azulredmedica-100 hover:border-azulredmedica-100"
        >
          {selectedMinute ? (
            <option value={selectedMinute}>{selectedMinute}</option>
          ) : (
            <option value="" disabled>
              Minutos
            </option>
          )}
          <option value="00">00</option>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="45">45</option>
          {/* Agrega más opciones de minutos según sea necesario */}
        </select>

        {/* Selector de horario */}
        <select
          value={selectedHorario}
          onChange={handelTimeChange}
          name="horario"
          className="flex w-full py-2.5 px-4 text-sm text-gray-900 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-azulredmedica-100 hover:border-azulredmedica-100"
        >
          {selectedHorario && (
            <option value={selectedHorario}>{selectedHorario}</option>
          )}
          {selectedHorario === "PM" ? null : <option value="PM">PM</option>}
          {selectedHorario === "AM" ? null : <option value="AM">AM</option>}
          {/* Agrega más opciones de minutos según sea necesario */}
        </select>
      </div>
    </div>
  );
}

export default FloatingInputTime;
