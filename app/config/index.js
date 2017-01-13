/**
 * Animation Searcher V2.0 Configuration By LancerComet at 22:15, 2015.10.08.
 * # Carry Your World #
 * ---
 * APP Configuration.
 */
const packageJSON = require('../../package.json')

const config = {
  appInfo: {
    name: 'Animation Seacher V3.0',
    version: packageJSON.version,
    codeName: 'Renascence.'
  },

  site: {
    caso: { name: '华盟', codeName: 'caso', fullName: 'China Animation Subtitle Organization', url: 'https://camoe.org', icon: 'http://tp4.sinaimg.cn/1843885343/180/1290319229/0', disabled: false },
    ktxp: { name: '极影', codeName: 'ktxp', fullName: 'Katong XP', url: 'http://bt.ktxp.org', icon: 'http://tp4.sinaimg.cn/3808818207/180/5680524263/0', disabled: false },
    popgo: { name: '漫游', codeName: 'popgo', fullName: 'Popgo', url: 'http://share.popgo.org', icon: 'http://tp1.sinaimg.cn/2661910672/180/5727241391/0', disabled: false },
    dmhy: { name: '动漫花园', codeName: 'dmhy', fullName: 'DongMan HuaYuan', url: 'https://share.dmhy.org', icon: 'http://tp2.sinaimg.cn/1926582581/180/22817929400/0', disabled: false }
  }
}

module.exports = config
