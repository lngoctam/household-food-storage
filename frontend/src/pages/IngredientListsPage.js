import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import AddIngredientList from "../components/AddIngredientList";
import url from "../data/setting";
import { Link } from "react-router-dom";

const IngredientListsPage = () => {
  const [ingredientLists, setIngredientLists] = useState([]);

  const handleDelete = (id) => {
    axios
      .delete(`${url}/ingredientLists/delete/${id}`)
      .then((res) => {
        setIngredientLists((prevIngredientLists) =>
          prevIngredientLists.filter(
            (ingredientList) => ingredientList.ingredientListID !== id
          )
        );
      })
      .catch((err) => console.log(err));
  };

  function addIngredientList(newIngredientList) {
    setIngredientLists((prevIngredientLists) => {
      return [...prevIngredientLists, newIngredientList];
    });
  }

  useEffect(() => {
    axios
      .get(`${url}/ingredientLists`)
      .then((res) => {
        console.log(res.data);
        setIngredientLists(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="container mt-4">
        <Header header="INGREDIENTS FOR RECIPES" className="row-gap-3" />
        <AddIngredientList onAdd={addIngredientList} />
        <div className="table-responsive">
          <table className="table table-sm table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col" className="text-center col-sm-1">
                  #
                </th>
                <th scope="col" className="text-center col-sm-1">
                  Recipe ID
                </th>
                <th scope="col" className="text-center col-sm-2">
                  Recipe Name
                </th>
                <th scope="col" className="text-center col-sm-1">
                  Ingredient ID
                </th>
                <th scope="col" className="text-center col-sm-1">
                  Ingredient Name
                </th>
                <th scope="col" className="text-center col-sm-1">
                  Quantity needed
                </th>
                <th scope="col" className="text-center col-sm-1">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {ingredientLists.map((item, index) => {
                return (
                  <tr className="text-center" key={item.ingredientListID}>
                    <th scope="row" style={{ width: "12%" }}>
                      {index + 1}
                    </th>
                    <td style={{ width: "12%" }}>{item.recipeID}</td>
                    <td style={{ width: "12%" }}>{item.recipeName}</td>
                    <td style={{ width: "12%" }}>{item.ingredientID}</td>
                    <td style={{ width: "12%" }}>{item.ingredientName}</td>                      
                    <td style={{ width: "12%" }}>{item.quantityNeeded}</td>
                    <td style={{ width: "30%" }}>
                      {item.ingredientListID && (
                        <div>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(item.ingredientListID)}
                          >
                            DELETE
                          </button>
                          <Link
                            // to={`/ingredientLists/update/${item.ingredientListID}`}
                            className="btn btn-outline-info btn-sm mx-2"
                          >
                            UPDATE
                          </Link>
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
    </div>
  );
};

export default IngredientListsPage;
