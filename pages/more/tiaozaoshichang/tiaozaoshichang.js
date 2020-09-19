// pages/more/tiaozaoshichang/tiaozaoshichang.js
const API = require('../../../utils/request')
var uploadImage = require('../../../utils/uploadFile');//地址换成你自己存放文件的位置
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uase:null,
    name:'',
    description:'',
    imageUrls:'',
    imageList:['/image/picture.png'],
    price: '0.00',
    typeId:0,
    type:'添加标签/类型/..',
	  isKeyboard: false, //是否显示键盘
	  keyboardType:'keyboardTwo',//键盘类型
	  maxLength:10,//最大长度
	  minLength:0,//最小程度
	  test:'',//正则
	  placeholder:'格式不正确',//提示信息
    whichInput:'getPrice',//方法名
    hiddenmodalput:true,
    types:[],
    selectMark: [],
    mark:'',
    curNav: 1,
    curIndex: 0,
    disabled:true,
    fabuStatus:false,
    goodId:0
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
      types:app.globalData.allType,
      user:app.globalData.user
    })
  },
  bindName:function(e){
    console.log(e)
    this.setData({
      name:e.detail.value
    })
    this.validateInfo()
  },
  bindDescription:function(e){
    console.log(e)
    this.setData({
      description:e.detail.value
    })
    this.validateInfo()
  },
  //添加图片
  addPicture:function(e){
    var that = this;
    wx.showActionSheet({
    itemList: ['从相册中选择', '拍照'],
    itemColor: "#a3a2a2",
    success: function (res) { 
    if (!res.cancel) {
    if (res.tapIndex == 0) {
           that.chooseWxImageShop('album');//从相册中选择
    } else if (res.tapIndex == 1) {
           that.chooseWxImageShop('camera');//手机拍照
    }
    } 
    } 
    })
  },
  chooseWxImageShop: function (type) {
    var _this = this
    const urls = []
    wx.chooseImage({
      count: 9, // 默认最多一次选择9张图
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: type, // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
         //支持多图上传
         for (var i = 0; i < res.tempFilePaths.length; i++) {
            //显示消息提示框
            wx.showLoading({
               title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
               mask: true
            }) 
            //上传图片
            //你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
            //图片路径可自行修改
            uploadImage(res.tempFilePaths[i], 'zhihuixiaoyuan/',
               function (result) {
                  console.log("======上传成功图片地址为：", result);
                  urls.push(result)
                  if(_this.data.imageList[0]==='/image/picture.png'){
                    _this.setData({
                      imageList: Array.from(new Set(urls))
                    })
                  }else{
                    _this.setData({
                      imageList:Array.from(new Set(_this.data.imageList.concat(urls)))
                    })
                  }
                  console.log(_this.data.imageList)
                  _this.setData({
                    imageUrls: _this.data.imageList.join('--**--')
                  })
                  console.log(_this.data.imageUrls)
                  _this.validateInfo()
                  //做你具体的业务逻辑操作
                  wx.hideLoading();         
               }, function (result) {
                  console.log("======上传失败======", result);
                  //做你具体的业务逻辑操作
                  wx.hideLoading()
               }
               
            )
            
         }
         
      }
   })
  },
  //删除图片
  deleteImg:function(e){
    const imgList = this.data.imageList
    const img = e.currentTarget.dataset.item
    for (let index = 0; index < imgList.length; index++) {
      const element = imgList[index];
      if(element===img){
        imgList.splice(index,1)
      }
    }
    this.setData({
      imageList:imgList,
      imageUrls:imgList.join('--**--')
    })
    this.validateInfo()
  },
  isKeyboard:function(){
    this.setData({
      isKeyboard: true
    })
  },
  getPrice(e){
    console.log(e)
    this.setData({
      isKeyboard:false,
      price: e.detail.inputContent==''? '0.00':parseFloat(e.detail.inputContent)
    })
    this.validateInfo()
    console.log(e.detail.inputContent)
  },
  showModal:function(){
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  cancel:function(){
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  confirm:function(){
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  chooseType:function(e){
    this.setData({
      typeId:e.currentTarget.dataset.id,
      type:e.currentTarget.dataset.name
    })
    this.validateInfo()
  },
  bindMark:function(e){
    this.setData({
      mark:e.detail.value
    })
  },
  //添加标签
  addMark:function(){
    if(this.data.selectMark.length<3){
    if(this.data.mark.length===0){
      wx.showToast({
        title: '不能为空',
        image:'/image/warning.png'
      })
    }else{
      const marks = this.data.selectMark
    marks.unshift(this.data.mark)
    this.setData({
      selectMark: marks,
      mark: ''
    })
    }
    }else{
      wx.showToast({
        title: '最多添加3个',
        image:'/image/warning.png'
      })
    }
  },
  //删除标签
  deleteMark:function(e){
    const marks = this.data.selectMark
    for (let index = 0; index < marks.length; index++) {
      const element = marks[index];
      if(element==e.currentTarget.dataset.mark){
        marks.splice(index,1)
      }
    }
    this.setData({
      selectMark:marks
    })
  },
  //信息校验
  validateInfo(){
    if(this.data.name.length<=0||this.data.imageList[0]==='/image/picture.png'||this.data.imageList.length<=0||this.data.description.length<=0||this.data.typeId==0||this.data.price=='0.00'){
      this.setData({
        disabled:true
      })
      return false
    }else{
      this.setData({
        disabled:false
      })
      return true
    }
  },
  //发布商品
  postGood:function(){
    var that = this
    if(app.globalData.updateGood){
      console.log(that.data.imageUrls)
      API.updateGoodInfo({
        goodsDescription:that.data.description,
        goodsImgUrl:that.data.imageUrls,
        goodsMark:that.data.selectMark.toString(),
        goodsName:that.data.name,
        goodsPrice:that.data.price,
        pkFleaGoodsId:that.data.goodId,
        pkFleaTypeId: that.data.typeId,
        pkFleaUserId: that.data.user.pkUserAccountId
      }).then(res =>{
        const data = JSON.parse(res)
        if(data.code===1){
          that.setData({
            fabuStatus:true
          })
          wx.showToast({
            title: '修改成功'
          })
          wx.navigateBack({
            delta:2,
            complete: (res) => {
              wx.redirectTo({
            url: '/pages/more/tiaozaoshichang/index',
          })
            },
          })
        }
      })
    }else{
      console.log(that.data.imageUrls)
      API.postGood({
        goodsDescription:that.data.description,
        goodsImgUrl:that.data.imageUrls,
        goodsMark:that.data.selectMark.toString(),
        goodsName:that.data.name,
        goodsPrice:that.data.price,
        pkFleaTypeId: that.data.typeId,
        pkFleaUserId: this.data.user.pkUserAccountId
      }).then(res =>{
        const data = JSON.parse(res)
        if(data.code===1){
          that.setData({
            fabuStatus:true
          })
          wx.showToast({
            title: '发布成功'
          }) 
          wx.navigateBack({
            complete: (res) => {
              wx.redirectTo({
                url: '/pages/more/tiaozaoshichang/index',
              })
            },
          })
        }
      })
    }
   
  },
  //二级分类切换
  switchRightTab: function (e) {
    let id = e.target.dataset.id, index = e.target.dataset.index;
    console.log(e)
    this.setData({
      curNav: id,
      curIndex: index
    })
    if(e.target.dataset.index==this.data.types.length-1){
      this.setData({
        type:'其他',
        typeId: 69
      })
    }
    this.validateInfo()
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
    if(app.globalData.goodinfo!==null){
      const good = app.globalData.goodinfo
      console.log(good)
      if(good.hasOwnProperty('pkFleaGoodsId')){
        this.setData({
          goodId: good.pkFleaGoodsId
        })
      }
      this.setData({
        name:good.goodsName,
        description:good.goodsDescription,
        imageList: good.goodsImgUrl,
        imageUrls:good.goodsImgUrl.join('--**--'),
        price:good.goodsPrice,
        typeId: good.pkFleaTypeId,
        type:good.typeName,
        selectMark:good.goodsMark[0]!=''?good.goodsMark:[],
        disabled:this.validateInfo()
      }) 
      this.validateInfo()
    }
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
    var that = this
    if(!(that.data.name<=0&&that.data.imageUrls<=0&&that.data.description<=0&&that.data.typeId==0&&that.data.price=='0.00'&&that.data.selectMark.length==0)&&!this.data.fabuStatus&&!app.globalData.updateGood){
      wx.showModal({
        title: '尚未发布',
        content: '是否保存到草稿箱',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            const good = {
              'goodsDescription':that.data.description,
              'goodsImgUrl':that.data.imageList,
              'goodsMark':that.data.selectMark.toString(),
              'goodsName':that.data.name,
              'goodsPrice':that.data.price,
              'pkFleaTypeId': that.data.typeId,
              'type':that.data.type,
              // 'selectMarks':that.data.selectMark.toString()
            }
            app.globalData.goodinfo = good
            app.globalData.updateGood = false
          } else if (res.cancel) {
            console.log('用户点击取消')
            app.globalData.goodinfo = null
            app.globalData.updateGood = false
          }
        }
      }) 
    }
    else if(app.globalData.updateGood){
      app.globalData.goodinfo = null
      app.globalData.updateGood = false
    }
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