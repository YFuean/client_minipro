// pages/index/alimni_chat/alimni_chat_list.js
const app = getApp()
const constants = require('../../../../utils/constants')
const TIME = require('../../../../utils/timestamp')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIpx: app.globalData.isIpx,
    msgList:[],
    openid: '', // 自己的openid
    authed: false,
    user: [{
        name: '胡八一',
        openId: 'o3xA54xKpc4KgnJDyNjfXMQP2-5Q',
        avatar: "http://niit-cmj.oss-cn-beijing.aliyuncs.com/img/1592788001000.jpg"
      },
      {
        name: 'mob',
        openId: 'o3xA542rgEFCMe4ZB_jpjv1dC2kI',
        avatar: "https://swl-kuzma.oss-cn-beijing.aliyuncs.com/zhihuixiaoyuan/159296622043694.png"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (e) {
    let that = this
    // 判断是否存储了用户信息
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        // that.setData({
        //   authed: true
        // })
      },
    })
    console.log("openid")
    let openid = await app.getOpenId()
    // console.log(app.globalData.openid)
    console.log(openid)
    that.setData({
      openid: openid
    })
    //   app.globalData.refreshCallback = function() {
    //     that.setData({
    //       openid: app.globalData.openid
    //     })
    //   }
  },
  onShow: function () {
    // wx.request({
    //   url: constants.ALL,
    //   method: "POST",
    //   data: {
    //     id: openid
    //   },
    //   dataType: "json",
    //   header: {
    //     'Content-Type': 'application/json;charset=utf-8'
    //   },
    //   success: function (e) {
    //     console.log("聊天记录")
    //     if (e.data.code == 1) {
    //       that.setData({
    //         msgList: e.data.data
    //       })
    //       for(let i =0;i<that.data.msgList.length;i++){
    //         var time = "msgList[" + i + "].gmtCreate"
    //         that.setData({
    //           [time]: TIME.formatMsgTime(that.data.msgList[i].gmtCreate)
    //         })
    //       }
    //       console.log(that.data.msgList)
    //     }
    //   }

    // })
  },
  copyOpenid() {
    let openid = this.data.openid
    if (openid.length > 0) {
      wx.setClipboardData({
        data: openid,
        success(res) {
          wx.showToast({
            title: 'openid已复制到剪切板',
            icon: 'none',
            duration: 1000
          })
        }
      })
    } else {
      wx.showToast({
        title: '获取openid失败',
        icon: 'none',
        duration: 1000
      })
    }
  },
  //获取用户信息
  getUserInfo(res) {
    console.log("hhhhhhhhhh")
    if (res.detail.errMsg == "getUserInfo:ok") {
      console.log("获取用户")
      console.log(res.detail.userInfo)
      wx.setStorage({
        key: 'userInfo',
        data: res.detail.userInfo,
      })
      this.setData({
        user: res.detail.userInfo
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },



  bindChat: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/more/xiaoyouquan/alimni_chat/alimni_chatting/alimni_chatting?openid=' + that.data.user[id].openId + '&name=' + e.currentTarget.dataset.name,
    })
  },
  goSet: function () {
    wx.navigateTo({
      url: '/pages/more/xiaoyouquan/alimni_chat/alimni_set/alimni_set',
    })
  },
  chatMany: function () {
    wx.navigateTo({
      url: '/pages/more/xiaoyouquan/alimni_chat/group/index?id=1',
    })
  },
  chatLow: function () {
    wx.navigateTo({
      url: '/pages/more/xiaoyouquan/alimni_chat/alimni_chatting/alimni_chatting',
    })
  }
})