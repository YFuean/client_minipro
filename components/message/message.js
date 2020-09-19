// components/message/message.js
const APP = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isMsg:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    msg:APP.globalData.message
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goMsg:function() {
      wx.navigateTo({
        url: '/pages/more/xiaoyouquan/alimni_message/alimni_message',
      })
      this.properties = false
    }
  }
})
