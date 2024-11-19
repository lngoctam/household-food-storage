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

        <Route path="/storages/update/:id" element={<UpdateStorage />} />
        <Route path="/units/update/:id" element={<UpdateUnit />} />
        <Route path="/categories/update/:id" element={<UpdateCategory />} />
        <Route path="/ingredients/update/:id" element={<Ingredients />} />
        

        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
