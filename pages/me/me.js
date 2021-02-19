// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    countries: ["摊户", "非摊户"],
    countryIndex: 0,
  },
  onLoad() {
  },
  formSubmit(e) {
    const that = this
    console.log(e.detail,this.data.countryIndex)
    var input = e.detail.value; // 获取当前表单元素输入框内容
    if(input.username&&input.password){
      //调用云函数
      wx.cloud.callFunction({
        name:"addUser",
        //传递参数
        data:{
          username:e.detail.value.username,
          password:e.detail.value.password,
          authority:parseInt(that.data.countryIndex)
        }
      }).then(res =>{
        console.log("插入成功",res)
        wx.redirectTo({
          url: '/pages/login/login'
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
  },
  bindCountryChange(e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
        countryIndex: e.detail.value
    })
  }
})
