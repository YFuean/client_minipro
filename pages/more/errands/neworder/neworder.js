// pages/errands/neworder/neworder.js
const app = getApp();
const API = require('../../../../utils/request')
var time = require('../../../../utils/time.js');
const formattime = require('../../../../utils/formatTime')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount: '6',
    ddimension: '32.09636',
    deliveryTime: '',
    destination: '',
    dlongitude: '118.90907',
    founderId: '1010000107',
    founderName: '',
    founderPhonenumer: '',
    odimension: '',
    olongitude: '',
    originAddress: '',
    priceRang: '6元~25元',
    receiverName: '',
    receiverPhoneNumber: '',
    remark: '',
    type: '',
    timeDate: ''
  },

  type_onChange: function (e) {
    this.setData({
      type: e.detail.value,
    })
    console.info('物品类型', e.detail.value)
  },
  deliveryTime_onChange: function (e) {
    this.setData({
      deliveryTime: e.detail.value,
    })
    console.info('取件时间', e.detail.value)
  },
  remark_onChange: function (e) {
    this.setData({
      remark: e.detail.value,
    })
    console.info('备注', e.detail.value)
  },
  timeDate_onChange: function (e) {
    this.setData({
      timeDate: e.detail.value,
    })
    console.info('取件时间自动生成:', e.detail.value)
  },

  // 取出缓存数据
  getStoragemessage: function () {
    try {
      var originAddress = wx.getStorageSync('originAddress')
      var founderName = wx.getStorageSync('founderName')
      var founderPhonenumer = wx.getStorageSync('founderPhonenumer')
      var odimension = wx.getStorageSync('odimension')
      var olongitude = wx.getStorageSync('olongitude')
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
      if (odimension) {
        // Do something with return value
        this.setData({
          odimension: odimension
        })
        console.log(odimension);
      }
      if (olongitude) {
        // Do something with return value
        this.setData({
          olongitude: olongitude
        })
        console.log(olongitude);
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

  // 判断是否为空的方法
  isNullfac: function (val, name) {
    console.log(name + "值为:" + val);
    if (val == '' || val == null) { //输入框中输入为空
      wx.showModal({
        title: '提示',
        content: name + "不能为空并且不能为全空格",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }
        }
      })
      // console.log(name + "不能为空并且不能为全空格");
      return true;
    } else {
      return false;
    }
  },


  // 点击确定按钮触发事件
  order_enter: function () {

    const typeval = this.isNullfac(this.data.type, '发物品名称');
    const remarkval = this.isNullfac(this.data.remark, '备注');
    console.log('remarkval值为:' + remarkval);
    console.log('typeval值为:' + typeval);
    if (typeval == false && remarkval == false) {
      this.addNewOrder()
      // 清除所有缓存
      wx.clearStorage()
    } else {

    }

  },

  // 网络请求
  addNewOrder() {
    console.log("网络请求能触发……");
    var that = this
    API.addNewOrder({
      amount: that.data.amount,
      ddimension: that.data.ddimension,
      deliveryTime: that.data.deliveryTime,
      destination: that.data.destination,
      dlongitude: that.data.dlongitude,
      founderId: that.data.founderId,
      founderName: that.data.founderName,
      founderPhonenumer: that.data.founderPhonenumer,
      odimension: that.data.odimension,
      olongitude: that.data.olongitude,
      originAddress: that.data.originAddress,
      priceRang: that.data.priceRang,
      receiverName: that.data.receiverName,
      receiverPhoneNumber: that.data.receiverPhoneNumber,
      remark: that.data.remark,
      type: that.data.type,
    }).then(res => {
      console.log("网络请求能触发……有返回");
      const data = JSON.parse(res)
      console.log(data)
      if (data.code === 1) {
        // 跳转到errands 跑腿首页
        wx.showModal({
          title: '订单生成成功',
          content: '是否跳转至“我的订单”页面',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              setTimeout(function () {
                wx.navigateTo({
                  url: '/pages/more/errands/order/order',
                })
              }, 500)
            } else {
              console.log('用户点击取消')
            }
          }
        })

      } else {
        wx.showToast({
          title: '订单生成失败',
        })
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var timeDate = new Date();
    // 系统时间
    var ftime = time.formatTime(timeDate);
    // 加8小时处理
    const newTimeStr = formattime.endFormatTime(timeDate, 8);
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      timeDate: ftime,
      deliveryTime: newTimeStr
    });
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
        founderId: app.globalData.user.jobNumber,
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