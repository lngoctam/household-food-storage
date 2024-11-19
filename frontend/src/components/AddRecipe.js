import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-dropdown-select";
import url from "../data/setting";

const AddRecipe = () => {
  const navigate = useNavigate();
  const initialValues = {
    recipeName: "Sample Recipe",
    calories: "100",
    servings: "3",
    instruction: "Sample instruction",
    prepTime: "5 mins",
    cookTime: "10 mins",
    totalTime: "15 mins",
    catID: 1,
  };
  const [recipes, setRecipes] = useState(initialValues);

  const [selectedCategory, setSelectedCategory] = useState([]);
  function handleCatSelect(selected) {
    setSelectedCategory(selected);
  }

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${url}/categories`);
        setCategories(
          response.data.map((cat) => ({
            label: cat.catName,
            value: cat.catID,
          }))
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setRecipes((prevRecipes) => {
      return {
        ...prevRecipes,
        [name]: value,
      };
    });
  }

  function submitRecipe(event) {
    event.preventDefault();
    console.log("Submitting recipe:", recipes);

    axios
      .post(`${url}/recipes`, recipes)
      .then((response) => {
        console.log("Recipe added:", response.data);
        navigate("/recipes");
      })
      .catch((error) => {
        console.error("There was an error adding new recipe!", error);
      });
  }

  return (
    <div className="row justify-content-center">
      <div class="card" style={{ width: "30rem" }}>
        <div className="card-body">
          <h5 class="card-title">Create a new recipe</h5>
          <Link
            type="button"
            class="btn-close"
            aria-label="Close"
            style={{ position: "absolute", top: "10px", right: "10px" }}
            to="/recipes"
          ></Link>
          <form className="mb-3" onSubmit={submitRecipe}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="recipeName">Recipe Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="recipeName"
                  onChange={handleChange}
                  value={recipes.recipeName}
                  placeholder="Recipe name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="Calories">Calories</label>
                <input
                  type="calories"
                  className="form-control"
                  name="calories"
                  onChange={handleChange}
                  value={recipes.calories}
                  placeholder="Calories"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="servings">Servings</label>
              <input
                type="text"
                className="form-control"
                name="servings"
                onChange={handleChange}
                value={recipes.servings}
                placeholder="Servings"
              />
            </div>
            <div className="form-group">
              <label htmlFor="instruction">Instruction</label>
              <textarea
                className="form-control"
                name="instruction"
                onChange={handleChange}
                value={recipes.instruction}
                placeholder="instruction"
                rows="3"
              />
            </div>
            <div className="form-group">
              <label htmlFor="prepTime">Preperation Time</label>
              <input
                type="text"
                className="form-control"
                name="prepTime"
                onChange={handleChange}
                value={recipes.prepTime}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cookTime">Cooking Time</label>
              <input
                type="text"
                className="form-control"
                name="cookTime"
                onChange={handleChange}
                value={recipes.cookTime}
              />
            </div>
            <div className="form-group">
              <label htmlFor="totalTime">Total Time</label>
              <input
                type="text"
                className="form-control"
                name="totalTime"
                onChange={handleChange}
                value={recipes.totalTime}
              />
            </div>
            <div className="form-group">
              <label htmlFor="categories">Category</label>
              <Select
                className="form-control"
                options={categories}
                onChange={handleCatSelect}
                values={selectedCategory}
                name="category"
              />
            </div>
            <button type="submit" className="btn btn-outline-primary mt-3">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
