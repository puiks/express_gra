const pool = require("../dbconfig");
const moment = require("moment");
class AdminBoardController {
  addBoard(boardInfo) {
    let today = moment().format("YYYY-MM-DD HH:mm:ss");
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `insert into board (title,content,username,releaseTime,state) VALUES ('${boardInfo.title}','${boardInfo.content}','${boardInfo.username}','${today}',0)`,
          (err, result) => {
            if (err) reject(err);
            resolve(result);
            connection.release();
          }
        );
      });
    });
  }
  editBoard(board) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `update board set title='${board.title}', content='${board.content}' where id=${board.id}`,
          (err, result) => {
            if (err) reject(err);
            resolve(result);
            connection.release();
          }
        );
      });
    });
  }
  deleteBoard(id) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `update board set state = 1 where id = ${id}`,
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

module.exports = new AdminBoardController();
