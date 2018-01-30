const app = getApp();
const userInfo = app.globalData.userInfo;
Page({
  data: {
    longitude: "",
    latitude: "",
    markers:"",
    controls: [{
      id: 1,
      iconPath: '/resources/pin.png',
      position: {
        left: userInfo.windowWidth / 2 - 10,
        top: (userInfo.windowHeight - 42) / 2 - 32,
        width: 20,
        height: 32
      }
    }, {
      id: 2,
      iconPath: '/resources/center.png',
      position: {
        left: 20,
        top: userInfo.windowHeight - 90,
        width: 32,
        height: 32
      },
      clickable: true
    }]
  },
  onShow(){
    this.getLocaltion()
    this.getPoints()
  },
  getLocaltion(){
    wx.getLocation({
      type: 'wgs84',
      success: this.handleGetLocaltionSucc.bind(this)
    })
  },
  handleGetLocaltionSucc(res){
    this.setData({
      longitude: res.longitude,
      latitude: res.latitude
    })
  },
  onShareAppMessage: function () {
    return {
      title: '茶友会所',
      path: '/pages/index/index'
    }
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('map')
  },
  centerTap() {
    this.mapCtx.moveToLocation()
  },
  getPoints(){
    wx.request({
      url: "https://nuanwan.wekeji.cn/student/index.php/trade/get_list",
      data:{
        distinct: "laoguo-1720"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: this.handleGetMessage.bind(this)
    })
  },
  handleGetMessage(res){
    const data = res.data.data
    this.setData({
      markers: data.map((value, index) => {
        return {
          iconPath: "/resources/" + value.type + ".jpg",
          id: value.id,
          latitude: value.latitude,
          longitude: value.longitude,
          width: 32,
          height: 32
        }
      }) 
    })
  },
  pointTap(e){
   wx.navigateTo({
      url: "/pages/detail/detail?id=" + e.markerId
   })
  }
})
