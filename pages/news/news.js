var tabs = [
  {
    name: "头条",
    value: "top"
  },
  {
    name: "社会",
    value: "shehui"
  },
  {
    name: "国内",
    value: "guonei"
  },
  {
    name: "国际",
    value: "guoji"
  },
  {
    name:"娱乐",
    value: "yule"
  }
];
var app = getApp();  // 全局
//var flag = true;      // 用于判断是否加载的默认菜单
var touchDot = 0;         // 获取触摸时的原点
var time = 0;         // 时间记录，用于滑动时且时间小于1s则执行左右滑动
var interval = "";        // 记录/清理 时间记录
var nth = 0;         // 设置活动菜单的index
var tmpFlag = true;      // 判断左右滑动超出菜单最大值时不再执行滑动事件
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: tabs,     //展示的数据
    slideOffset: 0,//指示器每次移动的距离
    activeIndex: 0,//当前展示的Tab项索引
    sliderWidth: 96,//指示器的宽度,计算得到
    contentHeight: 0,//页面除去头部Tabbar后，内容区的总高度，计算得到
    news:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNews("top");
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          //计算相关宽度
          sliderWidth: res.windowWidth / that.data.tabs.length,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          contentHeight: res.windowHeight - res.windowWidth / 750 * 68//计算内容区高度，rpx -> px计算
        });
      }
    });
  },
  bindChange: function (e) {
    var current = e.detail.current;
    this.getNews(tabs[current].value);
    this.setData({
      activeIndex: current,
      sliderOffset: this.data.sliderWidth * current
    });
    //console.log("bindChange:" + tabs[current].value);
  },
  navTabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  newsDetail:function(e){
    var newsurl = e.currentTarget.dataset.newsurl;//获取每项的data-newsURL
    wx.navigateTo({
      url: '../newsDetail/newsDetail?newsurl=' + newsurl
    })
  },
  getNews: function (name) {
    //this.setData({ hidden: false });     // 设置loading显示
    //flag = name == "top" ? 1 : 0;     // 默认菜单与其它菜单请求数据返回结果不一致 需要显示不同信息
    var that = this;
    // 获取新闻列表
    wx.request({
      url: 'http://v.juhe.cn/toutiao/index',
      data: {
        type: name,
        key: app.globalData.appkey
      },
      success: function (res) {
        if (!res.data.error_code) {
          var data = res.data.result.data
          console.log(data)
          //var title = flag ? data[0].type : data[0].category; // 默认菜单与其它菜单获取类型数据不一致
          //wx.setNavigationBarTitle({ title: title });          // 设置页面标题
          that.setData({
            news:data
          });
        }
      }
    })
  }
})