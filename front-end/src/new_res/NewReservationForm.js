import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useState } from "react";
import {
  createReservation,
  getResByDate,
  listReservations,
} from "../utils/api";
import { formatAsDate } from "../utils/date-time";

function NewReservationForm() {
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

  const handleChange = (event) => {
    event.preventDefault();

    if (event.target.name === "people") {
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
    createReservation(data)
      .then(() => {
        setData(initialFormState);
        history.push("/");
      })
      .catch((error) => {
        setErrorMessage(error)
        return error;
      });
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   createReservation(data).then(() => {
  //     setData(initialFormState);
  //     history.push("/");
  //   }).then(() => {
  //     getResByDate(data)
  //     console.log(data)
  //   })
  // };

  return (
    <div class="d-flex">
      <form class="ml-5 pl-3 needs-validation" onSubmit={handleSubmit}>
        <div class="form-group row">
          <label htmlFor="first_name" class="mr-auto col-form-label">
            First Name
          </label>
          <div class="col-sm-8">
            <input
              id="fist_name"
              type="text"
              class="form-control"
              name="first_name"
              onChange={handleChange}
              value={data.first_name}
              required
            ></input>
          </div>
        </div>
        <div class="form-group row">
          <label htmlFor="last_name" class="mr-auto col-form-label">
            Last Name
          </label>
          <div class="col-sm-8">
            <input
              id="last_name"
              type="text"
              class="form-control"
              name="last_name"
              onChange={handleChange}
              value={data.last_name}
              required
            ></input>
          </div>
        </div>
        <div class="form-group row">
          <label htmlFor="mobile_number" class="mr-auto col-form-label">
            Phone
          </label>
          <div class="col-sm-8">
            <input
              id="mobile_number"
              type="text"
              class="form-control"
              name="mobile_number"
              // pattern="\d{3}[\-]\d{4}"
              onChange={handleChange}
              value={data.mobile_number}
              required
            ></input>
          </div>
        </div>
        <div class="form-group row">
          <label htmlFor="reservation_date" class="mr-auto col-form-label">
            Date
          </label>
          <div class="col-sm-8">
            <input
              id="reservation_date"
              type="date"
              class="form-control"
              name="reservation_date"
              onChange={handleChange}
              value={data.reservation_date}
              required
            ></input>
          </div>
        </div>
        <div class="form-group row">
          <label htmlFor="reservation_time" class="mr-auto col-form-label">
            Time
          </label>
          <div class="col-sm-8">
            <input
              id="reservation_time"
              type="time"
              class="form-control"
              name="reservation_time"
              onChange={handleChange}
              value={data.reservation_time}
              required
            ></input>
          </div>
        </div>
        <div class="form-group row">
          <label htmlFor="people" class="mr-auto col-form-label">
            People
          </label>
          <div class="col-sm-3">
            <input
              id="people"
              type="text"
              class="form-control"
              name="people"
              onChange={handleChange}
              value={data.people}
              required
            ></input>
          </div>
        </div>
        <div class="ml-5">
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
  );
}

export default NewReservationForm;

{
  /* <div class="d-flex">
<form class="ml-5 pl-3 needs-validation" novalidate onSubmit={handleSubmit}>
  <div class="form-group row">
    <label htmlFor="first_name" class="mr-auto col-form-label">
      First Name
    </label>
    <div class="col-sm-8">
      <input
        id="fist_name"
        type="text"
        class="form-control"
        name="first_name"
        onChange={handleChange}
        value={data.first_name}
        required
      ></input>
    </div>
  </div>
  <div class="form-group row">
    <label htmlFor="last_name" class="mr-auto col-form-label">
      Last Name
    </label>
    <div class="col-sm-8">
      <input
        id="last_name"
        type="text"
        class="form-control"
        name="last_name"
        onChange={handleChange}
        value={data.last_name}
        required
      ></input>
    </div>
  </div>
  <div class="form-group row">
    <label htmlFor="mobile_number" class="mr-auto col-form-label">
      Phone
    </label>
    <div class="col-sm-8">
      <input
        id="mobile_number"
        type="text"
        class="form-control"
        name="mobile_number"
        // pattern="\d{3}[\-]\d{4}"
        onChange={handleChange}
        value={data.mobile_number}
        required
      ></input>
    </div>
  </div>
  <div class="form-group row">
    <label htmlFor="reservation_date" class="mr-auto col-form-label">
      Date
    </label>
    <div class="col-sm-8">
      <input
        id="reservation_date"
        type="date"
        class="form-control"
        name="reservation_date"
        onChange={handleChange}
        value={data.reservation_date}
        required
      ></input>
    </div>
  </div>
  <div class="form-group row">
    <label htmlFor="reservation_time" class="mr-auto col-form-label">
      Time
    </label>
    <div class="col-sm-8">
      <input
        id="reservation_time"
        type="time"
        class="form-control"
        name="reservation_time"
        onChange={handleChange}
        value={data.reservation_time}
        required
      ></input>
    </div>
  </div>
  <div class="form-group row">
    <label htmlFor="people" class="mr-auto col-form-label">
      People
    </label>
    <div class="col-sm-3">
      <input
        id="people"
        type="text"
        class="form-control"
        name="people"
        onChange={handleChange}
        value={data.people}
        required
      ></input>
    </div>
  </div>
  <div class="ml-5">
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
</div> */
}
