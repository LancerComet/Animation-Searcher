/*
   Index WebSocket Controller By LancerComet at 14:42, 2015.10.08.
   # Carry Your World #
   ---
   首页 WebSocket 控制器.

   Log:
   ---
   V0.1.0 - 22:44, 2015.10.08.
    - 新版的初版.
*/

var appConfig = require("../config/app-config");


// Definition: Count of visitors for now. | 当前站点在线人数统计对象.
var connection = {
    count: 0,
    date: null,
    console: function () {
        console.log(appConfig.consoleText.info);
        console.log("A new user is connected.");
        console.log("Total number of all users now is " + this.count + ".");
    }
};

// Definition: Peaking count of visitors. | 站点峰值访问量统计对象.
var maxConnection = {
    count: 0,
    date: null,
    refresh: function () {
        if(connection.count > maxConnection.count){
            this.count++;
            this.date = Date.now();

            var text = "guy";
            this.count > 1 ? text = "guys" : void(0);
            console.log(appConfig.consoleText.info);
            console.log("We have reached a new record just a few seconds before ! :)");
            console.log(this.count + " " + text + " is online at same time! That's Amazing! :)");
            console.log('That nice time is "' + new Date(this.date) + '". Bravo! :-)');
        }
    }
};

// Definition: Execute when a new user comes here. | 新连接统计刷新事件.
var newConnectionCount = function () {
    connection.count++;
    connection.console();
    maxConnection.refresh();
};


module.exports = function (io) {

    // New Connection Event Listener. | 新连接事件监听.
    io.on("connection", function (socket) {

        // First connection so send Greeting Message. | 第一次连接发送 Greeting 信息.
        socket.emit("greeting", {
            info: "Hello, my friend! :) | 哟骚年, 新来的? 提过来啪啪啪~",
            userNow: connection.count,
            maxUser: maxConnection.count
        });

        // Receive confirmation from client. | 确认客户端收到 Greeting.
        socket.on("thank-you-sir", function (data) {
            console.log(appConfig.consoleText.info);
            console.log("Bad ♂ Guy ♂ Coming ♂ Through: " + data.info);
            newConnectionCount();
        });

    });

};