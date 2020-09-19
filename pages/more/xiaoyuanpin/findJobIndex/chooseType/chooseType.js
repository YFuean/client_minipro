// pages/more/xiaoyuanpin/findJobIndex/chooseType/chooseType.js
const API = require("../../../../../utils/requestZhaopin");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 是否选中
    isActive: false,
    // 选中的标签名数组
    nameList: [],
    // 工作地点
    addressList: [
      {
        id: 0,
        text: "一餐厅",
      },
      {
        id: 1,
        text: "二餐厅",
      },
      {
        id: 2,
        text: "三餐厅",
      },
      {
        id: 3,
        text: "四餐厅",
      },
      {
        id: 4,
        text: "五餐厅",
      },
      {
        id: 5,
        text: "六餐厅",
      },
      {
        id: 6,
        text: "快递站",
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  // 点击选中标签
  selectItem2: function (e) {
    // console.log(e);
    let index = e.currentTarget.dataset.index;
    let addressList = this.data.addressList;

    // 设置为active状态
    addressList[index].isActive = !addressList[index].isActive;
    this.setData({
      addressList: addressList,
    });
    
    // console.log(addressList);
  },

  // 确定按钮的点击事件
  clickOKBtn: function () {
    // 清空已选中的标签的数组
    this.data.nameList = [];
    let addressList = this.data.addressList;
    // 便利标签，将active状态为true的标签存入nameList
    addressList.forEach((v) => {
      if (v.isActive) {
        this.setData({
          nameList: this.data.nameList.concat(v.text),
        });
      }
    });
    // console.log(this.data.nameList);

    let nameList = JSON.stringify(this.data.nameList);
    wx.navigateTo({
      url: `../findJobIndex?nameList=${nameList}`,
      success: (result) => {},
      fail: () => {
        console.log("按类型搜索职位（兼职）页面跳转失败");
      },
      complete: () => {},
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
