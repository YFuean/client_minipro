// pages/more/errands/order/order.js
const app=getApp()
const API = require('../../../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    founderId:null,
    records: [{
      "id": 54896482205437950,
      "founderId": 1010000107,
      "founderName": "王林",
      "founderPhonenumber": "18094247968",
      "originAddress": "南工院西门",
      "destination": "南工院北门",
      "commodityId": 54896482205437950,
      "oderCreateTime": "2020-06-12 10:16:43",
      "deliveryTime": "2020-06-01 10:12:05",
      "status": 0,
      "amount": 25,
      "receiverName": "王妃",
      "receiverPhoneNumber": "18094247965",
      "remark": "",
      "isDeleted": false,
      "ddimension": "33.3",
      "olongitude": "66.5",
      "odimension": "99.6",
      "dlongitude": "78.2"
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
    // 初始获取所有订单
    this.getAllOrder()
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

      if (that.data.currentTab == 1) {
        this.getCompleteOrder()
      } else if (that.data.currentTab == 2) {
        this.getCancelOrder()
      } else {
        this.getAllOrder()
      }
    }

  },
  // 取消订单
  cancle_order: function (id) {
    this.cancelOrder(id)
  },
  // 删除已取消订单
  delete_order: function (id) {
    this.deleteOrder(id)
  },
  // 网络请求取消订单
  cancelOrder(e) {
    var id = e.currentTarget.dataset.id
    API.cancelOrder({
      errandsId:this.data.founderId ,
      orderId: id
    }).then(res => {
      const data = JSON.parse(res)
      console.log(data)
      if (data.code === 1) {
        wx.showToast({
          title: '取消成功',
        })
        // 重新获取未接取的订单
        this.getAllOrder()
      } else {
        wx.showToast({
          title: '取消失败，请稍后再试',
        })
      }
    })
    console.log(id)
  },
  // 网络请求删除已取消订单
  deleteOrder(e) {
    var id = e.currentTarget.dataset.id
    API.deleteOrder({
      errandsId: this.data.founderId,
      orderId: id
    }).then(res => {
      const data = JSON.parse(res)
      console.log(data)
      if (data.code === 1) {
        wx.showToast({
          title: '删除成功',
        })
        // 重新获取未接取的订单
        this.getCancelOrder()
      } else {
        wx.showToast({
          title: '删除失败，请稍后再试',
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
      founderId:app.globalData.user.jobNumber,
    })
    this.getAllOrder()
  },
  // 网络请求获取所有订单
  getAllOrder() {
    var that = this
    API.getAllOrder({
      founderId: this.data.founderId,
      status: '',
      num: 0,
      size: 100
    }).then(res => {
      const data = JSON.parse(res)
      console.log(data)
      this.setData({
        records: data.records
      })

    })
  },
  // 网络请求获取所有已取消订单
  getCancelOrder() {
    var that = this
    API.getAllOrder({
      founderId: this.data.founderId,
      status: 1,
      num: 0,
      size: 100
    }).then(res => {
      const data = JSON.parse(res)
      console.log(data)
      this.setData({
        records: data.records
      })

    })
  },

  // 网络请求获取所有已完成订单
  getCompleteOrder() {
    var that = this
    API.getAllOrder({
      founderId: this.data.founderId,
      status: 3,
      num: 0,
      size: 100
    }).then(res => {
      const data = JSON.parse(res)
      console.log(data)
      this.setData({
        records: data.records
      })

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