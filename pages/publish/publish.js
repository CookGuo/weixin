Page({
  data: {
    address: "请记得选择你的地址哦！~~"
  },
  // https://nuanwan.wekeji.cn/student/index.php/trade/add_item
  // 接口参数：address，latitude，longitude，message，contact，type（sell，buy），openid（可不传）
  // 接口类型：POST
  publishInfo: {
    latitude:"",
    longitude:"",
    message:"",
    contact:"",
    type:""
  },
  addressSelect(){
    wx.chooseLocation({
      success: this.handleChooseLocationSucc.bind(this)
    })
  },
  handleChooseLocationSucc(res){
    this.setData({
      address: res.name
    })
    this.publishInfo.latitude = res.latitude,
    this.publishInfo.longitude = res.longitude
  },
  radioChange(e){
    this.publishInfo.type = e.detail.value
  },
  messageChange(e){
    this.publishInfo.message = e.detail.value
  },
  contactChange(e){
    this.publishInfo.contact = e.detail.value
  },
  handleSubmitBtn(){
    if (!this.data.address || this.data.address ==="请记得选择你的地址哦！~~"){
      wx.showModal({
        title: '提示',
        content: ' 请填写完整的信息'
      })
    } else if (!this.publishInfo.type) {
    
      wx.showModal({
        title: '提示',
        content: ' 请填写完整的信息'
      })
    } else if (!this.publishInfo.contact) {
      wx.showModal({
        title: '提示',
        content: ' 请填写完整的信息'
      })
    } else if (!this.publishInfo.message) {
      wx.showModal({
        title: '提示',
        content: ' 请填写完整的信息'
      })
    } else {
      const data = Object.assign({
        distinct: "laoguo-1720"
      }, this.data, this.publishInfo)
      wx.request({
        url: "https://nuanwan.wekeji.cn/student/index.php/trade/add_item",
        data: data,
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: this.handlePublishSucc.bind(this)
      })
    }
  },
  handlePublishSucc(res){
    wx.navigateBack({
      delta: 1
    })
  }
})