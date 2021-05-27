const express = require("express");
const router = express.Router();
const {
  deleteSongList,
  getSongListType,
} = require("../../database/admin/songList");

router.delete("/deleteSongList", async (req, res) => {
  const { slid } = req.query;
  const result = await deleteSongList(slid);
  if (result.affectedRows !== 0) {
    res.send({
      status: 204,
      desc: "删除成功",
    });
  }
});

router.get("/getSongListType", async (req, res) => {
  const result = await getSongListType();
  res.send({
    analysisList: result,
    status: 200
  })
});

module.exports = router;
