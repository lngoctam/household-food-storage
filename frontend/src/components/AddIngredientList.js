import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-dropdown-select";
import url from "../data/setting";

const NewIngredientList = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [units, setUnits] = useState([]);

  const [recipeError, setRecipeError] = useState("");
  const [ingredientError, setIngredientError] = useState("");
  const [unitError, setUnitError] = useState("");
  const [quantityError, setQuantityError] = useState("");

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [quantityNeeded, setQuantityNeeded] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${url}/recipes`);
        setRecipes(
          response.data.map((recipe) => ({
            label: recipe.recipeName,
            value: recipe.recipeID,
          }))
        );
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(`${url}/ingredients`);
        setIngredients(
          response.data.map((ingredient) => ({
            label: ingredient.ingredientName,
            value: ingredient.ingredientID,
          }))
        );
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };
    fetchIngredients();
  }, []);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get(`${url}/units`);
        setUnits(
          response.data.map((unit) => ({
            label: unit.unitName,
            value: unit.unitID,
          }))
        );
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    };
    fetchUnits();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    // Reset error messages
    setRecipeError("");
    setIngredientError("");
    setUnitError("");
    setQuantityError("");

    // Check for empty fields
    if (!selectedRecipe) {
      setRecipeError("Please select a recipe.");
      hasError = true;
    }
    if (!selectedIngredient) {
      setIngredientError("Please select an ingredient.");
      hasError = true;
    }
    if (!quantityNeeded) {
      setQuantityError("Please enter the quantity needed.");
      hasError = true;
    }
    if (!selectedUnit) {
      setUnitError("Please select a unit.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const payload = {
      recipeID: selectedRecipe,
      ingredientID: selectedIngredient,
      quantityNeeded,
      unitID: selectedUnit,
    };

    try {
      const response = await axios.post(`${url}/ingredientLists`, payload);
      console.log("Ingredient List added:", response.data);
    } catch (error) {
      console.error("Error adding ingredient list:", error);
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="row d-flex p-4">
        <div className="form-group col-md-3">
          <label>Recipe</label>
          <Select
            className="form-control"
            options={recipes}
            onChange={(selected) => setSelectedRecipe(selected[0]?.value)} // Select returns an array
            values={selectedRecipe ? [{ value: selectedRecipe }] : []}
            name="recipe"
          />
          {recipeError && <p style={{ color: "red" }}>{recipeError}</p>}
        </div>
        <div className="form-group col-md-3">
          <label>Ingredient</label>
          <Select
            className="form-control"
            options={ingredients}
            onChange={(selected) => setSelectedIngredient(selected[0]?.value)}
            values={selectedIngredient ? [{ value: selectedIngredient }] : []}
            name="ingredient"
          />
          {ingredientError && <p style={{ color: "red" }}>{ingredientError}</p>}
        </div>
        <div className="form-group col-md-2">
          <label>Quanity Needed</label>
          <input
            className="form-control"
            type="number"
            name="quantityNeeded"
            value={quantityNeeded}
            onChange={(e) => setQuantityNeeded(e.target.value)}
          />
          {quantityError && <p style={{ color: "red" }}>{quantityError}</p>}
        </div>
        <div className="form-group col-md-2">
          <label>Unit</label>
          <Select
            className="form-control"
            options={units}
            onChange={(selected) => setSelectedUnit(selected[0]?.value)}
            values={selectedUnit ? [{ value: selectedUnit }] : []}
            name="unit"
          />
          {unitError && <p style={{ color: "red" }}>{unitError}</p>}
        </div>
        <div className="form-group col-md-1">
          <label>&nbsp;</label>
          <button className="form-control btn btn-outline-primary">Add</button>
        </div>
      </div>
    </form>
  );
};

export default NewIngredientList;
