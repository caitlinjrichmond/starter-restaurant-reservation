import React from "react";

function SeatBtn({reservation}) {
    return (
        <a href={`/reservations/${reservation.reservation_id}/seat`}>
        <button type="button" className="btn btn-seat">
          Seat
        </button>
      </a>
    )
}

export default SeatBtn;
