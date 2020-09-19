// pages/more/tiaozaoshichang/my.js
const app = getApp();
const API = require("../../../utils/request");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:null,
    tab: 0,
    //collectionPage:1,
    collectionList:[],
    fabuPage:1,
    fabuList:[],
    orderPage:1,
    orderList:[],
    nofabu:false,
    //nocolection:false,
    noorder:false
  },
  changeItem:function(e){
    this.setData({
      tab: e.currentTarget.dataset.item
    })
  },
    //前往主页
  go_page:function(e){
    const user = e.currentTarget.dataset.user
    wx.navigateTo({
      url: '/pages/more/tiaozaoshichang/personal?user='+JSON.stringify(user),
    })
  },
  //获取用户收藏列表
  getCollectionList:function(){
    // console.log(this.data.collectionPage)
    API.getCollectionList({
      // currentPage:this.data.collectionPage,
      // pageSize:6,
      pkFleaUserId:this.data.user.pkUserAccountId
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
          const list1 = this.data.collectionList.concat(list)
          this.setData({
            collectionList: list1.reverse()
          })
        }else{ 
          // this.setData({
          //   nocolection:true
          // })
          console.log("-------------------已加载全部-------------------")
        }
      }
    })
  },
  //获取用户发布列表
  getFabuList:function(){
    console.log(this.data.user.pkUserAccountId)
    API.getFabuList({
      currentPage:this.data.fabuPage,
      pageSize:6,
      pkFleaUserId:this.data.user.pkUserAccountId
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
  //获取用户订单列表
  getOrderList:function(){
    API.getOrderList({
      currentPage:this.data.orderPage,
      pageSize:6,
      pkFleaUserId:this.data.user.pkUserAccountId
    }).then(res =>{
      const data = JSON.parse(res)
      console.log(data)
      if(data.code==1){
        const list = data.data.content
          if(list.length>0){
          console.log(list)
          list.forEach(element => {
            const images = element.goodsImg
            console.log(images)
            const imgs = images.split('--**--')
            element.goodsImgUrl = imgs
          });
          this.setData({
            orderList: this.data.orderList.concat(list)
          })
        }else{
          this.setData({
            noorder:true
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
    this.setData({
      user: app.globalData.user
    })
    this.setData({
      //collectionPage:1,
      fabuPage:1,
      orderPage:1,
      collectionList:[],
      fabuList:[],
      orderList:[]
    })
    
    this.getFabuList()
    this.getOrderList()
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
    this.getCollectionList()
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
   
    // if(this.data.tab==2){
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
    if(this.data.tab==1){
      this.setData({
        orderPage:this.data.orderPage+1
      })
      console.log(this.data.orderPage)
      this.getOrderList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})