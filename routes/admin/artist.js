const express = require("express");
const router = express.Router();
const { deleteArtist, modifyArtist } = require("../../database/admin/artist");

router.delete("/deleteArtist", async (req, res) => {
  const { singer } = req.query;
  const data = await deleteArtist(singer);
  if (data.affectedRows !== 0) {
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

router.put("/modifyArtist", async (req, res) => {
  const artistInfo = req.body;
  const data = await modifyArtist(artistInfo);
  if (data.affectedRows !== 0) {
    res.send({
      status: 204,
      desc: "修改成功",
    });
  } else {
    res.send({
      status: 500,
      desc: "修改失败",
    });
  }
});

module.exports = router;
