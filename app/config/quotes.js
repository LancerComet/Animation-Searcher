/*
 *  Random Title Departed By LancerComet at 11:11, 2015/10/09.
 *  # Carry Your World #
 */

module.exports = function () {
  const texts = [
    '动画，漫画，音乐，字幕组……',
    '探しにゆくんだ、そこへ。',
    '拾起从身边偷跑的幸福.',
    '不要飘忽他人来获得优越感.',
    '艺术家都是同样的黑色.',
    '记忆的碎片是否尚在.',
    '承认错误并及时退出.',
    '随风而逝.',
    'Carry Your World.',
    '用自己的喜好压制别人的风格.'
  ]
  const randomIndex = Math.floor(Math.random() * texts.length)
  return texts[randomIndex]
}
