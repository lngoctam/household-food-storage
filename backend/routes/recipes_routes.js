// citation for this routes
// 11/11/2024
// Based on https://github.com/osu-cs340-ecampus/react-starter-app
// Explanation of Originality: Based on the source and modified to match the requirements for handling 
// Recipes-related routes in this project. Modifications include adjusting endpoint paths and logic 
// to interact with the `Recipes` table in the database. Additional error-handling mechanisms were 
// implemented to ensure proper responses for missing or invalid data.

const express = require("express");
const db = require("../db-connector");
const router = express.Router();

//get data for Recipes page
router.get("/", (req, res) => {
  // const sql = "SELECT * FROM Recipes";
  const sql = `SELECT Recipes.*, Categories.catName, Categories.catID
               FROM Recipes
               LEFT JOIN Categories ON Recipes.catID = Categories.catID
               ORDER BY Recipes.recipeName ASC`;
  db.pool.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    return res.json(data);
  });
});

//get a specific Recipe by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Recipes WHERE recipeID=?";
  db.pool.query(sql, [id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

//create a new Recipe
router.post("/", (req, res) => {
  console.log("Request Body:", req.body);
  const {
    recipeName,
    calories,
    servings,
    instruction,
    prepTime,
    cookTime,
    totalTime,
    catID,
  } = req.body;

  const sql = `INSERT INTO Recipes (recipeName, calories, servings, instruction, prepTime, cookTime, totalTime, catID) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    recipeName,
    calories,
    servings,
    instruction,
    prepTime,
    cookTime,
    totalTime,
    catID,
  ];
  db.pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json("Error");
    }
    res.status(201).json({
      message: "Recipe created successfully!",
      recipeID: result.insertId,
    });
  });
});

//delete a Recipe by ID
router.delete("/delete/:recipeID", (req, res) => {
  const recipeID = req.params.recipeID;
  console.log("Attempting to delete recipe with ID:", recipeID);
  const sql = "DELETE FROM Recipes WHERE recipeID = ?";

  db.pool.query(sql, [recipeID], (err, data) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error deleting ingredient", details: err });
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    db.pool.query("SELECT * FROM Recipes", function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
});

// update Recipe
router.patch("/update/:id", (req, res) => {
  const id = req.params.id;
  console.log("recipeID " + id);
  const {
    recipeName,
    calories,
    servings,
    instruction,
    prepTime,
    cookTime,
    totalTime,
    catID,
  } = req.body;
  const sql = `UPDATE Recipes SET recipeName=?, calories=?, servings=?, instruction=?, prepTime=?, cookTime=?, totalTime=?, catID=? WHERE recipeID=?`;
  const values = [
    recipeName,
    calories,
    servings,
    instruction,
    prepTime,
    cookTime,
    totalTime,
    catID,
    id,
  ];
  db.pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.json("Error");
    }
    if (result.affectedRows === 0) {
      return res.json("Recipe not found");
    }
    res.status(201).json({
      message: `Recipe ${id} updated successfully!`,
    });
  });
});

router.get("/view/:id", (req, res) => {
  const id = req.params.id;
  console.log("recipeID " + id);

  const sql = "SELECT * FROM Recipes WHERE recipeID = ?";
  connection.query(sql, [id], (err, result) => {
    if (result.length === 0) {
      return next(new Error("Recipe not found."));
    }
    if (err) {
      return next(new Error("Database error"));
    }
    res.json(result);
  });
});

module.exports = router;
