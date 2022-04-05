import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { finishTable } from "../utils/api";

//Allows user to finish the table seating, deleting the reservation assignment and makes the table free for another seating//

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
      finishTable(table.table_id).then(() => history.go(0));
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-finish"
        onClick={handleFinish}
        data-table-id-finish={table.table_id}
      >
        Finish
      </button>
      {errorMessage ? <ErrorAlert error={errorMessage} /> : null}
    </>
  );
}

export default FinishSeat;
