// pages/more/xiaoyuanpin/findJobIndex/jobDetailXz/jobDetailXz.js
const API = require("../../../../../utils/requestZhaopin");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 当前id
    currentId: 0,
    // 详情信息
    detailInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id);

    this.setData({
      currentId: options.id,
    });

    this.getDetailById();
  },

  // 根据id获取详情
  getDetailById: function () {
    API.getJobDetailXiaozhao({
      id: this.data.currentId,
    }).then((res) => {
      let data = JSON.parse(res);
      this.setData({
        detailInfo: data.data,
      });
      // console.log(this.data.detailInfo);
      let str = this.data.detailInfo.company.type;
      let arr = str.split(",");
      this.data.detailInfo.company.type = arr[0];
      // 更新数组
      this.setData({
        detailInfo: this.data.detailInfo,
      });
    });
    // console.log(this.data.detailInfo);
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
