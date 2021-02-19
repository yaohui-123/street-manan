// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [
    ]
  },

  onTapMap(event) {
    const latitude = event.detail.latitude;
    const longitude = event.detail.longitude;
    var app = getApp()
    console.log(app.globalData.userId,app.globalData.authority,app.globalData.status)
    console.log(event)
    if(app.globalData.authority==2){
      wx.redirectTo({
        url: '/pages/form/form?longitude='+longitude+'&latitude='+latitude
      })
    }else{
      wx.showToast({
        icon:'none',
        title: '没有管理员的添加地点权限！',
      })
    }
  },
  // 标注点击回调
  onTapMarker(event) {
    const markers = this.data.markers;
    for (let i = 0; i < markers.length; i++) { // 本示例只有一个marker，可用于处理单marker和多marker情况
      if (event.markerId === markers[i].id) {
        wx.switchTab({
          url: '/pages/applicationTable/applicationTable'
        })
        // wx.cloud.callFunction({
        //   name:"selectStreetId",
        //   data:{
        //     x:markers[i].longitude,
        //     y:markers[i].latitude
        //   }
        // }).then(res =>{
        //   console.log("查询id",res.result.data)
        // }).catch(erro =>{
        // })
      }
    }
  },
  onShow: function () {
    this.list()
  },
  list(){
    var that = this
    // var app = getApp()
    // console.log(app.globalData.userId,app.globalData.authority,app.globalData.status)
    wx.cloud.callFunction({
      name:"selectStreet"
    }).then(res =>{
      console.log("查询成功",res)
      var array = res.result.data
      var list=[]
      for (let index = 0; index < array.length; index++) {
         list.push({
          id: index,
          longitude: array[index].x,
          latitude: array[index].y,
          iconPath: '/image/point.png',
          width: 30,
          height: 30,
          callout: {
            content: array[index].content,
            color: '#000000',
            fontSize: 14,
            display: 'ALWAYS'
          }
         })
      }
      that.setData({
        markers:list
      })
    }).catch(erro =>{
      console.log(erro)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.list()
  },
})