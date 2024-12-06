import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import url from "../data/setting";
import { Link } from "react-router-dom";
import Select from "react-select";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCat, setSelectedCat] = useState([]);
  const [recipeNames, setRecipeNames] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    axios
      .get(`${url}/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.error("Error fetching categories", err));
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const catOptions = categories.map((category) => ({
    value: category.catID,
    label: category.catName,
  }));
  catOptions.push({ value: "others", label: "Others" })
  console.log("categories", categories);

  const fetchRecipes = () => {
    axios
      .get(`${url}/recipes`)
      .then((res) => {
        setRecipes(res.data);
        setFilteredRecipes(res.data);
        setRecipeNames(res.data.map((r) => r.recipeName));
      })
      .catch((err) => console.error("Error fetching recipe:", err));
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${url}/recipes/delete/${id}`)
      .then(() => fetchRecipes()) // Refetch data after delete
      .catch((err) => console.error("Error deleting recipe:", err));
  };

  const Filter = (event) => {
    setFilteredRecipes(
      recipes.filter((f) =>
        f.recipeName.toLowerCase().includes(event.target.value)
      )
    );
  };

  const FilterByCat = (selectedOption) => {
    setSelectedCat(selectedOption);
    if (selectedOption) {
      if (selectedOption.label === "Others") {
        // Filter recipes where catName is null
        setFilteredRecipes(recipes.filter((r) => r.catName === null));
      } else {
        // Filter recipes with selected category
        setFilteredRecipes(
          recipes.filter((r) => r.catName === selectedOption.label)
        );
      }
    } else {
      setFilteredRecipes(recipes);
    }
  };

  return (
    <div className="container mt-4">
      <Header header="LIST OF RECIPES" />
      <div className="d-flex justify-content-left">
        <Link
          to={{
            pathname: "/recipes/add",
            state: { recipeNames },
          }}
          className="btn btn-outline-success"
          style={{ width: "300px", marginBottom: "20px" }}
        >
          ADD A NEW RECIPE
        </Link>
      </div>
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <input
            type="text"
            className="form-control"
            onChange={Filter}
            placeholder="search by recipe name"
            style={{ width: "300px"}}
          />
          <Select
            options={catOptions}
            onChange={FilterByCat}
            isClearable
            placeholder="Filter by category"
            value={selectedCat}
          />
        </div>
        <table className="table table-sm table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col" className="text-center" style={{ width: "5%" }}>
                #
              </th>
              <th scope="col" className="text-center" style={{ width: "15%" }}>
                Name
              </th>
              <th scope="col" className="text-center" style={{ width: "15%" }}>
                Category
              </th>
              <th scope="col" className="text-center" style={{ width: "15%" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRecipes.map((item, index) => {
              console.log(item);
              return (
                <tr className="text-center" key={item.recipeID}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.recipeName}</td>
                  <td>{item.catName}</td>
                  <td>
                    {item.recipeID && (
                      <div>
                        <Link
                          to={`/recipes/${item.recipeID}`}
                          className="btn btn-outline-info btn-sm"
                        >
                          VIEW
                        </Link>
                        <button
                          className="btn btn-outline-danger btn-sm mx-2"
                          onClick={() => handleDelete(item.recipeID)}
                        >
                          DELETE
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecipesPage;
