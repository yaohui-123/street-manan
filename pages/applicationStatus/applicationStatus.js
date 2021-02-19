// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    status: ["通过", "不通过"],
    statusIndex: 0,
    id:0
  },
  onLoad(option) {
    console.log(option)
    this.setData({
      id:option.id
    })
  },
  formSubmit(e) {
    const that = this
    console.log(this.data.statusIndex,this.data.id)
    console.log(e.detail.value)
    wx.cloud.callFunction({
      name:"updateApplication",
      //传递参数
      data:{
        reason:e.detail.value.reason,
        id:that.data.id,
        status:that.data.statusIndex+1
      }
    }).then(res =>{
      console.log(res)
      wx.switchTab({
        url: '/pages/applicationTable/applicationTable'
      })
    })
    .catch(erro => {
      console.log(erro)
    })
  },
  bindCountryChange(e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
        statusIndex: e.detail.value
    })
  }
})
