import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import AddCategory from "../components/AddCategory";
import url from "../data/setting";
import { Link } from "react-router-dom";

const CategoriesPage = () => {
  const [category, setCategory] = useState([]);

  const handleDelete = (id) => {
    axios
      .delete(`${url}/categories/delete/${id}`)
      .then((res) => {
        setCategory((prevCategories) =>
          prevCategories.filter((category) => category.catID !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  function addCategory(newCategory) {
    setCategory((prevCategories) => {
      return [...prevCategories, newCategory];
    });
  }

  useEffect(() => {
    axios
      .get(`${url}/categories`)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <Header header="LIST OF CATEGORIES" />
      <AddCategory onAdd={addCategory} />
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
            {category.map((item, index) => {
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
