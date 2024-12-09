// citation for this routes
// 11/11/2024
// Based on https://www.geeksforgeeks.org/axios-in-react-a-guide-for-beginners/
//          https://github.com/osu-cs340-ecampus/react-starter-app
//          https://getbootstrap.com/
// Explanation of Originality:  Based on the sources and modified to develop a complete 
// frontend interface for a storage food household management application. 
// Axios was used for integrating with the backend API to handle CRUD operations, 
// and Bootstrap was applied to style components for a modern, responsive design. 
// The application was customized to fit the specific requirements of the project, 
// including dynamic data rendering, filtering, and search functionality.

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Categories from "./pages/CategoriesPage";
import Recipes from "./pages/RecipesPage";
import Storages from "./pages/StoragesPage";
import Units from "./pages/UnitsPage";
import Ingredients from "./pages/IngredientsPage";
import IngredientLists from "./pages/IngredientListsPage";

import AddRecipe from "./components/AddRecipe"
import ViewRecipe from "./pages/ViewRecipe";


import UpdateStorage from "./components/UpdateStorage";
import UpdateUnit from "./components/UpdateUnit";
import UpdateCategory from "./components/UpdateCategory";
import UpdateIngredient from "./components/UpdateIngredient";
import UpdateIngredientLists from "./components/UpdateIngredientLists";
import UpdateRecipe from "./components/UpdateRecipe";


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/add" element={<AddRecipe />} />
        <Route path="/recipes/:id" element={<ViewRecipe />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/storages" element={<Storages />} />
        <Route path="/units" element={<Units />} />
        <Route path="/ingredientLists" element={<IngredientLists />} />
        <Route path="/ingredientLists/update/:id" element={<UpdateIngredientLists />} />

        <Route path="/storages/update/:id" element={<UpdateStorage />} />
        <Route path="/units/update/:id" element={<UpdateUnit />} />
        <Route path="/categories/update/:id" element={<UpdateCategory />} />
        <Route path="/ingredients/update/:id" element={<UpdateIngredient />} />
        <Route path="/recipes/update/:id" element={<UpdateRecipe />} />        

        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
