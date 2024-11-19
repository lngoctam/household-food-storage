import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import url from "../data/setting";

const UpdateStorage = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [storage, setStorage] = useState({
    storageName: "",
    newStorageName: "",
  });

  useEffect(() => {
    axios
      .get(`${url}/storages/${id}`)
      .then((res) => {
        console.log(res);
        setStorage({
          storageName: res.data[0].storageName,
          newStorageName: "",
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (event) => {
    const { name, value } = event.target;
    setStorage((prevStorage) => ({
      ...prevStorage,
      [name]: value,
    }));
  };

  function submitUpdate(event) {
    event.preventDefault();
    const updatedStorage = {
      storageName: storage.newStorageName,
    };
    axios
      .patch(`${url}/storages/update/${id}`, updatedStorage, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("storage updated:", res);
        navigate("/storages");
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
            <h5 className="card-title">Update Storage Name</h5>
            <Link
              type="button"
              className="btn-close"
              aria-label="Close"
              style={{ position: "absolute", top: "10px", right: "10px" }}
              to="/storages"
            ></Link>
            <form onSubmit={submitUpdate}>
              <div className="mb-2">
                <label htmlFor="">Current Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="storageName"
                  value={storage.storageName}
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
                  name="newStorageName"
                  value={storage.newStorageName}
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

export default UpdateStorage;
