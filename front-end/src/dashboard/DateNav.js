import React from "react";

function DateNav({ goPrev, goToday, goNext}) {
  return (
    <div>
      <button type="button" className="btn btn-info" onClick={goPrev}>
        Prev
      </button>{" "}
      <button type="button" className="btn btn-info" onClick={goToday}>
        Today
      </button>{" "}
      <button type="button" className="btn btn-info" onClick={goNext}>
        Next
      </button>{" "}
    </div>
  );
}

export default DateNav;
