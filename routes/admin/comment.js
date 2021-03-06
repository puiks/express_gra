const express = require("express");
const router = express.Router();
const {
  getAllComments,
  deleteComment,
} = require("../../database/admin/comment");

router.get("/getAllComments", async (req, res) => {
  const result = await getAllComments();
  res.send({
    commentList: result,
    status: 200,
  });
});

router.delete("deleteComment", async (req, res) => {
  const commentInfo = req.body;
  const result = await deleteComment(commentInfo);
  if (result.affectedRows === 1) {
    res.send({
      status: 204,
      desc: "删除成功",
    });
  } else {
    res.send({
      status: 500,
      desc: "删除失败",
    });
  }
});

module.exports = router;
