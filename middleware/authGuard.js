const AuthGuard = function (req, res, next) {
  if (req.url !== "/user/login" && !req.session.uid) {
    res.send({
      status: 403,
      desc: "请先登录",
    });
  } else {
    next();
  }
};

module.exports = AuthGuard;
