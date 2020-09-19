
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
      "pagePath": "/pages/more/tiaozaoshichang/tiaozaoshichang",
      "iconPath": "/image/加.png",
      "selectedIconPath": "/image/加.png"
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
        wx.navigateTo({
          url: url,
        })
      //wx.switchTab({ url });
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

