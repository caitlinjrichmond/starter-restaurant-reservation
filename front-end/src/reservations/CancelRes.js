import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { cancelRes } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

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
      cancelRes(reservation.reservation_id);
      history.go(0);
    }
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-dark"
        data-reservation-id-cancel={reservation.reservation_id}
        onClick={handleCancel}
      >
        Cancel
      </button>
      <>{errorMessage ? <ErrorAlert error={errorMessage} /> : null}</>
    </div>
  );
}

export default CancelRes;
