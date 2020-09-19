// pages/addperson/addperson.js
const app = getApp()
const API = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:'',
    isInputing:false,
    userList: [],
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

  bindKeyInput:function(e) {
    this.setData({
      key:e.detail.value,
      isInputing:true
    })
    console.log(this.data.key)
  },
  Search:function() {
    API.getUserBykeyword({
      keywords:this.data.key
    }).then(res =>{
      const data = JSON.parse(res)
      console.log(data.data)
      this.setData({
        userList:data.data
      })
    })
  },
  enter(e) {
    wx.navigateTo({
        url: '../../pages/contacts-detail/contacts-detail?&pkUserAccountId=' + e.currentTarget.dataset.pkUserAccountId,
        events: {
            // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
            acceptDataFromOpenedPage: function (data) {
            }
        },
        success: function (res) {
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('acceptDataFromOpenerPage', {
                data:{
                    remark: e.currentTarget.dataset.username,
                    userId: e.currentTarget.dataset.pkuseraccountid,
                    phoneNumber: e.currentTarget.dataset.tele,
                    avatar: e.currentTarget.dataset.avatar,
                    addressId: e.currentTarget.dataset.pkuseraccountid,
                    delete:true
                }
            })
        }
    });
},
})