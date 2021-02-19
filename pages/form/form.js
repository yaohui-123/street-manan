Page({
  data: {
    formValue: {
      longitude: 0,
      latitude: 0,
      content: ''
    }
  },
  onLoad: function (options) {
    console.log("webview传过来的参数", options)
    this.setData({
      formValue: {
        longitude: options.longitude,
        latitude: options.latitude,
      }
    })
  },

  formSubmit(e) {
    //调用云函数
    var input = e.detail.value; // 获取当前表单元素输入框内容
    if(input.content&&input.latitude&&input.longitude) {  
      wx.cloud.callFunction({
        name:"addStreet",
        //传递参数
        data:{
          x:e.detail.value.longitude,
          y:e.detail.value.latitude,
          content:e.detail.value.content
        }
      }).then(res =>{
        console.log("插入成功",res)
        wx.switchTab({
          url: '/pages/map/map'
        })
      }).catch(erro =>{
        console.log(erro)
      })      
    }else{
      wx.showToast({
        icon:'none',
        title: '所有信息必填！',
      })
    }
    
  }
})