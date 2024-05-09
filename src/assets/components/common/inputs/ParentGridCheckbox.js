import React, { useState } from "react";

const ParentGridCheckbox = ({
  bodyData,
  checkCount,
  setCheckCount,
  setBodyData
}) => {
  const countDataEstado = bodyData.filter((dataFila) => {
    return dataFila.estado !== "Anulado" && dataFila.estado !== "Finalizado";
  }).length;
  return (
    <div className="flex items-center justify-center">
      <input
        id="default-checkbox"
        type="checkbox"
        value=""
        checked={
          checkCount === 0
            ? false
            : checkCount === countDataEstado
            ? true
            : false
        }
        onChange={(e) => {
          const newBodyData = [];
          bodyData.map((dataFila) => {
            if (
              dataFila.estado !== "Anulado" &&
              dataFila.estado !== "Finalizado"
            ) {
              dataFila.checked = e.target.checked;
            }
            newBodyData.push(dataFila);
          });
          setBodyData(newBodyData);
          const count = bodyData.filter((dataFila) => {
            return dataFila.checked === true;
          }).length;
          setCheckCount(count);
        }}
        className="w-4 h-4 text-azulredmedica-100 bg-gray-100 border-gray-300 rounded focus:ring-azulredmedica-50 hover:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 hover:bg-gray-200 hover:border-gray-300"
      />
    </div>
  );
};
export default ParentGridCheckbox;
