// pages/validatePhoneNumber/validatePhoneNumber.js
const API = require('../../utils/request')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber:'',
    code: '',
    disabled:false,
    msg: '短信验证码',
    time: 60
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  //更新data中手机号
  bindPhoneNumber(e){
    this.setData({
      phoneNumber : e.detail.value
    })
  },
  //更新data中验证码
  bindCode(e){
    this.setData({
      code : e.detail.value
    })
  },
  //获取验证码
  getCode(){
    console.log('我被点击了')
    console.log(this.data.phoneNumber)
    if(this.validate()){
      API.getCode({
        phoneNumber: this.data.phoneNumber,
      }).then(res => {
        const time = setInterval(() => {
          this.setData({
            disabled:true,
            msg: '重新发送(' + this.data.time + ')',
            time: this.data.time - 1
          })
          if (this.data.time < 0) {
            clearInterval(time)
            this.setData({
              disabled:false,
              msg: '短信验证码',
              time: 60
            })
          }
        }, 1000)
        console.log(res)
        console.log(res.data)
      })
    }
  },
  formSubmit(e) {
    console.log(e)
    API.checkCode({              //验证验证码
      phoneNumber: e.detail.value.phoneNumber,
      verifyCode: e.detail.value.code
    }).then(res =>{
      const data = JSON.parse(res)
      console.log(data)
            if(data.code===1){
              wx.navigateTo({
                url: '/pages/updatePassword/updatePassword?phoneNumber='+this.data.phoneNumber,
              })
            }else{
              wx.showToast({
                title: '验证码错误',
                duration: 1500
              })
            }
    })
  },
  //手机号正则判断
  validate(){
    var phonereg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!phonereg.test(this.data.user_account)&&this.data.phoneNumber_login) {
      this.setData({
        errorExist: true,
        waring: '手机号格式不正确'
    })
    return false
    }else{
      return true
    }
  },
})