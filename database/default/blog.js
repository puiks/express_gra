const pool = require("../dbconfig");
const moment = require("moment");
class UserBlogController {
  releaseBlog(blog) {
    const today = moment().format("YYYY-MM-DD hh:mm:ss");
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `insert into log (content,releaseTime,favor,uid,uname,state,picUrl) VALUES ('${blog.content}','${today}',0,${blog.uid},'${blog.uname}',0,'${blog.imgUrl}')`,
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
    console.log('this one');
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `select log.id,log.content,log.releaseTime,log.favor,log.uname,log.picUrl,user.avatar from log,user where log.uid = ${uid} and log.uid = user.id limit 10 offset ${offset}`,
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
          `update log set favor = ${+like + 1} where id = ${bid}`,
          (err, result) => {
            if (err) reject(err);
            resolve(result);
            connection.release();
          }
        );
      });
    });
  }
  getBlogCount(uid) {
    return new Promise(function(resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) resolve(err);
        connection.query(`select COUNT(*) as total from log where uid = ${uid}`, (err, result) => {
          if (err) reject(err);
          resolve(result);
          connection.release();
        })
      })
    })
  }
}

module.exports = new UserBlogController();
