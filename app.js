const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const loginRouter = require("./routes/login");
const adminRouter = require("./routes/admin");

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/pk", loginRouter);
app.use("/admin", adminRouter);

app.listen(3000, function () {
  console.log("i m running on the 3000 port");
});
