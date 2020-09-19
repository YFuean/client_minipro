const filter = require('../../utils/filter');
const API = require('../../utils/request')
const app = getApp();
const time = require('../../utils/formatTime')
Page(filter.identityFilter({
  /**
   * 页面的初始数据
   */
  data: {
    consumer_list:[],
    create_time:[]
  },
  getConsumeList: function () {
    API.getCardConsume({
      field: app.globalData.user.cardNumber,
    }).then((res) => {
      const data = JSON.parse(res)
      const consumerList = data.data
      if(data.code === 1){
        app.globalData.consumerList = consumerList.reverse();
        this.setData({
          consumer_list:consumerList,
        })
      }
      //时间数组
      const createTimes = consumerList.map(x => {return x.gmtCreate})
      //时间数组每个元素加8小时
      const createTimesNew = []
      for(var i = 0;i<createTimes.length;i++){
        const timeStr = createTimes[i] 
        const timeDate = new Date(timeStr)
        const newTimeStr =  time.endFormatTime(timeDate,8)
        createTimesNew.push(newTimeStr)
      }
      this.setData({
        create_time:createTimesNew
      })
    });
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
    this.getConsumeList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getConsumeList()
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