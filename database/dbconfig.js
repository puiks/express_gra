const mysql = require("mysql");
const dbconfig = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "cloud_music",
  port: 3306,
  connectionLimit: 20,
  timezone: "SYSTEM",
};
const pool = mysql.createPool(dbconfig);

module.exports = pool;
