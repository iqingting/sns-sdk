/**
 * @return { String } 当前环境，weixin/qq/weibo/browser 之一。用来确定如何进行授权
 */
export default (function() {
  const UA = navigator.userAgent

  switch(true) {
    case /MicroMessenger/i.test(UA):
      return 'weixin'
      break
    case /QQ/i.test(UA):
      return 'qq'
      break
    case /weibo/.test(UA):
      return 'weibo'
      break
    default:
      return 'browser'
      break
  }
})
