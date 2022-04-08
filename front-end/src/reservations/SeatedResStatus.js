import React from "react";

// Defines what is rendered on the reservation card when the res status is "Seated" //
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
