import React, { useState } from "react";
import axios from "axios";
import url from "../data/setting";

const NewUnit = ({ existingUnits, fetchUnits }) => {
  const [unitName, setUnitName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check for duplicates
    if (existingUnits.includes(unitName)) {
      setError("This unit name already exists.");
      return;
    }

    // Add new unit
    setError("");
    axios
      .post(`${url}/units`, { unitName })
      .then(() => {
        fetchUnits(); 
        setUnitName(""); 
      })
      .catch((err) => console.error("Error adding unit:", err));
  };
  return (    
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={unitName}
        onChange={(e) => setUnitName(e.target.value)}
        placeholder="Add a new unit"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Add</button>
    </form>
  );
};

export default NewUnit;
