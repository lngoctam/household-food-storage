import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import url from "../data/setting";

const UpdateUnit = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [unit, setUnit] = useState({
    unitName: "",
    newUnitName: "",
  });

  useEffect(() => {
    axios
      .get(`${url}/units/${id}`)
      .then((res) => {
        console.log(res);
        setUnit({
          unitName: res.data[0].unitName,
          newUnitName: "",
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (event) => {
    const { name, value } = event.target;
    setUnit((prevUnit) => ({
      ...prevUnit,
      [name]: value,
    }));
  };

  function submitUpdate(event) {
    event.preventDefault();
    const updatedUnit = {
      unitName: unit.newUnitName,
    };
    axios
      .patch(`${url}/units/update/${id}`, updatedUnit, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("Unit updated:", res);
        navigate("/units");
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
            <h5 className="card-title">Update Unit Name</h5>
            <Link
              type="button"
              className="btn-close"
              aria-label="Close"
              style={{ position: "absolute", top: "10px", right: "10px" }}
              to="/units"
            ></Link>
            <form onSubmit={submitUpdate}>
              <div className="mb-2">
                <label htmlFor="">Current Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="unitName"
                  value={unit.unitName}
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
                  name="newUnitName"
                  value={unit.newUnitName}
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

export default UpdateUnit;
