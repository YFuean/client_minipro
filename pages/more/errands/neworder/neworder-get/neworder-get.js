// pages/errands/neworder/neworder.js
const app = getApp();
var QQMapWX = require('../../../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;

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
    latitude: '',
    longitude: '',
    fromCityAddress: '',
    fromSpecificAddress: '',
    fromName: '',
    fromTel: '',
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
    // 利用正则控制输入为数字
    let value = this.validateNumber(e.detail.value)
    this.setData({
      fromTel: value,
    })
    console.info('发件人电话', value)
  },
  // 利用正则控制输入值为数字
  validateNumber(val) {
    return val.replace(/\D/g, '')
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
  // 按钮点击事件 判断input是否为空
  order_save: function () {
    const Aval = this.isNullfac(this.data.fromSpecificAddress, '地址');
    const Nval = this.isNullfac(this.data.fromName, '发件人姓名');
    const Tval = this.isNullfac(this.data.fromTel, '发件人手机号');
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
    var originAddress =
      this.data.nation +
      this.data.province +
      this.data.city +
      this.data.district +
      this.data.fromSpecificAddress;
    try {
      wx.setStorageSync('originAddress', originAddress),
        wx.setStorageSync('founderName', this.data.fromName),
        wx.setStorageSync('founderPhonenumer', this.data.fromTel),
        wx.setStorageSync('odimension', this.data.latitude),
        wx.setStorageSync('olongitude', this.data.longitude)
    } catch (e) {

    }
    // 清除地图选点缓存
    try {
      wx.removeStorageSync('__plugins__/wx76a9a06e5b4e693e/userid'),
        wx.removeStorageSync('__plugins__/wx76a9a06e5b4e693e/chooseLocation')
    } catch (e) {
      // Do something when catch error
    }
    // 跳转到errands 跑腿首页
    wx.showModal({
      title: '提示',
      content: '是否跳转页面',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          setTimeout(function () {
            wx.reLaunch({
              url: '/pages/more/errands/errands',
            })
          }, 500)
        } else {
          console.log('用户点击取消')
        }
      }
    })
  },


  onLoad: function (options) {
    // 清除地图选点缓存
    try {
      wx.removeStorageSync('__plugins__/wx76a9a06e5b4e693e/userid'),
        wx.removeStorageSync('__plugins__/wx76a9a06e5b4e693e/chooseLocation')
    } catch (e) {
      // Do something when catch error
    }
    qqmapsdk = new QQMapWX({
      key: 'OMEBZ-7QSCF-2SEJE-NYPND-PW3JS-KHFQE' //自己的key秘钥 http://lbs.qq.com/console/mykey.html 在这个网址申请
    });
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
    let vm = this;
    vm.getUserLocation();
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
        fromSpecificAddress: name
      })
    } else {

    }

  },
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        } else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude,
      },
      success: function (res) {
        // console.log(JSON.stringify(res));
        let nation = res.result.ad_info.nation;
        let province = res.result.ad_info.province;
        let city = res.result.ad_info.city;
        let district = res.result.ad_info.district;
        vm.setData({
          nation: nation,
          province: province,
          city: city,
          district: district,
          latitude: latitude,
          longitude: longitude
        })

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
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