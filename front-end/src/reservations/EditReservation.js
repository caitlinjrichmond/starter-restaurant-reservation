import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { changeRes, readRes } from "../utils/api";
import { formatAsDate } from "../utils/date-time";
import ResForm from "./form/ResForm";
import ErrorAlert from "../layout/ErrorAlert";

//Allows a user to edit an existing reservation //

function EditReservation() {
  const reservationId = useParams().reservation_id;
  const [reservation, setReservation] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  //Loads reservation to edit //
  useEffect(() => {
    setReservation([]);
    const abortController = new AbortController();

    async function loadRes() {
      try {
        const response = await readRes(reservationId, abortController.signal);
        console.log("response:", response);
        setReservation(response);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted", reservationId);
        } else {
          throw error;
        }
      }
    }
    loadRes();

    return () => {
      console.log("clean up", reservationId);
      abortController.abort();
    };
  }, [reservationId]);

  function handleSubmit(data) {
    changeRes(data)
      .then(() => {
        history.push(`/dashboard?date=${data.reservation_date}`);
      })
      .catch((error) => {
        setErrorMessage(error);
        console.log(error.response.data.error);
      });
  }

  //Defines the initial state of the form - existing fields //
  const initial = {
    reservation_id: reservation.reservation_id,
    first_name: reservation.first_name,
    last_name: reservation.last_name,
    mobile_number: reservation.mobile_number,
    reservation_date: reservation.reservation_date,
    reservation_time: reservation.reservation_time,
    people: reservation.people,
    status: reservation.status,
  };

  return (
    <div>
      <h1 className="ml-5" style={{ color: "#37371F" }}>
        Edit Reservation
      </h1>
      {reservation.reservation_id ? (
        <ResForm
          handleSubmit={handleSubmit}
          initialState={{
            ...initial,
            reservation_date: formatAsDate(reservation.reservation_date),
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
      <ErrorAlert error={errorMessage} />
    </div>
  );
}

export default EditReservation;
