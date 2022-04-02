import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { finishTable, createTable } from "../utils/api";

function FinishSeat({ table }) {
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleFinish = (event) => {
    event.preventDefault();
    console.log(table);
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      finishTable(table.table_id)
      createTable({
        table_name: table.table_name,
        capacity: table.capacity,
      })
      (history.go(0));
    }
  };
  return (
    <div>
      <button type="button" className="btn btn-danger" onClick={handleFinish} data-table-id-finish={table.table_id}>
        Finish
      </button>
      <>{errorMessage ? <ErrorAlert error={errorMessage} /> : null}</>
    </div>
  );
}

export default FinishSeat;
