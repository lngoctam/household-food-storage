import React, { useState} from "react";
import axios from "axios";
import url from "../data/setting";
import FetchExistingData from "./FetchExistingData";

const NewStorage = (props) => {
  const [newStorage, setNewStorage] = useState({
    storageName: "",
  });
  const [error, setError] = useState("");
  const [existingStorages, setExistingStorages] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;
    setNewStorage((prevStorage) => {
      return {
        ...prevStorage,
        [name]: value,
      };
    });
  }

  function submitStorage(event) {
    event.preventDefault();
    console.log("New Storage to be added:", newStorage);
    console.log("existing storages:", existingStorages)
    if (existingStorages.includes(newStorage.storageName)) {
      setError("This storage name already exists.");
      setNewStorage({ storageName: "" });
      return; 
    }    
    setError("");

    axios
      .post(`${url}/storages`, newStorage)
      .then((response) => {
        console.log("Storage added:", response.data);
        props.onAdd(response.data);

        setExistingStorages((prevStorages) => [
          ...prevStorages,
          response.data.storageName,
        ]);

        setNewStorage({ storageName: "" }); //clear input field after adding
      })
      .catch((error) => {
        console.error("There was an error adding the storage!", error);
      });
  }
  return (
    <div>
      <FetchExistingData
        url={url}
        tableName="storages"
        itemName="storageName"
        setExistingData={setExistingStorages}
      />
      <form onSubmit={submitStorage}>
        <input
          name="storageName"
          onChange={handleChange}
          value={newStorage.storageName}
          placeholder="Add a new storage name"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button>Add</button>
      </form>
    </div>
  );
};

export default NewStorage;
