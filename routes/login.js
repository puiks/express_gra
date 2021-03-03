const express = require("express");
const router = express.Router();
const { login } = require("../database/default/user");

router.post("/", (req, res) => {
  let loginInfo = req.body;
  const result = login(loginInfo);
  console.log(result.id);
  res.send("ns");
});

module.exports = router;
