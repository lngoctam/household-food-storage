import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import url from "../data/setting";

const UpdateCategory = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    catName: "",
    newCategoryName: "",
  });

  useEffect(() => {
    axios
      .get(`${url}/categories/${id}`)
      .then((res) => {
        console.log(res);
        setCategory({
          catName: res.data[0].catName,
          newCategoryName: "",
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (event) => {
    const { name, value } = event.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  function submitUpdate(event) {
    event.preventDefault();
    const updatedCategory = {
      catName: category.newCategoryName,
    };
    axios
      .patch(`${url}/categories/update/${id}`, updatedCategory, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("category updated:", res);
        navigate("/categories");
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
            <h5 className="card-title">Update Category Name</h5>
            <Link
              type="button"
              className="btn-close"
              aria-label="Close"
              style={{ position: "absolute", top: "10px", right: "10px" }}
              to="/categories"
            ></Link>
            <form onSubmit={submitUpdate}>
              <div className="mb-2">
                <label htmlFor="">Current Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="catName"
                  value={category.catName}
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
                  name="newCategoryName"
                  value={category.newCategoryName}
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

export default UpdateCategory;
