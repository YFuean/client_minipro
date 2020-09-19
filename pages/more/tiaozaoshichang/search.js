// pages/more/tiaozaoshichang/search.js
const API = require('../../../utils/request')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMarks:[],
    content: '',
    historyList:[],
    searchList:[],
    searchStatus:false
  },
  //获取前五热门标签
  getTopMark:function(){
    API.getTopMark({}).then(res =>{
      const data = JSON.parse(res)
      console.log(data.data)
      this.setData({
        topMarks:data.data
      })
    })
  },
  //模糊搜索
  searchGoods:function(e){
    console.log(e)
    if(e.detail.value.length==0){
      this.setData({
        content: '电子产品',
        searchStatus:true
      })
    }else{
      this.setData({
        content:e.detail.value,
        searchStatus:true
      })
    }
    API.search({
      content: this.data.content,
      currentPage:1,
      pageSize: 10
    }).then(res =>{
      const data = JSON.parse(res)
      console.log(data.data)
      const list = []
      const subList1 = {
        id: '1',
        content: data.data.fleaGoods.content
      }
      const subList2 = {
        id: '2',
        content: data.data.fleaReward.content
      }
      list.push(subList1)
      list.push(subList2)
      const list1 = this.data.historyList
      const name = e.detail.value.length==0?'电子产品':e.detail.value
      list1.unshift(name)
      this.setData({
        searchList:list,
        historyList: Array.from(new Set(list1))
      })
      wx.setStorageSync('historyList', this.data.historyList)
      console.log(list[0].content.length>0||list[1].content.length>0)
      if(list[0].content.length>0||list[1].content.length>0){
        this.setData({
          searchStatus:true
        })
      }
      console.log(this.data.searchList)
    })
  },
  //输入实时搜索
  bindSearch:function(e){
    console.log(e)
    if(e.detail.cursor==0){
      this.setData({
        searchStatus:false
      })
    }else{
      this.setData({
        searchStatus:true,
        content:e.detail.value
      })
      API.search({
        content: this.data.content,
        currentPage:1,
        pageSize:6
      }).then(res =>{
        const data = JSON.parse(res)
        console.log(data.data)
        const list = []
        const subList1 = {
          id: '1',
          content: data.data.fleaGoods.content
        }
        const subList2 = {
          id: '2',
          content: data.data.fleaReward.content
        }
        list.push(subList1)
        list.push(subList2)
        this.setData({
          searchList:list
        })
        console.log(list[0].content.length>0||list[1].content.length>0)
        if(list[0].content.length>0||list[1].content.length>0){
          this.setData({
            searchStatus:true
          })
        }
        console.log(this.data.searchList)
      })
    }
  },
  //清空搜索框
  clearInput:function(){
    this.setData({
      content:'',
      searchStatus:false
    })
    console.log(app.globalData.historyList)
  },
  //清空搜索历史记录
  clear_search_history:function(){
    this.setData({
      historyList:[]
    })
    wx.setStorageSync('historyList', [])
  },
  inputInfo:function(e){
    console.log(e)
    this.setData({
      content:e.currentTarget.dataset.item,
    })
  },
  go_type:function(e){
    console.log(app.globalData.historyList)
    console.log(e)
    const good = e.currentTarget.dataset.item
    // good['userAvatar'] =good.fleaUser.avatar
    // good['userName'] =good.fleaUser.userName
    // good['pkFleaUserId'] =good.fleaUser.pkFleaUserId
    // good['nickname'] =good.fleaUser.nickname
    const list = this.data.historyList
    list.unshift(good.goodsName)
    this.setData({
      content: good.goodsName,
      historyList: Array.from(new Set(list))
    })
    wx.setStorageSync('historyList', this.data.historyList)
    const goodId = good.pkFleaGoodsId
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
    
    this.getTopMark()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      historyList: wx.getStorageSync('historyList') || []
    })
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