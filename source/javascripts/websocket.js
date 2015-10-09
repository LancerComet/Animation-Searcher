/*
 *  Animation Searcher WebSocket Service By LancerComet at 15:27, 2015/10/9.
 *  # Carry Your World #
 *  ---
 *
 *  Description:
 *  ---
 *  Animation Searcher 的 WebSocket 服务逻辑.
 *
 *  Log:
 *  ---
 *  V0.1.0 - 15:27, 2015.10.09.
 *   - 初版.
 *
 */

(function (global, angular, undefined) {

    var consoleTextPrefix = "Animation Searcher ";

    // Definition: WebSocket event handler for window. | WebSocket 服务逻辑.
    function socketService () {

        // Error Handler: No Socket.io. | Socket.io 未载入.
        if(!global.io){
            throw new Error(consoleTextPrefix + "Error: Socket.io isn't loaded yet, scripts has been stoped.");
        }

        // Definition: WebSocket Object.
        var socket = global.io();

        // Connected.
        socket.on("greeting", function (data) {
            console.log(consoleTextPrefix + "Info: WebSocket from now on. :)");
            socket.emit("thank-you-sir", {info: "啊♂啊♂Thank♂You♂Sir"});
        });

    }

    angular.element(window).on("load", socketService);

})(window, window.angular);