const express = require("express");
const db = require("../db-connector");
const router = express.Router();

//get data for Categories page
router.get("/", (req, res) => {
  const sql = `SELECT * FROM Categories
                ORDER BY Categories.catName`;
  db.pool.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    return res.json(data);
  });
});

//get a specific Category by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Categories WHERE catID=?";
  db.pool.query(sql, [id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

//create a new category
router.post("/", (req, res) => {
  const sql = "INSERT INTO Categories (`catName`) VALUES (?)";
  const values = req.body.catName;
  db.pool.query(sql, [values], (err, data) => {
    if (err) {
      console.log("Error:", err);
      return res.status(500).json("Error");
    }
    const newCat = {
      catID: data.insertId,
      catName: values,
    };
    res.status(201).json(newCat); 
  });
});

//delete a Category by ID
router.delete("/delete/:catID", (req, res) => {
  const sql = "DELETE FROM Categories WHERE catID = ?";
  const catID = req.params.catID;

  db.pool.query(sql, [catID], (err, data) => {
    if (err) return res.json("Error");

    if (data.affectedRows === 0) {
      return res.json("Challenge not found");
    }

    db.pool.query("SELECT * FROM Categories", function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
});

// update Category name by ID
router.patch("/update/:id", (req, res) => {
  const id = req.params.id;
  console.log("catID " + id);
  const { catName } = req.body;
  const sql = `UPDATE Categories SET catName=? WHERE catID=?`;
  const values = [catName, id];
  db.pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.json("Error");
    }
    if (result.affectedRows === 0) {
      return res.json("Category not found");
    }
    res.status(201).json({
      message: `Category ${id} updated successfully!`,
    });
  });
});

module.exports = router;
