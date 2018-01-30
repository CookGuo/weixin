
App({
  globalData: {
    userInfo: {}
  },
  onLaunch(){
    this.getDeviceInfo()
  },
  getDeviceInfo(){
    this.globalData.userInfo = wx.getSystemInfoSync()
  }
})