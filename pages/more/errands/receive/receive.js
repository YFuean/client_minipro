// pages/more/errands/receive/receive.js
const app=getApp()
const API = require('../../../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    founderId: '1010000107',
    totalPages: 1,
    order: [{
      "id": 56062748593098750,
      "founderId": "1010000107",
      "founderPhonenumber": "15852564869",
      "originAddress": "wojia",
      "destination": "123",
      "commodity": {
        "id": 56062748593098750,
        "type": "文件",
        "priceRang": "152",
        "gmtCreate": "2020-06-15 07:31:03",
        "isDeleted": false
      },
      "oderCreateTime": "2020-06-15 07:31:03",
      "deliveryTime": "2020-06-13 06:25:39",
      "amount": 1,
      "receiverName": "RRRRRRRRRRRRwl",
      "receiverPhoneNumber": "123456"
    }, 
  ],
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
    // 初始获取所有未接订单
    this.getAllNotOrder()
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
        this.getAllNotOrder()
      } else {
        this.getRunnerPendingOrder()
      }
    }

  },

  pick_order: function (id) {
    this.pickOrder(id)
  },
  get_goods: function (id) {
    this.getGoods(id)
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
    // this.getAllNotOrder()
  },
  // 网络请求获取所有订单
  getAllNotOrder() {
    var that=this
    API.getAllNotOrder({
      status: 0,
      num: 0,
      size: 100
    }).then(res => {
      const data = JSON.parse(res)
      console.log(data)
      console.log("卡片信息未返回数据：",that.data.order)
      this.setData({
        order:data.data.order,
        
      })
      console.log("卡片信息返回数据：",this.data.order)
    })
  },

  // 网络请求 接取订单
  pickOrder(e) {
    var that=this
    var id=e.currentTarget.dataset.id
    API.pickOrder({
      errandsId: that.data.founderId,
      orderId: id
    }).then(res => {
      const data = JSON.parse(res)
      console.log(data)
      if (data.code === 1) {
        wx.showToast({
          title: '接单成功',
        })
        // 重新获取未接取的订单
        this.getAllNotOrder()
      } else {
        wx.showToast({
          title: '接单失败，请稍后再试',
        })
      }
    })
    console.log(id)
  },

    // 网络请求 取货完成
    getGoods(e) {
      var that=this
      var id=e.currentTarget.dataset.id
      API.getGoods({
        errandsId: that.data.founderId,
        orderId: id
      }).then(res => {
        const data = JSON.parse(res)
        console.log(data)
        if (data.code === 1) {
          wx.showToast({
            title: '通知取货完成',
          })
          // 重新获取未接取的订单
          this.getRunnerPendingOrder()
        } else {
          wx.showToast({
            title: '通知取货失败，请稍后再试',
          })
        }
      })
      console.log(id)
    },

   // 网络请求获取 全部待接 订单
  getAllNotOrder() {
    var that=this
    API.getAllNotOrder({
      status: 0,
      num: 0,
      size: 100
    }).then(res => {
      const data = JSON.parse(res)
      console.log(data)
      console.log("卡片信息未返回数据：",that.data.order)
      this.setData({
        order:data.data.order,
      })
      console.log("卡片信息返回数据：",this.data.order)
    })
  },

  
// 网络请求获取跑腿员角色 待接取 订单
getRunnerPendingOrder() {
  var that = this
  API.getRunnerAllOrder({
    founderId: that.data.founderId,
    num: 0,
    size: 100,
    status:0
  }).then(res => {
    const data = JSON.parse(res)
    console.log(data)
    this.setData({
      order: data.data.order,
      totalPages:data.data.totalPages
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