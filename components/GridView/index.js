// commpents/GridView.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    images:{
      type: Array,
      value: [],
    }
  },

  options:{
    styleIsolation: 'shared',//样式共享
    multipleSlots: true //在组件定义时的选项中启用多solt支持
  },
  /**
   * 组件的初始数据
   */
  data: {
    size:{
      width:0,
      height:0,
    },
    windowWidth: app.globalData.systemInfo.windowWidth
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadImage(e){
     // console.log(e);
      this.setData({
        ['size']:{
          width:  e.detail.width,
          height: e.detail.height,
        } 
        
      })
    },
    /**
   * 打开图片
   */
    openImage: function (e) {
      const that = this;
      let urls = [];
      that.data.images.forEach(v => {
        urls.push(v.picture);
      })
      wx.previewImage({
        current: urls[e.currentTarget.dataset.index], // 当前显示图片的http链接
        urls: urls, // 需要预览的图片http链接列表
      })
    },

  }
})
