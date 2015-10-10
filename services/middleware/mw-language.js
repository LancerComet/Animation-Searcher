/*
 *  Animation Searcher Language Service By LancerComet at 11:18, 2015.10.10.
 *  # Carry Your World #
 *  ---
 *
 *  Description:
 *  ---
 *  Animation Searcher 的语言服务.
 *  Only English and Chinese are supported. | 仅支持英语和中文. (这不废话 （╯－＿－）╯╧╧ )
 *
 *  Log:
 *  ---
 *  V0.1.0 - 11:18, 2015.10.10.
 *   - 初版.
 *
 */

module.exports = langService;

function langService (req, res, next) {

    // Action: Get "accept-language" from req.headers.
    // 获取客户端接收的语言类型.

    var acceptLanguage = req.headers["accept-language"].toString().toLowerCase();

    if (acceptLanguage === "zh-cn"  // Chinese: P.R.C. | 我朝.
        || acceptLanguage === "zh-chs"  // Simplified Chinese. | 简体中文.
        || acceptLanguage === "zh-cht"  // Traditional Chinese | 繁体中文.
        || acceptLanguage === "zh-tw"   // Chinese: Taiwan. | 湾湾.
        || acceptLanguage === "zh-hk"   // Chinese: HongKong SAR. | 特区.
        || acceptLanguage === "zh-mo"   // Chinese: Macau SAR. | 赌场.
        || acceptLanguage === "zh-sg"   // Chinese: Singapore. | 花园.
        || acceptLanguage.indexOf("zh-cmn") > -1  // Chinese: New Standard Definition. | 真正的国际标准写法: "zh-cmn-Hans-地区代号".
    ) {

    } else {
        // 其他所有语言以英语对待.

    }

    next();
}