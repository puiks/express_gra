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
  addSongList(title, userInfo) {
    return new Promise(function (resolve, reject) {
      const today = moment().format("YYYY-MM-DD");
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `insert into songlist (slname,ownerid,ownername,createTime,state,picUrl) VALUES ('${title}',${userInfo.ownerid},'${userInfo.ownername}','${today}',0,'https://www.hualigs.cn/image/604ccd6f99c05.jpg')`,
          (err, result1) => {
            if (err) reject(err);
            resolve(result1);
            connection.release();
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
  getMySongList(id) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `select * from songlist where ownerid = ${id}`,
          (err, result) => {
            if (err) reject(err);
            resolve(result);
            connection.release();
          }
        );
      });
    });
  }
  getCollectSongList(id) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `select * from sltouser, songlist where sltouser.uid = ${id} and sltouser.slid = songlist.id`,
          (err, result) => {
            if (err) reject(err);
            resolve(result);
            connection.release();
          }
        );
      });
    });
  }
  addSongIntoSongList(slid, id) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `insert into stosl (slid,sid,state) values (${slid},${id},0)`,
          (err, result) => {
            if (err) reject(err);
            resolve(result);
            connection.release();
          }
        );
      });
    });
  }
  getSongListByName(name, offset) {
    return new Promise(function (resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(
          `select * from songList where slname like '%${name}%' limit 10 offset ${offset}`,
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
