import React, { useState } from "react";
import axios from "axios";
import url from "../data/setting";

const NewIngredient = ({ existingIngredients, fetchIngredients }) => {
  const [ingredientName, setIngredientName] = useState("");
  const [error, setError] = useState("");

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

    // Add new ingredient
    setError("");
    axios
      .post(`${url}/ingredients`, { ingredientName })
      .then(() => {
        fetchIngredients(); // Refetch ingredients from the backend
        setIngredientName(""); // Clear input
      })
      .catch((err) => console.error("Error adding ingredient:", err));
  };
  return (    
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={ingredientName}
        onChange={(e) => setIngredientName(e.target.value)}
        placeholder="Add a new ingredient"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Add</button>
    </form>
  );
};

export default NewIngredient;
