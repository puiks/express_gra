const express = require("express");
const router = express.Router();
const { deleteSongList } = require("../../database/admin/songList");

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

module.exports = router;
