// pages/wangfeichongzhi/wangfeichongzhi.js
const API = require('../../utils/request')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    hiddenmodalput:true,  
    addMoney: null,
    money_list:[
      {
        id:1,
        price:'30元',
        selectedColor:'#30A9DE',
        color:'white',
        selected:true
      },
      {
        id:2,
        price:'50元',
        selectedColor:'#30A9DE',
        color:'white',
        selected:false
      },
      {
        id:3,
        price:'100元',
        selectedColor:'#30A9DE',
        color:'white',
        selected:false
      },
      {
        id:4,
        price:'自定义金额',
        selectedColor:'#30A9DE',
        color:'white',
        selected:false
      }
    ],
    zhifu_list:[
    {
      id:1,
      icon:'/image/icon_weixin.png',
      name:'微信支付'
    }
  ]
  },
  onMyEvent: function(e){
    var value = e.detail.replace(/[^0-9]/ig,"") //提取数字
    console.log(Number(value))
    this.setData({
      addMoney: Number(value)
    })
    console.log(e.detail)
    for (let index = 0; index < this.data.money_list.length; index++) {
      var selected = "money_list[" + index + "].selected";
      if(this.data.money_list[index].price===e.detail){
        this.setData({
          [selected]: true
        })
      }else{
        this.setData({
          [selected]: false
        })
      }
    }
    if(e.detail==='自定义金额'){
      this.setData({  
        hiddenmodalput: !this.data.hiddenmodalput  
     })
    }
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const items = this.data.zhifu_list
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].name === e.detail.value
    }
    this.setData({
      items
    })
  },
  bindMoney:function(e){
    const number = e.detail.value
    if( number.constructor != "Number"){
      wx.showToast({
        title: '请输入数字',
        icon:  "none"
      })
    }
    this.setData({
      addMoney: Number(number)
    })  
},
//取消按钮  
cancel: function(){  
  this.setData({  
      hiddenmodalput: true  
  });  
},  
//确认  
confirm: function(){  
  this.setData({  
      hiddenmodalput: true  
  })  
  console.log('自定义金额为：'+this.data.addMoney)
} , 
//充值
   go_chongzhi:function(){
     API.netDeposit({
      cardNumber:app.globalData.user.cardNumber,
      money:this.data.addMoney
     }).then(res =>{
      const data = JSON.parse(res)
      if(data.code===1){
        wx.showToast({
          title: '充值成功',
          duration: 4000,
        })
        wx.reLaunch({
         url: '/pages/oneCartoon/oneCartoon',
        })
      }else{
        wx.showToast({
          title: '充值失败',
        })
        wx.navigateBack({
         complete: (res) => {},
       })
      }
     })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user: app.globalData.user
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