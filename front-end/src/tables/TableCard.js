import React from "react";
import TableStatus from "./TableStatus";

//Defines what is rendered for each individual table card //
function TableCard({ tables }) {
  return (
    <div className="row">
      {tables.map((table) => (
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
            <TableStatus table={table} />
          </div>
        </div>
      ))}
      <br />
    </div>
  );
}

export default TableCard;
