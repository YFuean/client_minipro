
// tabbarCmponent/tabbar.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected: {
      type: Number,
      value: 0
    }
  },

  
  /**
   * 组件的初始数据
   */
  data: {
    "color": "#aacfcf",
    "selectedColor": "#00bcd4",
    "backgroundColor": "#000000",
    "size": "20rpx",
    "selectedSize": "25rpx",
    "list": [
    {
      "pagePath": "/pages/information/information",
      "text": "资讯",
      "iconPath": "/image/icon_zixun1.png",
      "selectedIconPath": "/image/icon_zixun.png"
    },
    {
      "pagePath": "/pages/contacts/contacts",
      "text": "通讯录",
      "iconPath": "/image/icon_tongxunlu.png",
      "selectedIconPath": "/image/icon_tongxunlu2.png"
    },
    {
      "pagePath": "/pages/index/index",
      "text": "首页",
      "iconPath": "/image/icon_shouye2.png",
      "selectedIconPath": "/image/icon_shouye.png"
    },
    {
      "pagePath": "/pages/message/message",
      "text": "消息",
      "iconPath": "/image/icon_xiaoxi.png",
      "selectedIconPath": "/image/icon_xiaoxi2.png"
    },
    {
      "pagePath": "/pages/my/my",
      "text": "我的",
      "iconPath": "/image/icon_wode.png",
      "selectedIconPath": "/image/icon_wode2.png"
    }
  ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      var data = e.currentTarget.dataset
      var url = data.path;
      console.log(url)
      if (url) {
      wx.switchTab({ url });
      } else {
      if (app.globalData.userinfo) {
        wx.navigateTo({
        url: "/pages/publish/publish",
        })
      } else {
        wx.navigateTo({
        url: '/pages/login/login',
        })
      }
      }
    }
  }
})

