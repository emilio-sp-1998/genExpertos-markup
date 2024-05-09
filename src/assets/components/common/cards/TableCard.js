import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import DropDownButtons from "../DropDownButtons";
import BadgePill from "../pills/BadgePill";
import { Tooltip } from "@mui/material";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TableCard = ({
  cabeceraData,
  bodyData,
  handleModal,
  sortKey,
  sortState,
  sortAction,
  chargingTable,
  actions,
  colorEstado,
  check,
  setCheck,
  pagina,
  setBodyData
}) => {
  return (
    <div className="flow-root w-full">
      <div className="w-full">
        {cabeceraData && bodyData && !chargingTable ? (
          <div className="inline-block min-w-full align-middle">
            <table className="table-auto min-w-full">
              <thead>
                <tr>
                  {cabeceraData.map((data, idColumna) => {
                    return (
                      <th
                        key={data.id}
                        className={classNames(
                          idColumna > 2
                            ? "md:table-cell hidden"
                            : idColumna > 1
                            ? "sm:table-cell hidden"
                            : "",
                          "px-4 py-3.5 border"
                        )}
                      >
                        <div
                          className="flex flex-1 items-center justify-center text-sm hover:underline hover:text-primarymarkup-200 cursor-pointer text-primarymarkup-100"
                          onClick={() => sortAction(data.value)}
                        >
                          {data.text}

                          {data.value === sortKey && (
                            <ChevronDownIcon
                              className={classNames(
                                sortState ? "rotate-180" : "",
                                "h-6 w-6 px-1"
                              )}
                              aria-hidden="true"
                            />
                          )}
                        </div>
                      </th>
                    );
                  })}

                  <th className="py-3.5 px-4 border">
                    <span className="text-center text-sm"></span>
                  </th>
                  <th className="py-3.5 px-4 border">
                    <span className="text-center text-sm"></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {bodyData.map((dataFila, dataFilaIdx) => {
                  return (
                    <tr
                      key={dataFilaIdx}
                      className={
                        dataFilaIdx % 2 === 0 ? undefined : "bg-gray-50"
                      }
                    >
                      {cabeceraData?.map((dataColumna, idColumna) => {
                        return (
                          <td
                            key={dataColumna.id}
                            className={classNames(
                              idColumna > 2
                                ? "md:table-cell hidden"
                                : idColumna > 1
                                ? "sm:table-cell hidden"
                                : "",
                              "px-3 py-2 text-xs text-black-100 border text-center"
                            )}
                          >
                            {!Array.isArray(dataFila[dataColumna.value]) && (
                              <>
                                {dataColumna.value === "estado" &&
                                colorEstado ? (
                                  <div className="flex justify-center w-full z-20">
                                    <BadgePill
                                      color={dataFila.colorEstate}
                                      content={dataFila[dataColumna.value]}
                                    />
                                  </div>
                                ) : (
                                  <>
                                    {dataColumna.value === "categoria" &&
                                    colorEstado ? (
                                      <div className="flex justify-center w-full z-20">
                                        <BadgePill
                                          color={dataFila.colorCategoria}
                                          content={dataFila[dataColumna.value]}
                                        />
                                      </div>
                                    ) : (
                                      dataFila[dataColumna.value]
                                    )}
                                  </>
                                )}
                              </>
                            )}
                            {Array.isArray(dataFila[dataColumna.value]) && (
                              <div className="flex flex-wrap gap-1">
                                {dataFila[dataColumna.value].map(
                                  (element, idx) => (
                                    <BadgePill
                                      key={idx}
                                      color={"gray"}
                                      content={element}
                                    />
                                  )
                                )}
                              </div>
                            )}
                          </td>
                        );
                      })}
                      {dataFila.actions && (
                        <td className="px-2 py-2 text-xs border">
                          <DropDownButtons
                            handleModal={handleModal}
                            actions={dataFila.actions}
                            idRegistro={dataFila.ID}
                          />
                        </td>
                      )}
                      {!dataFila.actions && actions.length > 0 && (
                        <td className="px-2 py-2 text-xs border">
                          <DropDownButtons
                            handleModal={handleModal}
                            actions={actions}
                            idRegistro={dataFila.ID}
                          />
                        </td>
                      )}
                      {pagina === "consolidado" && (
                        <>
                          {dataFila.ESTADO === "REVISADO" && (
                          <td className="px-2 py-2 text-xs border">
                            <div>
                                <input type="checkbox" checked={check.indexOf(dataFila.ID) !== -1 ? 1 : 0} onChange={(e) => {
                                  if(e.target.checked){
                                    setCheck([
                                      ...check,
                                      dataFila.ID
                                    ])
                                  }else{
                                    const index = check.indexOf(dataFila.ID)
                                    check.splice(index, 1)
                                    setCheck([...check])
                                  }
                                }}/>
                            </div>
                          </td>
                        )}
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TableCard;
