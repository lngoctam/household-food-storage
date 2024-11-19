import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import AddStorage from "../components/AddStorage";
import url from "../data/setting";

const StoragesPage = () => {
  const [storages, setStorages] = useState([]);
  const [existingStorages, setExistingStorages] = useState([]);

  const fetchStorages = () => {
    axios
      .get(`${url}/storages`)
      .then((res) => {
        setStorages(res.data);
        setExistingStorages(res.data.map((s) => s.storageName));
      })
      .catch((err) => console.error("Error fetching storages:", err));
  };

  useEffect(() => {
    fetchStorages();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${url}/storages/delete/${id}`)
      .then(() => fetchStorages()) // Refetch data after delete
      .catch((err) => console.error("Error deleting storage:", err));
  };

  return (
    <div className="container mt-4">
      <Header header="LIST OF STORAGES" />
      <AddStorage fetchStorages={fetchStorages} existingStorages={existingStorages} />
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
            {storages.map((item, index) => {
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
