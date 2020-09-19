// pages/index/black_list/black_list.js
const APP = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switch1Checked: false,
  },

  /**
   * switch样式点击事件
   */
  switch1Change: function (e){
    console.log(`Switch样式点击后是否选中：`, e.detail.value)
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

//屏蔽此人
  changeView:function (e) {
    console.log("改变"+e.detail.value)
    APP.globalData.isBlack = e.detail.value
  }
})