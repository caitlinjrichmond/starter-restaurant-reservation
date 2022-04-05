import React from "react";
import DateNav from "../dashboard/DateNav";
import ReservationsList from "./ReservationsList";
import "./Reservations.css"

function Reservations({ reservations, goNext, goPrev, goToday}) {
  return (
    <div>
 
      <ReservationsList reservations={reservations} /> 
      <DateNav goPrev={goPrev} goToday={goToday} goNext={goNext} />
    </div>
  );
}

export default Reservations;
