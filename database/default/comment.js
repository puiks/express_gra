const pool = require("../dbconfig");
const moment = require("moment");
class UserCommentController {
  getSongsComments(id, offset) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `select comment.id as cid, comment.content,comment.username,comment.commentTime,comment.relateTo,comment.likes,comment.belongTo,user.avatar,user.id as uid from comment,user where comment.belongTo=${id} and comment.userId = user.id and comment.relateTo = 0 limit 10 offset ${offset}`,
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
          `update comment set likes=${+like + 1} where id = ${cid}`,
          (err, result) => {
            if (err) reject(err);
            resolve(result);
            connection.release();
          }
        );
      });
    });
  }
  getSubSongsComments(relateTo, offset) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `select comment.id as cid, comment.content,comment.username,comment.commentTime,comment.relateTo,comment.likes,comment.belongTo,user.avatar,user.id as uid from comment,user where comment.userId = user.id and comment.relateTo = ${relateTo} limit 10 offset ${offset}`,
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
