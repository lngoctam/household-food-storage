// citation for this routes
// 11/11/2024
// Based on https://github.com/osu-cs340-ecampus/react-starter-app
// Explanation of Originality: Based on the source and modified to match the requirements for handling 
// Storages-related routes in this project. Modifications include adjusting endpoint paths and logic 
// to interact with the `Storages` table in the database. Additional error-handling mechanisms were 
// implemented to ensure proper responses for missing or invalid data.

const express = require("express");
const db = require("../db-connector");
const router = express.Router();

//get data for Storages page
router.get("/", (req, res) => {
  const sql = `SELECT * FROM Storages
                ORDER BY Storages.storageName`;
  db.pool.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
    return res.status(500).json({ message: "Database error", error: err });
    }
    return res.json(data);
  });
});

//get a specific Storage by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Storages WHERE storageID=?";
  db.pool.query(sql, [id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

//create a new Storage
router.post("/", (req, res) => {
  const sql = "INSERT INTO Storages (`storageName`) VALUES (?)";
  const values = req.body.storageName;
  db.pool.query(sql, [values], (err, data) => {
    if (err) {
      console.log("Error:", err);
      return res.status(500).json("Error");
    }
    const newStorage = {
      storageID: data.insertId,
      storageName: values,
    };
    res.status(201).json(newStorage); //
  });
});

//delete a Storage by ID
router.delete("/delete/:storageID", (req, res) => {
  const sql = "DELETE FROM Storages WHERE storageID = ?";
  const storageID = req.params.storageID;

  db.pool.query(sql, [storageID], (err, data) => {
    if (err) return res.json("Error");

    if (data.affectedRows === 0) {
      return res.json("Challenge not found");
    }

    db.pool.query("SELECT * FROM Storages", function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
});

// update Storage name by ID
router.patch("/update/:id", (req, res) => {
  const id = req.params.id;
  console.log("storageID " + id);
  const { storageName } = req.body;
  const sql = `UPDATE Storages SET storageName=? WHERE storageID=?`;
  const values = [storageName, id];
  db.pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.json("Error");
    }
    if (result.affectedRows === 0) {
      return res.json("Storage not found");
    }
    res.status(201).json({
      message: `Storage ${id} updated successfully!`,
    });
  });
});

module.exports = router;
