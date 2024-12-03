import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-dropdown-select";
import url from "../data/setting";

const NewIngredientList = () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientLists, setIngredientLists] = useState([]);
  const [units, setUnits] = useState([]);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [quantityNeeded, setQuantityNeeded] = useState("");

  const [errors, setErrors] = useState({
    recipeError: "",
    ingredientError: "",
    unitError: "",
    quantityError: "",
  });

  const fetchIngredientLists = async () => {
    try {
      const response = await axios.get(`${url}/ingredientLists`);
      setIngredientLists(response.data);
    } catch (error) {
      console.error("Error fetching ingredient lists:", error);
    }
  };

  // Fetch Recipes, Ingredients, and Units in parallel
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipesData, ingredientsData, unitsData, ingredientListsData] =
          await Promise.all([
            axios.get(`${url}/recipes`),
            axios.get(`${url}/ingredients`),
            axios.get(`${url}/units`),
            axios.get(`${url}/ingredientLists`), // Fetch initial ingredient list
          ]);

        setRecipes(
          recipesData.data.map((recipe) => ({
            label: recipe.recipeName,
            value: recipe.recipeID,
          }))
        );
        setIngredients(
          ingredientsData.data.map((ingredient) => ({
            label: ingredient.ingredientName,
            value: ingredient.ingredientID,
          }))
        );
        setUnits(
          unitsData.data.map((unit) => ({
            label: unit.unitName,
            value: unit.unitID,
          }))
        );
        setIngredientLists(ingredientListsData.data); // Set initial ingredient list data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      recipeError: "",
      ingredientError: "",
      unitError: "",
      quantityError: "",
    });

    let hasError = false;

    if (!selectedRecipe) {
      setErrors((prev) => ({
        ...prev,
        recipeError: "Please select a recipe.",
      }));
      hasError = true;
    }
    if (!selectedIngredient) {
      setErrors((prev) => ({
        ...prev,
        ingredientError: "Please select an ingredient.",
      }));
      hasError = true;
    }
    if (!quantityNeeded) {
      setErrors((prev) => ({
        ...prev,
        quantityError: "Please enter the quantity needed.",
      }));
      hasError = true;
    }
    if (!selectedUnit) {
      setErrors((prev) => ({
        ...prev,
        unitError: "Please select a unit.",
      }));
      hasError = true;
    }

    if (hasError) return;

    try {
      // Check if the ingredient already exists for the selected recipe
      const response = await axios.get(`${url}/ingredientLists/existing`, {
        params: {
          recipeID: selectedRecipe,
          ingredientID: selectedIngredient,
        },
      });

      if (response.data.data.length > 0) {
        setErrors((prev) => ({
          ...prev,
          ingredientError:
            "This ingredient already exists for the selected recipe.",
        }));
        return;
      }

      // Send the new ingredient list to the backend
      const payload = {
        recipeID: selectedRecipe,
        ingredientID: selectedIngredient,
        quantityNeeded,
        unitName: selectedUnit.name,
      };

      console.log("Payload:", payload);

      axios
        .post(`${url}/ingredientLists`, payload)
        .then(() => {
          fetchIngredientLists();
          setSelectedRecipe(null);
          setSelectedIngredient(null);
          setSelectedUnit(null);
          setQuantityNeeded("");
          window.location.href =
            "http://classwork.engr.oregonstate.edu:45321/ingredientLists";
          // location.reload();
        })
        .catch((err) => console.error("Error adding category:", err));
    } catch (err) {
      console.error("Error occurred during the POST request:", err);
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
            onChange={(selected) => setSelectedRecipe(selected[0]?.value)}
            values={selectedRecipe ? [{ value: selectedRecipe }] : []}
          />
          {errors.recipeError && (
            <p style={{ color: "red" }}>{errors.recipeError}</p>
          )}
        </div>

        <div className="form-group col-md-3">
          <label>Ingredient</label>
          <Select
            className="form-control"
            options={ingredients}
            onChange={(selected) => setSelectedIngredient(selected[0]?.value)}
            values={selectedIngredient ? [{ value: selectedIngredient }] : []}
          />
          {errors.ingredientError && (
            <p style={{ color: "red" }}>{errors.ingredientError}</p>
          )}
        </div>

        <div className="form-group col-md-2">
          <label>Quantity Needed</label>
          <input
            className="form-control"
            type="number"
            value={quantityNeeded}
            onChange={(e) => setQuantityNeeded(e.target.value)}
          />
          {errors.quantityError && (
            <p style={{ color: "red" }}>{errors.quantityError}</p>
          )}
        </div>

        <div className="form-group col-md-2">
          <label>Unit</label>
          <Select
            className="form-control"
            options={units}
            onChange={(selected) => {
              if (selected.length > 0) {
                setSelectedUnit({
                  id: selected[0].value,
                  name: selected[0].label,
                });
              }
            }}
            values={
              selectedUnit
                ? [{ value: selectedUnit.id, label: selectedUnit.name }]
                : []
            }
          />
          {errors.unitError && (
            <p style={{ color: "red" }}>{errors.unitError}</p>
          )}
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
