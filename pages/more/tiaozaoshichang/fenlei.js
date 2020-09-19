const app = getApp();
const API = require("../../../utils/request");
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    cateItems: [],
    curNav: 1,
    curIndex: 0
  },
  //左侧导航栏索引
  switchRightTab: function (e) {
    let id = e.target.dataset.id, index = e.target.dataset.index;
    this.setData({
      curNav: id,
      curIndex: index
    })
  },
  go_type:function(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/more/tiaozaoshichang/goodstype?typeId='+e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#6AAFE6',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    this.setData({
      cateItems: app.globalData.allType
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})