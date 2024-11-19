import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
      <NavLink className="navbar-brand" to="/">
        Household Food Storage
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/recipes">
              Recipes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/categories">
              Categories
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/ingredients">
              Ingredients
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/storages">
              Storages
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/units">
              Units
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/ingredientLists">
              Ingredients List
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
