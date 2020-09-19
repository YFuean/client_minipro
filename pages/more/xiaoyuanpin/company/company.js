// pages/more/xiaoyuanpin/company/company.js

const API = require("../../../../utils/requestZhaopin");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 公司列表
    companyList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取公司列表
    this.getCompanyList();
  },

  // 跳转到下一个页面
  toNextPage: function (e) {
    wx.navigateTo({
      url:
        "/pages/more/xiaoyuanpin/company/" +
        e.currentTarget.dataset.url +
        "/" +
        e.currentTarget.dataset.url +
        "?id=" +
        JSON.stringify(e.currentTarget.dataset.id),
    });
    // console.log(e.currentTarget.dataset.id);
  },

  // 获取公司列表
  getCompanyList: function () {
    API.getCompanyList({
      currentPage: 1,
      field: "workers",
      pageSize: 10,
    }).then((res) => {
      const data = JSON.parse(res);
      this.setData({
        companyList: data.data,
      });
      // console.log(this.data.companyList);
      let companyList = this.data.companyList
      companyList.forEach(v => {
        v.type = v.type.split(",")
      });
      this.setData({
        companyList: this.data.companyList
      })
      // console.log(this.data.companyList);
      
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
