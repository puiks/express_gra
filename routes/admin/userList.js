const express = require("express");
const router = express.Router();
const { getUserList, updateUserState } = require("../../database/admin/user");

router.get("/getUserLists", async (req, res) => {
  const result = await getUserList();
  res.send({
    userLists: result,
  });
});

router.put("/updateUserState", async (req, res) => {
  const { id, state } = req.body;
  const result = await updateUserState(id, state);
  if (result.affectedRows) {
    res.send({
      status: 204,
      desc: "操作成功",
    });
  }
});
module.exports = router;
