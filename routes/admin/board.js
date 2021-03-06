const express = require("express");
const router = express.Router();
const {
  addBoard,
  editBoard,
  deleteBoard,
} = require("../../database/admin/board");

router.post("/addBoard", async (req, res) => {
  const boardInfo = req.body;
  const result = await addBoard(boardInfo);
  if (result.affectedRows === 1) {
    res.send({
      status: 204,
      desc: "发布成功",
    });
  } else {
    res.send({
      status: 500,
      desc: "发布失败",
    });
  }
});

router.put("/editBoard", async (req, res) => {
  const { board } = req.body;
  const data = await editBoard(board);
  if (data.affectedRows === 1) {
    res.send({
      status: 204,
      desc: "更新成功",
    });
  } else {
    res.send({
      status: 500,
      desc: "更新失败",
    });
  }
});

router.delete("/deleteBoard", async (req, res) => {
  const { bid } = req.query;
  const data = await deleteBoard(bid);
  if (data.affectedRows === 1) {
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
