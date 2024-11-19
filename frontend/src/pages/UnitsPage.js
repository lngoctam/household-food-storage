import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import AddUnit from "../components/AddUnit";
import url from "../data/setting";
import { Link } from "react-router-dom";

const UnitsPage = () => {
  const [units, setUnits] = useState([]);
  const [existingUnits, setExistingUnits] = useState([]);

  const fetchUnits = () => {
    axios
      .get(`${url}/units`)
      .then((res) => {
        setUnits(res.data);
        setExistingUnits(res.data.map((unit) => unit.unitName));
      })
      .catch((err) => console.error("Error fetching units:", err));
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${url}/units/delete/${id}`)
      .then(() => fetchUnits()) // Refetch data after delete
      .catch((err) => console.error("Error deleting unit:", err));
  };

  return (
    <div className="container mt-4">
      <Header header="LIST OF UNITS" />
      <AddUnit fetchUnits={fetchUnits} existingUnits={existingUnits} />
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
            {units.map((item, index) => {
              return (
                <tr className="text-center" key={item.unitID}>
                  <th scope="row" style={{ width: "33.33%" }}>
                    {index + 1}
                  </th>
                  <td style={{ width: "33.33%" }}>{item.unitName}</td>
                  <td style={{ width: "33.33%" }}>
                    {item.unitID && (
                      <div>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(item.unitID)}
                        >
                          DELETE
                        </button>
                        <Link
                          to={`/units/update/${item.unitID}`}
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

export default UnitsPage;

