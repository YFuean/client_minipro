// pages/message/alimni_message/alimni_message.js
const APP = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isComm:false,
    isLike:false,
    isMsg:false,
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    let arr = APP.globalData.message
    console.log(arr)
    if(arr.length != 0){
      let magarr =APP.globalData.message.split(',')
      console.log(magarr[0])
      if(magarr[0] == APP.globalData.user.nickname ){
      if(arr.search("赞") != -1){
        that.setData({
          isLike:true
        })
      } else if(arr.search("评论") != -1){
        that.setData({
          isComm:true
        })
      }else if(arr.search("心情") != -1){
        that.setData({
          content:arr
        })
        console.log(arr)
      }
    }
  }
    if(APP.globalData.chat.length != 0){
      that.setData({
        isMsg:true
      })
    }
  
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
  changeMess:function() {
    wx.navigateTo({
      url: '/pages/more/xiaoyouquan/alimni_chat/alimni_chat_list',
    })
    this.setData({
      isMsg:false
    })
  },
  goComment:function() {
    wx.navigateTo({
      url: '/pages/more/xiaoyouquan/alimni_message/alimni_comment/alimni_comment',
    })
    this.setData({
      isComm:false
    })
  },
  goLike:function() {
    wx.navigateTo({
      url: '/pages/more/xiaoyouquan/alimni_message/alimni_like/alimni_like',
    })
    this.setData({
      isLike:false
    })
  }
})