const express = require("express");
const db = require("../db-connector");
const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT * FROM Units";
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
  const sql = "SELECT * FROM Units WHERE unitID=?";
  db.pool.query(sql, [id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

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
    res.status(201).json(newUnit); //
  });
});

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
