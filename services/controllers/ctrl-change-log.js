/*
 *  Change Log Loader By LancerComet at 13:52, 2015/10/11.
 *  # Carry Your World #
 *  ---
 *  更新日志读取控制器.
 *
 */

var fs = require("fs");

module.exports = function (req, res, next) {

    //var changeLog = fs.readFileSync("./services/change-log.html").toString();

    fs.readFile("./services/change-log.html", function (err, data) {
        if (err) {
            res.status(500).json({
                status: 500,
                info: "更新日志获取失败.",
                detail: err
            });
        } else {
            res.status(200).json({
                status: 200,
                title: "更新日志",
                content: data.toString()
            });
        }

    });

};
