// pages/errands/my/progress/progress.js
const app = getApp();
const API=require('../../../../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      founderId:'1010000107',
      avatar: 'https://swl-kuzma.oss-cn-beijing.aliyuncs.com/zhihuixiaoyuan/159246571657371.png',
      phoneNumber: '188****3391',
      status: '1',
    },
  },

//网络请求判断是否为跑腿员 
isErrends() {
  API.isErrends({
    founderId: this.data.user.founderId,
    status: '1',
  }).then(res => {
    const data = JSON.parse(res)
    console.log(data)
    if (data.code == 80002) {
        this.setData({
          status:0
        })
    }else if(data.code==1){
      this.setData({
        status:1
      })
    } 
  })
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.isErrends()
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
    this.setData({
      'user.founderId':app.globalData.user.jobNumber,
      'user.avatar':app.globalData.user.avatar,
      'user.phoneNumber':app.globalData.user.phoneNumber,
    })
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