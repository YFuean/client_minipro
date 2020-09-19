
// pages/login/login.js
const API = require('../../utils/request')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    phoneNumber_login: false,
    msg: '短信验证码',
    user_account: '1802343116',
    user_password: '123456',
    code:'',
    time: 60,
    disabled:false,
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
  //更新data中账号
  bindAccount(e){
    this.setData({
      user_account : e.detail.value,
      errorExist: false,
      waring:''
    })
  },
  //更新data中密码
  bindPassword(e){
    this.setData({
      user_password : e.detail.value,
      errorExist: false,
      waring:''
    })
  },
  //更新data中验证码
  bindCode(e){
    this.setData({
      code : e.detail.value,
      errorExist: false,
      waring:''
    })
  },
  //获取验证码
  getCode(){
    console.log('我被点击了')
    console.log(this.data.user_account)
    if(this.validate()){
      API.getCode({
        phoneNumber: this.data.user_account,
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
      })
    }
  },
  //更换登录方式
  changeLogin(){
    this.setData({
      phoneNumber_login: !this.data.phoneNumber_login
    })
  },
  //登录提交
  formSubmit(e) {
    if(this.validate()){     //正则校验
      if(!this.data.phoneNumber_login){    //账号密码登录
        API.login({
          userAccount: e.detail.value.user_account,
          password:  e.detail.value.user_password
        }).then(res => {
            const data = JSON.parse(res)
            console.log(data)
            if(data.code === 1){
              app.globalData.user = data.data.UserAccount
              app.globalData.token = data.data.token
              wx.showToast({
                title: '登录成功',
                duration: 1500,
              })
              wx.switchTab({
                url: '/pages/index/index',
              })
            }else{
              wx.showToast({
                title: '密码错误',
                image: '/image/warning.png'
              })
            }
        })
      }
      
      if(this.data.phoneNumber_login){                //手机号登录
        API.checkCode({              //验证验证码
          phoneNumber: e.detail.value.user_account,
          verifyCode: e.detail.value.code
        }).then(res =>{
          console.log(e.detail.value.user_account)
          const data = JSON.parse(res)
            if(data.code === 1){
              API.phoneLogin({
                phoneNumber: e.detail.value.user_account,
                verifyCode: e.detail.value.code
              }).then(res =>{
                const data = JSON.parse(res)
                console.log(data)
                if(data.code === 1){
                  app.globalData.user = data.data.UserAccount
                  app.globalData.token = data.data.token
                  wx.showToast({
                    title: '登录成功',
                    duration: 1500
                  })
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                }else{
                  wx.showToast({
                    title: '账户不存在',
                    image: '/image/warning.png'
                  })
                }
              })
            }else{
              wx.showToast({
                title: '验证码错误',
                duration: 1500,
                image: '/image/warning.png'
              })
            }
        })
      }
    }
  },
  //账号密码正则判断
  validate(){
    var phonereg = /^1[3-9]\d{9}$/;
    var accountreg = /^\d{10}$/;
    var passwordreg = /^\d{4}$/;
    if (!phonereg.test(this.data.user_account)&&this.data.phoneNumber_login) {
      wx.showToast({
        title: '手机号格式错误',
        image: '/image/warning.png'
      })
    return false
    }else if(!accountreg.test(this.data.user_account)&&!this.data.phoneNumber_login){
      wx.showToast({
        title: '账号格式错误',
        image: '/image/warning.png'
      })
    return false
    }else{
      return true
    }
  },
  go_validatePhoneNumber(){
    wx.navigateTo({
      url: '/pages/validatePhoneNumber/validatePhoneNumber',
    })
  }

})