import React from "react";
import CancelRes from "../reservations/CancelRes";

function SearchResults({ results }) {


  return (
    <div>
      {results.length === 0 || !results ? (
        <p>No reservations found</p>
      ) : (
        <div>
            {/* <p>Reservation for Number: {results[0].mobile_number}</p><br /> */}
          {" "}
          {results.map((res, index) => {
            return (
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
                    Status:{" "}
                    {!res.reservation_status ? (
                      <>
                        <p
                          data-reservation-id-status={
                            res.reservation_id
                          }
                        >
                          Booked
                        </p>{" "}
                        <br />
                        <a
                          href={`/reservations/${res.reservation_id}/seat`}
                        >
                          <button type="button" class="btn btn-warning">
                            Seat
                          </button>
                        </a>{" "}
                      </>
                    ) : (
                      res.status
                    )}
                    <a href={`/reservations/${res.reservation_id}/edit`}>
                      <button type="button" class="btn btn-light">
                        Edit
                      </button>
                    </a>
                    <CancelRes reservation_id={res.reservation_id} />
                  </div>
                </div>
              </li>
            );
          })}
        </div>
)}
    </div>
  );
}

export default SearchResults;
