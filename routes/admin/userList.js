const express = require("express");
const router = express.Router();
const { getUserList } = require("../../database/admin/user");

router.get("/getUserLists", async (req, res) => {
  const result = await getUserList();
  res.send({
    userLists: result,
  });
});
module.exports = router;
