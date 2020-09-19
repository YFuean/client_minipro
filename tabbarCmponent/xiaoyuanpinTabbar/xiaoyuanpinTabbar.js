// tabbarCmponent/xiaoyuanpinTabbar/xiaoyuanpinTabbar.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected: {
      type: Number,
      value: 0,
    },
  },

  /**
   * 页面的初始数据
   */
  data: {
    tabbarList: [
      {
        tabId: 0,
        icon:
          "https://zhxy-vue.oss-cn-hangzhou.aliyuncs.com/icon/position/zhiwei_weixuanzhong.png",
        iconActive:
          "https://zhxy-vue.oss-cn-hangzhou.aliyuncs.com/icon/position/zhiwei_xuanzhong.png",
        text: "职位",
        toPath: "/pages/more/xiaoyuanpin/findJobIndex/findJobIndex",
      },
      {
        tabId: 1,
        icon:
          "https://zhxy-vue.oss-cn-hangzhou.aliyuncs.com/icon/position/gongsi_weixuanzhong.png",
        iconActive:
          "https://zhxy-vue.oss-cn-hangzhou.aliyuncs.com/icon/position/gongsi_xuanzhong.png",
        text: "公司",
        toPath: "/pages/more/xiaoyuanpin/company/company",
      },
      {
        tabId: 2,
        icon:
          "https://zhxy-vue.oss-cn-hangzhou.aliyuncs.com/icon/position/xiaoxi_weixuanzhong.png",
        iconActive:
          "https://zhxy-vue.oss-cn-hangzhou.aliyuncs.com/icon/position/xiaoxi_xuanzhong.png",
        text: "消息",
        toPath: "/pages/more/xiaoyuanpin/message/message",
      },
      {
        tabId: 3,
        icon:
          "https://zhxy-vue.oss-cn-hangzhou.aliyuncs.com/icon/position/wode_weixuanzhong.png",
        iconActive:
          "https://zhxy-vue.oss-cn-hangzhou.aliyuncs.com/icon/position/wode_xuanzhong.png",
        text: "我的",
        toPath: "/pages/more/xiaoyuanpin/my/my",
      },
    ],
  },

  methods: {
    onMyEvent: function (data) {
      // console.log(data.currentTarget);
      // this.properties.selected 这个属性打印的是啥，看不懂，完全不是父组件传来的参数
      // console.log(this.properties.selected);
      
    },
  },
});
