// pages/index/alimni_star/alimni_star.js
const APP = getApp();
const api = require('../../../../utils/request')
const TIME = require('../../../../utils/timestamp')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    api.getStar({
      currentPage: 0,
      field:APP.globalData.user.pkUserAccountId,
      pageSize: 15
    }).then(res =>{
      var res = JSON.parse(res)
      console.log(res)
      if(res.code == 1){
        that.setData({
          starList:res.data
        })
      }
      for (let i = 0; i < that.data.starList.length; i++) {
        var time = "starList[" + i + "].gmtCreate"
        var arr = "starList[" + i + "].content"
        that.setData({
          [time]: TIME.formatMsgTime(that.data.starList[i].gmtCreate),
          [arr]: that.data.starList[i].content.replace(/[\r\n]/g, ""),
        })
      }
      console.log(that.data.starList)
    })
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
   * 显示删除按钮
   */
  showDeleteButton: function (e) {
    let productIndex = e.currentTarget.dataset.productindex
    this.setXmove(productIndex, -65)
  },

  /**
   * 隐藏删除按钮
   */
  hideDeleteButton: function (e) {
    let productIndex = e.currentTarget.dataset.productindex

    this.setXmove(productIndex, 0)
  },

  /**
   * 处理touchstart事件
   */
  handleTouchStart(e) {
    this.startX = e.touches[0].pageX
  },

  /**
   * 处理touchend事件
   */
  handleTouchEnd(e) {
    if(e.changedTouches[0].pageX < this.startX && e.changedTouches[0].pageX - this.startX <= -30) {
      this.showDeleteButton(e)
    } else if(e.changedTouches[0].pageX > this.startX && e.changedTouches[0].pageX - this.startX < 30) {
      this.showDeleteButton(e)
    } else {
      this.hideDeleteButton(e)
    }
  },
  /**
   * slide-delete 删除产品
   */
  handleSlideDelete(e) {
    var that = this
    console.log("处理删除")
    console.log(e.currentTarget.dataset.id)
    wx.showModal({
			title: '提示',
			content: '确定取消收藏吗',
			success: function(res) {
				if (res.confirm) {
        console.log('用户点击确定')
        api.delStar({
          id:e.currentTarget.dataset.id
        }).then(res => {
          var res = JSON.parse(JSON)
          console.log(res)
          if(res.code == 1){
            wx.showToast({
              title:'已取消收藏',
              icon:"success",
              duration:1000
            })
            that.reflush()
          }
       })
				} else if (res.cancel) {
				console.log('用户点击取消')
				}
			}
		})
  },
  reflush:function () {
    var that = this
    api.getStar({
      currentPage: 0,
      field:APP.globalData.user.pkUserAccountId,
      pageSize: 15
    }).then(res =>{
      var res = JSON.parse(res)
      console.log(res)
      if(res.code == 1){
        that.setData({
          starList:res.data
        })
      }
      for (let i = 0; i < that.data.starList.length; i++) {
        var time = "starList[" + i + "].gmtCreate"
        var arr = "starList[" + i + "].content"
        that.setData({
          [time]: TIME.formatMsgTime(that.data.starList[i].gmtCreate),
          [arr]: that.data.starList[i].content.replace(/[\r\n]/g, ""),
        })
      }
      console.log(that.data.starList)
    })
  }
})