/*
    Animation Searcher V2.0 Application.js Edited By LancerComet at 22:02, 2015.10.08.
    # Carry Your World #
    ---
    程序主入口文件.
*/

// Third-part libs Requirement. | 三方库引用.
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var app = express();

// Socket.io Setup.
var http = require("http").Server(app);
var io = require("socket.io")(http);

// View Engine Setup. Using ".html" as extend name.
// 模板设置, 使用 ".html" 作为扩展名.
app.set("views", path.join(__dirname, "views"));
app.engine("html", ejs.__express);
app.set("view engine", "html");

// Middle-ware configuration. | 中间件设置.
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes Requirement. | 路由引用.
var routes = require("./services/main-route");
app.use("/", routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});


module.exports = app;
