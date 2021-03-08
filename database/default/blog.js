const pool = require("../dbconfig");
const moment = require("moment");
class UserBlogController {
  releaseBlog(blog) {
    const today = moment().format("YYYY-MM-DD hh:mm:ss");
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `insert into log (content,releaseTime,like,uid,uname) VALUES ('${blog.content}','${today},0,${blog.uid},'${blog.uname}')`,
          (err, result) => {
            if (err) reject(err);
            resolve(result);
            connection.release();
          }
        );
      });
    });
  }
  getBlogByUserId(uid, offset) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `select * from log where uid = ${uid} limit 10 offset ${offset}`,
          (err, result) => {
            if (err) reject(err);
            resolve(result);
            connection.release();
          }
        );
      });
    });
  }
  getBlogByBlogId(bid) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `select * from log where id = ${bid}`,
          (err, result) => {
            if (err) reject(err);
            resolve(result);
            connection.release();
          }
        );
      });
    });
  }
  likeBlog(like, bid) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `update log set favor = ${like + 1} where id = ${bid}`,
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

module.exports = new UserBlogController();
