const express = require("express");
const db = require("../db-connector");
const router = express.Router();

router.get("/", (req, res) => {
  // const sql = "SELECT * FROM Ingredient_Lists";
  const sql = `SELECT il.ingredientListID, il.recipeID, r.recipeName, il.ingredientID, i.ingredientName, il.quantityNeeded
               FROM Ingredient_Lists il
              JOIN Recipes r ON il.recipeID = r.recipeID 
              JOIN Ingredients i ON il.ingredientID = i.ingredientID`;
  db.pool.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    return res.json(data);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Ingredient_Lists WHERE ingredientID=?";
  db.pool.query(sql, [id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

router.post("/", (req, res) => {
  console.log("Request Body:", req.body);
  const { recipeID, ingredientID, quantityNeeded } = req.body;
  if (!recipeID || !ingredientID || !quantityNeeded) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const sql = `INSERT INTO Ingredient_Lists (recipeID, ingredientID, quantityNeeded) VALUES (?, ?, ?)`;
  db.pool.query(
    sql,
    [recipeID, ingredientID, quantityNeeded],
    (err, result) => {
      if (err) {
        console.log("Error inserting Ingredient List:", err);
        return res.status(500).json("Error");
      }
      const newIngredientList = {
        ingredientListID: result.insertId, // This is the ID of the newly inserted record
        recipeID,
        ingredientID,
        quantityNeeded,
      };
      res.status(201).json(newIngredientList); //
    }
  );
});

router.delete("/delete/:ingredientID", (req, res) => {
  const sql = "DELETE FROM Ingredient_Lists WHERE ingredientID = ?";
  const ingredientID = req.params.ingredientID;

  db.pool.query(sql, [ingredientID], (err, data) => {
    if (err) return res.json("Error");

    if (data.affectedRows === 0) {
      return res.json("Challenge not found");
    }

    db.pool.query("SELECT * FROM Ingredient_Lists", function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
});

router.patch("/update/:id", (req, res) => {
  const id = req.params.id;
  console.log("ingredientID " + id);
  const { ingredientName } = req.body;
  const sql = `UPDATE Ingredient_Lists SET ingredientName=? WHERE ingredientID=?`;
  const values = [ingredientName, id];
  db.pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.json("Error");
    }
    if (result.affectedRows === 0) {
      return res.json("Ingredient not found");
    }
    res.status(201).json({
      message: `Ingredient ${id} updated successfully!`,
    });
  });
});

module.exports = router;
