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
    changeLog: require("./controllers/ctrl-change-log"),
    error: require("./controllers/ctrl-error")
};



// Definition: Routers Setup. | 路由设置.

// Index Page Router.
router.get("/", modules.index);
router.post("/change-log", modules.changeLog);

// Search Module.
router.post("/search/caso", modules.search);
router.post("/search/ktxp", modules.search);
router.post("/search/popgo", modules.search);
router.post("/search/dmhy", modules.search);

// Other Routes.
// ...

// Other Requests Return 404.
//router.all("*", modules.error[404]);

// Other Requests will be handled by Index Controller in order to use Angular's Frontend Router.
// 将其他所有请求交给 Index 控制器, 这样就可以使用 Angular 的前端路由.
router.all("*", modules.index);


module.exports = router;