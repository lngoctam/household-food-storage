// Citation for this js file
// Date 12/8/2024
// Copied from https://github.com/osu-cs340-ecampus/react-starter-app#backend-setup-nodejsexpress
// Explanation of Originality: Copied from the source to establish a MySQL database connection in the course materials.

const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "classmysql.engr.oregonstate.edu",
  user: "...",
  password: "...",
  database: "...",
});

pool.getConnection((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database!");
});

module.exports.pool = pool;
