Page({
  data: {
    list:[],
    authority:0
  },
  onLoad: function(options) {
    this.list()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.list()
  },
  applicationPoint(e){
    var app = getApp()
    console.log(e.currentTarget.dataset.id)
    wx.redirectTo({
      url: '/pages/applicationStatus/applicationStatus?id='+e.currentTarget.dataset.id
    })
  },
  list(){
    const that = this
    var app = getApp()
    that.setData({
      authority:app.globalData.authority
    })
    wx.cloud.callFunction({
      name:"lookupApplication"
    }).then(res =>{
      console.log("lookup",res)
      var array = res.result.list
      var list=[]
      for (let index = 0; index < array.length; index++) {
        if(array[index].street.length>0 && array[index].user.length>0){
          list.push({
            streetName: array[index].street[0].content,
            userName: array[index].user[0].username,
            id: array[index]._id,
            sellGoods: array[index].sell_goods,
            status:array[index].status,
            reason:array[index].reason,
            date:array[index].date
           })
        }
      }
      that.setData({
        list:list
      })
    }).catch(erro =>{
      console.log(erro)
    })
  }
})