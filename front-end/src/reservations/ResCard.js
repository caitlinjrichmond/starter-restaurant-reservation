import React from "react";
import SeatedResStatus from "./SeatedResStatus";
import BookedResStatus from "./BookedResStatus";

function ResCard({ reservation }) {
  return (
    <div className="card" style={{ width: "35rem", marginBottom: "20px" }}>
      <div className="card-body res-card">
        <h5>
          {reservation.first_name} {reservation.last_name} - Party of{" "}
          {reservation.people} @ {reservation.reservation_time}
        </h5>{" "}
        <br />
        {reservation.status === "seated" ? (
          <SeatedResStatus reservation={reservation} />
        ) : (
          <BookedResStatus reservation={reservation} />
        )}{" "}
      </div>
    </div>
  );
}

export default ResCard;
