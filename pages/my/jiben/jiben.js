// pages/my/jiben/jiben.js
const API = require('../../../utils/request')
const app = getApp();
var uploadImage = require('../../../utils/uploadFile');//地址换成你自己存放文件的位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:null,
    user: null,
    newUser:null,
    updateStatus:false,
    region: ['广东省', '广州市', '海珠区'],
		customItem: '全部'
  },
  bindRegionChange: function (e) {
	  console.log('picker发送选择改变，携带值为', e.detail.value)
	  this.setData({
      region: e.detail.value,
      'newUser.address': e.detail.value[0]+'-'+e.detail.value[1]+'-'+e.detail.value[2]
	  })
	},
  changeStatus(){
    this.setData({
      updateStatus :!this.data.updateStatus
    })
  },
  //预览图片
  viewImage:function(){
    var that = this;
   wx.previewImage({
    current: that.data.newUser.avatar, // 当前显示图片的http链接
    urls: [that.data.newUser.avatar] // 需要预览的图片http链接列表
  })
  },
  bindNickName:function(e){
    this.setData({
      'newUser.nickname': e.detail.value
    })
  },
  choose_sex:function(){
    var _this = this
    wx.showActionSheet({
      itemList: ['男', '女'],
      success (res) {
        console.log(res)
        _this.setData({
          'newUser.gender': res.tapIndex===0?'男':'女'
        })
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  },
  save_info:function(){
    var _this = this
    console.log(_this.data.newUser)
    API.updateUserInfo(
      {
        avatar: _this.data.newUser.avatar,
        nickname:_this.data.newUser.nickname,
        gender:_this.data.newUser.gender,
        address:_this.data.newUser.address,
        pkUserAccountId:_this.data.newUser.pkUserAccountId
      }
    ).then(res =>{
      const data = JSON.parse(res)
      console.log(data)
      if(data.code === 1){
        app.globalData.user = _this.data.newUser
        console.log(JSON.parse(res))
        wx.showToast({
          title: '修改成功',
          duration: 1500
        })
        wx.navigateBack({
          complete: (res) => {},
        })
      }else{
        wx.showToast({
          title: '修改失败',
          duration: 1500
        })
      }
    })
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
    this.setData({
      newUser: app.globalData.user,
      user:app.globalData.user,
      'newUser.phoneNumber':app.globalData.user.phoneNumber.substring(0,3).concat("****").concat(app.globalData.user.phoneNumber.substring(7,11)),
      token:app.globalData.token
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