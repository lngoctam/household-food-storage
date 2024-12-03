import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import url from "../data/setting";
import Select from "react-dropdown-select";

const UpdateIngredientLists = () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [units, setUnits] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // const [recipeError, setRecipeError] = useState("");
  // const [ingredientError, setIngredientError] = useState("");
  // const [unitError, setUnitError] = useState("");
  // const [quantityError, setQuantityError] = useState("");

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const [selectedIngredient, setSelectedIngredient] = useState({
    id: null,
    name: "",
  });

  const [ingredientLists, setIngredientLists] = useState({
    ingredientName: "",
    quantityNeeded: "",
    unitName: "",
    newUnitName: "",
  });

  const handleIngredientChange = (selected) => {
    const ingredient = selected[0];
    setSelectedIngredient({
      id: ingredient.value,
      name: ingredient.label,
    });
  };

  const handleUnitChange = (selected) => {
    const selectedOption = selected[0];
    setSelectedUnit({
      id: selectedOption.value,
      name: selectedOption.label,
    });
    // setIngredientLists((prevIngredientLists) => ({
    //   ...prevIngredientLists,
    //   newUnitName: selectedOption.label, // Update newUnitName in ingredientLists
    // }));
  };

  // Fetch recipes and ingredients
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

  useEffect(() => {
    fetchUnits();
  }, []);

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

  useEffect(() => {
    fetchIngredients();
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    // Fetch the current ingredient list
    axios
      .get(`${url}/ingredientLists/${id}`)
      .then((res) => {
        console.log(res);
        const ingredientData = res.data[0];
        setIngredientLists({
          ingredientName: ingredientData.ingredientName,
          quantityNeeded: ingredientData.quantityNeeded,
          unitName: ingredientData.unitName,
          newUnitName: "",
        });
        setSelectedIngredient({
          id: ingredientData.ingredientID,
          name: ingredientData.ingredientName,
        });
        setSelectedUnit({
          id: ingredientData.unitID,
          name: ingredientData.unitName,
        });
        setSelectedRecipe(ingredientData.recipeID); // Set the selected recipe
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (event) => {
    const { name, value } = event.target;
    setIngredientLists((prevIngredientLists) => ({
      ...prevIngredientLists,
      [name]: value,
    }));
  };

  function submitUpdate(event) {
    event.preventDefault();

    // if (!selectedIngredient.id) {
    //   setIngredientError("Please select an ingredient.");
    //   return;
    // }
    // if (!selectedUnit?.id) {
    //   setUnitError("Please select a unit.");
    //   return;
    // }
    // if (!quantityNeeded) {
    //   setQuantityError("Please enter a valid quantity.");
    //   return;
    // }

    const updatedIngredientList = {
      ingredientID: selectedIngredient.id,
      ingredientName: selectedIngredient?.name || ingredientLists.unitName,
      quantityNeeded: ingredientLists.quantityNeeded,
      // unitName: ingredientLists.newUnitName || ingredientLists.unitName,
      unitName: selectedUnit?.name || ingredientLists.unitName,
    };

    console.log("updatedIngredientList", updatedIngredientList);

    axios
      .patch(`${url}/ingredientLists/update/${id}`, updatedIngredientList, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("Ingredient List updated:", res);
        navigate("/ingredientLists");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div className="row justify-content-center">
        <div className="card" style={{ width: "50rem" }}>
          <div className="card-body">
            <h5 className="card-title">Update Ingredient List</h5>
            <Link
              type="button"
              className="btn-close"
              aria-label="Close"
              style={{ position: "absolute", top: "10px", right: "10px" }}
              to="/ingredientLists"
            ></Link>
            <form onSubmit={submitUpdate}>
              <div className="container">
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label>Recipe</label>
                    <input
                      className="form-control"
                      type="text"
                      value={
                        recipes.find(
                          (recipe) => recipe.value === selectedRecipe
                        )?.label || "Loading..."
                      }
                      readOnly
                      disabled
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label>Ingredient</label>
                    <Select
                      className="form-control"
                      options={ingredients}
                      onChange={handleIngredientChange}
                      values={
                        selectedIngredient.id
                          ? [
                              {
                                value: selectedIngredient.id,
                                label: selectedIngredient.name,
                              },
                            ]
                          : []
                      }
                      name="ingredient"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label>Quantity Needed</label>
                    <input
                      className="form-control"
                      type="number"
                      name="quantityNeeded"
                      value={
                        ingredientLists.newQuantityNeeded ||
                        ingredientLists.quantityNeeded
                      }
                      onChange={handleUpdate}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label>Unit</label>
                    <Select
                      className="form-control"
                      options={units}
                      onChange={handleUnitChange}
                      values={
                        selectedUnit
                          ? [
                              {
                                value: selectedUnit.id,
                                label: selectedUnit.name,
                              },
                            ]
                          : []
                      }
                      name="unit"
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-success">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateIngredientLists;
