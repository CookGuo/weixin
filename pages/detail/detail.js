Page({
  data: {
    address:"",
    type:"",
    contact: "",
    message: ""
  },
  onLoad(options){
    this.getMessage(options.id)
  },
  getMessage(id){
    wx.request({
      url:'https://nuanwan.wekeji.cn/student/index.php/trade/get_item',
      data:{
        id:id,
        distinct:"laoguo-1720"
      },
      method:"POST",
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: this.handleGetDetailSucc.bind(this)
    })
  },
  handleGetDetailSucc(res){
    const data = res.data.data
    this.setData({
      address : data.address,
      message : data.message,
      type : data.type,
      contact : data.contact
    })
  }
})