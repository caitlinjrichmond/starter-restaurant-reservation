import React from "react";

function CancelBtn({handleCancel, reservation}) {
    return (
        <>
        <button
        type="button"
        className="btn btn-cancel"
        data-reservation-id-cancel={reservation.reservation_id}
        onClick={handleCancel}
      >
        <span style={{ color: "#FFFAF2" }}>Cancel</span>
      </button>
      </>
    )
}

export default CancelBtn;
