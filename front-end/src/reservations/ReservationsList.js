import React from "react";
import CancelRes from "./CancelRes";

function ReservationsList({ reservations }) {
  return (
    <div>
      {" "}
      {reservations && reservations.length !== 0 ? (
        reservations.map((reservation, index) =>
          reservation.status !== "finished" &&
          reservation.status !== "cancelled" ? (
            <li key={index} style={{ listStyleType: "none" }}>
              <div className="card">
                <div className="card-body">
                  First Name: {reservation.first_name} <br />
                  Last Name: {reservation.last_name} <br />
                  Phone: {reservation.mobile_number}
                  <br />
                  Reservation Time: {reservation.reservation_time}
                  <br />
                  Number of People: {reservation.people}
                  <br />
                  Status:{" "}
                  {reservation.status === "seated" ? (
                    <div>
                      <p
                        data-reservation-id-status={reservation.reservation_id}
                      >
                        {reservation.status}
                      </p>{" "}
                    </div>
                  ) : (
                    <div>
                      <p
                        data-reservation-id-status={reservation.reservation_id}
                      >
                        booked
                      </p>{" "}
                      <br />
                      <a
                        href={`/reservations/${reservation.reservation_id}/seat`}
                      >
                        <button
                          type="button"
                          className="btn btn-warning"
                          href={`/reservations/${reservation.reservation_id}/seat`}
                        >
                          Seat
                        </button>
                      </a>
                      <button type="button" className="btn btn-light">
                    <a
                      href={`/reservations/${reservation.reservation_id}/edit`}
                    >
                      {" "}
                      Edit{" "}
                    </a>
                  </button>
                    </div>
                  )}
                  <br />
                  {/* <button type="button" className="btn btn-light">
                    <a
                      href={`/reservations/${reservation.reservation_id}/edit`}
                    >
                      {" "}
                      Edit{" "}
                    </a>
                  </button> */}
                  <CancelRes reservation={reservation} /> <br />
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
{
  /* {reservation.status === "booked" || !reservation.status ? (
                  <>
                    <p data-reservation-id-status={reservation.reservation_id}>
                      {reservation.status}
                    </p>{" "}
                    <br />
                    <a
                      href={`/reservations/${reservation.reservation_id}/seat`}
                    >
                      <button
                        type="button"
                        className="btn btn-warning"
                        href={`/reservations/${reservation.reservation_id}/seat`}
                      >
                        Seat
                      </button>
                    </a>{" "}
                  </>
                ) : (
                  <>
                  <p data-reservation-id-status={reservation.reservation_id}>
                    {reservation.status}
                  </p>{" "}
                  <br />
                </>
                )} */
}
