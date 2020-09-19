// pages/dianfeichongzhi/dianfeichongzhi.js
const API = require('../../utils/request')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput:true,  
    addmoney: 30,
    buildingName:'雪松苑',
    buildingNum: 'A1',
    room:'220',
    roomId: 1,
    value: [0,0,0],
    buildings:[],
    buildindNums:[],
    rooms:[],
    shuse_list:[],
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
  bindChange(e) {
    console.log(e.detail.value)
    const val = e.detail.value
    this.setData({
      buildingName: this.data.buildings[val[0]].name,
      buildingNum: this.data.buildindNums[val[1]].num,
      room: this.data.rooms[val[2]].num,
      roomId:this.data.rooms[val[2]].roomId
      //shuse_name:this.data.buildings[val[0]].name+'-'+this.data.buildindNums[val[1]].num+'-'+this.data.rooms[val[2]].num
    })
    this.pushBuildingNums(val[0])
    this.pushRooms(val[0],val[1])
  },
  onMyEvent: function(e){
    var value = e.detail.replace(/[^0-9]/ig,"") //提取数字
    this.setData({
      addMoney: Number(value)
    })
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
  //电费充值
  go_chongzhi:function(){
    API.electricityDeposit({
    field1: this.data.roomId, //房间id
    field2:this.data.addMoney
    }).then( res => {
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
 //获取所有楼栋并将扁平化数据转化为树状结构
 getAllTower:function(){
   API.getAllTower({}).then(res =>{
     const data = JSON.parse(res)
     console.log(data.data)
     var compare = function (obj1, obj2) {
      var val1 = obj1.towerName;
      var val2 = obj2.towerName;
      if (val1 < val2) {
          return -1;
      } else if (val1 > val2) {
          return 1;
      } else {
          return 0;
      }            
  }
     const list = data.data.sort(compare)
     const towerList = []
     for (let index = 0; index < list.length; index++) {
     const tower = {
       name: list[index].towerName,
       num:[]
     }
     const towerUnit = {
       num: list[index].towerUnitName,
       rooms:[]
     }
     const room = {
       roomId:list[index].roomId,
       num:list[index].roomName
     }
     towerUnit.rooms.push(room)
     tower.num.push(towerUnit)
     towerList.push(tower)
     }
     console.log(towerList)
     const towers = []
     var a = 0
     var b = 0
     for (let index = 1; index < towerList.length; index++) {
       towers.push(towerList[0].name)
       if(towers.indexOf(towerList[index].name)!=-1){
        towerList[a].num.push(towerList[index].num[0])
       }
       else{
        towers.push(towerList[index].name)
        a++
        towerList[a].name=towerList[index].name
       }
     }
     const towerUnits = towerList.slice(0,a+1)
     var tlist = []
     for (let index = 0; index < towerUnits.length; index++) {
       var element = towerUnits[index].num;
       for (let index = 1; index < element.length; index++) {
         tlist.push(element[0].num)
         if(tlist.indexOf(element[index].num)!=-1){
          element[b].rooms.push(element[index].rooms[0])
         }else{
           tlist.push(element[index].num)
           b++
           element[b].num=element[index].num
         }
        }
        towerUnits[index].num = element.slice(0,b+1)
        b=0
        tlist = []  
     }
    console.log(towerList.slice(0,a+1))
    this.setData({
      shuse_list:towerList.slice(0,a+1)
    })
    this.pushBuildings()
    this.pushBuildingNums(0)
    this.pushRooms(0,0)
   })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllTower()
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

  },
  pushBuildings:function(){
    const list = new Array
    this.data.shuse_list.forEach(element => {
      list.push(element)
    });
    this.setData({
      buildings:list
    })
  },
  pushBuildingNums:function(index){
    const list = new Array
    this.data.shuse_list[index].num.forEach(element => {
      list.push(element)
    });
    this.setData({
      buildindNums:list
    })
    console.log(this.data.buildindNums)
  },
  pushRooms:function(index1,index2){
    const list = new Array
    this.data.shuse_list[index1].num[index2].rooms.forEach(element => {
      list.push(element)
    });
    this.setData({
      rooms:list
    })
  }
})