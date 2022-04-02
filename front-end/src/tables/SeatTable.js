import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getTablesList, seatTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SeatTable() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [seating, setSeating] = useState("")
  const reservation_id = useParams().reservation_id;
  const history = useHistory();
  // const [data, setData] = useState({})
  // const initialFormState = {
  //     reservation_id: reservation_id,
  //     table_id: "",
  // }

  // useEffect(loadTables, []);

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
        const response = await getTablesList(abortController.signal);
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

    return () => {
      console.log("clean up");
      abortController.abort();
    };
  }, [reservation_id])

  const handleChange = (event) => {
    event.preventDefault()
    setSeating(event.target.value)
  }

  console.log(seating, reservation_id)

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   seatTable(data)
  //     .then(() => {
  //       setData(initialFormState);
  //       history.push("/");
  //     })
  //     .catch((error) => {
  //       setErrorMessage(error)
  //       console.log(error.response.data.error)
  //       // return alert(`${error.response.data.error}`)
  //     });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    seatTable(seating, reservation_id)
    .then(() => {
      setSeating("");
      history.push("/")
    })
    .catch((error) => {
      setErrorMessage(error)
    })

  }


  return (
    <>
      <h1>Seat A Reservation</h1>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="table_id">
          Select a Table for Reservation #{reservation_id}:
          <br />
          <select value={seating} name="table_id" onChange={handleChange}>
             <option value="0">Table Options</option>
              {tables.map((table) => {
                  return (<option key={table.table_id} value={table.table_id}>{table.table_name} - {table.capacity} </option>)
              })}
          </select>
        </label>
        <br />
        <button
              type="button"
              className="btn btn-secondary"
              onClick={() => history.goBack()}
            >
              Cancel
            </button>{" "}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
      </div>
      </form>
      <>{errorMessage ? <ErrorAlert error={errorMessage} /> : null}</>
    </>
  );
}

export default SeatTable;
