import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Recipe from "../components/Recipe";
import URL from "../data/setting";

const ViewRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/recipes/${id}`)
      .then((res) => {
        console.log(res.data);
        setRecipe(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);
  if (!recipe || !recipe.recipeID) {
    return (
      <div className="container text-center">
        <h4>Recipe not found.</h4>
        <Link to="/recipes" className="btn btn-outline-primary">
          Back to Recipes
        </Link>
      </div>
    );
  }
  return (   
    <Recipe
          key={recipe.recipeID}
          recipe={recipe.recipeID}
          recipeName={recipe.recipeName}
          calories={recipe.calories}
          servings={recipe.servings}
          instruction={recipe.instruction}
          prepTime={recipe.prepTime}
          cookTime={recipe.cookTime}
          totalTime={recipe.totalTime}
          catID={recipe.catID}
        />
  );
};

export default ViewRecipe;
