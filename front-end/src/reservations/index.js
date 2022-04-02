import React from "react";
import DateNav from "../dashboard/DateNav";
import ReservationsList from "./ReservationsList";

function Reservations({ reservations, goNext, goPrev, goToday}) {
  return (
    <div>
      <br />
      <ReservationsList reservations={reservations} /> <br />
      <DateNav goPrev={goPrev} goToday={goToday} goNext={goNext} />
    </div>
  );
}

export default Reservations;
