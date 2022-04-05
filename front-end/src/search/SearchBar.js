import React from "react";

//Defines the form used to take in phone number for search//

function SearchBar({ handleChange, handleSubmit, mobileNum }) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="mobile_number">
          <span style={{ color: "#37371F" }}>Phone Number:</span>
          <input
            id="mobile_number"
            type="tel"
            class="form-control"
            name="mobile_number"
            onChange={handleChange}
            value={mobileNum}
            minLength="10"
            required
          />
        </label>{" "}
        <button
          type="submit"
          class="btn"
          style={{ backgroundColor: "#EA9010" }}
        >
          <span style={{ color: "#37371F" }}>Find</span>
        </button>
      </form>
    </>
  );
}

export default SearchBar;
