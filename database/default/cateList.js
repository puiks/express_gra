const pool = require("../dbconfig");
class UserCateListController {
  getAllCateList() {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query("select * from cateList", (err, result) => {
          if (err) reject(err);
          resolve(result);
          connection.release();
        });
      });
    });
  }
}
module.exports = new UserCateListController();
