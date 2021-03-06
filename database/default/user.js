const pool = require("../dbconfig");
const moment = require("moment");

class UserController {
  login(loginInfo) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (loginInfo.loginType === 0) {
          connection.query(
            `select * from user where username=${loginInfo.username} and password = ${loginInfo.password}`,
            function (err, res) {
              if (err) return false;
              resolve(res);
              connection.release();
            }
          );
        } else if (loginInfo.loginType === 1) {
          connection.query(
            `select * from user where telephone=${loginInfo.telephone} and password = ${loginInfo.password}`,
            function (err, res) {
              if (err) return false;
              resolve(res);
              connection.release();
            }
          );
        } else {
          connection.query(
            `select * from user where email=${loginInfo.email} and password = ${loginInfo.password}`,
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
}

module.exports = new UserController();
