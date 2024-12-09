// citation for this routes
// 11/11/2024
// Based on https://github.com/osu-cs340-ecampus/react-starter-app
// Explanation of Originality: Based on the source and modified to match the requirements for handling 
// Units-related routes in this project. Modifications include adjusting endpoint paths and logic 
// to interact with the `Units` table in the database. Additional error-handling mechanisms were 
// implemented to ensure proper responses for missing or invalid data.

const express = require("express");
const db = require("../db-connector");
const router = express.Router();

//get data for Units page
router.get("/", (req, res) => {
  const sql = `SELECT * FROM Units
              ORDER BY Units.unitName`;
  db.pool.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    return res.json(data);
  });
});

//get a specific Unit by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Units WHERE unitID=?";
  db.pool.query(sql, [id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

//create a new Unit
router.post("/", (req, res) => {
  const sql = "INSERT INTO Units (`unitName`) VALUES (?)";
  const values = req.body.unitName;
  db.pool.query(sql, [values], (err, data) => {
    if (err) {
      console.log("Error:", err);
      return res.status(500).json("Error");
    }
    const newUnit = {
      unitID: data.insertId,
      unitName: values,
    };
    res.status(201).json(newUnit);
  });
});

//delete a Unit by ID
router.delete("/delete/:unitID", (req, res) => {
  const sql = "DELETE FROM Units WHERE unitID = ?";
  const unitID = req.params.unitID;

  db.pool.query(sql, [unitID], (err, data) => {
    if (err) return res.json("Error");

    if (data.affectedRows === 0) {
      return res.json("Challenge not found");
    }

    db.pool.query("SELECT * FROM Units", function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
});

// update Unit name by ID
router.patch("/update/:id", (req, res) => {
  const id = req.params.id;
  console.log("unitID " + id);
  const { unitName } = req.body;
  const sql = `UPDATE Units SET unitName=? WHERE unitID=?`;
  const values = [unitName, id];
  db.pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.json("Error");
    }
    if (result.affectedRows === 0) {
      return res.json("Unit not found");
    }
    res.status(201).json({
      message: `Unit ${id} updated successfully!`,
    });
  });
});

module.exports = router;
