/**
 * @param { String | * } 需要被 JSON.parse() 的字符串
 * @return { Object } 被正确解析后的对象，反之返回一个空对象
 */
export default function(text) {
  try {
    return JSON.parse(text) || {}
  } catch (error) {
    return {}
  }
}
