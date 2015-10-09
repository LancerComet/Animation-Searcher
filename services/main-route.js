/*
    Routes Main Requirement By LancerComet at 22:08, 2015.10.08.
    # Carry Your World #
    ---
    路由引用文件.
 */

"use strict";

var express = require("express");
var router = express.Router();



// Definition: Controllers Requirements. | 控制器引用定义.  
var modules = {
    index: require("./controllers/ctrl-index"),
    search: require("./controllers/ctrl-search"),
    error: require("./controllers/ctrl-error")
};



// Definition: Routers Setup. | 路由设置.

// Index Page Router.
router.get("/", modules.index);

// Search Module.
router.post("/search/caso", modules.search);
router.post("/search/ktxp", modules.search);
router.post("/search/popgo", modules.search);
router.post("/search/dmhy", modules.search);

// Other Routes.
// ...

// Other Requests Return 404.
router.all("*", modules.error[404]);



module.exports = router;