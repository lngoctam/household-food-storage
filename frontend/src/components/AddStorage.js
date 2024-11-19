import React, { useState } from "react";
import axios from "axios";
import url from "../data/setting";

const NewStorage = ({ existingStorages, fetchStorages }) => {
  const [storageName, setStorageName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check for duplicates
    if (existingStorages.includes(storageName)) {
      setError("This storage name already exists.");
      return;
    }

    // Add new storage
    setError("");
    axios
      .post(`${url}/storages`, { storageName })
      .then(() => {
        fetchStorages(); // Refetch storages from the backend
        setStorageName(""); // Clear input
      })
      .catch((err) => console.error("Error adding storage:", err));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={storageName}
        onChange={(e) => setStorageName(e.target.value)}
        placeholder="Add a new storage"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Add</button>
    </form>
  );
};

export default NewStorage;
