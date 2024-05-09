import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import DropDownButtons from "../DropDownButtons";
import BadgePill from "../pills/BadgePill";
import PillChecked from "../pills/PillChecked";
import GridCheckbox from "../inputs/GridCheckbox";
import ParentGridCheckbox from "../inputs/ParentGridCheckbox";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const colors = {
  "Sin Asignar": "gray",
  "En Curso": "blue",
  "Esperando Respuesta": "yellow",
  Finalizado: "green",
  Anulado: "red",
  Pendiente: "purple",
  Error: "red",
  Queja: "yellow",
  Sugerencia: "green",
  "Soporte técnico": "gray",
  "Datos del Usuario": "purple",
  "Mal funcionamiento": "blue",
};

const TableCardCheck = ({
  cabeceraData,
  bodyData,
  setBodyData,
  handleModal,
  sortKey,
  sortState,
  sortAction,
  chargingTable,
  actions,
  checkCount,
  setCheckCount,
}) => {
  return (
    <div className="flow-root w-full">
      <div className="w-full">
        {cabeceraData && bodyData && !chargingTable ? (
          <div className="inline-block min-w-full align-middle">
            <table className="table-auto min-w-full">
              <thead>
                <tr>
                  <th className="py-3.5 px-4 border">
                    <ParentGridCheckbox
                      bodyData={bodyData}
                      setBodyData={setBodyData}
                      checkCount={checkCount}
                      setCheckCount={setCheckCount}
                    />
                  </th>
                  {cabeceraData.map((data, idColumna) => {
                    return (
                      <th
                        key={data.id}
                        className={classNames(
                          idColumna > 3
                            ? "lg:table-cell hidden"
                            : idColumna > 2
                            ? "md:table-cell hidden"
                            : idColumna > 1
                            ? "sm:table-cell hidden"
                            : "",
                          "px-4 py-3.5 border"
                        )}
                      >
                        <div
                          className="flex flex-1 items-center justify-center text-base hover:underline hover:text-azulredmedica-200 cursor-pointer text-azulredmedica-100"
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
                    <span className="text-center text-base"></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {bodyData.map((dataFila, dataFilaIdx) => {
                  return (
                    <tr
                      key={dataFila._id}
                      className={
                        dataFila.checked
                          ? "bg-blue-50"
                          : dataFilaIdx % 2 === 0
                          ? undefined
                          : "bg-gray-50"
                      }
                    >
                      <td className="px-2 py-2 text-sm border">
                        <GridCheckbox
                          dataFilaIdx={dataFilaIdx}
                          dataFila={dataFila}
                          setBodyData={setBodyData}
                          checkCount={checkCount}
                          setCheckCount={setCheckCount}
                          bodyData={bodyData}
                        />
                      </td>
                      {cabeceraData?.map((dataColumna, idColumna) => {
                        return (
                          <td
                            key={dataColumna.id}
                            className={classNames(
                              idColumna > 3
                                ? "lg:table-cell hidden"
                                : idColumna > 2
                                ? "md:table-cell hidden"
                                : idColumna > 1
                                ? "sm:table-cell hidden"
                                : "",
                              "px-3 py-2 text-sm text-black-100 border text-center"
                            )}
                          >
                            {!Array.isArray(dataFila[dataColumna.value]) && (
                              <>
                                {dataColumna.value === "estado" ? (
                                  <div className="flex justify-center w-full z-20">
                                    <BadgePill
                                      color={colors[dataFila.estado]}
                                      content={dataFila[dataColumna.value]}
                                    />
                                  </div>
                                ) : (
                                  <>
                                    {dataColumna.value === "categoria" ? (
                                      <div className="flex justify-center w-full z-20">
                                        <PillChecked
                                          color={colors[dataFila.categoria]}
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
                          </td>
                        );
                      })}
                      {dataFila.actions && (
                        <td className="px-2 py-2 text-sm border">
                          <DropDownButtons
                            handleModal={handleModal}
                            actions={dataFila.actions}
                            idRegistro={dataFila._id}
                            username={dataFila.email}
                          />
                        </td>
                      )}
                      {!dataFila.actions && actions.length > 0 && (
                        <td className="px-2 py-2 text-sm border">
                          <DropDownButtons
                            handleModal={handleModal}
                            actions={actions}
                            idRegistro={dataFila._id}
                            username={dataFila.email}
                          />
                        </td>
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

export default TableCardCheck;
