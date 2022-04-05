import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getTablesList, seatTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

//Allows user to assign a reservation to a table, occupies table, changes reservation status to seated//

function SeatTable() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [seating, setSeating] = useState("");
  const reservation_id = useParams().reservation_id;
  const history = useHistory();

  //Loads existing tables into dropdown list for selection//

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
  }, [reservation_id]);

  const handleChange = (event) => {
    event.preventDefault();
    setSeating(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    seatTable(seating, reservation_id)
      .then(() => {
        setSeating("");
        history.push("/");
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  return (
    <>
      <h1 style={{ color: "#37371F" }}>Assign Table</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="table_id">
            Select a Table for Reservation #{reservation_id}:
            <br />
            <select value={seating} name="table_id" onChange={handleChange}>
              <option key="0">--</option>

              {tables.map((table) => {
                return (
                  <option key={table.table_id} value={table.table_id}>
                    {table.table_name} - {table.capacity}
                  </option>
                );
              })}
            </select>
          </label>
          <br />
          <button
            type="button"
            className="btn btn-cancel"
            onClick={() => history.goBack()}
          >
            <span style={{ color: "#FFFAF2" }}>Cancel</span>
          </button>{" "}
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: "#C9E3AC" }}
          >
            <span style={{ color: "#37371F" }}>Submit</span>
          </button>
        </div>
      </form>
      <>{errorMessage ? <ErrorAlert error={errorMessage} /> : null}</>
    </>
  );
}

export default SeatTable;
