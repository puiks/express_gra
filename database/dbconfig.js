const mysql = require("mysql");
const dbconfig = {
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "cloud_music",
  port: 3306,
  connectionLimit: 50,
  timezone: "SYSTEM",
  multipleStatements: true
};
const pool = mysql.createPool(dbconfig);

module.exports = pool;
