const pool = require("../dbconfig");

const login = function (loginInfo) {
  let result = null;
  switch (loginInfo.loginType) {
    case 0:
      pool.getConnection((err, connection) => {
        connection.query(
          `select * from user where username=${loginInfo.username} and password = ${loginInfo.password}`,
          function (err, res) {
            if (err) return false;
            result = res;
            connection.release();
          }
        );
      });
      break;
      // case 1:
      //     result = await this.app.mysql.select('user', {
      //         where: {
      //             telephone: userInfo.telephone,
      //             password: userInfo.password
      //         }
      //     });
      //     break;
      // case 2:
      //     result = await this.app.mysql.select('user', {
      //         where: {
      //             email: userInfo.email,
      //             password: userInfo.password
      //         }
      //     });
      //     break;
      return result;
  }
};

module.exports = {
  login,
};
