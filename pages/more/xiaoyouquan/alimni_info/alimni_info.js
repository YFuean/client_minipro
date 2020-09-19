// pages/message/alumni_info/alimni_info.js
const api = require('../../../../utils/request')
const TIME = require('../../../../utils/timestamp')
const APP = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    size: {
      width: 0,
      height: 0,
    },
    windowWidth: APP.globalData.systemInfo.windowWidth,
    images: [],
    thumbs: 0,
    isReply: true,
    time: '',
    commentsNum: '',
    pkDynamicId: '',
    comments: [],
    commentsReply: [],
    dynamic: [],
    isComment: false,
    commentContent: '',
    commentId: 0,
    touchStart: 0,
    shoucang: false,
    dianzan: false,
    showModal: false, //false关闭模态框  true开启模态框
    isTop: true,
    type:'',
    pid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    //记录用户喜欢看什么类型的帖子
    api.recommenBasic({
      tag: options.type,
      userId: APP.globalData.user.pkUserAccountId
    }).then(res => {
      var res = JSON.parse(res)
      console.log(res)
      if(res.code == 1){
        console.log("看了帖子")
      }
    })
    var that = this
    that.setData({
      pkDynamicId: options.id,
      time: options.time,
      type:options.type
      // content: options.content,
      // thumbs: options.thumbs,
    })
    console.log(that.data.pkDynamicId, that.data.time)

  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    let id = that.data.pkDynamicId
    api.getDynamicInfo({
      id: id
    }).then(res => {
      var res = JSON.parse(res)
      that.setData({
        dynamic: res.data,
      })
      if (res.code == 1) {
        if(res.data.commentVoList != null){
        var arr = res.data.commentVoList.filter(({
          isDeleted
        }) => isDeleted == true);
        that.setData({
          comments: arr,
        })
      }
      //查找收藏列表 判断此动态是否已收藏
        api.getStar({
          currentPage: 0,
          field:APP.globalData.user.pkUserAccountId,
          pageSize: 15
        }).then(star =>{
          var res = JSON.parse(res)
          console.log(star)
          for(let i = 0;i<star.data.length;i++) {
            console.log(that.data.dynamic.content)
            if(star.data[i].content == that.data.dynamic.content ){
              that.setData({
                shoucang:true
              })
            }
          }
        })
      

          //查看点赞记录 判断当前用户对某条动态点过赞 点过赞的给图标颜色加深
        if(that.data.dynamic.thumbList != null){
          for (let j = 0; j < that.data.dynamic.thumbList.length; j++) {

            if (that.data.dynamic.thumbList[j].userId == APP.globalData.user.pkUserAccountId) {
              that.setData({
                dianzan: true,
                pid:this.data.dynamic.thumbList[j].pkThumbId
              })

            }
          }
        }


        api.getPhoto({
          id: that.data.pkDynamicId
        }).then(res => {
          var res = JSON.parse(res)
          if (res.data.length != 0) {
       //     console.log(res.data)
            that.setData({
              images: res.data
            })
            console.log(that.data.images)
          }
        })


        if (that.data.comments.length != 0) {
          that.data.comments.forEach(item => {
            item.showModal = true //是否查看回复
            item.status = true //是否有回复
          })

          for (let i = 0; i < that.data.comments.length; i++) {
            var time = "comments[" + i + "].gmtCreate"
 
            var status = "comments[" + i + "].status"
            if (that.data.comments[i].replyComments.length == 0) {
              that.setData({
                [status]: false
              })

            } else if (that.data.comments[i].replyComments.length > 0) {
              that.setData({
                [status]: true
              })
              // console.log("有回复")
             // console.log(that.data.comments[i].status)
            }
            that.setData({
              [time]: TIME.formatMsgTime(that.data.comments[i].gmtCreate)
            })
          }
          // console.log(that.data.dynamic)
          // console.log(1111111111)
          // console.log(that.data.comments[0].gmtCreate)

        }
      }
    })

  },



  changeReply: function (e) {
    let id = e.currentTarget.dataset.comment
    this.setData({
      isReply: true,
      // isComment: true,
      commentId: id
    })
  },

  changeComment: function () {
    this.setData({
      isComment: true,
      isReply: false
    })
  },
  inputContent: function (e) {
    this.setData({
      commentContent: e.detail.value
    })
  },
  sendComment: function () {
    var that = this
    let content = that.data.commentContent
    let id = that.data.pkDynamicId
    console.log(content, id)
    if (that.data.isReply == false) {
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
          that.onShow()
          that.setData({
            commentContent: '',
            isComment: false
          })
        }
      })
    } else {
      let commentId = that.data.commentId
      api.insReply({
        commentId: commentId,
        content: content,
        userId: APP.globalData.user.pkUserAccountId
      }).then(res => {
        var res = JSON.parse(res)
        if (res.code == 1) {
          wx.showToast({
            title: '回复成功',
            icon: 'success',
            duration: 1000
          })
          that.onShow()
          that.setData({
            commentContent: ''
          })
        }
      })
    }
  },

  changeStar: function () {
    console.log("收藏了")
    let id = this.data.dynamic.pkDynamicId
    if(this.data.shoucang == false){
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
        this.setData({
          shoucang: true
        })
        api.recommenBasic({
          tag: this.data.type,
          userId: APP.globalData.user.pkUserAccountId
        }).then(res => {
          var res = JSON.parse(res)
          console.log(res)
          if(res.code == 1){
            console.log("喜欢+1")
          }
        })
       } 
     
    })
  }else {
    api.delStar({
      id:this.data.pkDynamicId
    }).then(res => {
      var res = JSON.parse(res)
      console.log(res)
      if(res.code == 1){
        wx.showToast({
          title:'已取消收藏',
          icon:"success",
          duration:1000
        })
        this.setData({
          shoucang: false
        })
      }
   })
  }
   
  },
  changeDianzan: function () {
    wx.vibrateShort() //手机振动API
    var that = this
    let arr = that.data.dynamic.thumbs
    that.animation = wx.createAnimation({
      duration: 300, // 动画持续时间，单位 ms
      timingFunction: 'linear', // 动画的效果
      delay: 10, // 动画延迟时间，单位 ms
      transformOrigin: '50% 50%' // 动画的中心点
    })
 

    if (that.data.dianzan == false) {
      setTimeout(function () {
        that.animation.scale(1.5).step();
        that.animation.scale(1.0).step();
        that.setData({
          animation: this.animation.export()
        });
      }.bind(this), 50);
     
      that.setData({
        [arr]:dynamic.thumbs+1,
        dianzan: true
      })
      api.thumbLike({
        dynamicId: that.data.pkDynamicId,
        userId: APP.globalData.user.pkUserAccountId
      }).then(res => {
        var res = JSON.parse(res)
        console.log(res)
        if (res.code == 1) {
          that.setData({
            pid: res.data
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
        [arr]:dynamic.thumbs+1,
        dianzan: false
      })
      console.log("iddddd")
      let pid = that.data.pid
      console.log(id, pid)
      api.thumbLike({
        dynamicId: that.data.pkDynamicId,
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
  //是否展开回复
  hideModal(e) {
    var that = this;
    var i = e.currentTarget.dataset.index
    var arr = "comments[" + i + "].showModal"
    that.setData({
      [arr]: false,
      isComment: false,
    })
  },
  viewReply: function (e) {
    var i = e.currentTarget.dataset.index
    var arr = "comments[" + i + "].showModal"
    this.setData({
      [arr]: true,
      isComment: true
    })
  },
  chaReply: function (e) {
    var i = e.currentTarget.dataset.index
    var arr = "comments[" + i + "].showModal"
    this.setData({
      [arr]: false,
      isComment: false,
      isReply: false
    })
  },

  //删除评论
  delComment: function (e) {
    var that = this
    let id = e.currentTarget.dataset.id
    console.log(id)
    wx.showModal({
      title: '提示',
      content: '确定删除此评论吗',
      success: function (resT) {
        if (resT.confirm) {
          console.log('用户点击确定')
          api.delComment({
            id: id
          }).then(res => {
            var res = JSON.parse(res)
            console.log(res)
            if (res.code == 1) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1000
              })
              that.onShow()
            }
          })
        } else if (resT.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //删除回复
  delReply: function (e) {
    var that = this
    let id = e.currentTarget.dataset.id
    console.log(id)
    wx.showModal({
      title: '提示',
      content: '确定删除此评论吗',
      success: function (resT) {
        if (resT.confirm) {
          console.log('用户点击确定')
          api.delReply({
            id: id
          }).then(res => {
            var res = JSON.parse(res)
            console.log(res)
            if (res.code == 1) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1000
              })
              that.onShow()
            }
          })
        } else if (resT.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //判断是否有回复后显示顶部回复计数
  reply: function (e) {
    var i = e.currentTarget.dataset.index
    var arr = "comments[" + i + "].showModal"
    this.setData({
      [arr]: true,
      isComment: true,
      isTop: false
    })
  },

  loadImage(e) {
    console.log(e);
    this.setData({
      ['size']: {
        width: e.detail.width,
        height: e.detail.height,
      }

    })
  },

  openImage: function (e) {
    const that = this;
    let urls = [];
    //console.log("ididdididi" + e.currentTarget.dataset.index)
    that.data.images.forEach(v => {
      urls.push(v.picture);
    })
    console.log("链接" + urls)
    wx.previewImage({
      current: urls[e.currentTarget.dataset.index], // 当前显示图片的http链接
      urls: urls, // 需要预览的图片http链接列表
    })
  },
  reportSelect: function () {
    wx.showActionSheet({
      itemList: ['恶意引站', '劣质广告', '日经贴，重复太多', '拒绝黄赌毒', '包含政治敏感信息', '其他理由'],
      success: function (res) {
        console.log(res.tapIndex)
        wx.showToast({
          title: '举报成功',
          icon: 'success',
          duration: 1000
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  }
})