import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import url from "../data/setting";
import Select from "react-dropdown-select";

const UpdateRecipe = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState({
    recipeName: "",
    calories: "",
    servings: "",
    instruction: "",
    prepTime: "",
    cookTime: "",
    totalTime: "",
    catID: "",
  });

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchRecipeDetails = async () => {
    try {
        console.log("id", id)
      const response = await axios.get(`${url}/recipes/${id}`);
      const recipe = response.data[0];
      setRecipes({
        recipeName: recipe.recipeName,
        calories: recipe.calories,
        servings: recipe.servings,
        instruction: recipe.instruction,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        totalTime: recipe.totalTime,
        catID: recipe.catID,
      });
      setSelectedCategory({
        value: recipe.catID,
        label: recipe.catName, 
      });
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/categories`);
      setCategories(
        response.data.map((category) => ({
          value: category.catID,
          label: category.catName,
        }))
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchRecipeDetails();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipes((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (selected) => {
    setSelectedCategory(selected[0]);
    setRecipes((prevRecipe) => ({
      ...prevRecipe,
      catID: selected[0].value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRecipe = {
        ...recipes,
        catID: selectedCategory?.value || recipes.catID,
      };
      await axios.patch(`${url}/recipes/update/${id}`, updatedRecipe, {
        headers: { "Content-Type": "application/json" },
      });
      navigate("/recipes");
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="card" style={{ width: "50rem" }}>
          <div className="card-body">
            <h5 className="card-title">Update Recipe</h5>
            <Link
              type="button"
              className="btn-close"
              aria-label="Close"
              style={{ position: "absolute", top: "10px", right: "10px" }}
              to="/recipes"
            ></Link>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Recipe Name</label>
                <input
                  type="text"
                  name="recipeName"
                  className="form-control"
                  value={recipes.recipeName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>Calories</label>
                <input
                  type="number"
                  name="calories"
                  className="form-control"
                  value={recipes.calories}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>Servings</label>
                <input
                  type="number"
                  name="servings"
                  className="form-control"
                  value={recipes.servings}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>Instruction</label>
                <textarea
                  name="instruction"
                  className="form-control"
                  rows="3"
                  value={recipes.instruction}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label>Preparation Time</label>
                <input
                  type="text"
                  name="prepTime"
                  className="form-control"
                  value={recipes.prepTime}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>Cook Time</label>
                <input
                  type="text"
                  name="cookTime"
                  className="form-control"
                  value={recipes.cookTime}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>Total Time</label>
                <input
                  type="text"
                  name="totalTime"
                  className="form-control"
                  value={recipes.totalTime}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>Category</label>
                <Select
                  options={categories}
                  onChange={handleCategoryChange}
                  values={selectedCategory ? [selectedCategory] : []}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-success">
                Update Recipe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRecipe;
