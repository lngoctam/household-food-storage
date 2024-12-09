// citation for this routes
// 11/11/2024
// Based on https://github.com/osu-cs340-ecampus/react-starter-app
// Explanation of Originality: Based on the source and modified to match the requirements for handling 
// ingredients-related routes in this project. Modifications include adjusting endpoint paths and logic 
// to interact with the `Ingredients` table in the database. Additional error-handling mechanisms were 
// implemented to ensure proper responses for missing or invalid data.

const express = require("express");
const db = require("../db-connector");
const router = express.Router();

//get data for Ingredients page
router.get("/", (req, res) => {
  const sql = `SELECT i.*, s.storageName
              FROM Ingredients i
              LEFT JOIN Storages s on i.storageID = s.storageID`;
  db.pool.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    return res.json(data);
  });
});

//get a specific Ingredient by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Ingredients WHERE ingredientID=?";
  db.pool.query(sql, [id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

//create a new Ingredient
router.post("/", (req, res) => {
  console.log("Add Ingredient:", req.body);

  const { ingredientName, storageID } = req.body;
  const sql = `INSERT INTO Ingredients (ingredientName, storageID) VALUES (?, ?)`;
  db.pool.query(sql, [ingredientName, storageID], (err, data) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error adding ingredient", details: err });
    const newIngredient = {
      ingredientID: data.insertId,
      ingredientName,
      storageID,
    };
    res.status(201).json(newIngredient);
  });
});

//delete a Ingredient by ID
router.delete("/delete/:ingredientID", (req, res) => {
  const sql = "DELETE FROM Ingredients WHERE ingredientID = ?";
  const ingredientID = req.params.ingredientID;

  db.pool.query(sql, [ingredientID], (err, data) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error deleting ingredient", details: err });

    if (data.affectedRows === 0) {
      return res.json("Ingredient not found");
    }

    db.pool.query("SELECT * FROM Ingredients", function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
});

// update Ingredient name by ID
router.patch("/update/:id", (req, res) => {
  const id = req.params.id;
  console.log("ingredientID " + id);
  const { ingredientName, storageID } = req.body;
  const sql = `UPDATE Ingredients SET ingredientName=?, storageID=? WHERE ingredientID=?`;
  const values = [ingredientName, storageID, id];
  db.pool.query(sql, values, (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error updating ingredient", details: err });
    if (result.affectedRows === 0) {
      return res.json("Ingredient not found");
    }
    console.log("Preparing to send response:", { ingredientName, storageID });
    res.status(200).json({
      message: `Ingredient ${id} updated successfully!`,
      updatedValues: { ingredientName, storageID },
    });
  });
});

module.exports = router;
