// pages/my/yijian/yijain.js
const API = require('../../../utils/request')
const app = getApp();
var uploadImage = require('../../../utils/uploadFile');//地址换成你自己存放文件的位置
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    title:'',
    content:'',
    phoneNumber:'',
    image:[],
    contentLength: 0
  },
  bindTitle:function(e){
    this.setData({
      title: e.detail.value
    })
  },
  bindContent:function(e){
    this.setData({
      content: e.detail.value
    })
  },
  bindPhoneNum:function(e){
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  //意见反馈
  feedback:function(){
    var that = this
    wx.showModal({
      title: '反馈提交',
      content: '确认提交',
      success (res) {
        if (res.confirm) {
          if(that.data.title.length <= 0){
            wx.showToast({
              title: '反馈标题不能为空~',
              icon:"none"
            })
          }else if(that.data.content.length <= 0){
            wx.showToast({
              title: '反馈内容不能为空~',
              icon:"none"
            })
          }else{
          console.log(that.data.title)
          console.log(that.data.content)
          console.log(that.data.phoneNumber)
          console.log(that.data.image.toString)
          API.feedback({
            title:that.data.title,
            content:that.data.content,
            contactWay:that.data.phoneNumber,
            picInfo:that.data.image.toString
          }).then(res =>{
                    const data = JSON.parse(res)
                    console.log(data)
                    if(data.code===1){
                      wx.showToast({
                        title: '反馈成功',
                      })
                      wx.navigateBack({
                        complete: (res) => {},
                      })
                    }else{
                      wx.showToast({
                        title: '反馈失败',
                      })
                    }
                    //清空数据
                    that.setData({
                      title:'',
                      content:'',
                      phoneNumber:'',
                      image:[],
                      contentLength: 0
                    })
                  })
                }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  binddelImg:function(e) {
    var id = e.target.dataset.id
    console.log(id)
    this.setData({
      image:this.data.image.splice(id,1)
    })
  },
  uploadImg:function() {
    var that = this;
  wx.showActionSheet({
  itemList: ['从相册中选择', '拍照'],
  itemColor: "#a3a2a2",
  success: function (res) { 
  if (!res.cancel) {
  if (res.tapIndex == 0) {
         that.chooseWxImageShop('album');//从相册中选择
  } else if (res.tapIndex == 1) {
         that.chooseWxImageShop('camera');//手机拍照
  }
  } 
  } 
  })
  },
  chooseWxImageShop: function (type) {
    var _this = this
    wx.chooseImage({
      count: 9, // 默认最多一次选择9张图
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: type, // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
         //支持多图上传
         for (var i = 0; i < res.tempFilePaths.length; i++) {
            //显示消息提示框
            wx.showLoading({
               title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
               mask: true
            })
            _this.setData({
              image : res.tempFilePaths
            })
            //上传图片
            //你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
            //图片路径可自行修改
            uploadImage(res.tempFilePaths[i], 'zhihuixiaoyuan/',
               function (result) {
                  console.log("======上传成功图片地址为：", result);
                  console.log(_this.data.image)
                  //做你具体的业务逻辑操作
                  wx.hideLoading();
               }, function (result) {
                  console.log("======上传失败======", result);
                  //做你具体的业务逻辑操作
                  wx.hideLoading()
               }
            )
         }
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
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.navigateBack({
      delta: 1
  })
  },
  reflushImg:function(e) {
    console.log(this.data.image)
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.image // 需要预览的图片http链接列表
    })
  },
  bindTitle:function(e){
    this.setData({
      title:e.detail.value
    })
  },
  bindContent:function(e) {
    this.setData({
      content:e.detail.value
    })
    var length = this.data.content.length
    this.setData({
      contentLength:length
    })
  },
  bindPhone:function(e) {
    var tel = e.detail.value
    if(/^1(3|4|5|7|8|9)\d{9}$/.test(tel)){
      this.setData({
        phoneNumber:tel
      })
    }else {
     wx.showToast({
       title: '请输入有效手机号',
       icon:'none',
       duration:1000
     })
    }
   
  }
})