function mock() {
  let data = {
    success: true,
    data: {
      user_id: 1
    },
    msg: '请求成功'
  }
  return data
}
// function mock() {
//   let data = {
//     success: false,
//     data: 'http://m.baidu.com',
//     msg: '请求成功'
//   }
//   return data
// }
module.exports = mock