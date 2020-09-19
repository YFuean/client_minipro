// pages/more/xiaoyuanpin/searchpage/searchPage.js
const API = require("../../../../utils/requestZhaopin");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 显示历史记录
    showHistory: true,
    // 当前滑块id
    currentItem: 0,
    // 控制搜索结果为空的提示
    showRes: false,
    // 输入框的值
    inputStr: "",
    // 搜兼职、搜校招的tab
    tabList: [
      {
        id: 0,
        name: "搜兼职",
      },
      {
        id: 1,
        name: "搜校招",
      },
      {
        id: 2,
        name: "搜公司",
      },
    ],
    // 搜索结果
    resListPartJob: [],
    resListXiaozhao: [],
    resListCompany: [],
    // 历史搜索
    historyList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    // 初始化历史记录
    this.openHistorySearch();
  },

  // 点击历史搜索的监听事件
  clickHistoryChip: function(e){
    this.setData({
      inputStr: e.currentTarget.dataset.value
    })
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
      success: (result) => {
        console.log(
          "全局搜索页，点击跳转下一页，传入的职位id及跳转路径",
          e.currentTarget.dataset.id
        );
      },
      fail: () => {
        console.log(
          "全局搜索页面中，跳转失败，路径：" + e.currentTarget.dataset.url
        );
      },
      complete: () => {},
    });
  },

    // 跳转到公司详情
    toCompanyDetail: function (e) {
      wx.navigateTo({
        url:
          "/pages/more/xiaoyuanpin/company/" +
          e.currentTarget.dataset.url +
          "/" +
          e.currentTarget.dataset.url +
          "?id=" +
          JSON.stringify(e.currentTarget.dataset.id),
        success: (result) => {
          console.log(
            "全局搜索页，点击跳转下一页，传入的职位id及跳转路径:",
            e.currentTarget.dataset.id, e.currentTarget.dataset.url
          );
        },
        fail: () => {
          console.log(
            "全局搜索页面中，跳转失败，路径：" + e.currentTarget.dataset.url
          );
        },
        complete: () => {},
      });
    },

  // 输入框的聚焦监听事件
  clickFocus: function (e) {
    // 初始化历史记录
    this.openHistorySearch();
    // 视图层显示历史记录
    this.setData({
      showHistory: true,
    });
  },

  // 清空输入框
  clearInput: function () {
    this.setData({
      inputStr: "",
    });
  },

  // 输入框的输入监听事件
  getValue: function (e) {
    this.setData({
      inputStr: e.detail.value,
    });
    // console.log(this.data.inputStr);
  },

  // 搜索按钮的点击事件
  search: function () {
    // 清空两个列表，初始化滑块id
    this.setData({
      resListXiaozhao: [],
      resListPartJob: [],
      currentItem: 0,
      // 点击完成按钮或搜索按钮时，设置为空提示的状态，页面上会进一步比对
      showRes: true,
      // 隐藏历史记录
      showHistory: false,
      // historyList: this.data.historyList.concat(this.data.inputStr)
    });
    // 调用三个查询接口、同时查询兼职、校招与公司
    this.searchJobByStr();
    this.searchPartJobByStr();
    this.searchCommpanyByStr();
    // 采集历史记录，去重，非空处理
    this.getHistoryList();
  },

  // 采集历史记录
  getHistoryList: function () {
    let historyList = this.data.historyList;
    let inputStr = this.data.inputStr;
    if (this.data.inputStr == "") {
      return;
    } else {
      //将搜索值放入历史记录中,只能放前五条
      if (historyList.length < 8) {
        // 过滤重复记录
        historyList = historyList.filter((item) => item.value != inputStr);
        // 将最新的词排在最前面
        historyList.unshift({
          value: inputStr,
          id: historyList.length,
        });
      } else {
        // 过滤重复记录
        historyList = historyList.filter((item) => item.value != inputStr);
        //删掉旧的时间最早的第一条
        historyList.pop();
        historyList.unshift({
          value: inputStr,
          id: historyList.length,
        });
      }
      // console.log(this.data.historyList);
      //将历史记录数组整体储存到缓存中
      wx.setStorageSync("historyList", historyList);
    }
  },

  // 取出本地储存的历史搜索
  openHistorySearch: function () {
    this.setData({
      historyList: wx.getStorageSync("historyList") || [],
      //若无储存则为空
    });
  },

  // 模糊查询职位（兼职）
  searchPartJobByStr: function () {
    API.searchPartJobByStr({
      currentPage: 1,
      field: this.data.inputStr,
      pageSize: 10,
    }).then((res) => {
      let data = JSON.parse(res);
      this.setData({
        resListPartJob: data.data,
      });
      console.log(
        "全局搜索页，模糊查询职位（兼职）：",
        this.data.resListPartJob
      );
    });
  },

  // 模糊查询职位（校招）
  searchJobByStr: function () {
    API.searchJobByStr({
      currentPage: 1,
      field: this.data.inputStr,
      pageSize: 10,
    }).then((res) => {
      let data = JSON.parse(res);
      this.setData({
        resListXiaozhao: data.data,
      });
      console.log(
        "全局搜索页，模糊查询职位（校招）：",
        this.data.resListXiaozhao
      );

      // 若结果不为空，则定位到校招页面
      if (this.data.resListXiaozhao.length > 0) {
        this.setData({
          currentItem: 1,
        });
      }
    });
  },

  // 模糊查询公司
  searchCommpanyByStr: function () {
    API.searchCompanyByStr({
      currentPage: 1,
      field: this.data.inputStr,
      pageSize: 10,
    }).then((res) => {
      let data = JSON.parse(res);
      // 将公司标签以逗号分隔
      data.data.forEach(v => {
        v.type = v.type.split(",")
      });
      this.setData({
        resListCompany: data.data,
      });
      let resListCompany = this.data.resListCompany
      console.log(
        "全局搜索页，模糊查询职位（公司）：",
        resListCompany
      );
      // 若结果不为空，则定位到公司页面
      if (resListCompany.length > 0) {
        this.setData({
          currentItem: 2,
        });
      }
    });

  },

  // 滑动切换
  changeSwiper: function (e) {
    this.setData({
      currentItem: e.detail.current,
    });
  },

  // 点击切换滑块
  changeItem: function (e) {
    // console.log(e);
    this.setData({
      currentItem: e.currentTarget.dataset.id,
    });
    // console.log(this.data.currentItem);
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
