import React from "react";

const GridCheckbox = ({
  dataFilaIdx,
  dataFila,
  checkCount,
  setCheckCount,
  bodyData,
  setBodyData,
}) => {
  return (
    <div className="flex items-center justify-center">
      <input
        id={dataFilaIdx}
        type="checkbox"
        //checked={dataFila.checked}
        checked={
          checkCount === 0 ? (dataFila.checked = false) : dataFila.checked
        }
        disabled={
          dataFila.estado === "Anulado" || dataFila.estado === "Finalizado"
            ? true
            : false
        }
        onChange={(e) => {
          dataFila.checked = e.target.checked;
          if (dataFila.checked) {
            setCheckCount(checkCount + 1);
            setBodyData([...bodyData]);
          } else {
            setCheckCount(checkCount - 1);
            setBodyData([...bodyData]);
          }
        }}
        className="w-4 h-4 text-azulredmedica-100 bg-gray-100 border-gray-300 rounded focus:ring-azulredmedica-50 hover:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 hover:bg-gray-200 hover:border-gray-300"
      />
    </div>
  );
};
export default GridCheckbox;
