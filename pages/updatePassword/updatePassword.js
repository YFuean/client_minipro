// pages/updatePassword/updatePassword.js
const API = require('../../utils/request')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: '',
    newPassword1: '',
    newPassword2: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      phoneNumber:options.phoneNumber
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

  },
  bindPassword1(e){
    this.setData({
      newPassword1 : e.detail.value
    })
  },
  bindPassword2(e){
    this.setData({
      newPassword2 : e.detail.value
    })
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if(e.detail.value.newPassword1!==e.detail.value.newPassword2){
      console.log('两次密码不同')
    }else{
      API.updatePassword({    //修改密码         
        userAccount:this.data.phoneNumber,
        password: e.detail.value.newPassword1
      }).then(res =>{
        const data = JSON.parse(res)
        if(data.code === 1){
          app.globalData.token===null
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      })
    }
  }
})