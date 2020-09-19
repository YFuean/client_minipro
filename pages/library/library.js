const filter = require('../../utils/filter');
const API = require('../../utils/request')
const app = getApp();
Page(filter.identityFilter({

  /**
   * 页面的初始数据
   */
  data: {
    borrowBooks:[],
    count:0
  },
  getBorrowBookList(){
    API.getBorrowBookList({
      jobNumber:app.globalData.user.jobNumber
    }).then( res =>{
      const data = JSON.parse(res)
      const number = data.data.borrowCount
      if(data.code === 1){
        this.setData({
          borrowBooks:data.data,
          count:number
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBorrowBookList()
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

  }
}));
