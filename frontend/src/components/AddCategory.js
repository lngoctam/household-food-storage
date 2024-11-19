import React, { useState } from "react";
import axios from "axios";
import url from "../data/setting";
import FetchExistingData from "./FetchExistingData";

const AddCategory = (props) => {
  const [newCat, setNewCategory] = useState({
    catName: "",
  });

  const [error, setError] = useState("");
  const [existingCategories, setExistingCategories] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;
    console.log("Category name being updated:", value);
    setNewCategory((prevCategory) => {
      return {
        ...prevCategory,
        [name]: value,
      };
    });
  }

  function submitCategory(event) {
    event.preventDefault();

    if (existingCategories.includes(newCat.catName)) {
      setError("This storage name already exists.");
      setNewCategory({ catName: "" });
      return;
    }
    setError("");

    axios
      .post(`${url}/categories`, newCat)
      .then((response) => {
        console.log("Category added:", response.data);
        props.onAdd(response.data);

        setExistingCategories((prevCategories) => [
          ...prevCategories,
          response.data.catName,
        ]);

        setNewCategory({ catName: "" }); //clear input field after adding
      })
      .catch((error) => {
        console.error("There was an error adding the category!", error);
      });
  }
  return (
    <div>
      <FetchExistingData
        url={url}
        tableName="categories"
        itemName="catName"
        setExistingData={setExistingCategories}
      />
      <form onSubmit={submitCategory}>
        <input
          name="catName"
          onChange={handleChange}
          value={newCat.catName}
          placeholder="Add a new category name"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button>Add</button>
      </form>
    </div>
  );
};

export default AddCategory;
