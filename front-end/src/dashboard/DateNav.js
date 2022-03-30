import React from "react";
import { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { today, previous, next } from "../utils/date-time";

function DateNav({ goPrev, goToday, goNext}) {
  //   const todayRes = today(dashDate)
  //   const nextRes = next(dashDate)
  //   const prevRes = previous(dashDate)
  //   const [date, setDate] = useState(dashDate)

  return (
    <div>
      <button type="button" class="btn btn-info" onClick={goPrev}>
        Prev
      </button>{" "}
      <button type="button" class="btn btn-info" onClick={goToday}>
        Today
      </button>{" "}
      <button type="button" class="btn btn-info" onClick={goNext}>
        Next
      </button>{" "}
    </div>
  );
}

export default DateNav;
