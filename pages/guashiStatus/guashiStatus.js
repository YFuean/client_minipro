// pages/guashiStatus/guashiStatus.js
const app = getApp();
const API = require('../../utils/request')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    guashiStatus: false,
    password:'',
    remark:''
  },

  bindpassword:function(e){
    this.setData({
      password: e.detail.value
    })
  },
  bindremark:function(e){
    this.setData({
      remark : e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      guashiStatus:app.globalData.guashiStatus
    })
    if(!app.globalData.guashiStatus){
      wx.setNavigationBarTitle({
        title: '挂失申请',
      })
    }else{
      wx.setNavigationBarTitle({
        title: '挂失失败',
      })
    }
  },
  guashi:function(){
    var that = this
    if(that.data.password==='' || that.data.remark===''){
      wx.showToast({
        title: '请填写卡密和备注',
        duration: 2000,
        icon: "none"
      })
    } else{
      wx.showModal({
        title: '挂失',
        content: '确定挂失？',
        confirmText: "确定",
        cancelText: "不了",
        success: function (res) {
          if (res.confirm) {
            console.log(that.data.password)
            API.guashi({
              password: that.data.password,
              remark: that.data.remark,
              lossJobNumber: app.globalData.user.cardNumber,
            }).then( res=> {
              const data = JSON.parse(res);
              console.log(data)
              if(data.code === 1){
                wx.showToast({
                 title: '挂失声请中',
                 duration: 2000,
                })
                app.globalData.guashiStatus = !app.globalData.guashiStatus
                wx.navigateBack({
                  complete: (res) => {},
                })
              }else{
                const msg = data.msg
                wx.showToast({
                  title: msg,
                  icon: "none",
                  duration: 2000,
                })
              }
            })
          }else{
            return console.log('不操作')
          }
      }
    })
  }
  },

  quxiao_guashi:function(){
    wx.showModal({
      title: '取消挂失',
      content: '确定取消挂失？',
      confirmText: "确定",
      cancelText: "不了",
      success: function (res) {
          if (res.confirm) {
            API.cancelguashi({
              password: that.data.password,
              lossJobNumber: app.globalData.user.cardNumber,
            }).then(res => {
              wx.showToast({
                title: '已取消',
              })
              app.globalData.guashiStatus = !app.globalData.guashiStatus
              wx.navigateBack({
                complete: (res) => {},
              })
            })
          }else{
            return console.log('不操作')
          }
      }
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

  }
})