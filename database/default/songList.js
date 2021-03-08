const pool = require("../dbconfig");
const moment = require("moment");
class UserSongListController {
  getAllSongLists(offset, type) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        let sql = "";
        if (type && type !== "全部") {
          sql = `select * from songlist where cate = '${type}'  limit 10 offset ${offset} `;
        } else {
          sql = `select * from songlist limit 10 offset ${offset}`;
        }
        connection.query(sql, (err, result) => {
          if (err) reject(err);
          resolve(result);
          connection.release();
        });
      });
    });
  }
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
  getSongListById(slid) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `select * from songlist where id = ${slid}`,
          (err, result1) => {
            if (err) reject(err);
            connection.query(
              `select * from stosl where slid = ${slid}`,
              (err, result2) => {
                if (err) reject(err);
                result1[0].songs = [];
                result2.forEach((item) => {
                  result1[0].songs.push(item.sid);
                });
                resolve(result1);
                connection.release();
              }
            );
          }
        );
      });
    });
  }
  updateSongList(songlist, slid, songs) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `update songlist set slname =${songlist.slname},desc = ${songlist.desc} where id = ${slid}`,
          (err, result) => {
            if (err) reject(err);
            resolve(result);
            connection.release();
          }
        );
      });
    });
  }
  addSongList(songList, songs) {
    return new Promise(function (resolve, reject) {
      const today = moment().format("YYYY-MM-DD");
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `insert into songlist (slname,ownerid,ownername,desc,createTime,type,state) VALUES (${songlist.slname},${songlist.ownerid},${songlist.ownername},${songlist.desc},${today},${songlist.type},0)`,
          (err, result1) => {
            if (err) reject(err);
            let sql = `insert into stosl (slid,sid) values `;
            songs.forEach((item) => {
              sql += `(${result1.insertId},${item}),`;
            });
            sql = sql.substr(0, sql.length - 1);
            connection.query(sql, (err) => {
              if (err) reject(err);
              resolve({ success: true });
              connection.release();
            });
          }
        );
      });
    });
  }
  collectSongList(slid, uid) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `select * from sltouser where slid = ${slid} and uid = ${uid}`,
          (err, result) => {
            if (err) reject(err);
            if (result.length) {
              connection.query(
                `update sltouser set state = 0 where slid = ${slid} and uid = ${uid}`,
                (err, result1) => {
                  if (err) reject(err);
                  resolve(result1);
                  connection.release();
                }
              );
            } else {
              connection.query(
                `insert into sltouser (slid,uid,state) VALUE ${slid},${uid},0`,
                (err, result2) => {
                  if (err) reject(err);
                  resolve(result2);
                  connection.release();
                }
              );
            }
          }
        );
      });
    });
  }
  unCollectSongList(slid, uid) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `update sltouser set state = 1 where slid = ${slid} and uid = ${uid}`,
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

module.exports = new UserSongListController();
