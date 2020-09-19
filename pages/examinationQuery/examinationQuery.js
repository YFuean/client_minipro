// pages/examinationQuery/examinationQuery.js
const app = getApp()
const API = require('../../utils/request')
const filter = require('../../utils/filter')
Page(filter.identityFilter({


  /**
   * 页面的初始数据
   */
  data: {
    isshow:true,
    semesterId:0,
    selectArray: [],
    exam:[],
    selectExam:[]
  },

  getExamination(){
    var that = this
    API.getexamination({
      field:app.globalData.user.jobNumber
      //field:1802333118
    }).then( res =>{
      const data = JSON.parse(res)
      const examindata = data.data
      console.log(examindata)
      const semesters = []
      var index = 0
      examindata.forEach(element => {
        const s = {
          id:0,
          name:''
        }
        s.id = index
        s.name = element.semester
        semesters.push(s)
        index++
      });
      
      that.setData({
        selectArray:semesters,
        exam:examindata
      })
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getExamination()
  },

  getDate:function(e){
    const index = e.detail.id
    this.setData({
      selectExam: this.data.exam[index].examinations
    })
  },

  myExport:function(e){
    const exportExam = this.data.selectExam
    console.log(exportExam)
    const myDate = new Date(); 
    myDate.toLocaleTimeString(); 
    const filename = 'grades'+myDate
    
    

    wx.setClipboardData({
      data: excelUrl,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            console.log(res.data) // data
          }
        })
      }
    })
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

  }
}))