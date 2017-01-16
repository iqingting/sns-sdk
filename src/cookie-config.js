export default {
  /**
   * @param info { String } 设置的 cookie 值
   * @param expired { String } 设置的过期时间值
   * 向当前域名的 / 路径下设置 cookie
   */
  set({ info, expired }) {
    document.cookie = `snsInfo=${info}; Domain=${document.domain}; Path=/; Expires=${expired}`
  },

  /**
   * @param { String } info 需要写入的 cookie 值
   */
  add(info) {
    this.set({
      info: JSON.stringify(info),
      expired: 'Wed, 31 Dec 2098 16:00:00 GMT',
    })
  },

  remove() {
    this.set({
      info: '',
      expired: 'Thu, 01 Jan 1970 00:00:00 GMT',
    })
  },
}
