import React from "react";
import PaguinationCard from "../cards/PaguinationCard";
import TableCardCheck from "../cards/TableCardCheck";
import CirclePointer from "../../loaders/CirclePointer";

function GridContentCheck({
  cabeceraData,
  bodyData,
  setBodyData,
  handleModal,
  mensaje,
  currentPage,
  totalPage,
  page,
  setPage,
  limit,
  setLimit,
  min,
  max,
  count,
  sortKey,
  sortState,
  sortAction,
  chargingTable,
  actions = [],
  checkCount,
  setCheckCount,
}) {
  return (
    <div className="flex px-2 justify-center items-center">
      <div className="flex w-full mx-auto">
        <div className="px-2 w-full">
          {bodyData.length > 0 && cabeceraData.length > 0 && (
            <TableCardCheck
              cabeceraData={cabeceraData}
              bodyData={bodyData}
              setBodyData={setBodyData}
              handleModal={handleModal}
              sortKey={sortKey}
              sortState={sortState}
              sortAction={sortAction}
              chargingTable={chargingTable}
              actions={actions}
              checkCount={checkCount}
              setCheckCount={setCheckCount}
            />
          )}

          {chargingTable || !cabeceraData || !bodyData ? (
            <div className="flex justify-center items-center w-50 h-50 py-5">
              <CirclePointer />
            </div>
          ) : null}

          {bodyData.length <= 0 && (
            <div className="text-center mt-4">
              <p className="text-sm font-normal text-black-100">{mensaje}</p>
            </div>
          )}
          {bodyData.length > 0 && (
            <PaguinationCard
              currentPage={currentPage}
              totalPage={totalPage}
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              min={min}
              max={max}
              count={count}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default GridContentCheck;
