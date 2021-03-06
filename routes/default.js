const express = require("express");
const router = express.Router();
const { login, register, resetPassword } = require("../database/default/user");
const songListRouter = require("./default/songList");
const boardRouter = require("./default/board");
const commentRouter = require("./default/comment");
const artistRouter = require("./default/artist");

router.use("/songList", songListRouter);
router.use("/board", boardRouter);
router.use("/comment", commentRouter);
router.use("/artist", artistRouter);

router.post("/login", async (req, res) => {
  let loginInfo = req.body;
  const result = await login(loginInfo);
  if (result.length !== 0) {
    req.session.uid = new Date().getTime() + result[0].username;
    res.send({
      status: "200",
      desc: "成功登录",
      type: result[0].type,
      id: result[0].id,
    });
  }
});

router.post("/register", async (req, res) => {
  let userInfo = req.body;
  const result = await register(userInfo);
  if (result.affectedRows !== 0) {
    res.send({
      status: "200",
      desc: "成功注册",
    });
  } else {
    res.send({
      status: "501",
      desc: "注册失败",
    });
  }
});

router.put("/resetPassword", async (req, res) => {
  let userInfo = req.body;
  const result = await resetPassword(userInfo);
  if (result.affectedRows !== 0) {
    res.send({
      status: 204,
      desc: "成功修改密码",
    });
  } else {
    res.send({
      status: 501,
      desc: "修改失败",
    });
  }
});

router.get("/logout", (req, res) => {
  req.session.openId = "";
  res.send({
    status: 204,
    desc: "已退出登录",
  });
});

module.exports = router;
