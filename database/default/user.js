const pool = require("../dbconfig");
const moment = require("moment");

class UserController {
  login(loginInfo) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (loginInfo.loginType === 0) {
          connection.query(
            `select * from user where username='${loginInfo.username}' and password = '${loginInfo.password}'`,
            function (err, res) {
              if (err) return false;
              console.log(res);
              resolve(res);
              connection.release();
            }
          );
        } else if (loginInfo.loginType === 1) {
          connection.query(
            `select * from user where telephone=${loginInfo.telephone} and password = '${loginInfo.password}'`,
            function (err, res) {
              if (err) return false;
              resolve(res);
              connection.release();
            }
          );
        } else {
          connection.query(
            `select * from user where email='${loginInfo.email}' and password = $'{loginInfo.password}'`,
            function (err, res) {
              if (err) return false;
              resolve(res);
              connection.release();
            }
          );
        }
      });
    });
  }

  register(userInfo) {
    return new Promise(function (resolve, reject) {
      const today = moment().format("YYYY-MM-DD");
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `select * from user where username = ${userInfo.username}`,
          function (err, result) {
            if (err) reject(err);
            if (result.length !== 0) {
              resolve("exist");
              connection.release();
            } else {
              connection.query(
                `insert into user (username,password,email,telephone,sex,type,state,registerDate) values ('${userInfo.username}','${userInfo.password}','${userInfo.email}','${userInfo.telephone}','${userInfo.sex}','0','0','${today}')`,
                (err, result) => {
                  if (err) reject(err);
                  resolve(result);
                  connection.release();
                }
              );
            }
          }
        );
      });
    });
  }

  resetPassword(userInfo) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        else {
          connection.query(
            `update user set password = ${userInfo.password} where id = ${userInfo.id}`,
            (err, result) => {
              if (err) reject(err);
              resolve(result);
              connection.release();
            }
          );
        }
      });
    });
  }
  getSubscribeCount(id) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `select COUNT(*) from subscribe where tarUserId = ${id}`,
          (err, result1) => {
            if (err) reject(err);
            connection.query(
              `select COUNT(*) from subscribe where srcUserId = ${id}`,
              (err, result2) => {
                if (err) reject(err);
                resolve({
                  fans: result1[0]["COUNT(*)"],
                  subscribe: result2[0]["COUNT(*)"],
                });
                connection.release();
              }
            );
          }
        );
      });
    });
  }
  SubScribeOthers(srcId, TarId) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `select * from subscribe where srcUserId = ${srcId} and tarUserId = ${TarId}`,
          (err, result) => {
            if (err) reject(err);
            console.log(result);
            if (result.length) {
              connection.query(
                `update subscribe set state = 0 where srcUserId = ${srcId} and tarUserId = ${TarId}`,
                (err, result2) => {
                  if (err) reject(err);
                  resolve(result2);
                  connection.release();
                }
              );
            } else {
              connection.query(`insert into subscribe (srcUserId,tarUserId,state) values (${srcId}, ${TarId}, 0)`, (err, result) => {
                if (err) reject(err)
                resolve(result)
              })
            }
          }
        );
      });
    });
  }
  getSubScribe(id, offset) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `select * from subscribe,user where subscribe.srcUserId = ${id} and subscribe.srcUserId = user.id limit 10 offset ${offset}`,
          (err, result) => {
            if (err) reject(err);
            resolve(result);
            connection.release();
          }
        );
      });
    });
  }
  getFans(id, offset) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `select * from subscribe,user where subscribe.tarUserId = ${id} and subscribe.tarUserId = user.id limit 10 offset ${offset}`,
          (err, result) => {
            if (err) reject(err);
            resolve(result);
            connection.release();
          }
        );
      });
    });
  }
  modifyUserInfo(Info) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        let sql = ''
        if (Info.avatar) {
          sql = `update user set username = '${Info.username}', avatar = '${Info.avatar}', email = '${Info.email}', telephone = '${Info.telephone}', sex= ${Info.sex} where id = ${Info.id}`
        } else {
          sql = `update user set username = '${Info.username}', email = '${Info.email}', telephone = '${Info.telephone}', sex= ${Info.sex} where id = ${Info.id}`
        }
        connection.query(sql,
          (err, result) => {
            if (err) reject(err);
            resolve(result);
            connection.release();
          }
        );
      });
    });
  }
  getUserInfo(id) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `select * from user where id = ${id}`,
          (err, result) => {
            if (err) reject(err);
            resolve(result[0]);
            connection.release();
          }
        );
      });
    });
  }
}

module.exports = new UserController();