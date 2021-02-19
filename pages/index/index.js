Page({
  data: {
    list:[],
    authority:0
  },
  onLoad: function(options) {
    var app = getApp()
    this.setData({
      authority:app.globalData.authority
    })
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
    this.setData({
      authority:app.globalData.authority
    })
    console.log(e.currentTarget.dataset.id)
    wx.cloud.callFunction({
      name:"selectStreetId",
      data:{
        id:e.currentTarget.dataset.id
      }
    }).then(res =>{
      console.log("查询id",res.result.data)
      wx.navigateTo({
        url: '/pages/application/application?' + 'userId=' + app.globalData.userId + '&streetId=' + res.result.data[0]._id
      })
    }).catch(erro =>{
    })
  },
  bindViewTap(e){
    console.log(e.currentTarget.dataset.id)
      wx.cloud.callFunction({
        name:"updateStreet",
        //传递参数
        data:{
          id:e.currentTarget.dataset.id,
          status:0
        }
      }).then(res =>{
        console.log("修改成功",res)
        this.list()
      }).catch(erro =>{
        console.log(erro)
      })
  },
  deleteStreet(e){
    console.log(e.currentTarget.dataset.id)
      wx.cloud.callFunction({
        name:"deleteStreet",
        //传递参数
        data:{
          id:e.currentTarget.dataset.id
        }
      }).then(res =>{
        console.log("删除成功",res)
        this.list()
      }).catch(erro =>{
        console.log(erro)
      })
  },
  list(){
    const that = this
    wx.cloud.callFunction({
      name:"selectStreet"
    }).then(res =>{
      console.log("查询成功",res)
      var array = res.result.data
      var list=[]
      for (let index = 0; index < array.length; index++) {
         list.push({
          id: array[index]._id,
          content: array[index].content,
          status:array[index].status
         })
      }
      that.setData({
        list:list
      })
    }).catch(erro =>{
      console.log(erro)
    })
  }
})