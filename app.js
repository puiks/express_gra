const express = require("express");
const app = express();
const session = require("express-session");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cache = require("./util/apicache").middleware;
const { cookieToJson } = require("./util/index");
const request = require("./util/request");
//router
const userRouter = require("./routes/default");
const adminRouter = require("./routes/admin");
const authGuard = require("./middleware/authGuard");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
// CORS & Preflight request
app.use((req, res, next) => {
  if (req.path !== "/" && !req.path.includes(".")) {
    res.set({
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": req.headers.origin || "*",
      "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
      "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
      "Content-Type": "application/json; charset=utf-8",
    });
  }
  req.method === "OPTIONS" ? res.status(204).end() : next();
});

// cookie parser
app.use((req, res, next) => {
  req.cookies = {};
  (req.headers.cookie || "").split(/\s*;\s*/).forEach((pair) => {
    let crack = pair.indexOf("=");
    if (crack < 1 || crack == pair.length - 1) return;
    req.cookies[
      decodeURIComponent(pair.slice(0, crack)).trim()
    ] = decodeURIComponent(pair.slice(crack + 1)).trim();
  });
  next();
});

// app.use("/", authGuard);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cache处理;
app.use(cache("2 minutes", (req, res) => res.statusCode === 200));

fs.readdirSync(path.join(__dirname, "module"))
  .reverse()
  .forEach((file) => {
    if (!file.endsWith(".js")) return;
    let route = "/" + file.replace(/\.js$/i, "").replace(/_/g, "/");
    // 引入真正的请求地址
    let realRequest = require(path.join(__dirname, "module", file));

    app.use(route, (req, res) => {
      if (typeof req.query.cookie === "string") {
        req.query.cookie = cookieToJson(req.query.cookie);
      }
      let query = Object.assign(
        {},
        { cookie: req.cookies },
        req.query,
        req.body,
        req.files
      );

      realRequest(query, request)
        .then((result) => {
          res.append("Set-Cookie", result.cookie);
          res.status(result.status).send(result.body);
        })
        .catch((err) => {
          if (err.body.code == "301") err.body.msg = "请先登录";
          res.append("Set-Cookie", err.cookie);
          res.status(err.status).send(err.body);
        });
    });
  });

app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.listen(3000, function () {
  console.log("i m running on the 3000 port");
});
