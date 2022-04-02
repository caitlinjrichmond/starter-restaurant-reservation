import React from "react";
import FinishSeat from "./FinishSeat"

function TablesList({ tables }) {
  return (
    <div>
      {tables ? tables.map((table, index) => (
        <li key={index} style={{ listStyleType: "none" }}>
          <div className="card">
            <div className="card-body">
              Table Name: {table.table_name} (Id: {table.table_id})<br />
              Capacity: {table.capacity}
              <br />
              <div>
                {!table.reservation_id ? (
                  <p data-table-id-status={table.table_id}>Free</p>
                ) : (
                  <div>
                    {" "}
                    <p data-table-id-status={table.table_id}>Occupied</p> <br />
                    <FinishSeat table={table}/>
                  </div>
                )}
              </div>
              <br />
            </div>
          </div>
        </li>
      )) : <p>Loading...</p>}
      <br />
    </div>
  );
}

export default TablesList;
