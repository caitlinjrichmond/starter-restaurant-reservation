import React from "react";
import TablesList from "./TablesList";
import "./Tables.css"

function Tables({tables}) {
    return (
        <TablesList tables={tables} />
    )
}

export default Tables;