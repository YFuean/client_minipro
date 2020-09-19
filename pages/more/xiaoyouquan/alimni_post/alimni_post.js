// pages/message/alimni_post/alimni_post.js
var QQMapWX = require('../../../../utils/qqmap-wx-jssdk');
var qqmapsdk;
const APP = getApp()
const API = require('../../../../utils/request')
var uploadImage = require('../../../../utils/uploadFile');
const NEWS = require('../../../../utils/constants')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textValue: '',
    textValueNum: 0,
    location: '位置信息',
    idx: '',
    type: '',
    applyList: [{
        id: "10",
        type: "身边趣事"
      },
      {
        id: "11",
        type: "创作分享"
      },
      {
        id: "12",
        type: "情感交流"
      },
      {
        id: "13",
        type: "吐槽爆料"
      },
      {
        id: "14",
        type: "时事新闻"
      },
    ],
    image: [],
    imgList: [],
    isDel:false
  },

  selectApply: function (e) {
    let id = e.target.dataset.id
    let type = e.target.dataset.type
    this.setData({
      idx: id,
      type: type
    })
    console.log(this.data.type)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  bindValue: function (e) {
    console.log(e.detail.value)
    this.setData({
      textValue: e.detail.value,
      textValueNum: e.detail.cursor
    })
  },
  getLocation: function () {
    var that = this
    // 实例化腾讯地图API核心类
    qqmapsdk = new QQMapWX({
      key: 'GNCBZ-4ZOKX-74M4T-7JJ6I-44JVK-UIFH7' // 必填
    });
    //获取当前位置
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        //根据坐标获取当前位置名称，显示在顶部，腾讯地图逆地址解析
        console.log(res.latitude);
        console.log(res.longitude);
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            console.log(addressRes);
            var address = addressRes.result.formatted_addresses.recommend;
            console.log(address);
            that.setData({
              location: address
            })
            console.log("位置：" + that.data.location);
          }

        })
      },
    })
  },
  putPost: function () {
    let type = this.data.type
   // let num = this.data.textValueNum
    let content = this.data.textValue
    console.log(content)
    console.log(type)
    if (type.length == 0) {
      wx.showToast({
        title: '请选择发帖类型',
        icon: 'none'
      })
    } else if (content.length == 0) {
      wx.showToast({
        title: '请输入发帖内容',
        icon: 'none'
      })
    }else if(type.length > 0 && content.length > 0){
      //埋包接口 用于记录用户喜欢发什么类型的帖子 来推荐相应用户
        API.putPost({
          content: content,
          type: type,
          title: '',
          userId: APP.globalData.user.pkUserAccountId
        }).then(res => {
          var res = JSON.parse(res)
          if (res.code == 1) {
            API.recommenBasic({
              tag: type,
              userId: 1
            }).then(res => {
              console.log(res)
              console.log("埋包成功")
            })
            API.like({
              text:content
            }).then( e => {
              // console.log(JSON.parse(e.data))
              var e = JSON.parse(e)
              let a = JSON.parse(e.data)
              // console.log(a.items[0])
              if(a.items[0].positive_prob > 0.5){
                wx.request({
                  url: NEWS.SET,
                  method:'POST',
                  data: {
                    msg:APP.globalData.user.nickname+","+"心情不错？来听首歌吧"
                  },
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  success:function(e) {
                    console.log("推送成功")
                  }
                })
              }else {
                wx.request({
                  url: NEWS.SET,
                  method:'POST',
                  data: {
                    msg:APP.globalData.user.nickname+","+"心情不好吗？出去走走吧"
                  },
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  success:function(e) {
                    console.log("推送成功")
                  }
                })
              }
            })
            console.log("长度" + this.data.image.length)
            if (this.data.image.length == 0) {
             
              wx.showToast({
                title: '发表成功',
                icon: 'success'
              })
              wx.navigateBack({
                complete: (res) => {wx.redirectTo({
                  url: '/pages/more/xiaoyouquan/index',
                })},
              })
            } else {
              let id = res.data.pkDynamicId
              console.log(id)
              console.log(APP.globalData.imgList)
              console.log(this.data.image[0])
             for(let i = 0;i<this.data.image.length;i++){
              API.putPhoto([{
                dynamicId: id,
                picture: this.data.image[i]
              }]).then(res => {
                var res = JSON.parse(res)
                console.log(res)
                if (res.code == 1) {
                  wx.showToast({
                    title: '发表成功',
                    icon: 'success'
                  })
                  wx.navigateBack({
                    complete: (res) => {wx.redirectTo({
                      url: '/pages/more/xiaoyouquan/index',
                    })},
                  })
                }
              })
             }
              
            }
          }
        })
      
     
    } else{
      wx.showToast({
        title: '发帖内容不能为空',
        icon: 'none'
      })
    }

  },

  reflushImg: function (e) {
    console.log(this.data.image)
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.image // 需要预览的图片http链接列表
    })
  },
  
  delImg: function (e) {
    // console.log(this.data.image)
    this.setData({
      image:[]
    })
    // console.log(e.currentTarget.id)
    // let id = e.currentTarget.id
    // Array.prototype.delete = function () {
    //   var temArray = [];
    //   for (var i = 0; i < this.length; i++) {
    //     if (i != id) {
    //       temArray.push(this[i]);
    //     }
    //   }
    //   return temArray;
    // }
    // APP.globalData.imgList.delete(id)
    // console.log("删除后"+APP.globalData.imgList)
    // this.setData({
    //   image:APP.globalData.imgList
    // })
  },
  uploadImg: function () {
    console.log("111111111111111")
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
        // let arr = []
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          //显示消息提示框
          wx.showLoading({
            title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
            mask: true
          })

          // console.log("数组" + res.tempFilePaths)

          // APP.globalData.imgList.push(res.tempFilePaths)
          // _this.setData({
          //   image: APP.globalData.imgList
          // })

          //上传图片
          //你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
          //图片路径可自行修改
          uploadImage(res.tempFilePaths[i], 'zhihuixiaoyuan/',
            function (result) {
              APP.globalData.imgList.push(result)
              _this.setData({
                image: APP.globalData.imgList
              })
              console.log("图片数组" + _this.data.image)
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
    console.log("全局" + APP.globalData.imgList)
    if(_this.data.image.length != 0){
      _this.setData({
        isDel:true
      })
    }
  }

})