import React from "react";
import {useHistory} from "react-router-dom"

function NewTableForm() {
    const history = useHistory();
  return (
    <div class="d-flex">
      <form class="ml-3">
        <div class="form-group row">
          <label htmlFor="table_name" class="mr-auto col-form-label">
            Table Name
          </label>
          <div class="col-sm-6">
            <input
              id="table_name"
              type="text"
              class="form-control"
              name="table_name"
            ></input>
          </div>
        </div>
        <div class="form-group row">
          <label htmlFor="capacity" class="mr-auto col-form-label">
            Capacity
          </label>
          <div class="col-sm-3">
            <input
              id="capacity"
              type="number"
              class="form-control"
              name="capacity"
            ></input>
          </div>
        </div>
        <div class="ml-5">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.go("/")}
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

export default NewTableForm;
