import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getTablesList, seatTable } from "../utils/api";
import DropDownForm from "./DropDownForm";

//Allows user to assign a reservation to a table, occupies table, changes reservation status to seated//

function SeatTable() {
  const [tables, setTables] = useState([]);
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

  const handleCancel = (event) => {
    history.goBack();
  };

  return (
    <>
      <h1 style={{ color: "#37371F" }}>Assign Table</h1>
      <DropDownForm
        tables={tables}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        reservation_id={reservation_id}
        seating={seating}
      />
    </>
  );
}

export default SeatTable;
