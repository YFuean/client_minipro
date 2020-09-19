//index.js
//获取应用实例
const app = getApp();
const API = require("../../utils/request");
const dateFrom = require("../../utils/util");
Page({
  data: {
    currentPageTop: 0,
    pageSizeTop: 4,
    token: "",
    swiperCurrent: 0,
    length:0,
    slide_list: [
      {
        id: 1,
        src:
          "http://www.niit.edu.cn/_upload/article/images/69/f9/92ff04fc4000a3ad56746b63f7f5/472a3ade-2b4a-4c30-9437-5a7909add978_s.jpg",
      },
      {
        id: 2,
        src:
          "http://www.niit.edu.cn/_upload/article/images/21/00/cf3014544eaa95edb28f0f15b00d/331a508e-c176-4634-b21c-f106b44121c6_s.png",
      },
      {
        id: 3,
        src:
          "http://www.niit.edu.cn/_upload/article/images/d8/8f/03249d1f4f33859d0331639e25f3/02adf820-2c64-4eed-bcba-34c8e2e04572_s.jpg",
      },
    ],
    nav_list: [
      {
        id: 1,
        title: "课程表",
        icon: "/image/icon_kechengbiao.png",
        path: "/pages/classSchedule/classSchedule",
      },
      {
        id: 2,
        title: "考务查询",
        icon: "/image/icon_kaowuchaxun.png",
        path: "/pages/examinationQuery/examinationQuery",
      },
      {
        id: 3,
        title: "图书馆",
        icon: "/image/icon_tushuguan.png",
        path: "/pages/library/library",
      },
      {
        id: 4,
        title: "一卡通",
        icon: "/image/icon_yikatong.png",
        path: "/pages/oneCartoon/oneCartoon",
      },
      {
        id: 5,
        title: "全部",
        icon: "/image/more.png",
        path: "/pages/more/more/more",
      },
    ],
    course_list:[],
    infoList: [],
    date: "",
  },
  onLoad: function () {
    wx.showLoading({
      title: "加载中",
    });
    this.setData({
      date: dateFrom.formatTime2(new Date(Date.now())),
    });
    
  },

  // 跳转详情
  toDetail: function(event){
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../informationDetail/informationDetail?id=${id}`,
    });
      date: dateFrom.formatTime2(new Date(Date.now()))
  },

  // 获取热门资讯
  getInfoHot: function () {
    API.getInformationTop({
      currentPage: this.data.currentPageTop,
      pageSize: this.data.pageSizeTop,
    }).then((res) => {
      const data = JSON.parse(res);
      // console.log(data);
      // 截取时间，只保留年月日
      data.data.forEach((v) => {
        v.gmtCreate = v.gmtCreate.substring(0, 9);
      });
      this.setData({
        infoList: data.data,
      });
    });
  },
  onShow: function () {
    this.setData({
      token: app.globalData.token,
    });
    if(app.globalData.token!=null){
      this.getCardBalance() //获取一卡通余额
      this.getConsumeList() //获取清单明细
      this.getAllSemester() //获取所有学期数
      this.getTodayCourse()//获取今日课程
      this.getInfoHot(); //获取热门资讯
    }
    wx.hideLoading({
      complete: (res) => {},
    });
  },
  //获取卡的余额
  getCardBalance: function () {
    API.getCardBalance({
      field: app.globalData.cardNumber
    }).then( res =>{
      const data = JSON.parse(res)
      console.log(data)
      app.globalData.myBalance = data.data
    })
  },
  //获取清单明细
  getConsumeList: function () {
    API.getCardConsume({
      field: app.globalData.cardNumber,
    }).then((res) => {
      console.log(JSON.parse(res))
      const data = JSON.parse(res)
      app.globalData.consumerList = data.data.reverse();
    });
  },
  //获取所有学期
  getAllSemester:function(){
    API.getAllSemester({}).then(res =>{
      console.log(JSON.parse(res))
      const data = JSON.parse(res)
      app.globalData.allSemester = data.data
    })
  },
  //获取今日课程
  getTodayCourse:function(){
    API.getTodayCourse({
      field: app.globalData.user.clazzId
    }).then(res =>{
      const data = JSON.parse(res)
      console.log(data)
      this.setData({
        course_list:data.data,
        length: data.data==null? 0 : data.data.length
      })
      console.log(this.data.length)
    })
  }
});
