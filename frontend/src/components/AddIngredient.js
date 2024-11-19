import React, { useState } from "react";
import axios from "axios";
import url from "../data/setting";
import FetchExistingData from "./FetchExistingData";

const NewIngredient = (props) => {
  const [newIngredient, setNewIngredient] = useState({
    ingredientName: "",
  });

  const [error, setError] = useState("");
  const [existingIngredients, setExistingIngredients] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;

    setNewIngredient((prevIngredient) => {
      return {
        ...prevIngredient,
        [name]: value,
      };
    });
  }

  function submitIngredient(event) {
    event.preventDefault();

    if (existingIngredients.includes(newIngredient.ingredientName)) {
      setError("This ingredient name already exists.");
      setNewIngredient({ ingredientName: "" });
      return;
    }
    setError("");

    axios
      .post(`${url}/ingredients`, newIngredient)
      .then((response) => {
        console.log("Ingredient added:", response.data);
        props.onAdd(response.data);

        setExistingIngredients((prevIngredients) => [
          ...prevIngredients,
          response.data.catName,
        ]);
        setNewIngredient({ ingredientName: "" }); //clear input field after adding
      })
      .catch((error) => {
        console.error("There was an error adding the ingredient!", error);
      });
  }
  return (
    <div>
      <FetchExistingData
        url={url}
        tableName="ingredients"
        itemName="ingredientName"
        setExistingData={setExistingIngredients}
      />
      <form onSubmit={submitIngredient}>
        <input
          name="ingredientName"
          onChange={handleChange}
          value={newIngredient.ingredientName}
          placeholder="Add a new ingredient name"
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default NewIngredient;
