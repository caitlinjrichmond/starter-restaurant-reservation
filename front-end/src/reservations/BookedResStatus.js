import React from "react";
import CancelRes from "./CancelRes";
import SeatBtn from "./buttons_res/SeatBtn";
import EditBtn from "./buttons_res/EditBtn";

// Defines what is rendered on the reservation card when the res status is "Booked" //
function BookedResStatus({reservation}) {
    return (
        <div>
        <p data-reservation-id-status={reservation.reservation_id}>
          Reservation has been booked | Click seat to assign to table
        </p>
        <br />
       <SeatBtn reservation={reservation} /> {" "}
       <EditBtn reservation={reservation} /> {" "}
       <CancelRes reservation={reservation} /> <br />
      </div>
    )
}

export default BookedResStatus;
