import React, { useState } from "react";
import axios from "axios";
import url from "../data/setting";
import FetchExistingData from "./FetchExistingData";

const NewUnit = (props) => {
  const [newUnit, setNewUnit] = useState({
    unitName: "",
  });
  const [error, setError] = useState("");
  const [existingUnits, setExistingUnits] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;

    setNewUnit((prevUnit) => {
      return {
        ...prevUnit,
        [name]: value,
      };
    });
  }

  function submitUnit(event) {
    event.preventDefault();
    if (existingUnits.includes(newUnit.unitName)) {
      setError("This unit name already exists.");
      setNewUnit({ unitName: "" });
      return; 
    }    
    setError("");

    axios
      .post(`${url}/units`, newUnit)
      .then((response) => {
        console.log("Unit added:", response.data);
        props.onAdd(response.data); 

        setExistingUnits((prevUnits) => [
          ...prevUnits,
          response.data.unitName,
        ]);

        setNewUnit({ unitName: "" }); //clear input field after adding

      })
      .catch((error) => {
        console.error("There was an error adding the unit!", error);
      });
  }
  return (
    <div>
      <FetchExistingData
        url={url}
        tableName="units"
        itemName="unitName"
        setExistingData={setExistingUnits}
      />
      <form onSubmit={submitUnit}>
        <input
          name="unitName"
          onChange={handleChange}
          value={newUnit.unitName}
          placeholder="Add a new unit name"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button>Add</button>
      </form>
    </div>
  );
};

export default NewUnit;


