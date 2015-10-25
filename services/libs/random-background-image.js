/*
 *  Random Background Image By LancerComet at 21:45, 2015/10/20.
 *  # Carry Your World #
 */

// Definition: Random Background Image. | 随机背景模块.
var fs = require("fs");

module.exports = randomBackgroundImage;

try {
    var pictures = fs.readdirSync("./public/images/picked-up-background/");
    console.log("Animation Searcher V2.0 Init: " + pictures.length + " pictures has been found.");
} catch (tryErr) {
    throw new Error("Animation Searcher V2 Error: Background Image Read Error: \n" + tryErr);
}

function randomBackgroundImage () {

    var pictures = null;
    try {
        pictures = fs.readdirSync("./public/images/picked-up-background/");
    } catch (tryErr) {
        console.log("Animation Searcher V2.0 Error: Background Image Read Error: \n" + tryErr);
    }
    var urlPrefix = "/images/picked-up-background/";
    var randomNum = Math.floor(Math.random() * pictures.length);
    return urlPrefix + pictures[randomNum];

}