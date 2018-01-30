Page({
  data: {
    list:[]
  },
  staticData:{
    keyword: ""
  },
  onLoad(){
    this.getMessageSearch(this.staticData.keyword)
  },
  handleInputChage(e){
    this.staticData.keyword = e.detail.value
  },
  handleSearchBtn(){
    this.getMessageSearch(this.staticData.keyword)
  },
  getMessageSearch(keyword){
    wx.request({
      url: 'https://nuanwan.wekeji.cn/student/index.php/trade/get_search_list',
      data: {
        distinct: "laoguo-1720",
        keyword: keyword
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: this.handleGetDetailSucc.bind(this)
    })
  },
  handleGetDetailSucc(res){
    const data = res.data.data
    if (!data) {
      wx.showModal({
        title: '提示',
        content: '没有相关信息'
      })
    } else {
      this.setData({
        list: data
      })
    }
  },
  handleMessage(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id
    })
  }
})