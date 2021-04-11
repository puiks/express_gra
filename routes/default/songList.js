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

let formidable = require("formidable");
let path = require("path");

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
  let form = new formidable.IncomingForm();
  form.encoding = "utf-8"; // 编码
  // 保留扩展名
  form.keepExtensions = true;
  //文件存储路径 最后要注意加 '/' 否则会被存在public下
  form.uploadDir = path.join(__dirname, "../../public/images/");
  // 解析 formData 数据

  form.parse(req, async (err, fields, files) => {
    if (err) return next(err);
    console.log(files);
    console.log('----');
    console.log(fields);
    let imgName = files.picUrl.path.split('images/')[1];
    fields.picUrl = 'images/' + imgName
    const result = await updateSongList(fields);
    if (result.affectedRows) {
      res.send({
        status: 204
      })
    } else {
      res.send({
        status: 500
      })
    }
  });
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
  const { name, offset } = req.query;
  const result = await getSongListByName(name,offset);
  res.send({
    songList: result,
    status: 200,
  });
});

module.exports = router;
