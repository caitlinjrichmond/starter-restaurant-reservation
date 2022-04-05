import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ReservationsList from "../reservations/ReservationsList";
import { getResByNum } from "../utils/api";

//Allows a user to search for a reservation using a phone number//

function SearchByNumber() {
  const [reservationsError, setReservationsError] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [mobileNum, setMobileNum] = useState("");
  const [submitStatus, setSubmitStatus] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    setMobileNum(event.target.value);
    setSubmitStatus(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitStatus(true);
    loadResults();
  };

  //loads the reservation results that match the search input and then displays the results//

  useEffect(loadResults, [submitStatus]);

  function loadResults() {
    const abortController = new AbortController();

    getResByNum(mobileNum, abortController.signal)
      .then((reservations) => {
        setReservations(reservations);
      })
      .catch(setReservationsError);

    return () => abortController.abort();
  }

  return (
    <div>
      <h3 style={{ color: "#37371F" }}>Search for Reservation</h3>
      <br />
      <SearchBar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        mobileNum={mobileNum}
      />
      <br />
      {submitStatus ? <ReservationsList reservations={reservations} /> : null}
    </div>
  );
}

export default SearchByNumber;
