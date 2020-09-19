// pages/more/tiaozaoshichang/gooddetail.js
const app = getApp();
const API = require("../../../utils/request");
const Random = require("../../../utils/random")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:null,
    good:null,
    ifCollected:false,
    shoucangText:'收藏',
  },
  //添加收藏
  addCollection:function(){
    API.addCollection({
      goodsId: this.data.good.pkFleaGoodsId,
      userId:this.data.user.pkUserAccountId
    }).then(res =>{
      const data = JSON.parse(res)
      if(data.code==1){
        this.setData({
          ifCollected:true,
          shoucangText:'已收藏'
        })
      }
    })
  },
  //删除收藏
  delectCollection:function(){
    API.deleteCollection({
      goodsId: this.data.good.pkFleaGoodsId,
      userId:this.data.user.pkUserAccountId
    }).then(res =>{
      const data = JSON.parse(res)
      if(data.code==1){
        this.setData({
          ifCollected:false,
          shoucangText:'收藏'
        })
        wx.navigateBack({
          complete: (res) => {},
        })
      }
    })
  },

  //判断该用户是否收藏该商品
  ifCollected:function(){
    API.ifCollected({
      goodsId: this.data.good.pkFleaGoodsId,
      userId:this.data.user.pkUserAccountId
    }).then(res =>{
      const data = JSON.parse(res)
      console.log(data.data=='已收藏！')
      if(data.data=='已收藏！'){
        this.setData({
          ifCollected: true,
          shoucangText:'已收藏'
        })
      }
    })
  },

  //添加订单
  addOrder:function(e){
    const that = this
    console.log(e)
    wx.showModal({
      title: '确定下单？',
      content: '确定后该商品将被下架',
      cancelText:'容我想想',
      confirmText: '确定想要',
      success (res) {
        if (res.confirm) {
          const random = Random.getRandom(6)
          API.addOrder({
            fleaGoodsPkFleaGoodsId: e.currentTarget.dataset.goodid,
            fleaUserBuyerPkFleaUserId: that.data.user.pkUserAccountId,
            fleaUserSellerPkFleaUserId: e.currentTarget.dataset.sellerid,
            pkFleaOrderId: random
          }).then(res =>{
            const data = JSON.parse(res)
            console.log(res)
            if(data.code===1){
              API.deleteGood({
                pkFleaGoodsId:e.currentTarget.dataset.goodid
              }).then(res =>{
                console.log(res)
                wx.navigateBack({
                  complete: (res) => {
                    wx.redirectTo({
                      url: '/pages/more/tiaozaoshichang/index',
                    })
                  },
                })
              })
            }else{
              wx.showLoading({
                title: '网络延迟',
              })
              setTimeout(function () {
                wx.hideLoading()
              }, 3000)
            }
          })
        } else if (res.cancel) {
         console.log('取消')
        }
      }
    })
  },
  //管理自己的商品(删除或编辑)
  manageGood:function(){
    var that = this
    wx.showActionSheet({
      itemList: ['编辑', '删除'],
      success (res) {
        console.log(res.tapIndex)
        if(res.tapIndex===0){
          console.log(that.data.good)
          app.globalData.goodinfo = that.data.good
          app.globalData.updateGood = true
          wx.navigateTo({
            url: '/pages/more/tiaozaoshichang/tiaozaoshichang',
          })
        }
        if(res.tapIndex===1){
          wx.showModal({
            title: '下架商品',
            content: '确定下架该商品？',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                API.deleteGood({
                  pkFleaGoodsId:that.data.good.pkFleaGoodsId
                }).then(res =>{
                  console.log(res)
                  const data = JSON.parse(res)
                  if(data.code===1){
                    wx.showToast({
                      title: '下架成功',
                      complete: (res)=>{
                        wx.navigateBack({
                          complete: (res) => {
                            wx.redirectTo({
                              url: '/pages/more/tiaozaoshichang/index',
                            })
                          },
                        })
                      }
                    })
                  }else{
                    wx.showToast({
                      title: '下架失败',
                      image:'/image/warning.png'
                    })
                  }
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  },
  //通过传过来的商品id获取到商品详细信息
  getGoodById:function(goodId){
    API.getGoodById({
      pkFleaGoodsId:goodId
    }).then(res =>{
      const data = JSON.parse(res)
      console.log(data)
      if(data.code==1){
        const good = data.data[0]
        const imgs = good.goodsImgUrl
        const marks = good.goodsMark
        console.log(imgs)
        good.goodsMark=marks.split(',')
        if(typeof imgs == "string"){
          good.goodsImgUrl = imgs.split('--**--')
        }
        console.log(good)
        this.setData({
          good:good,
          user:app.globalData.user
        })
        this.ifCollected()//查看是否收藏该商品
      }
    })
  },
  //前往商家主页
  go_user_home:function(e){
    const good = e.currentTarget.dataset.good
    const user = {
      'avatar':good.userAvatar,
      'userName':good.username,
      'pkUserAccountId':good.pkFleaUserId,
      'nickname':good.nickname
    }
    wx.navigateTo({
      url: '/pages/more/tiaozaoshichang/personal?user='+JSON.stringify(user),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#6AAFE6',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    console.log(options.goodId)
    const goodId = options.goodId
    this.getGoodById(goodId)
    
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // this.setData({
    //   currentTarget:0
    // })
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