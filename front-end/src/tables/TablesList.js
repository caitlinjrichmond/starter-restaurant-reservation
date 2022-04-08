import React from "react";
import TableCard from "./TableCard";

//Function that takes in data from tables table and maps tables into individual squares (grid style)//

function TablesList({ tables }) {
  return (
    <div className="container">
      {tables ? <TableCard tables={tables} /> : <p>Loading...</p>}
    </div>
  );
}

export default TablesList;

