const express = require("express");
const router = express.Router();
const mailCode = require("../util/mailcode");
const {
  login,
  register,
  resetPassword,
  getSubscribeCount,
  SubScribeOthers,
  getFans,
  getSubScribe,
  modifyUserInfo,
  getUserInfo,
} = require("../database/default/user");

let authCode = null;
let ntime = null;
let formidable = require("formidable");
let path = require("path");

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

router.get("/mailCode", async (req, res) => {
  const {
    mail
  } = req.query;
  code = Math.floor(Math.random() * 1000000); // 验证码
  console.log(code);
  time = new Date().getTime(); // 存入验证码生成时的时间戳
  const result = await mailCode(
    mail,
    "请查收验证码",
    "您的验证码是: " + code + ",一分钟内有效"
  );
  res.send({
    status: 200,
    desc: "已发送",
  });
});

router.get("/authCode", async (req, res) => {
  const {
    code,
    time
  } = req.query;
  if (time - ntime >= 60 * 1000) {
    res.send({
      status: 403,
      desc: "验证码已过期，请重新获取",
    });
  } else {
    if (code === authCode) {
      res.send({
        status: 204,
        desc: "验证成功",
      });
    } else {
      res.send({
        status: 500,
        desc: "验证码错误",
      });
    }
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
  const {
    id
  } = req.query;
  const result = await getSubscribeCount(id);
  res.send({
    subscribe: result,
    status: 200,
  });
});

router.put("/subscribeOthers", async (req, res) => {
  const {
    srcId,
    tarId
  } = req.query;
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
  const {
    id,
    offset
  } = req.query;
  const result = await getFans(id, offset);
  res.send({
    fans: result,
    status: 200,
  });
});

router.get("/getSubscribe", async (req, res) => {
  const {
    id,
    offset
  } = req.query;
  console.log(req.query);
  const result = await getSubScribe(id, offset);
  res.send({
    subsribe: result,
    status: 200,
  });
});

router.post("/uploadAvatar", (req, res) => {
  let form = new formidable.IncomingForm();
  form.encoding = "utf-8"; // 编码
  // 保留扩展名
  form.keepExtensions = true;
  //文件存储路径 最后要注意加 '/' 否则会被存在public下
  form.uploadDir = path.join(__dirname, "../public/images/");
  // 解析 formData 数据

  form.parse(req, async (err, fields, files) => {
    if (err) return next(err);
    console.log(fields);
    console.log(files);
    let imgPath = files.avatar.path;
    let imgName = files.avatar.name;
    // let realName = imgPath.split(`public\\`)[1]
    const result = await uploadAvatar(req.query.id, "/images/" + imgName);
    // 返回路径和文件名
    if (result.affectedRows !== 0) {
      res.send({
        code: 1,
        data: {
          name: imgName,
          path: imgPath
        }
      });
    } else {
      res.send({
        status: "上传失败",
      });
    }
  });
});

router.get("/getSelfInfo", async (req, res) => {
  let {
    id
  } = req.query;
  const data = await getUserInfo(id);
  res.send({
    status: 200,
    data: data,
  });
});

router.put("/modifyUserInfo", async (req, res) => {
  let form = new formidable.IncomingForm();
  form.encoding = "utf-8"; // 编码
  // 保留扩展名
  form.keepExtensions = true;
  //文件存储路径 最后要注意加 '/' 否则会被存在public下
  form.uploadDir = path.join(__dirname, "../public/images/");
  // 解析 formData 数据

  form.parse(req, async (err, fields, files) => {
    if (err) return next(err);
    let imgName = files.avatar.path.split('images/')[1];
    fields.avatar = 'images/' + imgName
    const result = await modifyUserInfo(fields);
    if (result.affectedRows) {
      res.send({
        status: 200
      })
    } else {
      res.send({
        status: 500
      })
    }
  });
})
module.exports = router;