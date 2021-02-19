// app.js
App({
  globalData: {
    userId: '28ee4e3e6021f5fd03e7ff8563db952b',
    authority: 1,
    status:0
  },
  // 小程序一启动就执行
  onLaunch() {
    wx.cloud.init({
      env: 'ditanguanli-6glqkmjm4064e496' // 云开发环境id
    })
  }
})
