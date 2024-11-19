import React, { useState, useEffect } from "react";
import axios from "axios";

const FetchExistingData = ({ url, tableName, itemName, setExistingData }) => {
  useEffect(() => {
    axios
      .get(`${url}/${tableName}`)
      .then((response) => {
        setExistingData(
          response.data.map((item) => item[itemName])
        );
      })
      .catch((error) => {
        console.error("Error fetching existing data:", error);
      });
  }, [url, tableName, itemName, setExistingData]);

  return null;
};

export default FetchExistingData;