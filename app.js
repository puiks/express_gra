const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const loginRouter = require("./routes/login");
// app.use("/", require("./middleware/authGuard"));
app.use("/login", loginRouter);

app.listen(3000, function () {
  console.log("i m running on the 3000 port");
});
