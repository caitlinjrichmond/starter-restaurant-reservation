import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//Form used to create a reservation and also edit a reservation//

function ResForm({ handleSubmit, initialState }) {
  const history = useHistory();
  const [formValue, setFormValue] = useState(initialState);

  const handleChange = (event) => {
    event.preventDefault();

    if (event.target.name === "people") {
      setFormValue({
        ...formValue,
        [event.target.name]: +event.target.value,
      });
    } else {
      setFormValue({
        ...formValue,
        [event.target.name]: event.target.value,
      });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(formValue);
  };

  return (
    <>
      <div className="d-flex">
        <form className="ml-5 pl-3 needs-validation" onSubmit={onSubmit}>
          <div className="form-group row">
            <label htmlFor="first_name" className="mr-auto col-form-label">
              First Name
            </label>
            <div className="col-sm-8">
              <input
                id="fist_name"
                type="text"
                className="form-control"
                name="first_name"
                onChange={handleChange}
                value={formValue?.first_name}
                required
              ></input>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="last_name" className="mr-auto col-form-label">
              Last Name
            </label>
            <div className="col-sm-8">
              <input
                id="last_name"
                type="text"
                className="form-control"
                name="last_name"
                onChange={handleChange}
                value={formValue?.last_name}
                required
              ></input>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="mobile_number" className="mr-auto col-form-label">
              Phone
            </label>
            <div class="col-sm-8">
              <input
                id="mobile_number"
                type="tel"
                className="form-control"
                name="mobile_number"
                // pattern="\d{3}[\-]\d{4}"
                onChange={handleChange}
                value={formValue?.mobile_number}
                minLength="10"
                required
              ></input>
              <span style={{ fontSize: "12px" }}>Must be 10 Characters</span>
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="reservation_date"
              className="mr-auto col-form-label"
            >
              Date
            </label>
            <div class="col-sm-8">
              <input
                id="reservation_date"
                type="date"
                className="form-control"
                name="reservation_date"
                onChange={handleChange}
                value={formValue?.reservation_date}
                required
              ></input>
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="reservation_time"
              className="mr-auto col-form-label"
            >
              Time
            </label>
            <div className="col-sm-8">
              <input
                id="reservation_time"
                type="time"
                className="form-control"
                name="reservation_time"
                onChange={handleChange}
                value={formValue?.reservation_time}
                required
              ></input>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="people" className="mr-auto col-form-label">
              People
            </label>
            <div className="col-sm-4">
              <input
                id="people"
                type="number"
                className="form-control"
                name="people"
                min="0"
                onChange={handleChange}
                value={formValue?.people}
                required
              ></input>
            </div>
          </div>
          <div className="ml-5">
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ResForm;
