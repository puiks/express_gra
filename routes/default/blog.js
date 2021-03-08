const express = require("express");
const router = express.Router();
const {
  releaseBlog,
  getBlogByBlogId,
  getBlogByUserId,
  likeBlog,
} = require("../../database/default/blog");

router.post("/releaseBlog", async (req, res) => {
  const { blogInfo } = req.body;
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
  const result = await getBlogByUserId(offset, uid);
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
module.exports = router;
