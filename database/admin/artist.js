const { connect } = require("../../routes/admin");
const pool = require("../dbconfig");
class AdminArtistController {
  deleteArtist(singer) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `update artists set state = 1 where singer = ${singer}`,
          (err, result) => {
            if (err) reject(err);
            resolve(result);
            connection.release();
          }
        );
      });
    });
  }
  modifyArtist(artistInfo) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `update artists set name = '${artistInfo.name}',type = ${artistInfo.type} where singer=${singer.singer}`,
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

module.exports = new AdminArtistController();
