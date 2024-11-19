import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import AddIngredient from "../components/AddIngredient";
import url from "../data/setting";
import { Link } from "react-router-dom";

const IngredientsPage = () => {
  const [ingredients, setIngredients] = useState([]);

  const handleDelete = (id) => {
    axios
      .delete(`${url}/ingredients/delete/${id}`)
      .then((res) => {
        setIngredients((prevIngredients) =>
          prevIngredients.filter((ingredient) => ingredient.ingredientID !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  function addIngredient(newIngredient) {
    setIngredients((prevIngredients) => {
      return [...prevIngredients, newIngredient];
    });
  }

  useEffect(() => {
    axios
      .get(`${url}/ingredients`)
      .then((res) => {
        setIngredients(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <Header header="LIST OF INGREDIENTS" />
      <AddIngredient onAdd={addIngredient} />
      <div className="table-responsive">
        <table className="table table-sm table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col" className="text-center col-sm-1">
                #
              </th>
              <th scope="col" className="text-center col-sm-1">
                Name
              </th>
              <th scope="col" className="text-center col-sm-1">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((item, index) => {
              return (
                <tr className="text-center" key={item.ingredientID}>
                  <th scope="row" style={{ width: "33.33%" }}>
                    {index + 1}
                  </th>
                  <td style={{ width: "33.33%" }}>{item.ingredientName}</td>
                  <td style={{ width: "33.33%" }}>
                    {item.ingredientID && (
                      <div>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(item.ingredientID)}
                        >
                          DELETE
                        </button>
                        <Link
                          to={`/ingredients/update/${item.ingredientID}`}
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
  );
};

export default IngredientsPage;
