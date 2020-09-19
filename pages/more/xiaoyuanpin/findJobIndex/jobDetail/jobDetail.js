// pages/more/xiaoyuanpin/findJobIndex/jobDetail/jobDetail.js

const API = require("../../../../../utils/requestZhaopin");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentId: 0,
    //职位详情信息
    detailInfo: {},
    // 结薪类型
    salaryTpye: ["日结", "月结"],
    // 推荐职位列表
    jobListRecommend: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(JSON.parse(options.ob));
    let that = this;
    that.setData({
      currentId: options.id,
    });
    // 请求接口获取详情信息
    this.getDetaileById();
  },

  // 根据id查询职位详情（兼职）
  getDetaileById: function () {
    API.getJobDetail({
      id: this.data.currentId,
    }).then((res) => {
      // console.log(res);
      const data = JSON.parse(res);
      this.setData({
        detailInfo: data.data,
      });
      // console.log(this.data.detailInfo);
    });
  },

  // 显示弹框组件
  showPopup() {
    this.popup.showPopup();
  },

  //取消事件
  _error() {
    this.popup.hidePopup();
  },
  //确认事件
  _success() {
    this.popup.hidePopup();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     //获得popup组件
     this.popup = this.selectComponent("#popup");
  },

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
