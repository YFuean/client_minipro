// pages/more/tiaozaoshichang/personal.js
const app = getApp();
const API = require("../../../utils/request");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:null,
    pkUserAccountId:0,
    isMy: false,
    tab: 0,
    //collectionPage:1,
    collectionList:[],
    fabuPage:1,
    fabuList:[],
    nofabu:false
  },
  changeItem:function(e){
    this.setData({
      tab: e.currentTarget.dataset.item
    })
  },
  go_update:function(e){
    wx.navigateTo({
      url: '/pages/more/tiaozaoshichang/mydata',
    })
  },
   //获取用户收藏列表
   getCollectionList:function(){
    API.getCollectionList({
      // currentPage:this.data.collectionPage,
      // pageSize:6,
      pkFleaUserId:this.data.pkUserAccountId
    }).then(res =>{
      const data = JSON.parse(res)
      console.log(data)
      if(data.code==1){
        const list = data.data
          if(list.length>0){
          console.log(list)
          list.forEach(element => {
            const images = element.goodsImgUrl
            console.log(images)
            const imgs = images.split('--**--')
            element.goodsImgUrl = imgs
          });
          this.setData({
            collectionList: this.data.collectionList.concat(list)
          })
        }else{ 
          console.log("-------------------已加载全部-------------------")
        }
      }
    })
  },
  //获取用户发布列表
  getFabuList:function(){
    console.log(this.data.pkUserAccountId)
    API.getFabuList({
      currentPage:this.data.fabuPage,
      pageSize:6,
      pkFleaUserId:this.data.pkUserAccountId
    }).then(res =>{
      const data = JSON.parse(res)
      console.log(data)
      if(data.code==1){
        const list = data.data.content
          if(list.length>0){
          console.log(list)
          list.forEach(element => {
            const images = element.goodsImgUrl
            console.log(images)
            const imgs = images.split('--**--')
            element.goodsImgUrl = imgs
          });
          this.setData({
            fabuList: this.data.fabuList.concat(list)
          })
        }else{
          this.setData({
            nofabu:true
          })
          console.log("-------------------已加载全部-------------------")
        }
      }
    })
  },
  //前往商品详情页
  go_detail:function(e){
    const goodId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/more/tiaozaoshichang/gooddetail?goodId='+goodId,
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
    wx.showLoading({
      title: '加载中',
    })
    console.log(options)
    const user = JSON.parse(options.user)
    this.setData({
      user: user,
      pkUserAccountId:user.pkUserAccountId
    })
    console.log(this.data.user.pkUserAccountId)
   console.log(this.data.user==app.globalData.user)
    if(this.data.user.pkUserAccountId==app.globalData.user.pkUserAccountId){
      this.setData({
        isMy: true
      })
    }
    this.setData({
      //collectionPage:1,
      fabuPage:1,
      collectionList:[],
      fabuList:[],
    })
    this.getCollectionList()
    this.getFabuList()
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
    wx.hideLoading({
      complete: (res) => {},
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
    // if(this.data.tab==1){
    //   this.setData({
    //     collectionPage:this.data.collectionPage+1
    //   })
    //   console.log(this.data.collectionPage)
    //   this.getCollectionList()
    // }
    if(this.data.tab==0){
      this.setData({
        fabuPage:this.data.fabuPage+1
      })
      console.log(this.data.fabuPage)
      this.getFabuList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})