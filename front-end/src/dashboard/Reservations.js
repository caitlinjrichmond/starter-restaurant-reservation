import React from "react";
import Dashboard from "./Dashboard";

function Reservations({ reservations }) {
  return (
    <div>
      {reservations.map((res, index) => (
        <li key={index} style={{ listStyleType: "none" }}>
          <div class="card">
            <div class="card-body">
              First Name: {res.first_name} <br />
              Last Name: {res.last_name} <br />
              Phone: {res.mobile_number}
              <br />
              Reservation Time: {res.reservation_time}
              <br />
              Number of People: {res.people}
              <br />
            </div>
          </div>
        </li>
      ))}
      <br />
    </div>
  );
}

export default Reservations;
