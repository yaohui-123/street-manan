// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var obj = db.collection("application_table").aggregate()
  .lookup({
    from: "user_table",
    localField: 'user_id',
    foreignField: '_id',
    as: 'user'
  })
  .lookup({
    from: "street_management_table",
    localField: 'street_id',
    foreignField: '_id',
    as: 'street'
  }).end()
  return obj
}