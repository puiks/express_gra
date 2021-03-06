const pool = require("../dbconfig");
class AdminSongListController {
  deleteSongList(slid) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `update songlist set state = 1 where id = ${slid} `,
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

module.exports = new AdminSongListController();
