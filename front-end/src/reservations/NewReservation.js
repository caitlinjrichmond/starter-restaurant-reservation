import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { createReservation } from "../utils/api";

import ErrorAlert from "../layout/ErrorAlert";
import ResForm from "./form/ResForm";

function NewReservation() {
  const history = useHistory();
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  function handleSubmit(data) {
    createReservation(data)
      .then(() => {
        setData(initialFormState);
        history.push(`/dashboard?date=${data.reservation_date}`);
        // history.go(0)
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }

  return (
    <>
      <h1 className="ml-5">New Reservation</h1>
      <ResForm handleSubmit={handleSubmit} initialState={initialFormState} />
      {errorMessage ? <ErrorAlert error={errorMessage} /> : null}
    </>
  );
}

export default NewReservation;
