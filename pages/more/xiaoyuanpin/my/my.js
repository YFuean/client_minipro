// pages/more/xiaoyuanpin/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 工具栏：已发布、已报名等
    toolItemList: [
      {
        id: 0,
        name: "已发布",
        num: 3
      },
      {
        id: 1,
        name: "已报名",
        num: 2
      },
      {
        id: 2,
        name: "已应聘",
        num: 5
      },
      {
        id: 3,
        name: "已通过",
        num: 2
      }
    ],
    // 功能板
    fucList:[
      {
        id: 0,
        src: 'https://zhxy-vue.oss-cn-hangzhou.aliyuncs.com/icon/position/zhaopin.png',
        name: '发布任务',
        url: ''
      },
      {
        id: 1,
        src: 'https://zhxy-vue.oss-cn-hangzhou.aliyuncs.com/icon/position/jianli.png',
        name: '在线简历',
        url: ''
      },
      {
        id: 2,
        src: 'https://zhxy-vue.oss-cn-hangzhou.aliyuncs.com/icon/position/mianshi.png',
        name: '我的面试',
        url: ''
      },
      {
        id: 3,
        src: 'https://miaoxun.oss-cn-hangzhou.aliyuncs.com/images/xiaoyuanpin/shoucang.png',
        name: '我的收藏',
        url: ''
      },
      {
        id: 4,
        src: 'https://zhxy-vue.oss-cn-hangzhou.aliyuncs.com/icon/position/guanzhu.png',
        name: '关注内容',
        url: ''
      },
      {
        id: 5,
        src: 'https://zhxy-vue.oss-cn-hangzhou.aliyuncs.com/icon/position/yinsi.png',
        name: '隐私设置',
        url: ''
      },
      {
        id: 6,
        src: 'https://miaoxun.oss-cn-hangzhou.aliyuncs.com/images/xiaoyuanpin/yijian.png',
        name: '意见反馈',
        url: ''
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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