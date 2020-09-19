// pages/errands/my/my.js

const API = require('../../../../utils/request')
const app = getApp();
var uploadImage = require('../../../../utils/uploadFile'); //地址换成你自己存放文件的位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    newUser:null,
  },


  //预览图片
  viewImage: function () {
    var that = this;
    wx.previewImage({
      current: that.data.user.avatar, // 当前显示图片的http链接
      urls: [that.data.user.avatar] // 需要预览的图片http链接列表
    })
  },
  //长按保存图片
  saveImage: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['保存到本地', '分享'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            let url = e.currentTarget.dataset.url;
            wx.saveImageToPhotosAlbum({
              filePath: url,
              success(res) {
                console.log(res);
              },
              fail(res) {
                console.log(res);
              }
            })
          } else if (res.tapIndex == 1) {
            //  that.chooseWxImageShop('camera');//手机拍照
          }
        }
      }
    })
  },
  // 我的头像点击上传图片
  upShopLogo: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#a3a2a2",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImageShop('album'); //从相册中选择
          } else if (res.tapIndex == 1) {
            that.chooseWxImageShop('camera'); //手机拍照
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

          //上传图片
          //你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
          //图片路径可自行修改
          uploadImage(res.tempFilePaths[i], 'zhihuixiaoyuan/',
            function (result) {
              console.log("======上传成功图片地址为：", result);
              _this.setData({
                'user.avatar': result
              })
              wx.showToast({
                title: '修改成功',
              })

              // API.updateUserInfo({
              //   avatar: _this.data.user.avatar,
              //   nickname: _this.data.user.nickname,
              //   gender: _this.data.user.gender,
              //   address: _this.data.user.address,
              //   pkUserAccountId: _this.data.user.pkUserAccountId
              // }).then(res => {
              //   const data = JSON.parse(res)
              //   console.log(data)
              //   if (data.code === 1) {
              //     wx.showToast({
              //       title: '修改成功',
              //     })
              //   } else {
              //     wx.showToast({
              //       title: '修改失败',
              //     })
              //   }
              // })
              //做你具体的业务逻辑操作
              wx.hideLoading();
            },
            function (result) {
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
    this.setData({
      newUser: app.globalData.user,
      user:app.globalData.user,
      'newUser.phoneNumber':app.globalData.user.phoneNumber.substring(0,3).concat("****").concat(app.globalData.user.phoneNumber.substring(7,11)),
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