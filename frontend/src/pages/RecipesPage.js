import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
// import AddRecipe from "../components/AddRecipe";
import url from "../data/setting";
import { Link } from "react-router-dom";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const handleDelete = (id) => {
    console.log("Delete triggered for ID:", id);
    axios
      .delete(`${url}/recipes/delete/${id}`)
      .then((res) => {
        if (res.status === 200) {
          // Ensure the response indicates success
          console.log("Delete response:", res);
          // Update both `recipes` and `filteredRecipes` state
          setRecipes((prevRecipes) =>
            prevRecipes.filter((recipe) => recipe.recipeID !== id)
          );
          setFilteredRecipes((prevFiltered) =>
            prevFiltered.filter((recipe) => recipe.recipeID !== id)
          );
        } else {
          console.log("Failed to delete recipe:", res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${url}/recipes`)
      .then((res) => {
        setRecipes(res.data);
        setFilteredRecipes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
      <div className="d-flex justify-content-end">
        <Link to="/recipes/add" className="btn btn-outline-success">
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

// import React from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import recipes_data from "../data/recipes_data";
// import Recipe from "../components/Recipe";
// import Header from "../components/Header";

// const RecipesPage = () => {
//   return (
//     <div className="border p-3">
//       <Header header="MY RECIPES" />
//       <div className="d-flex justify-content-end">
//         <Link to="/recipes/add" className="btn btn-success">ADD A NEW RECIPE</Link>
//       </div>
//       <div className="container">
//         <div className="row">
//           {recipes_data.map((recipeItem) => (
//             <div className="col-md-4 mb-4" key={recipeItem.recipeID}>
//               <Recipe
//                 key={recipeItem.recipeID}
//                 recipeID={recipeItem.recipeID}
//                 recipeName={recipeItem.recipeName}
//                 instruction={recipeItem.instruction}
//                 calories={recipeItem.calories}
//                 servings={recipeItem.servings}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipesPage;
