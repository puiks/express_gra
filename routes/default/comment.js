const express = require("express");
const router = express.Router();
const {
  getSongsComments,
  addComment,
} = require("../../database/default/comment");

router.get("/getSongsComments", async (req, res) => {
  const { sid, offset } = req.query;
  const data = await getSongsComments(sid, offset);
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
module.exports = router;
