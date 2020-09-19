const filter = require('../../utils/filter');
const API = require('../../utils/request')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    tele: null,
    avatar: null,
    addressId: null,
    userId:null,
    selected: true,
    selected1: false,
    isDel: true,
    hiddenmodalput: true, //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
    flag: ""
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
    var that = this
    const eventChannel = that.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      console.log(data.data)
      that.setData({
        name: data.data.remark,
        userId: data.data.userId,
        avatar : data.data.avatar,
        tele: data.data.phoneNumber,
        addressId : data.data.addressId,
        isDel: data.data.delete
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindSelected: function () {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  bindSelected1: function () {
    this.setData({
      selected: false,
      selected1: true
    })
  },
  //删除联系人
  deleteMail: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定删除好友？',
      success(res) {
        if (res.confirm) {
          var id = that.data.addressId  
          API.deleteMail({
            field:id
          }).then(res =>{
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 1000
            })
            console.log("删除" + id)
            that.setData({
              isDel: false
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //添加联系人
  addMail: function () {
    var that = this
    console.log("userid:"+that.data.userId+",tel:"+ that.data.tele+",avatar:"+that.data.avatar+",remark:"+that.data.name)
    API.addMail({
      userId: that.data.userId,
      phoneNumber: that.data.tele,
      avatar: that.data.avatar,
      remark:that.data.name
    }).then(res => {
      const newRes = JSON.parse(res)
      if (newRes.code == 1) {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1000
        })
        that.setData({
          isDel: true
        })
      }
    })
  },
  changeBeizhu: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认 修改备注
  confirm: function () {
    var that = this
    var id = that.data.addressId
    var remark = that.data.flag
    API.updateMail({
      remark: remark,
      pkAddressBookId: id
    }).then(res => {
      const newRes = JSON.parse(res)
      if (newRes.code == 1) {
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 1000
        })
        that.setData({
          hiddenmodalput: true,
          name:that.data.flag
        })
      }
    })
  },

  bindBeizhu: function (e) {
    this.setData({
      flag: e.detail.value
    })
    console.log(this.data.flag)
  },
})