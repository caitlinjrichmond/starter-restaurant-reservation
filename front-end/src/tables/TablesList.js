import React from "react";
import FinishSeat from "./FinishSeat";

//Function that takes in data from tables table and maps tables into individual squares (grid style)//

function TablesList({ tables }) {
  return (
    <div className="container">
      <div className="row">
        {tables ? (
          tables.map((table) => (
            <div
              className="card"
              style={{
                width: "10rem",
                marginBottom: "20px",
                marginRight: "10px",
              }}
              key={table.table_id}
            >
              <div className="card-body table-card">
                {table.table_name} <br /> Seats {table.capacity} <br />
                {!table.reservation_id ? (
                  <span data-table-id-status={table.table_id}>Free</span>
                ) : (
                  <>
                    <span data-table-id-status={table.table_id}>Occupied</span>
                    <br />
                    <FinishSeat table={table} />
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
        <br />
      </div>
    </div>
  );
}

export default TablesList;
