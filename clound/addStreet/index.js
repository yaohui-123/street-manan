// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  // return event
  return db.collection("street_management_table").add({
    data:{
      x:event.x,
      y:event.y,
      status:parseInt(0),
      content:event.content
    }
  })
}