// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var obj = db.collection("user_table").add({
    data:{
      username:event.username,
      password:event.password,
      authority:event.authority,
      status:parseInt(0)
    }
  })
  return obj
}