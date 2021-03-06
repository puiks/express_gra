const pool = require("../dbconfig");
class AdminCommentController {
  getAllComments() {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query("select * from comment", (err, result) => {
          if (err) reject(err);
          resolve(result);
          connection.release();
        });
      });
    });
  }
  deleteComment(commentInfo) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `update set comment state = 1 , reason = '${commentInfo.reason}' where id = ${commentInfo.id}`,
          (err, result) => {
            if (err) reject(err);
            resolve(result);
            connection.release();
          }
        );
      });
    });
  }
}

module.exports = new AdminCommentController();
