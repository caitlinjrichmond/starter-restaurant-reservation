import React, { useEffect, useState } from "react";
import { listReservations, getTablesList } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "../reservations";
import { today, previous, next } from "../utils/date-time";
import Tables from "../tables";
import {useHistory} from "react-router-dom"


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [day, setDay] = useState(date);
  const history = useHistory()

  const queryParams = new URLSearchParams(window.location.search)

  useEffect(loadDashboard, [date]);
  // useEffect(loadTables, []);

  function loadDashboard() {
    const abortController = new AbortController();
    // history.go(0)
    setReservationsError(null);
    setTablesError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    return () => abortController.abort();
  }

  // function loadTables() {
  //   const abortController = new AbortController();
  //   setTablesError(null);
  //   getTablesList(abortController.signal).then(setTables).catch(setTablesError);
  //   return () => abortController.abort();
  // }

  useEffect(() => {
    setTables([]);
    const abortController = new AbortController();

    async function loadTables() {
      try{
        const response = await getTablesList(abortController.signal)
        setTables(response);
      } catch(error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadTables();

    return() => {
      console.log("clean up");
      abortController.abort();
    };
  }, [])

  function goPrev() {
    date = previous(day);
    setDay(previous(day));
    loadDashboard();
  }

  function goToday() {
    date = today(day);
    setDay(today(day));
   
    loadDashboard();
  }

  function goNext() {
    date = next(day);
    setDay(next(day));
    loadDashboard();
  }

  console.log("here is the date:", date, "here is the day:", day)
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {day}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <Reservations reservations={reservations} goPrev={goPrev} goToday={goToday} goNext={goNext}  />
      <br /> <br />
      <div>
        <h4>Tables</h4>
        <Tables tables={tables} />
   
      </div>
    </main>
  );
}

export default Dashboard;
