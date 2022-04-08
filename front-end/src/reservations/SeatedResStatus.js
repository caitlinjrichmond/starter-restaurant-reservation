import React from "react";

function SeatedResStatus({ reservation }) {
  return (
    <div>
      <p data-reservation-id-status={reservation.reservation_id}>
        Reservation has been {reservation.status} to a table.
      </p>{" "}
    </div>
  );
}

export default SeatedResStatus;
