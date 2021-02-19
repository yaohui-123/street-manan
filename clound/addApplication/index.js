// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var obj = db.collection("application_table").add({
    data:{
      user_id:event.userId,
      street_id:event.streetId,
      reason:'',
      sell_goods:event.sellGoods,
      status:parseInt(0),
      date:event.date
    }
  })
  return obj
}