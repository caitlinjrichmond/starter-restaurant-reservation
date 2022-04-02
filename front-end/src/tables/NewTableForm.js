import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createTable } from "../utils/api";

function NewTableForm() {
  const history = useHistory();
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const initialFormState = {
    table_name: "",
    capacity: 0,
  };

  const handleChange = (event) => {
    event.preventDefault();

    if (event.target.name === "capacity") {
      setData({
        ...data,
        [event.target.name]: +event.target.value,
      });
    } else {
      setData({
        ...data,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTable(data)
      .then(() => {
        setData(initialFormState);
        history.push("/");
      })
      .catch((error) => {
        setErrorMessage(error);
        console.log(error.response.data.error);
        // return alert(`${error.response.data.error}`)
      });
  };
  console.log(data);
  return (
    <>
      <div className="d-flex">
        <form className="ml-3" onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="table_name" className="mr-auto col-form-label">
              Table Name
            </label>
            <div className="col-sm-6">
              <input
                id="table_name"
                type="text"
                className="form-control"
                name="table_name"
                onChange={handleChange}
                value={data.table_name}
                required
              ></input>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="capacity" class="mr-auto col-form-label">
              Capacity
            </label>
            <div className="col-sm-4">
              <input
                id="capacity"
                type="number"
                className="form-control"
                name="capacity"
                onChange={handleChange}
                value={data.capacity}
                min="0"
                required
              ></input>
            </div>
          </div>
          <div className="ml-5">
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
      </div>
      <>{errorMessage ? <ErrorAlert error={errorMessage} /> : null}</>
    </>
  );
}

export default NewTableForm;
