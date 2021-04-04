const express = require("express");
const { off } = require("../../database/dbconfig");
const router = express.Router();
const {
  getSongsComments,
  addComment,
  likeComment,
  getSubSongsComments,
} = require("../../database/default/comment");

router.get("/getSongsComments", async (req, res) => {
  const { sid, offset } = req.query;
  const data = await getSongsComments(sid, offset);
  console.log(data);
  res.send({
    comments: data,
    status: 204,
  });
});

router.post("/addComment", async (req, res) => {
  const commentInfo = req.body;
  const data = await addComment(commentInfo);
  if (data.affectedRows !== 0) {
    res.send({
      status: 204,
      desc: "发表成功",
    });
  } else {
    res.send({
      status: 500,
      desc: "发表失败",
    });
  }
});

router.put("/likeComment", async (req, res) => {
  const { favor, id } = req.query;
  console.log(favor);
  console.log(id);
  const data = await likeComment(favor, id);
  if (data.affectedRows !== 0) {
    res.send({
      status: 204,
      desc: "点赞成功",
    });
  } else {
    res.send({
      status: 500,
      desc: "点赞失败",
    });
  }
});

router.get("/getSubSongsComments", async (req, res) => {
  const { relateTo, offset } = req.query;
  const data = await getSubSongsComments(relateTo, offset);
  res.send({
    comments: data,
    status: 204,
  });
});

module.exports = router;
