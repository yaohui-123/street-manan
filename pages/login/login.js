// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    countries: ["摊户", "非摊户","系统管理员"],
    countryIndex: 0
  },
  onLoad() {
  },
  formSubmit(e) {
    const that = this
    var app = getApp()
    console.log(e.detail,this.data.countryIndex,e.detail.value.password)
    var input = e.detail.value; // 获取当前表单元素输入框内容
    if(input.username&&input.password){
      //调用云函数
        wx.cloud.callFunction({
          name:"selectUser",
          //传递参数
          data:{
            username:e.detail.value.username,
            password:e.detail.value.password,
            authority:that.data.countryIndex
          }
        }).then(res =>{
          console.log(res.result.data)
          if(res.result.data.length > 0){
            console.log("登录成功",res)
            const response = res
            wx.switchTab({
              url: '/pages/map/map'
            }).then(res =>{
                app.globalData.userId = response.result.data[0]._id
                app.globalData.authority = response.result.data[0].authority
                app.globalData.status = response.result.data[0].status
                console.log('权限',response.result.data[0].authority)
            }).catch(erro =>{
              console.log('跳转失败')
            })
          }else{
            wx.showToast({
              icon:'none',
              title: '用户名或密码错误！',
            })
          }
        }).catch(erro =>{
          console.log(erro)
        })
    }else{
      wx.showToast({
        icon:'none',
        title: '所有信息必填！',
      })
    }
  },
  bindCountryChange(e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
        countryIndex: e.detail.value
    })
  },
  addUser(){
    wx.redirectTo({
      url: '/pages/me/me'
    })
  }
})
