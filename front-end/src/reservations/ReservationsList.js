import React from "react";
import CancelRes from "./CancelRes";

//Function takes in reservation data and maps out the list into individual cards for each reservation//

function ReservationsList({ reservations }) {
  return (
    <div>
      {" "}
      {reservations && reservations.length !== 0 ? (
        reservations.map((reservation) =>
          reservation.status !== "finished" &&
          reservation.status !== "cancelled" ? (
            <li
              key={reservation.reservation_id}
              style={{ listStyleType: "none" }}
            >
              <div
                className="card"
                style={{ width: "35rem", marginBottom: "20px" }}
              >
                <div className="card-body res-card">
                  <h5>
                    {reservation.first_name} {reservation.last_name} - Party of{" "}
                    {reservation.people} @ {reservation.reservation_time}
                  </h5>{" "}
                  <br />
                  {reservation.status === "seated" ? (
                    <div>
                      <p
                        data-reservation-id-status={reservation.reservation_id}
                      >
                        Reservation has been {reservation.status} to a table.
                      </p>{" "}
                    </div>
                  ) : (
                    <div>
                      <p
                        data-reservation-id-status={reservation.reservation_id}
                      >
                        Reservation has been booked | Click seat to assign to
                        table
                      </p>
                      <br />
                      <a
                        href={`/reservations/${reservation.reservation_id}/seat`}
                      >
                        <button
                          type="button"
                          className="btn btn-seat"
                          href={`/reservations/${reservation.reservation_id}/seat`}
                        >
                          Seat
                        </button>{" "}
                      </a>
                      <a
                        href={`/reservations/${reservation.reservation_id}/edit`}
                      >
                        <button
                          type="button"
                          className="btn btn-edit"
                          href={`/reservations/${reservation.reservation_id}/edit`}
                        >
                          Edit{" "}
                        </button>
                      </a>{" "}
                      <CancelRes reservation={reservation} /> <br />
                    </div>
                  )}{" "}
                </div>
              </div>
            </li>
          ) : null
        )
      ) : (
        <p>No reservations found</p>
      )}
    </div>
  );
}

export default ReservationsList;
