// pages/message/message.js
const APP = getApp()
const api = require('../../../utils/request')
const TIME = require('../../../utils/timestamp')
const NEWS = require('../../../utils/constants')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '', //用户头像
    images: [

    ],
    newDynamic:[],
    currentPage: 1,
    pageSize: 19,
    currentData: 0,
    dynamic: [],
    backColor: '',
    isColor: false,
    // isShow: false,
    showModal: false, //false显示用户  true不显示用户
    getDynamic: [],
    isComment: false,
    commentContent: '',
    photoList: [],
    commentList: [],
    index: 0, //这是userId 用来屏蔽动态的
    pid: '',
    isMsg: false //是否有新消息
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(APP.globalData.user)

    var that = this
    that.setData({
      avatar: APP.globalData.user.avatar
    })
    var that = this
    APP.globalData.socketReceiverAll = function (e) {
      console.log("有回调消息")
      console.log(e)
      let magarr = e.split(',')
      console.log(magarr[0])
      if (magarr[0] == APP.globalData.user.nickname) {
        that.setData({
          isMsg: true
        })
      }
    }


    api.getDynamic({
      currentPage: 0,
      pageSize: 19
    }).then(res => {
      var res = JSON.parse(res)
      if (res.code == 1) {
        // console.log(res.data)
        that.setData({
          dynamic: res.data
        })
        that.initData()
      }
    })

  },
  initData: function () {
    var that = this
    that.data.dynamic.forEach(item => {
      item.isZhan = true //是否显示展开/收起
      item.isShow = false //是否点开更多
      item.ellipsis = false //是否展开/收起文本
      item.isLike = false //点赞
      item.picture = [] //图片数组
      // item.commentList = [] //评论（不包含回复）数组
      item.isComment = false //是否打开评论框
      item.showModal = false //是否弹出框
    })
    // console.log(that.data.dynamic)

    var newArr = []
    // var commentArr = []
    //遍历动态Id 根据Id查到图片数组 然后push到新的数组 将新数组赋给动态的图片picture属性后清空新数组 再开始遍历
    var commArr = []
    for (let i = 0; i < that.data.dynamic.length; i++) {
      var id = that.data.dynamic[i].pkDynamicId
      var nreArr = that.data.dynamic[i].commentList.concat(that.data.dynamic[i].commentVoList)
      // console.log(that.data.dynamic[i].commentList)
      // console.log(that.data.dynamic[i].commentVoList)

      commArr.push(nreArr)
      // console.log("新数组"+commArr)
      that.setData({
        commentList: commArr
      })
      //查看点赞记录 判断当前用户对某条动态点过赞 点过赞的给图标颜色加深
      let userId = "1"
      if (that.data.dynamic[i].thumbList != null) {
        for (let j = 0; j < that.data.dynamic[i].thumbList.length; j++) {
          if (that.data.dynamic[i].thumbList[j].userId == userId) {
            let arr = 'dynamic[' + i + '].isLike'
            that.setData({
              [arr]: true,
              pid: this.data.dynamic[i].thumbList[j].pkThumbId
            })
          }
        }
      }

      api.getPhoto({
        id: id
      }).then(res => {
        var res = JSON.parse(res)
        if (res.code == 1) {
          newArr.push(res.data)
          var img = "dynamic[" + i + "].picture"
          that.setData({
            [img]: newArr
          })
          newArr = []
        }
      })


      //去掉换行 时间格式化
      var arr = "dynamic[" + i + "].content"
      var time = "dynamic[" + i + "].gmtCreate"
      that.setData({
        [arr]: that.data.dynamic[i].content.replace(/[\r\n]/g, ""),
        [time]: TIME.formatMsgTime(that.data.dynamic[i].gmtCreate)
      })

      var zhan = "dynamic[" + i + "].isZhan"
      that.setData({
        [zhan]: true
      })

      if (that.data.dynamic[i].content.length < 20) {
        //   console.log(that.data.dynamic[i].content.length)
        that.setData({
          [zhan]: false
        })
      }
    }
  },
  initNewData:function() {
    var that = this
    that.data.newDynamic.forEach(item => {
      item.isZhan = true //是否显示展开/收起
      item.isShow = false //是否点开更多
      item.ellipsis = false //是否展开/收起文本
      item.isLike = false //点赞
      item.picture = [] //图片数组
      // item.commentList = [] //评论（不包含回复）数组
      item.isComment = false //是否打开评论框
      item.showModal = false //是否弹出框
    })
    // console.log(that.data.dynamic)

    var newArr = []
    // var commentArr = []
    //遍历动态Id 根据Id查到图片数组 然后push到新的数组 将新数组赋给动态的图片picture属性后清空新数组 再开始遍历
    var commArr = []
    for (let i = 0; i < that.data.newDynamic.length; i++) {
      var id = that.data.newDynamic[i].pkDynamicId
      var nreArr = that.data.newDynamic[i].commentList.concat(that.data.newDynamic[i].commentVoList)

      commArr.push(nreArr)

      that.setData({
        commentList: commArr
      })
      //查看点赞记录 判断当前用户对某条动态点过赞 点过赞的给图标颜色加深
      let userId = "1"
      if (that.data.newDynamic[i].thumbList != null) {
        for (let j = 0; j < that.data.newDynamic[i].thumbList.length; j++) {
          if (that.data.newDynamic[i].thumbList[j].userId == userId) {
            let arr = 'newDynamic[' + i + '].isLike'
            that.setData({
              [arr]: true,
              pid: this.data.newDynamic[i].thumbList[j].pkThumbId
            })
          }
        }
      }

      api.getPhoto({
        id: id
      }).then(res => {
        var res = JSON.parse(res)
        if (res.code == 1) {
          newArr.push(res.data)
          var img = "newDynamic[" + i + "].picture"
          that.setData({
            [img]: newArr
          })
          newArr = []
        }
      })


      //去掉换行 时间格式化
      var arr = "newDynamic[" + i + "].content"
      var time = "newDynamic[" + i + "].gmtCreate"
      that.setData({
        [arr]: that.data.newDynamic[i].content.replace(/[\r\n]/g, ""),
        [time]: TIME.formatMsgTime(that.data.newDynamic[i].gmtCreate)
      })

      var zhan = "newDynamic[" + i + "].isZhan"
      that.setData({
        [zhan]: true
      })

      if (that.data.newDynamic[i].content.length < 20) {
        that.setData({
          [zhan]: false
        })
      }
    }
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    var that = this;
    this.onLoad(); //重新加载onLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    that.setData({
      currentPage: that.data.currentPage + 1
    })
    console.log(that.data.dynamic)
    api.getDynamic({
      currentPage: that.data.currentPage,
      pageSize: that.data.pageSize
    }).then(res => {
      var res = JSON.parse(res)
      if (res.code == 1) {
        // console.log(res.data)
        
        that.setData({
          newDynamic: res.data
        })
        that.initNewData()
        var newArr = that.data.newDynamic
        var oldArr = that.data.dynamic
        var arr =oldArr.concat(newArr)
        console.log(arr)
        that.setData({
          dynamic: arr
        })
       
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    //执行函数是否屏幕某人动态
    this.delDynamic()
  },

  //去发帖
  checkPost: function () {
    wx.navigateTo({
      url: '/pages/more/xiaoyouquan/alimni_post/alimni_post',
    })
  },
  //查看消息
  checkMess: function () {
    wx.navigateTo({
      url: '/pages/more/xiaoyouquan/alimni_message/alimni_message',
    })
  },



  checkFollow: function () {
    wx.navigateTo({
      url: '/pages/more/xiaoyouquan/alimni_star/alimni_star',
    })
  },

  //去查看动态详情
  changeInfo: function (e) {
    var i = e.currentTarget.dataset.index
    var that = this
    var arr = 'dynamic[' + i + '].isShow'
    console.log(i)
    that.setData({
      [arr]: false,
      isComment: false
    })
    wx.navigateTo({
      url: '/pages/more/xiaoyouquan/alimni_info/alimni_info?id=' + e.currentTarget.dataset.id + '&time=' + e.currentTarget.dataset.time + '&type=' + e.currentTarget.dataset.type,
    })
  },
  //点击更多按钮是否悬浮
  changeHover: function (e) {
    var i = e.currentTarget.dataset.index
    var that = this
    var arr = 'dynamic[' + i + '].isShow'
    console.log(i)
    that.setData({
      [arr]: !that.data.dynamic[i].isShow
    })
  },
  ellipsis: function (e) {
    let that = this
    let i = e.currentTarget.dataset.index
    console.log(i)
    let arr = 'dynamic[' + i + '].ellipsis'
    that.setData({
      [arr]: !that.data.dynamic[i].ellipsis
    })

    console.log(that.data.dynamic[i].ellipsis)
  },
  /**
   * 隐藏底部用户资料库
   */
  hideModal(e) {
    var i = e.currentTarget.dataset.index
    console.log(i)
    var that = this
    var arr = 'dynamic[' + i + '].showModal'
    console.log(i)
    that.setData({
      [arr]: false
    })
  },
  hideComm: function (e) {
    var i = e.currentTarget.dataset.id
    console.log(i)
    var that = this
    var arr = 'dynamic[' + i + '].isComment'
    console.log(i)
    that.setData({
      [arr]: false
    })
  },
  //弹出底部用户资料框
  changeUser: function (e) {
    var i = e.currentTarget.dataset.index
    console.log(i)
    var that = this
    var arr = 'dynamic[' + i + '].showModal'
    console.log(i)
    that.setData({
      [arr]: true
    })
  },
  //去聊天
  goChat: function (e) {
    wx.navigateTo({
      url: '/pages/more/xiaoyouquan/alimni_chat/alimni_chatting/alimni_chatting?name=' + e.currentTarget.dataset.name,
    })
  },
  //去选择是否屏蔽 并把用户id给到data
  goBlackList: function (e) {
    var i = e.currentTarget.dataset.id
    console.log(i)
    this.setData({
      index: i
    })
    wx.navigateTo({
      url: '/pages/more/xiaoyouquan/black_list/black_list',
    })
  },
  //点赞
  dianzan: function (e) {

    wx.vibrateShort() //手机振动API
    var that = this

    that.animation = wx.createAnimation({
      duration: 300, // 动画持续时间，单位 ms
      timingFunction: 'linear', // 动画的效果
      delay: 10, // 动画延迟时间，单位 ms
      transformOrigin: '50% 50%' // 动画的中心点
    })
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let newArr = 'dynamic[' + index + '].isComment'
    this.setData({
      [newArr]: false,
    })
    let arr = 'dynamic[' + index + '].isLike'
    let count = 'dynamic[' + index + '].thumbs'
    console.log(id, index)
    // that.setData({
    //   [arr]: !that.data.dynamic[index].isLike,
    // })

    if (that.data.dynamic[index].isLike == false) {
      setTimeout(function () {
        that.animation.scale(1.5).step();
        that.animation.scale(1.0).step();
        that.setData({
          animation: this.animation.export()
        });
      }.bind(this), 50);
      that.setData({
        [count]: that.data.dynamic[index].thumbs + 1,
        [arr]: true
      })
      api.thumbLike({
        dynamicId: id,
        userId: APP.globalData.user.pkUserAccountId
      }).then(res => {
        var res = JSON.parse(res)
        console.log(res)
        if (res.code == 1) {
          that.setData({
            // [arr]: true,
            pid: res.data
          })
          wx.request({
            url: NEWS.SET,
            method: 'POST',
            data: {
              msg: that.data.dynamic[index].userAccount.nickname + "," + APP.globalData.user.nickname + "," + that.data.dynamic[index].content + ",点赞了你的贴子" + "," + APP.globalData.user.avatar
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (e) {
              console.log("点赞成功")
            }
          })

        }
      })
    } else {
      setTimeout(function () {
        that.animation.scale(1.5).step();
        that.animation.scale(1.0).step();
        that.setData({
          animation: this.animation.export()
        });
      }.bind(this), 50);

      that.setData({
        [count]: that.data.dynamic[index].thumbs - 1,
        [arr]: false
      })
      console.log("iddddd")
      let pid = that.data.pid
      console.log(id, pid)
      api.thumbLike({
        dynamicId: id,
        pkThumbId: pid,
        userId: APP.globalData.user.pkUserAccountId
      }).then(res => {
        var res = JSON.parse(res)
        console.log(res)
        if (res.code == 60008) {
          // that.setData({
          //   [arr]: false
          // })
        }

      })
    }

  },
  //是否打开评论框
  changeComment: function (e) {
    let i = e.currentTarget.dataset.index
    console.log(i)
    let arr = 'dynamic[' + i + '].isComment'
    this.setData({
      [arr]: true,
    })
  },
  //评论输入绑定
  inputContent: function (e) {
    this.setData({
      commentContent: e.detail.value
    })
  },
  //发送评论
  sendComment: function (e) {
    let content = this.data.commentContent
    let id = e.currentTarget.dataset.id

    let index = e.currentTarget.dataset.index
    let arr = 'dynamic[' + index + '].isComment'
    console.log(content, id, index)
    if (content != null) {
      api.insComment({
        content: content,
        dynamicId: id,
        userId: APP.globalData.user.pkUserAccountId
      }).then(res => {
        var res = JSON.parse(res)
        console.log(res)
        if (res.code == 1) {
          wx.showToast({
            title: '评论成功',
            icon: 'success',
            duration: 1000
          })
          this.setData({
            commentContent: '',
            [arr]: false
          })
          wx.request({
            url: NEWS.SET,
            method: 'POST',
            data: {
              msg: this.data.dynamic[index].userAccount.nickname + "," + APP.globalData.user.nickname + "," + this.data.dynamic[index].content + ",评论了你的贴子," + content + "," + APP.globalData.user.avatar
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (e) {
              console.log("评论成功")
              console.log(e)
            }
          })

          this.reflush()

        }
      })
    } else {
      wx.showToast({
        title: '评论内容不能为空',
        icon: 'none',
        duration: 1000
      })
      this.setData({
        [arr]: false
      })
    }
  },
  //收藏
  putStar: function (e) {
    console.log("收藏了")
    let id = e.currentTarget.dataset.id
    api.putStar({
      dynamicId: id,
      userId: APP.globalData.user.pkUserAccountId
    }).then(res => {
      var res = JSON.parse(res)
      console.log(res)
      if (res.code == 1) {
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          duration: 1000
        })
      } else {
        wx.showToast({
          title: '该条动态已收藏',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
  reportSelect: function () {
    wx.showActionSheet({
      itemList: ['恶意引站', '劣质广告', '日经贴，重复太多', '拒绝黄赌毒', '包含政治敏感信息', '其他理由'],
      success: function (res) {
        console.log(res.tapIndex)
        wx.showToast({
          title: '举报成功,请等待管理员审核',
          icon: 'success',
          duration: 1000
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  //去查看推荐好友
  bindReco: function () {
    wx.navigateTo({
      url: '/pages/more/xiaoyouquan/recommend/recommend',
    })
  },
  //刷新页面 用于评论成功后
  reflush: function () {
    var that = this
    api.getDynamic({
      currentPage: that.data.currentPage,
      pageSize: that.data.pageSize
    }).then(res => {
      var res = JSON.parse(res)
      if (res.code == 1) {
        // console.log(res.data)
        that.setData({
          dynamic: res.data
        })
        that.initData()
      }
    })
  },
  //使用过滤器实现屏蔽动态
  delDynamic: function () {
    let i = this.data.index

    if (APP.globalData.isBlack == true) {
      var arr = this.data.dynamic.filter(({
        userId
      }) => userId !== i);
      console.log(arr)
      this.setData({
        dynamic: arr
      })
    }
  },
})