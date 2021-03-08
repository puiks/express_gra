const express = require("express");
const router = express.Router();
const {
  login,
  register,
  resetPassword,
  getSubscribeCount,
  SubScribeOthers,
  getFans,
  getSubScribe,
} = require("../database/default/user");
const songListRouter = require("./default/songList");
const boardRouter = require("./default/board");
const commentRouter = require("./default/comment");
const artistRouter = require("./default/artist");
const cateListRouter = require("./default/cateList");
const blogRouter = require("./default/blog");

router.use("/songList", songListRouter);
router.use("/board", boardRouter);
router.use("/comment", commentRouter);
router.use("/artist", artistRouter);
router.use("/cateList", cateListRouter);
router.use("/blog", blogRouter);

router.post("/login", async (req, res) => {
  let loginInfo = req.body;
  console.log(loginInfo);
  const result = await login(loginInfo);
  console.log(result);
  if (result.length !== 0) {
    req.session.uid = new Date().getTime() + result[0].username;
    res.send({
      status: "200",
      desc: "成功登录",
      type: result[0].type,
      id: result[0].id,
    });
  } else {
    res.send({
      status: 400,
      desc: "账号或密码错误",
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

router.get("/getSubscribeCount", async (req, res) => {
  const { id } = req.query;
  const result = await getSubscribeCount(id);
  res.send({
    subscribe: result,
    status: 200,
  });
});

router.put("/subscribeOthers", async (req, res) => {
  const { srcId, tarId } = req.query;
  const result = await SubScribeOthers(srcId, tarId);
  if (result.affectedRows !== 0) {
    res.send({
      status: 204,
      desc: "关注成功",
    });
  } else {
    res.send({
      status: 500,
      desc: "关注失败",
    });
  }
});

router.get("/getFans", async (req, res) => {
  const { id, offset } = req.query;
  const result = await getFans(id, offset);
  res.send({
    fans: result,
    status: 200,
  });
});

router.get("/getSubscribe", async (req, res) => {
  const { id, offset } = req.query;
  console.log(req.query);
  const result = await getSubScribe(id, offset);
  res.send({
    subsribe: result,
    status: 200,
  });
});

module.exports = router;
