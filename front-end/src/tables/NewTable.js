import React from "react";
import NewTableForm from "./NewTableForm";

//Defines component that holds the form and functions to allow user to create a new table//

function NewTable() {
  return (
    <div>
      <h1 className="ml-5" style={{ color: "#37371F" }}>
        New Table
      </h1>
      <NewTableForm />
    </div>
  );
}

export default NewTable;
