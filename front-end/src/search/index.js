import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import ReservationsList from "../reservations/ReservationsList";
import { getResByNum } from "../utils/api";

function SearchByNumber() {
  const [data, setData] = useState({});
  const [reservationsError, setReservationsError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [reservations, setReservations] = useState([]);
  const [mobileNum, setMobileNum] = useState("");
  const [submitStatus, setSubmitStatus] = useState(false)

  const handleChange = (event) => {
    event.preventDefault();
    setMobileNum(event.target.value)
    setSubmitStatus(false)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   setSubmitStatus(true)
  };

  // function loadResults() {
  //   const abortController = new AbortController()

  //   getResByNum(mobileNum, abortController.signal).then((reservations) => {
  //     setReservations(reservations)
  //   }).catch(setReservationsError)

  // }


  // useEffect(loadResults, [mobileNum]);

  useEffect(() => {
    setReservations([]);
    const abortController = new AbortController();

    async function loadResults() {
      try{
        const response = await getResByNum(mobileNum, abortController.signal);
      setReservations(response)
      } catch(error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadResults();

    return () => {
      console.log("cleanup");
      abortController.abort();
    }
  }, [mobileNum])
  
  console.log(submitStatus, reservations)

  const find = reservations.find((res) => res.mobile_number === mobileNum)

  console.log(find)

console.log(reservations)
// let searchResults= reservations.data.data
  return (
    <div>
      <h3>Search for Reservation</h3>
      <br />
      <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} mobileNum={mobileNum} />
      <br />

      {submitStatus ? <ReservationsList reservations={reservations} /> : null}
 


    </div>
  );
}

export default SearchByNumber;
