import React from "react";
import { useHistory } from "react-router-dom";
import { cancelRes } from "../utils/api";
import CancelBtn from "./buttons_res/CancelBtn";

//Function allows users to cancel a reservation via a cancel button and thus changes status to 'cancelled' //

function CancelRes({ reservation }) {
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
      <CancelBtn handleCancel={handleCancel} reservation={reservation} />
    </>
  );
}

export default CancelRes;
