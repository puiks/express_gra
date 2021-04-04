const express = require("express");
const router = express.Router();
const {
  getAllSongLists,
  deleteSongList,
  getSongListById,
  updateSongList,
  addSongList,
  collectSongList,
  unCollectSongList,
  getMySongList,
  getCollectSongList,
  addSongIntoSongList,
  getSongListByName,
} = require("../../database/default/songList");

router.get("/getAllSongLists", async (req, res) => {
  const { offset, type } = req.query;
  console.log(type);
  const result = await getAllSongLists(offset, type);
  res.send({
    status: 200,
    desc: "获取成功",
    songLists: result,
  });
});

router.delete("/deleteSongList", async (req, res) => {
  const { slid } = req.params;
  console.log(slid);
});

router.get("/getSongListById", async (req, res) => {
  const { slid } = req.query;
  const data = await getSongListById(slid);
  res.send({
    status: 200,
    songList: data[0],
  });
});

router.put("/updateSongList", async (req, res) => {
  const { songList, slid } = req.body;
  const data = await updateSongList(songList, slid);
  if (data.affectedRows !== 0) {
    res.send({
      status: 204,
      desc: "更新成功",
    });
  }
});

router.post("/addSongList", async (req, res) => {
  const { title, userInfo } = req.body;
  const result = await addSongList(title, userInfo);
  if (result.affectedRows !== 0) {
    res.send({
      status: 204,
      desc: "添加成功",
    });
  } else {
    res.send({
      status: 500,
      desc: "添加失败",
    });
  }
});

router.post("/collectSongList", async (req, res) => {
  const { slid, uid } = req.query;
  const result = await collectSongList(slid, uid);
  if (result.affectedRows !== 0) {
    res.send({
      status: 204,
      desc: "添加成功",
    });
  } else {
    res.send({
      status: 500,
      desc: "添加失败",
    });
  }
});

router.delete("/unCollectSongList", async (req, res) => {
  const { slid, uid } = req.query;
  const result = await unCollectSongList(slid, uid);
  if (result.affectedRows !== 0) {
    res.send({
      status: 204,
      desc: "添加成功",
    });
  } else {
    res.send({
      status: 500,
      desc: "添加失败",
    });
  }
});

router.get("/getMySongList", async (req, res) => {
  const { id } = req.query;
  const data = await getMySongList(id);
  res.send({
    mySongList: data,
    status: 200,
  });
});

router.get("/getCollectSongList", async (req, res) => {
  const { id } = req.query;
  const data = await getCollectSongList(id);
  res.send({
    status: 200,
    collectSongList: data,
  });
});

router.post("/addSongIntoSongList", async (req, res) => {
  const { slid, id } = req.query;
  const data = await addSongIntoSongList(slid, id);
  if (data.affectedRows !== 200) {
    res.send({
      status: 204,
      desc: "添加成功",
    });
  } else {
    res.send({
      status: 500,
      desc: "添加失败",
    });
  }
});

router.get("/getSongListByName", async (req, res) => {
  const { name } = req.query;
  const result = await getSongListByName(name);
  res.send({
    songList: result,
    status: 200,
  });
});

module.exports = router;
