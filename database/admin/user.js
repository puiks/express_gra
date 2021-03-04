const pool = require("../dbconfig");
class AdminUserController {
  getUserList() {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query("select * from user", (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
    });
  }
}

module.exports = new AdminUserController();
