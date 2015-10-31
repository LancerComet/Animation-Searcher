/*
    Animation Searcher V2.0 Application.js Edited By LancerComet at 22:02, 2015.10.08.
    # Carry Your World #
    ---

    Description:
    ---
    程序主入口文件.

    Caution:
    ---
    程序引用了 Socket.io, 为了正常使用其内置路由 "/socket.io", 已不再使用 Express 框架的 www 文件, 转在 app.js 中直接设置服务器.
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

// Detective envouriment: "development" or not.
// 获取当前机器是否为开发环境.
// Windows 下在 cmd 中输入 "set NODE_ENV = development" 使得此机器进入开发环境. (定义了一个 NODE_ENV 环境变量.)
global.devStatus = app.get("env") === "development";
var appConfig = require("./services/config/app-config");

// Socket.io & Server Setup.
var port = process.env.PORT || 3000;
switch (global.devStatus) {
    case true:
        port = 3000;
        break;
    case false:
        port = 50001;
        break;
}
app.set("port", port);

var http = require("http").Server(app);
var io = require("socket.io")(http);


// WebSocket Service Initialization.
require("./services/controllers/ctrl-index-websocket")(io);

http.listen(port, function () {
    console.log(appConfig.appInfo.appName + " By © 2015 " + appConfig.appInfo.author + ".");
    console.log("Version: " + appConfig.appInfo.version);
    console.log(appConfig.appInfo.sign);
    console.log("Server is running at port " + app.get("port") + " in " + app.get("env") + " enviroument.");
});


// View Engine Setup. Using ".html" as extend name.
// 模板设置, 使用 ".html" 作为扩展名.
app.set("views", path.join(__dirname, "views"));
app.engine("html", ejs.__express);
app.set("view engine", "html");


// CORS is allowed.
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});



// Middle-ware configuration. | 中间件设置.
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(require("./services/middleware/mw-language"));  // Language Service. | 语言服务.

// Routes Requirement. | 路由引用.
var routes = require("./services/main-route");
app.use("/", routes);


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
