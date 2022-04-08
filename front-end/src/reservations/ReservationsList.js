import React from "react";
import ResCard from "./ResCard";

//Function takes in reservation data and maps out the list into individual cards for each reservation//

function ReservationsList({ reservations }) {
  function noCancelsOrFinished(status) {
    if (status !== "cancelled" && status !== "finished") {
      return true;
    }
  }
  
  return (
    <div>
      {" "}
      {reservations.map((reservation) =>
        noCancelsOrFinished(reservation.status) ? (
          <li
            key={reservation.reservation_id}
            style={{ listStyleType: "none" }}
          >
            <ResCard reservation={reservation} />
          </li>
        ) : null
      )}
    </div>
  );
}

export default ReservationsList;
