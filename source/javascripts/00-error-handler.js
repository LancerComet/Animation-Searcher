/*
 *  Animation Searcher Angular Application By LancerComet at 12:29, 2015/10/9.
 *  # Carry Your World #
 *  ---
 *  Error Handler when Initialization.
 *  错误处理机: No Angular, Old Browser, ect.
 *
 */

;(function errorHandler () {

    // Angular incorrect.
    if (!angular) {
        throw new Error("Animation Searcher Error: Please make sure Angular.JS is loaded Correctly.");
        // Using "throw new Error" to block application.
    }

    // Old Browser Detection.
    function oldBrowserHint () {
        global.location.href = "/old-browser";
        throw new Error("Animation Searcher Error: Your Browser is too old, time to change! :)");
        // Using "throw new Error" to block application.
    }

    var userAgent = global.navigator.userAgent;
    var oldExpReg = /MSIE [1-8].*]/i;
    userAgent.match(oldExpReg) ? oldBrowserHint () : void(0);

})();