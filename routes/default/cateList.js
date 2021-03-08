const express = require("express");
const router = express.Router();
const { getAllCateList } = require("../../database/default/cateList");

router.get("/getAllCateList", async (req, res) => {
  const result = await getAllCateList();
  res.send({
    result,
  });
});

module.exports = router;
