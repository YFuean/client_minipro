// pages/errands/my/becomeRunner/becomeRunner.js
const API = require('../../../../../utils/request')
const app = getApp();
var uploadImage = require('../../../../../utils/uploadFile'); //地址换成你自己存放文件的位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back: 'idCardBack',
    front: 'idCardFront',
    idCardBack: '',
    idCardFront: '',
    remark: '',
    requesterId: '',
    requesterName: '',
    requesterPhonenumber: ''
  },

  // 输入信息改变
  requesterId_onChange: function (e) {
    this.setData({
      requesterId: e.detail.value,
    })
    console.info('申请人id:', this.data.requesterId)
  },
  requesterPhonenumber_onChange: function (e) {
    // 利用正则控制输入为数字
    let value = this.validateNumber(e.detail.value)
    this.setData({
      requesterPhonenumber: value,
    })
    console.info('申请人手机号:', value)
  },
  // 利用正则控制输入值为数字
  validateNumber(val) {
    return val.replace(/\D/g, '')
  },
  requesterName_onChange: function (e) {
    this.setData({
      requesterName: e.detail.value,
    })
    console.info('申请人姓名:', e.detail.value)
  },
  remark_onChange: function (e) {
    this.setData({
      remark: e.detail.value,
    })
    console.info('申请原因:', e.detail.value)
  },

  //预览图片
  viewImage: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.id;
    console.log(url);
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  },
  // 上传图片
  upShopLogo: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#a3a2a2",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImageShop('album', id); //从相册中选择
          } else if (res.tapIndex == 1) {
            that.chooseWxImageShop('camera', id); //手机拍照
          }
        }
        console.log("是" + id + "面")
      }
    })
  },
  chooseWxImageShop: function (type, id) {
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
              console.log(id + "======上传成功图片地址为：", result);
              if (id == 'idCardFront') {
                _this.setData({
                  'idCardFront': result
                })
                console.log("idCardFront" + "======上传成功图片地址为：", result);
                wx.showToast({
                  title: '上传成功',
                })
              } else if (id == 'idCardBack') {
                console.log(id + "======上传成功图片地址为：", result);
                _this.setData({
                  'idCardBack': result
                })
                console.log("idCardBackt" + "======上传成功图片地址为：", result);
                wx.showToast({
                  title: '上传成功',
                })
              }

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


  // 判断是否为空的方法
  isNullfac: function (val, name) {
    console.log(name + "值为:" + val);
    if (val == '' || val == null) { //输入框中输入为空
      wx.showModal({
        title: '提示',
        content: name + "不能为空并且不能为全空格",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }
        }
      })
      // console.log(name + "不能为空并且不能为全空格");
      return true;
    } else {
      return false;
    }
  },

  // 按钮绑定事件
  become_runner: function () {
    // 确保所有信息都已填写
    const Backval = this.isNullfac(this.data.idCardBack, '身份证背面照');
    const Frontval = this.isNullfac(this.data.idCardFront, '身份证背面照');
    const remarkval = this.isNullfac(this.data.remark, '申请原因');
    const Idval = this.isNullfac(this.data.requesterId, '申请人id');
    const Nameval = this.isNullfac(this.data.requesterName, '姓名');
    const Phonenumberval = this.isNullfac(this.data.requesterPhonenumber, '手机号');
    console.log('Backval值为:' + Backval);
    console.log('Frontval值为:' + Frontval);
    console.log('remarkval值为:' + remarkval);
    console.log('Idval值为:' + Idval);
    console.log('Nameval值为:' + Nameval);
    console.log('Phonenumberval值为:' + Phonenumberval);
    if (Backval == false && Frontval == false && remarkval == false && Idval == false && Nameval == false && Phonenumberval == false) {
      this.becomeRunner()
    } else {

    }
  },
  // 网络请求
  becomeRunner() {
    console.log("网络请求能触发……");
    var that = this
    API.becomeRunner({
      idCardBack: that.data.idCardBack,
      idCardFront: that.data.idCardFront,
      remark: that.data.remark,
      requesterId: that.data.requesterId,
      requesterName: that.data.requesterName,
      requesterPhonenumber: that.data.requesterPhonenumber
    }).then(res => {
      console.log("网络请求能触发……有返回");
      const data = JSON.parse(res)
      console.log(data)
      if (data.code === 1) {
        wx.showToast({
          title: '已申请，请等待审核……',
        })
      } else {
        wx.showToast({
          title: '申请失败，请稍后再试……',
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
      requesterId:app.globalData.user.jobNumber,
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