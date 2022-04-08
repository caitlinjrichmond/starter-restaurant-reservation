import React from "react";

//Defines the drop down form for seating selection//

function DropDownForm({
  tables,
  handleSubmit,
  reservation_id,
  handleChange,
  handleCancel,
  seating,
}) {
  return (
    <>
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
            onClick={handleCancel}
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
    </>
  );
}

export default DropDownForm;
