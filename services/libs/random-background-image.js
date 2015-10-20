/*
 *  Random Background Image By LancerComet at 21:45, 2015/10/20.
 *  # Carry Your World #
 */

module.exports = randomBackgroundImage;

// Definition: Random Background Image. | 随机背景模块.
function randomBackgroundImage () {

    var urlPrefix = "/images/picked-up-background/";
    var randomNum = Math.ceil(Math.random() * 6);
    randomNum < 10 ? randomNum = "0" + randomNum.toString() + ".jpg" : void(0);
    return urlPrefix + randomNum;

}