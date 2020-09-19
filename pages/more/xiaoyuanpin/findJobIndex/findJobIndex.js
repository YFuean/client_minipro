// pages/more/xiaoyuanpin/findJobIndex.js
var app = getApp();
const API = require("../../../../utils/requestZhaopin");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 类型标签的显示
    showType0: false,
    showType1: false,
    // 传入的校招职位类型id
    typeId: 0,
    // 传入的校招职位类型名称
    currentName: "",
    bgColor: "",
    color: "",
    toChooseTpye: "./chooseType/chooseType.wxml",
    // tab滑块切换的索引
    currentTabHeader: 0,
    currentSubTab: 0,
    // 搜索页跳转路径
    toPath: "/pages/more/xiaoyuanpin/searchpage/searchPage",
    // 从类型选择页（兼职），传入的数组
    typeList: [],
    // 顶部tab切换
    tabItemHeader: [
      {
        id: 0,
        tab: "兼职",
      },
      {
        id: 1,
        tab: "校招",
      },
    ],
    // 二级tab切换（推荐、最新）
    subTabItem: [
      {
        id: 0,
        tab: "推荐",
      },
      {
        id: 1,
        tab: "最新",
      },
    ],
    // 推荐职位列表（兼职）
    jobListRecommend: [],
    // 最新职位列表（兼职）
    jobListLast: [],
    // 推荐职位列表(校招)
    jobListXiaozhao: [],
    // 最新职位列表（校招）
    jobListXiaozhaoLast: [],
    // 校招按类型搜索出的结果列表
    jobListXiaozhaoType: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 校招 按类型搜索职位
     */

    // 获取从类型选择页，传入的类型id
    const typeId = options.id;
    const currentName = options.name;
    // 若类型id有值则，直接显示校招的推荐页面，展示类型选择结果
    if (options.id) {
      this.setData({
        currentTabHeader: 1,
        typeId: typeId,
        currentName: currentName,
        showType1: true,
      });
      // console.log(typeId);
      // id有值则展示类型搜索结果
      this.getJobListXiaozhaoType();
      // console.log("have id");
    } else {
      // id为空则展示校招职位列表（推荐列表）
      this.getjobListXiaozhao();
      // console.log("no id");
    }

    /**
     * 兼职 按类型搜索职位
     */
    if (options.nameList == null) {
      // 获取推荐职位(兼职)
      this.getRecommend();
    } else {
      this.data.jobListRecommend = [];
      let typeList = JSON.parse(options.nameList);
      // console.log(typeList);
      this.setData({
        typeList: typeList,
        showType0: true,
      });
      typeList.forEach((v) => {
        // 根据类型请求接口
        API.getJobListPartType({
          currentPage: 1,
          field: v,
          pageSize: 10,
        }).then((res) => {
          let data = JSON.parse(res);
          this.setData({
            jobListRecommend: this.data.jobListRecommend.concat(data.data),
          });
        });
      });
    }

    // 获取系统信息
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
        });
      },
    });
    // console.log(that.data.winHeight);

    // 获取最新职位（兼职）
    this.getjobListLast();
    // 获取最新职位（校招）
    this.getJobListXiaozhaoLast();
  },

  // 点击关闭按类型搜索的结果
  closeType: function () {
    if (this.data.currentTabHeader == 0) {
      this.data.jobListRecommend = [];
      this.getRecommend();
      this.setData({
        showType0: false,
      });
    } else {
      this.data.jobListXiaozhao = [];
      this.getjobListXiaozhao();
      this.setData({
        showType1: false,
      });
    }
  },

  // 获取类型搜索结果（通过传入的类型id）
  getJobListXiaozhaoType: function () {
    API.getJobListXiaozhaoType({
      currentPage: 1,
      field: this.data.typeId,
      pageSize: 1,
    }).then((res) => {
      let data = JSON.parse(res);
      let jobListXiaozhao = data.data;
      // 若该类型下有值，则展示类型搜索结果，为空则显示“无职位...”
      if (jobListXiaozhao.length > 0) {
        this.setData({
          jobListXiaozhao: data.data,
        });
      }
      console.log('通过类型搜索校招职位列表：',this.data.jobListXiaozhao);
    });
  },

  // 测试导航栏父子组件点击事件
  onMyEvent: function (e) {
    // 自定义组件触发事件时提供的detail对象
    // console.log(e.detail);
    console.log("a");
  },

  // 获取推荐职位列表数据
  getRecommend: function () {
    API.getJobListRecommend({
      currentPage: 1,
      field: "pay",
      pageSize: 10,
    }).then((res) => {
      const data = JSON.parse(res);
      // console.log(data);
      this.setData({
        jobListRecommend: this.data.jobListRecommend.concat(data.data),
      });
      // console.log(this.data.jobListRecommend);
    });
  },

  // 获取最新职位列表数据
  getjobListLast: function () {
    API.getJobListRecommend({
      currentPage: 1,
      field: "gmt_create",
      pageSize: 10,
    }).then((res) => {
      const data = JSON.parse(res);
      // console.log(data);
      this.setData({
        jobListLast: this.data.jobListLast.concat(data.data),
      });
      // console.log(this.data.jobListLast);
    });
  },

  // 获取校招推荐职位列表数据
  getjobListXiaozhao: function () {
    API.getjobListXiaozhao({
      currentPage: 1,
      field: "pay",
      pageSize: 10,
    }).then((res) => {
      const data = JSON.parse(res);
      // console.log(data);
      this.setData({
        jobListXiaozhao: this.data.jobListXiaozhao.concat(
          data.data.slice(0, 10)
        ),
      });
      // console.log(this.data.jobListXiaozhao);
    });
  },

  // 获取校招最新职位列表数据
  getJobListXiaozhaoLast: function () {
    API.getjobListXiaozhaoLast({
      currentPage: 1,
      field: "gmt_create",
      pageSize: 10,
    }).then((res) => {
      const data = JSON.parse(res);
      // console.log(data);
      this.setData({
        jobListXiaozhaoLast: this.data.jobListXiaozhaoLast.concat(
          data.data.slice(0, 10)
        ),
      });
      // console.log(this.data.jobListXiaozhaoLast);
    });
  },

  // 跳转到下一个页面
  toNextPage: function (e) {
    wx.navigateTo({
      url:
        "/pages/more/xiaoyuanpin/findJobIndex/" +
        e.currentTarget.dataset.url +
        "/" +
        e.currentTarget.dataset.url +
        "?id=" +
        JSON.stringify(e.currentTarget.dataset.id),
    });
    console.log('从首页点击跳转到下一页传出的id及路径', e.currentTarget.dataset.id, e.currentTarget.dataset.url);
  },

  // 滑块切换带动tab样式切换
  changeTab1: function (e) {
    // console.log(e);
    let that = this;
    that.setData({
      currentTabHeader: e.detail.current,
    });
  },

  // 滑块切换带动tab样式切换
  changeTab2: function (e) {
    let that = this;
    that.setData({
      currentSubTab: e.detail.current,
    });
  },

  // 点击切换滑块（兼职、校招）
  switchTab1: function (e) {
    let that = this;
    if (this.data.currentTabHeader === e.target.dataset.current) {
      return;
    } else {
      that.setData({
        currentTabHeader: e.target.dataset.current,
      });
    }
    // console.log(that.data.currentTabHeader);
  },

  // 点击切换滑块（推荐、最新）
  switchTab2: function (e) {
    let that = this;
    if (this.data.currentSubTab === e.target.dataset.current) {
      return;
    } else {
      that.setData({
        currentSubTab: e.target.dataset.current,
      });
    }
    // console.log(that.data.currentSubTab);
  },

  // 滚动条监听
  onPageScroll: function (e) {
    console.log(e.scrollTop);
    if (e.scrollTop >= 47.5) {
      this.setData({
        bgColor: "#37c2bc",
        color: "#ffffff",
      });
    } else {
      this.setData({
        bgColor: "",
        color: "",
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
