import React, { useEffect, useState } from "react";
import { listReservations, getTablesList } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "../reservations";
import { today, previous, next } from "../utils/date-time";
import Tables from "../tables";
import "./Dashboard.css";
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

  //Load reservations for the dashboard, display according to date (default to current date) //

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    return () => abortController.abort();
  }

  //Loads all tables //

  useEffect(() => {
    setTables([]);
    const abortController = new AbortController();

    async function loadTables() {
      try {
        const response = await getTablesList(abortController.signal);
        setTables(response);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadTables();

    return () => {
      console.log("clean up");
      abortController.abort();
    };
  }, []);

  // goPrev, goToday, and goNext allow users to click through the days and see reservations //
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

  //Displays the date with just day and month //
  const dateDisplay = day.substr(5, 5);

  return (
    <main>
      <h1 style={{ color: "#37371F" }}>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0" style={{ color: "#37371F" }}>
          Reservations for {dateDisplay}
        </h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <Reservations
        reservations={reservations}
        goPrev={goPrev}
        goToday={goToday}
        goNext={goNext}
      />
      <br /> <br />
      <div>
        <h4>Tables</h4>
        <Tables tables={tables} />
      </div>
    </main>
  );
}

export default Dashboard;
