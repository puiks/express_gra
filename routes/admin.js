const express = require("express");
const router = express.Router();
const userListRouter = require("./admin/userList");
router.use("/userList", userListRouter);

module.exports = router;
