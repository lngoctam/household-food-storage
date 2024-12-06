import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import url from "../data/setting";
import Select from "react-dropdown-select";

const UpdateIngredient = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [storages, setStorages] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [ingredients, setIngredients] = useState({
    ingredientName: "",
    newIngredientName: "",
    storageID: "",
    newStorageID: "",
  });

  const handleStorageChange = (selected) => {
    console.log("Selected Storage:", selected[0]);
    setSelectedStorage(selected[0]);
    setIngredients((prevIngredient) => ({
      ...prevIngredient,
      storageID: selected[0].value,
    }));
  };

  const fetchIngredientDetails = async () => {
    try {
      console.log("id", id);
      const response = await axios.get(`${url}/ingredients/${id}`);
      const ingredient = response.data[0];
      setIngredients({
        ingredientName: ingredient.ingredientName,
        storageID: ingredient.storageID,
      });
      setSelectedStorage({
        value: ingredient.storageID,
        label: ingredient.storageName,
      });
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const fetchStorages = async () => {
    try {
      const response = await axios.get(`${url}/storages`);
      setStorages(
        response.data.map((storage) => ({
          value: storage.storageID,
          label: storage.storageName,
        }))
      );
    } catch (error) {
      console.error("Error fetching storages:", error);
    }
  };

  useEffect(() => {
    fetchIngredientDetails();
    fetchStorages();
  }, [id]);

  const handleUpdate = (event) => {
    const { name, value } = event.target;
    setIngredients((prevIngredient) => ({
      ...prevIngredient,
      [name]: value,
    }));
  };

  const submitUpdate = async (event) => {
    event.preventDefault();  
    try {
      const updatedIngredient = {
        ingredientName: ingredients.newIngredientName || ingredients.ingredientName,
        storageID: selectedStorage?.value || ingredients.storageID, // Use selectedStorage or fallback
      };
  
      console.log("Updated Ingredient", updatedIngredient);
  
      const res = await axios.patch(`${url}/ingredients/update/${id}`, updatedIngredient, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("Ingredient updated:", res.data);
      console.log("fetchIngredientDetails", ingredients);
  
      navigate("/ingredients"); // Redirect to ingredients page on success
    } catch (err) {
      console.error("Error updating ingredient:", err.response?.data || err.message);
    }
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
                  value={ingredients.ingredientName}
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
                  value={ingredients.newIngredientName}
                  onChange={handleUpdate}
                />
              </div>
              <div className="mb-3">
                <label>Storage</label>
                <Select
                  options={storages}
                  onChange={handleStorageChange}
                  values={selectedStorage ? [selectedStorage] : []}
                  // values={selectedStorage}
                  className="form-control"
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
