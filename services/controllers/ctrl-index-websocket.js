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


// Definition: Count of visitors for now. | 当前站点在线人数.
var connection = {
    count: 0,
    date: null
};

// Definition: Peaking count of visitors. | 站点峰值访问量.
var maxConnection = {
    count: 0,
    date: null,
    refresh: function () {
        this.count++;
        this.date = Date.now();
    }
};


module.exports = function (io) {

    //
    io.on("connection", function (socket) {
        console.log("A user is connected.");
        connectionNum++;
    });

};