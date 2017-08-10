var util = require('../../utils/util.js');
var wxParse = require('../../wxParse/wxParse.js');
var app = getApp()
Page({
  data: {
    userInfo: {},
    newsurl: {},
    newsDetail:{}
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
        newsurl: query.newsurl
      })
    })
    wx.request({
      url: query.newsurl,
      headers: {
        'Content-Type': 'text/html'
      },
      success: function (res) {
        // 判断数据是否存在
        var detail = wxParse.wxParse('article', 'html', res.data, that, 5); 
        //console.log(detail.child[1]);
        // if (!res.data.error_code) {
        //   var data = res.data.result.data
        //   console.log(data)
        //   //var title = flag ? data[0].type : data[0].category; // 默认菜单与其它菜单获取类型数据不一致
        //   //wx.setNavigationBarTitle({ title: title });          // 设置页面标题
          that.setData({
            newsDetail: detail.child[1].child[3].child
          });
        // }
      }
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
  backPage: function () {
    wx.redirectTo({
      url: '../news/news'
    })
  },
  newsPage: function () {
    wx.navigateTo({
      url: '../news/news',
    })
  },
})