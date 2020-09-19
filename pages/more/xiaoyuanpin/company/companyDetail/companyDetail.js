// pages/more/xiaoyuanpin/company/companyDetail/companyDetail.js
const API = require("../../../../../utils/requestZhaopin");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentId: 0,
    detailInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentId: options.id,
    });
    // console.log(this.data.currentId);

    // 获取公司详情
    this.getDetailInfo();
  },

  // 跳转到下一个页面
  toNextPage: function (e) {
    wx.navigateTo({
      url:
        "/pages/more/xiaoyuanpin/findJobIndex/" +
        e.currentTarget.dataset.url +
        "/" +
        e.currentTarget.dataset.url +
        "?id=" +
        JSON.stringify(e.currentTarget.dataset.id),
    });
    console.log('点击的职位id',e.currentTarget.dataset.id);
  },

  // 获取公司详情
  getDetailInfo: function () {
    API.getCompanyDetail({
      id: this.data.currentId,
    }).then((res) => {
      let data = JSON.parse(res);
      this.setData({
        detailInfo: data.data,
      });
      console.log('公司详情：', this.data.detailInfo);
    });
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
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
