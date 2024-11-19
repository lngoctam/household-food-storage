import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import url from "../data/setting";

const UpdateIngredient = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ingredient, setIngredient] = useState({
    ingredientName: "",
    newIngredientName: "",
  });

  useEffect(() => {
    axios
      .get(`${url}/ingredients/${id}`)
      .then((res) => {
        console.log(res);
        setIngredient({
          ingredientName: res.data[0].ingredientName,
          newIngredientName: "",
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (event) => {
    const { name, value } = event.target;
    setIngredient((prevIngredient) => ({
      ...prevIngredient,
      [name]: value,
    }));
  };

  function submitUpdate(event) {
    event.preventDefault();
    const updatedIngredient = {
      ingredientName: ingredient.newIngredientName,
    };
    axios
      .patch(`${url}/ingredients/update/${id}`, updatedIngredient, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("Ingredient updated:", res);
        navigate("/ingredients");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div className="row justify-content-center">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Update Ingredient Name</h5>
            <Link
              type="button"
              className="btn-close"
              aria-label="Close"
              style={{ position: "absolute", top: "10px", right: "10px" }}
              to="/ingredients"
            ></Link>
            <form onSubmit={submitUpdate}>
              <div className="mb-2">
                <label htmlFor="">Current Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="ingredientName"
                  value={ingredient.ingredientName}
                  onChange={handleUpdate}
                  disabled
                />
              </div>
              <div className="mb-2">
                <label htmlFor="">New Name</label>
                <input
                  type="text"
                  // placeholder="Enter new name"
                  className="form-control"
                  name="newIngredientName"
                  value={ingredient.newIngredientName}
                  onChange={handleUpdate}
                />
              </div>
              <button type="submit" className="btn btn-success">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateIngredient;
