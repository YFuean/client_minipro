// pages/information/information.js
const app=getApp()
const API = require('../../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    founderId: '1010000107',
    status: '1',
    originAddress: '',
    founderName: '',
    founderPhonenumer: '',
    destination: '',
    receiverName: '',
    receiverPhonenumer: '',
    // 资讯（全部，教导处，学生会）的页面跳转
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    nav_list: [{
        id: 1,
        title: '个人中心',
        icon: '/image/icon_my.png',
        path: '/pages/more/errands/my/my'
      },
      {
        id: 2,
        title: '我的订单',
        icon: '/image/icon_order.png',
        path: '/pages/more/errands/order/order'
      },
      {
        id: 3,
        title: '我要接单',
        icon: '/image/icon_receive_order.png',
        path: '/pages/more/errands/receive/receive'
      },
      {
        id: 4,
        title: '我是跑腿',
        icon: '/image/icon_running.png',
        path: '/pages/more/errands/running/running'
      }
    ],
    information: [{
        id: 1,
        title: "新用户专享30元大礼包",
        info: "点击领取新人专享礼包，下单立享优惠",
        img: 'https://newbers.oss-cn-hangzhou.aliyuncs.com/pic/app_icon.png'
      },
      {
        id: 2,
        title: "送鲜花送礼物3元直减券",
        info: "新用户下单送鲜花送礼物，首单可直减3元",
        img: 'https://newbers.oss-cn-hangzhou.aliyuncs.com/pic/app_icon.png'
      },
      {
        id: 3,
        title: "新用户专享30元大礼包",
        info: "点击领取新人专享礼包，下单立享优惠",
        img: 'https://newbers.oss-cn-hangzhou.aliyuncs.com/pic/app_icon.png'
      },
      {
        id: 4,
        title: "新用户专享30元大礼包",
        info: "点击领取新人专享礼包，下单立享优惠",
        img: 'https://newbers.oss-cn-hangzhou.aliyuncs.com/pic/app_icon.png'
      }
    ],
  },

  // 取出缓存数据
  getStoragemessage: function () {
    try {
      var originAddress = wx.getStorageSync('originAddress')
      var founderName = wx.getStorageSync('founderName')
      var founderPhonenumer = wx.getStorageSync('founderPhonenumer')
      var destination = wx.getStorageSync('destination')
      var receiverName = wx.getStorageSync('receiverName')
      var receiverPhonenumer = wx.getStorageSync('receiverPhonenumer')
      if (originAddress) {
        // Do something with return value
        this.setData({
          originAddress: originAddress
        })
        console.log(originAddress);
      }
      if (founderName) {
        // Do something with return value
        this.setData({
          founderName: founderName
        })
        console.log(founderName);
      }
      if (founderPhonenumer) {
        // Do something with return value
        this.setData({
          founderPhonenumer: founderPhonenumer
        })
        console.log(founderPhonenumer);
      }
      if (destination) {
        // Do something with return value
        this.setData({
          destination: destination
        })
        console.log(destination);
      }
      if (receiverName) {
        // Do something with return value
        this.setData({
          receiverName: receiverName
        })
        console.log(receiverName);
      }
      if (receiverPhonenumer) {
        // Do something with return value
        this.setData({
          receiverPhonenumer: receiverPhonenumer
        })
        console.log(receiverPhonenumer);
      }
    } catch (e) {
      // Do something when catch error
    }

  },

  // 判断是否为跑腿员
  iserrends: function (e) {
    var url = e.currentTarget.dataset.url
    var id = e.currentTarget.dataset.id
    if (id < 3) {
      wx.navigateTo({
        url: url,
      })
    } else {
      // this.isErrends(url)
      wx.navigateTo({
        url: url,
      })
    }
  },
  //网络请求判断是否为跑腿员 
  isErrends(url) {
    API.isErrends({
      founderId: this.data.founderId,
      status: '1',
    }).then(res => {
      const data = JSON.parse(res)
      console.log(data)
      if (data.code == 80002) {
        wx.showModal({
          title: '提示',
          content: '您还不是跑腿员,点击“确定”前往申请成为跑腿员',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateTo({
                url: '/pages/errands/my/becomeRunner/becomeRunner',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else if (data.code == 1) {
        wx.navigateTo({
          url: url,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 资讯（全部，教导处，学生会）的页面跳转
    var that = this;
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
  /**
   * 滑动切换tab
   */
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
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
    }
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
    }),
    this.getStoragemessage()
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