// pages/message/message.js
const API=require('../../utils/request')
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //渲染的列表
    msgList:[],
    current:1,   //请求的页码,
    pageSize:10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.renderList()//调用渲染方法
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
    this.renderList()
  },
  renderList(){
    var that=this
    API.getMessage({
      currentPage: that.data.current,
      field: '',
      pageSize: that.data.pageSize,
    }).then(res =>{
      const data = JSON.parse(res)
      //  console.log(data)
      if(data.code === 1){
        this.setData({
          //concat,组合在一起
          msgList:this.data.msgList.concat(data.data),
        })
      }
    }) 
  },
  //点击任意一条消息后小圆点消失
  viewDetails(e){
    //发送信息给后台，告诉他，用户点击过这条信息了，状态要改变
    var that=this
    API.modifyMessage({
      //将你点击的信息的pkMessageId传给后端
      pkMessageId:e.currentTarget.dataset.id
    }).then(res=>{
      console.log(e.currentTarget.dataset.id)
      //要是成功过后
      const data=JSON.parse(res)
      console.log(data)
      if(data.code===1){
        console.log(that.data.isReaded)
      } 
      wx.navigateTo({
        url: '../../pages/message-detail/message-detail',
      }) 
    })
    this.renderList()//调用渲染方法
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
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 500
    })
    //让他的页数增加
    this.setData({
      current:this.data.current + 1
    })
    this.renderList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})