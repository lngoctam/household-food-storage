// Get an instance of mysql we can use in the app
const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "classmysql.engr.oregonstate.edu",
  user: "cs340_lengoc",
  password: "2133",
  database: "cs340_lengoc",  
});

pool.getConnection((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database!");
});

module.exports.pool = pool;
