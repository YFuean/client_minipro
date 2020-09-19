// pages/index/recommend/recommend.js
const API = require('../../../../utils/request')
const APP = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'推荐',
    arr1:[],
    one: [], //身边趣事
    two: [], //创作分享
    three: [], //情感交流
    four: [], //吐槽爆料
    five: [], //时事新闻
    arr:['身边趣事','创作分享','情感交流','吐槽爆料','时事新闻'],
    flag:true,
    type:'身边趣事'
  },

  fanhui:function() {
    wx.navigateBack({
      delta: 0,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    for(let i = 0;i<that.data.arr.length;i++){
      var type = that.data.arr[i]
      console.log(type)
    API.recommenFriend({
      tag: type,
      userId: APP.globalData.user.pkUserAccountId
    }).then(res => {
      var res = JSON.parse(res)
      console.log(res)
      if(that.data.arr[i] == '身边趣事'){
        that.setData({
          one:res.data
        })

        for(let j = 0;j<res.data.length;j++){
          let newAr = 'one['+j+'].address'
          console.log(res.data[j].address.slice(0,2))
          that.setData({
            [newAr]:res.data[j].address.slice(0,2)
          })
        }
        

      }else if(that.data.arr[i] == '创作分享'){
        this.setData({
          two:res.data
        })
        for(let j = 0;j<res.data.length;j++){
          let newAr = 'two['+j+'].address'
          console.log(res.data[j].address.slice(0,2))
          that.setData({
            [newAr]:res.data[j].address.slice(0,2)
          })
        }
      }else if(that.data.arr[i] == '情感交流'){
        that.setData({
          three:res.data
        })
        for(let j = 0;j<res.data.length;j++){
          let newAr = 'three['+j+'].address'
          console.log(res.data[j].address.slice(0,2))
          that.setData({
            [newAr]:res.data[j].address.slice(0,2)
          })
        }
      }else if(that.data.arr[i] == '吐槽爆料'){
        that.setData({
          four:res.data
        })
        for(let j = 0;j<res.data.length;j++){
          let newAr = 'four['+j+'].address'
          console.log(res.data[j].address.slice(0,2))
          that.setData({
            [newAr]:res.data[j].address.slice(0,2)
          })
        }
      }else if(that.data.arr[i] == '时事新闻'){
        that.setData({
          five:res.data
        })
        for(let j = 0;j<res.data.length;j++){
          let newAr = 'five['+j+'].address'
          console.log(res.data[j].address.slice(0,2))
          that.setData({
            [newAr]:res.data[j].address.slice(0,2)
          })
        }
      }
    })
  }
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
  gochat:function() {
    wx.navigateTo({
      url: '/pages/more/xiaoyouquan/alimni_chat/alimni_chatting/alimni_chatting',
    })
  },
  translate: function (e) {
    let that = this
    var index = e.currentTarget.dataset.index
    that.setData({
      name:index
    })
    that.setData({
      flag:! that.data.flag
    }) 

  //   let newarr = [];
  //   newarr.push(e.currentTarget.dataset.item) 
  //   that.setData({
  //     arr1: newarr
  //   })  //先声明个空数组，把每个按钮的下标赋给新数组

  //   if(that.data.flag){
  //  that.animation = wx.createAnimation({
  //     duration: 300, // 动画持续时间，单位 ms
  //     timingFunction: 'linear', // 动画的效果
  //     delay: 10, // 动画延迟时间，单位 ms
  //     transformOrigin: '50% 50%' // 动画的中心点
  //   })
  //   //that.animation.translate(-50, -1).scale(1.5).step();
  //   that.animation.scale(1.5).step();
  //   setTimeout(function () {
  //     that.animation.scale(1.5).step();
  //     that.animation.scale(1.4).step();
  //     that.setData({
  //       animation: that.animation.export()
  //     });
  //   }.bind(that), 2);
  //   // this.animation.translate(-50, -1).step()
  //   that.setData({animation: that.animation.export()})
   
  //   console.log(that.data.flag)
  // }else{
  //     console.log(that.data.flag)
  //   that.index = wx.createAnimation({
  //     duration: 300, // 动画持续时间，单位 ms
  //     timingFunction: 'linear', // 动画的效果
  //     delay: 10, // 动画延迟时间，单位 ms
  //     transformOrigin: '50% 50%' // 动画的中心点
  //   })

  //   that.animation.translate(-50, -1).scale(1.0).step();
  //   // setTimeout(function () {
  //   //   that.animation.scale(1.5).step();
  //   //   that.animation.scale(1.4).step();
  //   //   that.setData({
  //   //     animation: this.animation.export()
  //   //   });
  //   // }.bind(this), 2);
  //   that.setData({animation: that.animation.export()})
  //   // var newnum =  that.data.flag -1
  //   // that.setData({
  //   //   flag:newnum
  //   // })
  // }
   },
})