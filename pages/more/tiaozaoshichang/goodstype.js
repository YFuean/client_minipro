// pages/more/tiaozaoshichang/goodstype.js
const app = getApp();
const API = require("../../../utils/request");
let leftHeight = 0,
  rightHeight = 0; //分别定义左右两边的高度
let  query;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage:0,
    typeId:0,
    goods:[],
    leftList: [],
    rightList: []
  },
  getGoodsByTypeId:function(typeId){
    wx.showLoading({
      title: '加载中',
    })
    var index = this.data.goods.length;
    API.getGoodsByTypeId({
      currentPage: this.data.currentPage,
      pageSize: 10,
      typeId: typeId
    }).then(res =>{
      const data = JSON.parse(res)
      if(data.data!=null){
        const list = data.data
        console.log(list)
        list.forEach(element => {
          const images = element.goodsImgUrl
          console.log(images)
          const imgs = images.split('--**--')
          element.goodsImgUrl = imgs
        });
        this.setData({
          goods: this.data.goods.concat(list)
        })
        if(this.data.currentPage===0){
          query = wx.createSelectorQuery()
          this.loopList(0)
        }else{
          this.loopList(index)
        }
      }else{
        console.log("-------------------已加载全部-------------------")
      }
      })
      wx.hideLoading({
        complete: (res) => {},
      })
  },
  loopList(index){
    const lists = this.data.goods
    console.log(lists)
    const leftList = this.data.leftList
    const rightList = this.data.rightList
    // console.log(index)
    if (!lists[index]) return;
    leftHeight <= rightHeight ? leftList.push(lists[index]) : rightList.push(lists[index]); //判断两边高度，来决定添加到那边
    this.getBoxHeight(leftList, rightList).then(()=>{
      this.loopList(++index)
    })
  },
  getBoxHeight(leftList, rightList) { //获取左右两边高度
    return new Promise((resolve, reject) => {
      this.setData({
        leftList,
        rightList
      }, () => {
        query.select('#left').boundingClientRect();
        query.select('#right').boundingClientRect();
        query.exec((res) => {
          leftHeight = res[0].height; //获取左边列表的高度
          rightHeight = res[1].height; //获取右边列表的高度
          resolve();
        });
      });
    })
  },
  go_detail:function(e){
    console.log(e.currentTarget.dataset.good)
    const goodId = e.currentTarget.dataset.good.pkFleaGoodsId
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
    this.setData({
      typeId : options.typeId
    })
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
      currentTarget:0,
      goods:[],
      leftList: [],
     rightList: []
    })
    this.getGoodsByTypeId(this.data.typeId)
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
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      currentPage:this.data.currentPage+1
    })
    this.getGoodsByTypeId(this.data.typeId)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})