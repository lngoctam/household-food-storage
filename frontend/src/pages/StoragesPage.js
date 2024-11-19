import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import AddStorage from "../components/AddStorage";
import url from "../data/setting";

const StoragesPage = () => {
  const [storage, setStorage] = useState([]);

  const handleDelete = (id) => {
    axios
      .delete(`${url}/storages/delete/${id}`)
      .then((res) => {
        setStorage((prevStorages) =>
          prevStorages.filter((storage) => storage.storageID !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  function addStorage(newStorage) {
    setStorage((prevStorages) => {
      return [...prevStorages, newStorage];
    });
  }

  useEffect(() => {
    axios
      .get(`${url}/storages`)
      .then((res) => {
        setStorage(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <Header header="LIST OF STORAGES" />
      <AddStorage onAdd={addStorage} />
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
            {storage.map((item, index) => {
              return (
                <tr className="text-center" key={item.storageID}>
                  <th scope="row" style={{ width: "33.33%" }}>
                    {index + 1}
                  </th>
                  <td style={{ width: "33.33%" }}>{item.storageName}</td>
                  <td style={{ width: "33.33%" }}>
                    {item.storageID && (
                      <div>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(item.storageID)}
                        >
                          DELETE
                        </button>
                        <Link
                          to={`/storages/update/${item.storageID}`}
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

export default StoragesPage;
