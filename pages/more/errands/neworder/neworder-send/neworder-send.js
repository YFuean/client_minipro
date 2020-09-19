// pages/errands/neworder-send/neworder-send.js
const key = 'OMEBZ-7QSCF-2SEJE-NYPND-PW3JS-KHFQE'; //使用在腾讯位置服务申请的key
const referer = '智慧校园-跑腿'; //调用插件的app的名称
const location = JSON.stringify({
  latitude: 32.09636,
  longitude: 118.90907
});
const category = '生活服务,娱乐休闲';
const chooseLocation = requirePlugin('chooseLocation');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    nation: '',
    province: '',
    city: '',
    district: '',
    latitude: '32.096321',
    longitude: '118.909439',
    "sendCityAddress": "",
    "sendSpecificAddress": "",
    "sendName": "",
    "sendTel": "",
    "type": "文件",
    "weight": "1kg",
    message: [{
      "amount": 6,
      "ddimension": "commodo non laborum dolore",
      "deliveryTime": "2020-12-12",
      "destination": "aliquip pariatur aute ma",
      "dlongitude": "dolore quis",
      "founderId": 21452595.469791546,
      "odimension": "id",
      "olongitude": "fugiat Ut esse s",
      "originAddress": "in Ut ut consectetur",
      "priceRang": "6~12",
      "receiverName": "aute",
      "receiverPhoneNumber": "laboris",
      "remark": "无",
      "type": "文件"
    }]

  },
  // 来这儿拿
  fromCityAddress_onChange: function (e) {
    this.setData({
      fromCityAddress: e.detail.value,
    })
    console.info('地址', e.detail.value)
  },
  fromSpecificAddress_onChange: function (e) {
    this.setData({
      fromSpecificAddress: e.detail.value,
    })
    console.info('具体地址', this.data.fromSpecificAddress)
  },
  fromName_onChange: function (e) {
    this.setData({
      fromName: e.detail.value,
    })
    console.info('发件人', e.detail.value)
  },
  fromTel_onChange: function (e) {
    this.setData({
      fromTel: e.detail.value,
    })
    console.info('发件人电话', e.detail.value)
  },
  // 送到这儿
  sendCityAddress_onChange: function (e) {
    this.setData({
      sendCityAddress: e.detail.value,
    })
    console.info('目的地址', e.detail.value)
  },
  sendSpecificAddress_onChange: function (e) {
    this.setData({
      sendSpecificAddress: e.detail.value,
    })
    console.info('目的具体地址', this.data.sendSpecificAddress)
  },
  sendName_onChange: function (e) {
    this.setData({
      sendName: e.detail.value,
    })
    console.info('收件人', e.detail.value)
  },
  sendTel_onChange: function (e) {
    // 利用正则控制输入为数字
    let value = this.validateNumber(e.detail.value)
    this.setData({
      sendTel: value,
    })
    console.info('发件人电话', value)
  },
  // 利用正则控制输入值为数字
  validateNumber(val) {
    return val.replace(/\D/g, '')
  },
  goodsType_onChange: function (e) {
    this.setData({
      type: e.detail.value,
    })
    console.info('物品', e.detail.value)
  },
  goodsWeight_onChange: function (e) {
    this.setData({
      weight: e.detail.value,
    })
    console.info('重量', e.detail.value)
  },


  // 点击事件地图选点
  map_selection: function () {
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
    });

  },

  // 判断是否为空的方法
  isNullfac: function (val, name) {
    console.log(name + "值为:" + val);
    if (val == '' || val == null) { //输入框中输入为空
      wx.showModal({
        title: '提示',
        content: name + "不能为空并且不能为全空格",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }
        }
      })
      // console.log(name + "不能为空并且不能为全空格");
      return true;
    } else {
      return false;
    }
  },

  // 按钮点击事件 数据传入缓存并跳转
  order_enter: function () {
    const Aval = this.isNullfac(this.data.sendSpecificAddress, '地址');
    const Nval = this.isNullfac(this.data.sendName, '收件人姓名');
    const Tval = this.isNullfac(this.data.sendTel, '收件人手机号');
    console.log('Aval值为:' + Aval);
    console.log('Nval值为:' + Nval);
    console.log('Tval值为:' + Tval);
    if (Aval == false && Nval == false && Tval == false) {
      this.enter()
    } else {

    }
  },

  //不为空 则进行进行下一步 数据传入缓存并跳转
  enter: function () {
    var destination =
      this.data.nation +
      this.data.province +
      this.data.city +
      this.data.district +
      this.data.sendSpecificAddress;
    try {
      wx.setStorageSync('destination', destination),
        wx.setStorageSync('receiverName', this.data.sendName),
        wx.setStorageSync('receiverPhonenumer', this.data.sendTel),
        wx.setStorageSync('dlongitude', this.data.latitude),
        wx.setStorageSync('ddimension', this.data.longitude)

    } catch (e) {

    }

    // 清除地图选点缓存
    try {
      wx.removeStorageSync('__plugins__/wx76a9a06e5b4e693e/userid'),
        wx.removeStorageSync('__plugins__/wx76a9a06e5b4e693e/chooseLocation')
    } catch (e) {
      // Do something when catch error
    }

    setTimeout(function () {
      wx.navigateTo({
        url: '/pages/more/errands/neworder/neworder',
      })
    }, 500)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 清除地图选点缓存
    try {
      wx.removeStorageSync('__plugins__/wx76a9a06e5b4e693e/userid'),
        wx.removeStorageSync('__plugins__/wx76a9a06e5b4e693e/chooseLocation')
    } catch (e) {
      // Do something when catch error
    }
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
    const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    console.log("地图选点返回：" + (JSON.stringify(location)))
    if (location != null) {
      // let nation = res.result.ad_info.nation;
      let province = location.province;
      let city = location.city;
      let district = location.district;
      let latitude = location.latitude;
      let longitude = location.longitude;
      let name = location.name;
      this.setData({
        province: province,
        city: city,
        district: district,
        latitude: latitude,
        longitude: longitude,
        fromSpecificAddress: name,
        latitude: latitude,
        longitude: longitude,
        sendCityAddress: province + city + district,
        sendSpecificAddress: name
      })
    } else {

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