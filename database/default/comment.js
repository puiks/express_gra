const pool = require("../dbconfig");
const moment = require("moment");
class UserCommentController {
  getSongsComments(id, offset) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `select * from comment where belongTo ${id} limit 10 offset ${offset}`,
          (err, result) => {
            if (err) reject(err);
            resolve(result);
            connection.release();
          }
        );
      });
    });
  }
  addComment(commentInfo) {
    let today = moment().format("YYYY-MM-DD HH:mm:ss");
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `insert into comment (content , username , commentTime , relateTo , likes , belongTo , userId , state ) VALUES 
          ('${commentInfo.content}','${commentInfo.username}','${today}','${
            commentInfo.relateTo || 0
          }',0,${commentInfo.belongTo},${commentInfo.userId},0)`,
          (err, result) => {
            if (err) reject(err);
            resolve(result);
            connection.release();
          }
        );
      });
    });
  }
  likeComment(like, cid) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `update comment set likes = ${like} where id = ${cid}`,
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

module.exports = new UserCommentController();
