// pages/informationDetail/informationDetail.js
const API = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoId: 0,
    currentPageDetail: 0,
    pageSizeDetail: 1,
    infoDetail: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 保存当前对象
    var that = this
    // 将上一个页面传来的id取出
    that.setData({
      infoId: options.id
    })
    // console.log(that.data.infoId);

    // 获取资讯详情数据
    that.getNewsList()
  },

/**
 * 获取详情
 */
  getNewsList: function(){
    API.getInformationDetail({
      currentPage: this.data.infoId-4,
      pageSize: this.data.pageSizeDetail,
    }).then((res) => {
      const data = JSON.parse(res);
      this.setData({
        infoDetail: data.data[0],
      });
      // console.log(this.data.infoDetail);
    });
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