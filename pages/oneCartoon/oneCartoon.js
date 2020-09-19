// pages/oneCartoon/oneCartoon.js
const filter = require('../../utils/filter');
const API = require('../../utils/request')
const app = getApp();
Page(filter.identityFilter({

  /**
   * 页面的初始数据
   */
  data: {
    user:null,
    myBalance:0,
    jobNumber:'',
    service_list:[
      {
        id:1,
        name:'校园卡充值',
        icon:'/image/icon_xiaoyuankachongzhi.png',
        path:'/pages/xiaoyuankachongzhi/xiaoyuankachongzhi'
      },
      {
        id:2,
        name:'电费充值',
        icon:'/image/icon_dianfei.png',
        path:'/pages/dianfeichongzhi/dianfeichongzhi'
      },
      {
        id:3,
        name:'网费充值',
        icon:'/image/icon_wangfei.png',
        path:'/pages/wangfeichongzhi/wangfeichongzhi'
      },
      {
        id:4,
        name:'消费明细',
        icon:'/image/icon_xiaofeimingxi.png',
        path:'/pages/xiaofeimingxi/xiaofeimingxi'
      },
      {
        id:5,
        name:'挂失申请',
        icon:'/image/icon_guashi.png',
        path:'/pages/guashiStatus/guashiStatus'
      },
      {
        id:6,
        name:'敬请期待',
        icon:'/image/icon_xiaoyuankachongzhi.png',
        path:''
      }
    ]
  },

  getCardBalance: function () {
    API.getCardBalance({
      field: app.globalData.user.cardNumber
    }).then( res =>{
      const data = JSON.parse(res)
      if(data.code === 1){
        app.globalData.myBalance = data.data
        this.setData({
          myBalance:data.data,
          jobNumber: app.globalData.user.cardNumber,
          user: app.globalData.user,
        })
      }
    })
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
    this.getCardBalance()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCardBalance()
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
}))