// pages/information/information.js

const appInst = getApp();
const API = require("../../utils/request");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 获取置顶资讯的参数
    currentPageTop: 0,
    pageSizeTop: 2,
    // 获取全部资讯的参数
    currentPageAll: 0,
    pageSizeAll: 7,
    indicatorDots: true, //小点
    autoplay: true, //是否自动轮播
    interval: 3000, //间隔时间
    duration: 3000, //滑动时间
    // 资讯（全部，教导处，学生会）的页面跳转
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    // 置顶资讯
    infoTop: [],
    // 全部资讯
    infoAll: [],
  },
  toDetail: function (event) {
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../informationDetail/informationDetail?id=${id}`,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 资讯（全部，教导处，学生会）的页面跳转
    var that = this;
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
        });
      },
    });
    // 获取置顶资讯
    this.getInformationTop();

    // 获取全部资讯
    this.getInformationAll();
  },

  /**
   * 获取全部资讯
   */
  getInformationAll: function () {
    API.getInformationAll({
      currentPage: this.data.currentPageAll,
      pageSize: this.data.pageSizeAll,
    }).then((res) => {
      const data = JSON.parse(res);
      // console.log(data);
      // 截取时间，只保留年月日
      data.data.forEach((v) => {
        v.gmtCreate = v.gmtCreate.substring(0, 9);
      });
      this.setData({
        infoAll: this.data.infoAll.concat(data.data),
      });
      // console.log(this.data.infoAll);
      
    });
  },

  /**
   * 获取置顶资讯
   */
  getInformationTop: function () {
    API.getInformationTop({
      currentPage: this.data.currentPageTop,
      pageSize: this.data.pageSizeTop,
    }).then((res) => {
      const data = JSON.parse(res);
      // console.log(data);
      // 截取时间，只保留年月日
      data.data.forEach((v) => {
        v.gmtCreate = v.gmtCreate.substring(0, 9);
      });
      this.setData({
        infoTop: data.data,
      });
    });
  },
  /**
   * 滑动切换tab
   */
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current,
    });
  },

  // 点击tab切换
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 500
    })
    let that = this;
    // 让获取全部资讯接口参数：currentPage + 1,更新当前页参数
    that.setData({
      currentPageAll: that.data.currentPageAll + 1,
    });
    that.getInformationAll();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
