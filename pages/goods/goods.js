var app = getApp()
Page({
  data: {
    userInfo: {},
    array:{},
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
  },
  // onPullDownRefresh: function () {
  //   wx.stopPullDownRefresh()
  // },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });

    wx.request({
      //url: 'https://www.zgjzkj.com/baseinfo/edus', //仅为示例，并非真实的接口地址
      url: 'http://47.93.22.173/Ocean-1.0/api/goods/all',
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          array: res.data
        })
      }
    })
  },
// tab选项卡功能
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
    console.log(e.detail.current)
  },

  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
/*************tab选项卡*************** */
  //选择头像
  chooseHead:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
      }
    })
  },
  //后退
  backPage:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  newsPage:function(){
    wx.navigateTo({
      url: '../news/news',
    })
  },
  //查看详情
  goodsDetail:function(e){
    var index = e.currentTarget.dataset.name;//获取每项的data-name属性值
    console.log("----index----" + index)

    wx.showLoading({
      title: '商品'+index+'加载中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    
    wx.redirectTo({
      url: '../detail/detail?goodsName='+index
    })
  }
})