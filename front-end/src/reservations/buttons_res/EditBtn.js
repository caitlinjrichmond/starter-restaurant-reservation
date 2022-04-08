import React from "react"

function EditBtn({reservation}) {
    return (
        <a href={`/reservations/${reservation.reservation_id}/edit`}>
        <button type="button" className="btn btn-edit">
          Edit{" "}
        </button>
      </a>
    )
}

export default EditBtn;
