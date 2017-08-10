var app = getApp()
Page({
  data: {
    userInfo:{},
    goodsName: {}
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  onLoad: function (query) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        goodsName: query.goodsName
      })
    })
    
  },
  //选择头像
  chooseHead: function () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        head = tempFilePaths
      }
    })
  },
  backPage:function(){
    wx.redirectTo({
      url: '../goods/goods'
    })
  },
  newsPage: function () {
    wx.navigateTo({
      url: '../news/news',
    })
  },
})