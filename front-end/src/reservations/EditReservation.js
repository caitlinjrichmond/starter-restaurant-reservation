import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { changeRes, readRes } from "../utils/api";
import { formatAsDate } from "../utils/date-time";
import ResForm from "./form/ResForm";
import ErrorAlert from "../layout/ErrorAlert";

function EditReservation() {
  const reservationId = useParams().reservation_id;
  const [reservation, setReservation] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    setReservation([]);
    const abortController = new AbortController();

    async function loadRes() {
      try {
        const response = await readRes(reservationId, abortController.signal);
        // const resFromAPI = await response.json()
        console.log("response:", response)
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

  console.log("we are getting a response, here is the reservation being read:", reservation)



  function handleSubmit(data) {
    changeRes(data)
      .then(() => {
        // history.push("/");
        history.push(`/dashboard?date=${data.reservation_date}`)
      })
      .catch((error) => {
        setErrorMessage(error);
        console.log(error.response.data.error);
      });
  }


  const initial = {
    first_name: reservation.first_name,
    last_name: reservation.last_name,
    mobile_number: reservation.mobile_number,
    reservation_date: reservation.reservation_date,
    reservation_time: reservation.reservation_time,
    people: reservation.people,
  };


  return (
    <div>
      <p>Edit Reservation</p>
      {reservation.reservation_id ? (
        <ResForm
          handleSubmit={handleSubmit}
          initialState={{
            reservation_id: reservation.reservation_id,
            first_name: reservation.first_name,
            last_name: reservation.last_name,
            mobile_number: reservation.mobile_number,
            reservation_date: formatAsDate(reservation.reservation_date),
            reservation_time: reservation.reservation_time,
            people: reservation.people,
            status: reservation.status,
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
      {errorMessage ? <ErrorAlert error={errorMessage} /> : null}
    </div>
  );
}

export default EditReservation;
