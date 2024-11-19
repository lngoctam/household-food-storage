import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import AddCategory from "../components/AddCategory";
import url from "../data/setting";
import { Link } from "react-router-dom";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [existingCategories, setExistingCategories] = useState([]);

  const fetchCategories = () => {
    axios
      .get(`${url}/categories`)
      .then((res) => {
        setCategories(res.data);
        setExistingCategories(res.data.map((category) => category.catName));
      })
      .catch((err) => console.error("Error fetching categories:", err));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${url}/categories/delete/${id}`)
      .then(() => fetchCategories()) // Refetch data after delete
      .catch((err) => console.error("Error deleting category:", err));
  };


  return (
    <div className="container mt-4">
      <Header header="LIST OF CATEGORIES" />
      <AddCategory fetchCategories={fetchCategories} existingCategories={existingCategories} />
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
            {categories.map((item, index) => {
              return (
                <tr className="text-center" key={item.catID}>
                  <th scope="row" style={{ width: "33.33%" }}>
                    {index + 1}
                  </th>
                  <td style={{ width: "33.33%" }}>{item.catName}</td>
                  <td style={{ width: "33.33%" }}>
                    {item.catID && (
                      <div>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(item.catID)}
                      >
                        DELETE
                      </button>
                      <Link
                        to={`/categories/update/${item.catID}`}
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

export default CategoriesPage;
