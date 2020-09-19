const app = getApp()
const API = require('../../utils/request')
const filter = require('../../utils/filter')
Page(filter.identityFilter({
  data: {
    showModalStatus:false,
    cardView:null,
    week:1,
    selectSemester: false,
    semesterId:1,
    semester:[],
    weekList: [],
    weekSchedule:[],
    wlist: []
  },

  onLoad: function (options) {
    if(app.globalData.token!=null){
    this.getScheduleByWeek()
    this.setData({
      semester:app.globalData.allSemester
    })
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
        })
      },
    })
  }
  },
  onShow:function(){
  },
  //根据学期id获取周次
  getWeeks:function(semesterId){
    console.log(semesterId)
    var weekNum = 0
    this.data.semester.forEach(element => {
      if(element.pkSemesterId === semesterId){
        weekNum = element.weekCount
      }
      console.log(weekNum)
    });
    this.getWeekList(weekNum)
  },
  //遍历集合
  getWeekList:function(num){
    const list = []
    for (let index = 0; index < num; index++) {
      const week = {
        id: index+1,
        name:'第'+(index+1)+'周'
      };
      list.push(week)
    }
    this.setData({
      weekList:list
    })
  },
  getScheduleByWeek:function(){
    API.getScheduleByWeek({
      clazzId: app.globalData.user.clazzId,
      semesterId: this.data.semesterId,
      week:this.data.week
    }).then(res =>{
      const data = JSON.parse(res)
      console.log(data.data)
      this.setData({
        weekSchedule:data.data
      })
      this.handelSchedule()
    })
  },
  //处理课表
  handelSchedule:function(){
    const ScheduleList = this.data.weekSchedule
    if(ScheduleList!=null){
    const newScheduleList = []
    ScheduleList.forEach(schedul => {
      const schedul1 = {
        xqj:'',
        tec:'',
        skjc:'',
        skcd:2,
        kcm:'',
        jsbh:'',
        color:'',
        cover: ''
      }
      schedul1.xqj=schedul.weekDay
      schedul1.tec=schedul.teacherName,
      schedul1.skjc=2*schedul.time-1
      schedul1.skcd=2
      schedul1.kcm=schedul.subjectName
      schedul1.jsbh=schedul.towerName+schedul.roomName
      schedul1.color=schedul.backgroundColor
      schedul1.cover=schedul.cover,
      newScheduleList.push(schedul1)
    });
    console.log(newScheduleList)
    this.setData({
      wlist:newScheduleList
    })
  }else{
    wx.showToast({
      title: '数据为空',
      image:'/image/warning.png'
    })
  }
  },

  stopTouchMove: function () {
    return false;
  },

  showCardView: function (e) {
    console.log(e)
    let cardView = {
      kcm: e.currentTarget.dataset.wlist.kcm,
      color: e.currentTarget.dataset.wlist.color,
      jsbh: e.currentTarget.dataset.wlist.jsbh,
      cover: e.currentTarget.dataset.wlist.cover,
      teacherName: e.currentTarget.dataset.wlist.tec,
    }
    this.setData({
      cardView: cardView
    })
    this.util("open");
  },
  hideModal() {
    this.util("close");
  },
  util: function (currentStatu) {
    var animation = wx.createAnimation({
      duration: 100, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });
    this.animation = animation;
    animation.opacity(0).rotateX(-100).step();
    this.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.opacity(1).rotateX(0).step();
      this.setData({
        animationData: animation
      })
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },

  getDate:function(e){
    console.log(e.detail)
    if(e.detail.name.length>4){
      this.setData({
        semesterId:e.detail.id+1
      })
      this.getWeeks(e.detail.id+1)
    }else{
      var value = e.detail.name.replace(/[^0-9]/ig,"") //提取数字
     this.setData({
      week: Number(value)
    })
    }
    this.getScheduleByWeek()
  }
  
}))
