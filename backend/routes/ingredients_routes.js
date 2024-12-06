const express = require("express");
const db = require("../db-connector");
const router = express.Router();

//get data for Ingredients page
router.get("/", (req, res) => {
  const sql = `SELECT * FROM Ingredients
                ORDER BY Ingredients.ingredientName`;
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
  const sql = "INSERT INTO Ingredients (`ingredientName`) VALUES (?)";
  const values = req.body.ingredientName;
  db.pool.query(sql, [values], (err, data) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error deleting ingredient", details: err });
    const newIngredient = {
      ingredientID: data.insertId,
      ingredientName: values,
    };
    res.status(201).json(newIngredient); //
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
  const { ingredientName } = req.body;
  const sql = `UPDATE Ingredients SET ingredientName=? WHERE ingredientID=?`;
  const values = [ingredientName, id];
  db.pool.query(sql, values, (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error deleting ingredient", details: err });
    if (result.affectedRows === 0) {
      return res.json("Ingredient not found");
    }
    res.status(201).json({
      message: `Ingredient ${id} updated successfully!`,
    });
  });
});

module.exports = router;
