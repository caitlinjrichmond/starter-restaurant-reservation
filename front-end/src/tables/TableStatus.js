import React from "react";
import FinishSeat from "./FinishSeat";

//Defines whether a table is "free" or "occupied"//
function TableStatus({ table }) {
  return (
    <>
      {!table.reservation_id ? (
        <span data-table-id-status={table.table_id}>Free</span>
      ) : (
        <>
          <span data-table-id-status={table.table_id}>Occupied</span>
          <br />
          <FinishSeat table={table} />
        </>
      )}
    </>
  );
}

export default TableStatus;
