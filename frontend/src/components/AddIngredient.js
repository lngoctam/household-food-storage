import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-dropdown-select";
import url from "../data/setting";

const NewIngredient = ({ existingIngredients, fetchIngredients }) => {
  const [ingredientName, setIngredientName] = useState("");
  const [storages, setStorages] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState(null);

  const [error, setError] = useState("");

  // Fetch Storage data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storageData] = await Promise.all([
          axios.get(`${url}/storages`), // Fetch initial storage list
        ]);

        setStorages(
          storageData.data.map((storage) => ({
            label: storage.storageName,
            value: storage.storageID,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!ingredientName.trim()) {
      setError("The category name cannot be empty");
      return;
    }

    // Check for duplicates
    if (existingIngredients.includes(ingredientName.trim())) {
      setError("This ingredient name already exists.");
      return;
    }

    const value = {
      ingredientName: ingredientName,
      storageID: selectedStorage,
    };
    console.log("selectedStorage", selectedStorage);
    console.log("storageID:", typeof value.storageID);

    // Add new ingredient
    setError("");
    axios
      .post(`${url}/ingredients`, value)
      .then(() => {
        fetchIngredients(); // Refetch ingredients from the backend
        setIngredientName(""); // Clear input
        setSelectedStorage(null);
      })
      .catch((err) => console.error("Error adding ingredient:", err));
  };
  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     value={ingredientName}
    //     onChange={(e) => setIngredientName(e.target.value)}
    //     placeholder="Add a new ingredient"
    //   />
    //   {error && <p style={{ color: "red" }}>{error}</p>}
    //   <button type="submit">Add</button>
    // </form>

    <form className="container" onSubmit={handleSubmit}>
      <div className="row d-flex p-4">
        <div className="form-group col-md-3">
          <label>Ingredient</label>
          <input
            className="form-control"
            type="text"
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
            placeholder="Add a new ingredient"
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

        <div className="form-group col-md-3">
          <label>Storage</label>
          <Select
            className="form-control"
            options={storages}
            onChange={(selected) => setSelectedStorage(selected[0]?.value)}
            values={selectedStorage ? [{ value: selectedStorage }] : []}
          />
          {/* {error && (
            <p style={{ color: "red" }}>{error}</p>
          )} */}
        </div>

        <div className="form-group col-md-1">
          <label>&nbsp;</label>
          <button className="form-control btn btn-outline-primary">Add</button>
        </div>
      </div>
    </form>
  );
};

export default NewIngredient;
