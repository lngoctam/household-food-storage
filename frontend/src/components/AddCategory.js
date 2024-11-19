import React, { useState } from "react";
import axios from "axios";
import url from "../data/setting";

const NewCategory = ({ existingCategories, fetchCategories }) => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check for duplicates
    if (existingCategories.includes(categoryName)) {
      setError("This category name already exists.");
      return;
    }

    // Add new category
    setError("");
    axios
      .post(`${url}/categories`, { catName: categoryName })
      .then(() => {
        fetchCategories();
        setCategoryName("");
      })
      .catch((err) => console.error("Error adding category:", err));

    console.log("Category data being sent:", { categoryName });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Add a new category"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Add</button>
    </form>
  );
};

export default NewCategory;
