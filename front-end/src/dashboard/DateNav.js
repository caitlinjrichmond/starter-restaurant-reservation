import React from "react";

// Function defines the buttons used to navigate the dates and display matching reservations //

function DateNav({ goPrev, goToday, goNext }) {
  return (
    <div>
      <button
        type="button"
        className="btn btn-nav"
        style={{ color: "#37371F" }}
        onClick={goPrev}
      >
        Prev
      </button>{" "}
      <button
        type="button"
        className="btn btn-nav"
        style={{ color: "#37371F" }}
        onClick={goToday}
      >
        Today
      </button>{" "}
      <button
        type="button"
        className="btn btn-nav"
        style={{ color: "#37371F" }}
        onClick={goNext}
      >
        Next
      </button>{" "}
    </div>
  );
}

export default DateNav;
