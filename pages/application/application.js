// pages/application/application.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formValue: {
      userId:'',
      streetId:'',
      status:0,
      sellGoods:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('申请位置',options)
    this.setData({
      formValue: {
        userId: options.userId,
        streetId: options.streetId,
      }
    })
  },
  formSubmit(e) {
    console.log(e)
    //调用云函数
    wx.cloud.callFunction({
      name:"addApplication",
      //传递参数
      data:{
        streetId:e.detail.value.streetId,
        userId:e.detail.value.userId,
        sellGoods:e.detail.value.sellGoods,
        date: new Date()
      }
    }).then(res =>{
      console.log("插入成功",res)
      wx.cloud.callFunction({
        name:"updateStreet",
        data:{
          id:e.detail.value.streetId,
          status:1
        }
      }).then(res =>{
        wx.switchTab({
          url: '/pages/map/map'
        })
      }).catch(erro =>{
        console.log('跳转失败')
      })
    }).catch(erro =>{
      console.log(erro)
    })
  }
})