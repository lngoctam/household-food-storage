import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import url from "../data/setting";
import { Link } from "react-router-dom";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);  

  const [recipeNames, setRecipeNames] = useState([]);
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
        >
          ADD A NEW RECIPE
        </Link>
      </div>
      <div className="table-responsive">
        <input
          type="text"
          className="form-control"
          onChange={Filter}
          placeholder="search by recipe name"
          style={{ width: "300px", marginBottom: "20px" }}
        />
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
                  <td>{item.catID}</td>
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
