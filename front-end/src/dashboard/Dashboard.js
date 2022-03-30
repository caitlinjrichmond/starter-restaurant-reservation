import React, { useEffect, useState } from "react";
import {useRouteMatch} from "react-router-dom"
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "./Reservations";
import DateNav from "./DateNav";
import { today, previous, next } from "../utils/date-time";
import ResByDate from "./ResByDate";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [day, setDay] = useState(date)
  const {url} = useRouteMatch()

  console.log({url})


  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  console.log(day)

  function goPrev() {
    date = previous(day)
    setDay(date)
    loadDashboard()

  }

  function goToday() {
    date = today(day)
    setDay(today(day))
    loadDashboard()
  
  }

  function goNext() {
    date = next(day)
    setDay(next(day))
    loadDashboard()

  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {day}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <Reservations reservations={reservations} />
      <DateNav goPrev={goPrev} goToday={goToday} goNext={goNext} />
    </main>
  );
}

export default Dashboard;
