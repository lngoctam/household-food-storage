const express = require("express");
const db = require("../db-connector");
const router = express.Router();

router.get("/", (req, res) => {
  const sql = `SELECT il.*, r.recipeName, i.ingredientName
               FROM Ingredient_Lists il
              JOIN Recipes r ON il.recipeID = r.recipeID
              JOIN Ingredients i ON il.ingredientID = i.ingredientID
              ORDER BY r.recipeID ASC;`;
  db.pool.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    console.log("go here");
    let js = res.json(data);
    console.log(js);
    return js;
  });
});

// when user posts new ingredientList, check if recipeID and ingredientID have already existed
router.get("/existing", async (req, res) => {
  const { recipeID, ingredientID } = req.query;

  console.log(`Received recipeID: ${recipeID}, ingredientID: ${ingredientID}`);

  if (!recipeID || !ingredientID) {
    return res.status(400).json({ error: "Missing recipeID or ingredientID" });
  }

  const sql = `SELECT * FROM Ingredient_Lists WHERE recipeID = ? AND ingredientID = ?`;

  console.log(
    `Running SQL query: ${sql}, with params: [${recipeID}, ${ingredientID}]`
  );

  //confirm ID is int
  const recipeIDInt = parseInt(recipeID, 10);
  const ingredientIDInt = parseInt(ingredientID, 10);
  db.pool.query(sql, [recipeIDInt, ingredientIDInt], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Database error", details: err });
    }

    console.log("Query result:", data);

    return res.json({ message: "result: ", data });
  });
});

//get a specific Ingredient List by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Ingredient_Lists WHERE ingredientListID=?";
  db.pool.query(sql, [id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

//create a new Ingredient List
router.post("/", (req, res) => {
  console.log("Request Body:", req.body);
  const { recipeID, ingredientID, quantityNeeded, unitName } = req.body;
  if (!recipeID || !ingredientID || !quantityNeeded || !unitName) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const sql = `INSERT INTO Ingredient_Lists (recipeID, ingredientID, quantityNeeded, unitName) VALUES (?, ?, ?, ?)`;
  db.pool.query(
    sql,
    [recipeID, ingredientID, quantityNeeded, unitName],
    (err, result) => {
      if (err) {
        console.log("Error inserting Ingredient List:", err);
        return res.status(500).json("Error");
      }
      const newIngredientList = {
        ingredientListID: result.insertId, 
        recipeID,
        ingredientID,
        quantityNeeded,
        unitName,
      };
      res.status(201).json(newIngredientList); 
    }
  );
});

//delete a Ingredient List by ID
router.delete("/delete/:ingredientListID", (req, res) => {
  const sql = "DELETE FROM Ingredient_Lists WHERE ingredientListID = ?";
  const ingredientListID = req.params.ingredientListID;

  db.pool.query(sql, [ingredientListID], (err, data) => {
    if (err) return res.json("Error");

    if (data.affectedRows === 0) {
      return res.json("Recipe not found");
    }

    db.pool.query("SELECT * FROM Ingredient_Lists", function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
});

//update Ingredient List by using ID
router.patch("/update/:id", (req, res) => {
  const id = req.params.id;
  console.log("ingredientListID " + id);
  const { ingredientID, quantityNeeded, unitName } = req.body;
  const sql = `UPDATE Ingredient_Lists SET ingredientID=?, quantityNeeded=?, unitName=?  WHERE ingredientListID=?`;
  const values = [ingredientID, quantityNeeded, unitName, id];
  db.pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.json("Ingredient List not found");
    }
    res.status(201).json({
      message: `Ingredient List ${id} updated successfully!`,
    });
  });
});

module.exports = router;
