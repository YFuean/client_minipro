// pages/index/alimni_chat/alimni_chatting/climni_chatting.js
const app = getApp()
const constants = require('../../../../../utils/constants')
class Message {
  from = ''; //发送方
  to = ''; // 接收方
  type = ''; //1.文本消息 2.图片
  content = ''; // 内容
  user = {}; //发送方用户信息
  constructor(from, to, type) {
    this.from = from;
    this.to = to;
    this.type = type;
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    inputContent: '',
    isIpx: app.globalData.isIpx,
    openid: '', // 自己的openid
    toOpenid: "o3xA542rgEFCMe4ZB_jpjv1dC2kI", //聊天对象openid
    msg: '', //输入的消息内容,
    chatContentHeight: 0,
    msgList: [],
    hiddenmodalput: true,
    avatar:''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    that.setData({
      toOpenid: options.openid,
      avatar:app.globalData.user.avatar
    })
    console.log(options.name)
    console.log(options.openid)
    if (options.openid == undefined) {
      that.setData({
        hiddenmodalput:false
      })
    }
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          user: res.data
        })
      },
    })
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    let ipxHeight = this.data.isIpx ? 64 : 30
    // 90顶部 接收方高度， 30底部paddingtop，  75 输入框高度
    this.setData({
      openid: app.globalData.openid,
      chatContentHeight: windowHeight * 750 / windowWidth - (90 + 30 + 75 + ipxHeight)
    })
    // 回调发送给自己的消息
    let openid = that.data.openid+that.data.toOpenid
  //  wx.request({
  //    url:  constants.ALL,
  //    method:"POST",
  //    data:{
  //      id:openid
  //    },
  //    dataType: "json",
  //     header: {
  //       'Content-Type': 'application/json;charset=utf-8'
  //     },
  //     success:function(e){
  //       console.log("聊天记录")
  //       if(e.data.code ==1){
  //         that.setData({
  //           msgList:e.data.data
  //         })
  //         console.log(that.data.msgList)
  //       }
  //     }
  
  //  })
    app.globalData.socketReceiver = function (e) {
      console.log("有回调消息")
      console.log(e)
      let msgList = that.data.msgList
      msgList.push(e)
      that.setData({
        msgList: msgList
      })
    }
    
    wx.setNavigationBarTitle({
      title: options.name
    })
  },
onShow:function() {
 
},

  bindMsgInput(e) {
    this.setData({
      msg: e.detail.value
    })
  },
  // 发送文本消息
  sendText() {
    let message = new Message(this.data.openid, this.data.toOpenid, 1);
    message.content = this.data.msg;
    message.user = this.data.user;
    app.sendSocketMessage(message);
    let msgList = this.data.msgList
    msgList.push(message)
    this.setData({
      msgList: msgList,
      msg: ''
    })
    console.log(message)
  },
  // 选择图片
  chooseImage() {
    let that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        tempFilePaths.forEach((v, k) => {
          // 上传图片
          wx.uploadFile({
            url: constants.UPLOAD_URL,
            filePath: v,
            name: 'file',
            formData: {},
            success(res) {
              if (res.statusCode == 200) {
                let imageUrl = constants.API_BASE_URL + res.data
                that.sendImage(imageUrl)
              }
            }
          })
        })
      }
    })
  },
  // 发送图片消息
  sendImage(url) {
    let message = new Message(this.data.openid, this.data.toOpenid, 2);
    message.content = url;
    message.user = this.data.user;
    app.sendSocketMessage(message);
    let msgList = this.data.msgList
    msgList.push(message)
    this.setData({
      msgList: msgList,
      msg: ''
    })
  },
  //预览图片
  previewImage(e) {
    let imageMsgArr = this.data.msgList.filter(msg => {
      return msg.type == 2;
    })
    let imageArr = Array.from(imageMsgArr, img => img.content)
    wx.previewImage({
      current: e.target.dataset.url, // 当前显示图片的http链接
      urls: imageArr // 需要预览的图片http链接列表
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  inputContent: function (e) {
    this.setData({
      inputContent: e.detail.value
    })
    console.log(e.detail.value)
  },
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  inputvalue:function (e) {
    this.setData({
      toOpenid:e.detail.value
    })
  },
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
    wx.navigateBack({
      complete: (res) => {},
    })
  },
  //确认
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
  }

})