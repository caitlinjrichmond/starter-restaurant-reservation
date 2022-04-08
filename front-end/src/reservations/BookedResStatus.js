import React from "react";
import CancelRes from "./CancelRes";
import SeatBtn from "./buttons_res/SeatBtn";

function BookedResStatus({reservation}) {
    return (
        <div>
        <p data-reservation-id-status={reservation.reservation_id}>
          Reservation has been booked | Click seat to assign to table
        </p>
        <br />
       <SeatBtn reservation={reservation} /> {" "}
        <a href={`/reservations/${reservation.reservation_id}/edit`}>
          <button type="button" className="btn btn-edit">
            Edit{" "}
          </button>
        </a>{" "}
        <CancelRes reservation={reservation} /> <br />
      </div>
    )
}

export default BookedResStatus;
