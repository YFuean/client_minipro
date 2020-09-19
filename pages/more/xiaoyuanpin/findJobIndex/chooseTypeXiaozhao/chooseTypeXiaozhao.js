// pages/more/xiaoyuanpin/findJobIndex/chooseTypeXiaozhao/chooseTypeXiaozhao.js
const API = require("../../../../../utils/requestZhaopin");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 选中的标签id
    currentId: 0,
    // 选中的标签名
    currentName: "",
    // 是否选中
    isActive: false,
    // 校招职位类型
    jobTypeList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取校招职位类型
    this.getjobTypeListXiaozhao();
    // 初始化数据：增加选中状态（默认选中第一个标签）
    this.initData1();
  },

  // 点击确定按钮，跳转搜索结果
  clickOKBtn: function () {
    wx.navigateTo({
      url: `../findJobIndex?id=${this.data.currentId}&name=${this.data.currentName}`,
      success: (result) => {
        // console.log('s');
        // console.log(this.data.currentId);
      },
      fail: () => {
        console.log("跳转搜索结果失败（校招）");
      },
      complete: () => {},
    });
  },

  // 点击选中标签(单选)
  selectItem1: function (e) {
    // console.log(e);
    let index = e.currentTarget.dataset.index;
    let jobTypeList = this.data.jobTypeList;
    jobTypeList.forEach((v) => {
      v.isActive = false;
    });
    jobTypeList[index].isActive = !jobTypeList[index].isActive;
    this.setData({
      jobTypeList: jobTypeList,
      currentId: e.currentTarget.dataset.id,
      currentName: e.currentTarget.dataset.name,
    });
    // console.log(jobTypeList);
  },

  // 初始化数据：增加选中状态（默认选中第一个标签）
  initData1: function () {
    let jobTypeList = this.data.jobTypeList;
    for (let i = 0; i < jobTypeList.length; i++) {
      const element = jobTypeList[i];
      if (i == 0) {
        element["isActive"] = true;
      } else {
        element["isActive"] = false;
      }
    }
    this.setData({
      jobTypeList: jobTypeList,
    });
  },

  // 获取校招职位类型
  getjobTypeListXiaozhao: function () {
    API.getjobTypeListXiaozhao().then((res) => {
      // console.log(res);
      let data = JSON.parse(res);
      this.setData({
        jobTypeList: this.data.jobTypeList.concat(data.data),
      });
      // console.log(this.data.jobTypeList);
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
