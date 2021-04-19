const express = require("express");
let formidable = require("formidable");
let path = require("path");
const fs = require("fs");
const router = express.Router();
const {
  releaseBlog,
  getBlogByBlogId,
  getBlogByUserId,
  likeBlog,
} = require("../../database/default/blog");

router.post("/releaseBlog", async (req, res) => {
  const { blogInfo } = req.body;
  console.log(blogInfo);
  const result = await releaseBlog(blogInfo);
  if (result.affectedRows !== 0) {
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

router.get("/getBlogByBlogId", async (req, res) => {
  const { offset, bid } = req.query;
  const result = await getBlogByBlogId(bid, offset);
  res.send({
    blog: result[0],
    status: 200,
  });
});

router.get("/getBlogByUserId", async (req, res) => {
  const { offset, uid } = req.query;
  const result = await getBlogByUserId(uid, offset);
  res.send({
    blogs: result,
    status: 200,
  });
});

router.put("/likeBlog", async (req, res) => {
  const { like, bid } = req.query;
  const result = await getBlogByUserId(like, bid);
  if (result.affectedRows !== 0) {
    res.send({
      status: 204,
      desc: "点赞成功",
    });
  } else {
    res.send({
      status: 500,
      desc: "点赞失败",
    });
  }
});

router.post("/uploadPicture", async (req, res) => {
  let form = new formidable.IncomingForm();
  form.encoding = "utf-8"; // 编码
  // 保留扩展名
  form.keepExtensions = true;
  //文件存储路径 最后要注意加 '/' 否则会被存在public下
  form.uploadDir = path.join(__dirname, "../../public/images/");
  // 解析 formData 数据

  form.parse(req, async (err, fields, files) => {
    if (err) return next(err);
    console.log(files);
    let imgPath = files.avatar.path;
    let imgName = path.join(
      __dirname,
      "../../public/images/" + files.avatar.name
    );
    fs.rename(imgPath, imgName, function (err) {
      if (err) {
        throw Error("改名失败");
      }
    });
    res.send({
      imgUrl: "http://127.0.0.1:3000/images/" + imgName,
      status: 200,
    });
  });
});

module.exports = router;
