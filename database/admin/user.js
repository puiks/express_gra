const pool = require("../dbconfig");
class AdminUserController {
  getUserList() {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query("select * from user", (err, result) => {
          if (err) reject(err);
          resolve(result);
          connection.release();
        });
      });
    });
  }
  updateUserState(id, state) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `update user set state = ${state} where id = ${id}`,
          function (err, result) {
            if (err) reject(err);
            resolve(result);
            connection.release();
          }
        );
      });
    });
  }
}

module.exports = new AdminUserController();
