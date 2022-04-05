import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { cancelRes } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

//Function allows users to cancel a reservation via a cancel button and thus changes status to 'cancelled' //

function CancelRes({ reservation }) {
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleCancel = (event) => {
    event.preventDefault();
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      cancelRes(reservation.reservation_id).then(() => history.go(0));
    }
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-cancel"
        data-reservation-id-cancel={reservation.reservation_id}
        onClick={handleCancel}
      >
        <span style={{ color: "#FFFAF2" }}>Cancel</span>
      </button>
      <>{errorMessage ? <ErrorAlert error={errorMessage} /> : null}</>
    </>
  );
}

export default CancelRes;
