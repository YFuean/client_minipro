// pages/more/errands/running/running.js
const app=getApp()
const API = require('../../../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    founderId: '1010000107',
    totalPages:'1',
    order: [{
      "id": "56682561585680385",
        "founderId": "1010000106",
        "founderName": "吴老师",
        "founderPhonenumber": "1010000106",
        "originAddress": "北京市栖霞区南京工业职业技术学院",
        "destination": "北京市浦口区南京工业大学",
        "commodity": {
          "id": "56682561585680384",
          "type": "文件",
          "priceRang": "152",
          "gmtCreate": "2020-06-17 00:33:58",
          "isDeleted": false
        },
        "oderCreateTime": "2020-06-17 00:33:58",
        "deliveryTime": "2020-06-12 22:25:39",
        "name": "贾老师",
        "errendsPhoneNumber": "1010000107",
        "finshTime": "2020-06-17 05:51:41",
        "amount": 1,
        "receiverName": "李雪",
        "receiverPhoneNumber": "17626520271",
        "remark": "这是一个盒子"
    }, ],
    // 全部、进行中、待评价的页面跳转的页面跳转
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 资讯（全部，教导处，学生会）的页面跳转
    var that = this;
    // 初始获取跑腿员角色 进行中 订单
    this.getRunnerProcessingOrder()
    /**
     * 获取系统信息
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  
 // 点击tab切换
 swichNav: function (e) {
  var that = this;
  if (this.data.currentTab === e.target.dataset.current) {
    return false;
  } else {
    that.setData({
      currentTab: e.target.dataset.current
    })

    if (that.data.currentTab == 0) {
      this.getRunnerProcessingOrder()
    } else if (that.data.currentTab == 1) {
      this.getRunnerFinishOrder()
    } 
  }

},

finish_order:function (id) {
  this.finshOrder(id)
},

// 网络请求获取跑腿员角色 进行中 订单
getRunnerProcessingOrder() {
  var that = this
  API.getRunnerAllOrder({
    founderId: that.data.founderId,
    num: 0,
    size: 100,
    status: 1
  }).then(res => {
    const data = JSON.parse(res)
    console.log(data)
    this.setData({
      order: data.data.order,
      totalPages:data.data.totalPages
    })

  })
},
// 网络请求获取跑腿员角色 已完成 订单
getRunnerFinishOrder() {
  var that = this
  API.getRunnerAllOrder({
    founderId: that.data.founderId,
    num: 0,
    size: 100,
    status: 3
  }).then(res => {
    const data = JSON.parse(res)
    console.log(data)
    this.setData({
      order: data.data.order,
      totalPages:data.data.totalPages
    })

  })
},



// 网络请求 接取订单
finshOrder(e) {
  var that=this
  var id=e.currentTarget.dataset.id
  API.finshOrder({
    errandsId: that.data.founderId,
    orderId: id
  }).then(res => {
    const data = JSON.parse(res)
    console.log(data)
    if (data.code === 1) {
      wx.showToast({
        title: '订单已完成',
      })
      // 重新获取已完成的订单
      this.getRunnerFinishOrder()
    } else {
      wx.showToast({
        title: '请求失败，请稍后再试',
      })
    }
  })
  console.log(id)
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
    this.setData({
      founderId:app.globalData.user.jobNumber
    })
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
})