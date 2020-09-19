const query = require('../../utils/getInviterFirst')
const filter = require('../../utils/filter');
const API = require('../../utils/request')
const app = getApp();
Page(({

    /**
     * 页面的初始数据
     */
    data: {
        isInputing: false,
        scrollList: [],
        cardObj: {},
        scrollTop: 0,
        scrollTopstart: 0,
        val: "",
        cardArr: [],
        cardBrr: [],
        val: '',
        currentPageAll: 0,
        pageSizeAll: 100,
    },
    onLoad: function (options) {
    },
    /**
   * 生命周期函数--监听页面初次渲染完成
   */
    onReady: function () {
      //this.getContacts()
    },

  /**
   * 生命周期函数--监听页面显示
   */
    onShow: function () {
      this.getContacts()
    },
    getContacts: function () {
        var that = this
        API.getMailList({
            currentPage:that.data.currentPageAll,
            field:app.globalData.user.jobNumber,
            pageSize:that.data.pageSizeAll
        }).then((res) =>{
            const data = JSON.parse(res)
            if(data.code === 1 ){
                that.setData({
                    cardArr:data.data.data
                })
                that.getuserdata()
            }
        })
    },

    /**
     * 通讯录实现
     */
    getuserdata() {
        /**
         * 拿到后台数据
         */
        let cardArr = this.data.val == "" ? this.data.cardArr : this.data.cardBrr;
        cardArr.forEach(item => {
            item.ishidden = false;
        });
        /**
         * 拿到数据那名字的首字母firstInitials.js
         * 处理为cardObj ={firstInitials{title:firstInitials,list:[item]}}
         */
        let cardObj = {}

        cardArr.forEach(item => {
            //查看拼音首字母大写,调用getInviterFirst.js
            let firstInitials = query.query(item.remark)
            if (!((/[A-Z]/g).test(firstInitials))) {
                firstInitials = '11';
            }
            if (cardObj[firstInitials]) {
                cardObj[firstInitials].list.push(item)
            } else {
                if (firstInitials !== '11') {
                    cardObj[firstInitials] = {
                        title: firstInitials,
                        list: [item]
                    }
                } else {

                    cardObj['11'] = {
                        title: '#',
                        list: [item]
                    }
                }
            }
        })

        /**
         * 对首字母排序
         */
        let arr = [];
        for (let key in cardObj) {
            arr.push(key);
        }
        arr = arr.sort()
        this.setData({
            scrollList: arr,
            cardObj: cardObj
        })
    },

    /**
     * 滚动条位置
     */
    scroll: function (e) {
        //console.log(e.detail.scrollTop)
        this.setData({
            scrollTopstart: e.detail.scrollTop
        })
    },

    /**
     * 链接侧边字母与内容字母
     * 
     */
    handleScrollView(e) {
        let that = this;
        let key = e.currentTarget.dataset.key
        if (key === '#') {
            key = '11'
        }
        let query = wx.createSelectorQuery()
        query.select(`#view_${key}`).boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec(function (res) { // #the-id节点的上边界坐标
            that.setData({
                scrollTop: that.data.scrollTopstart + res[0].top - 45
            })

        })
    },

    /**
     * 搜索功能
     */
    bindKeyInput: function (e) {
        console.log(e.detail.value)
        let len = this.data.cardArr.length,
            arr = this.data.cardArr,
            brr = [],
            val = e.detail.value,
            reg = new RegExp(val);
        arr.forEach(item => {
            reg.test(item.remark) ? brr.push(item) : item.ishidden = true;
        });
        arr.forEach(item => {
            reg.test(item.phoneNumber) ? brr.push(item) : item.ishidden = true;
        });
        arr.forEach(item => {
            reg.test(item.userId) ? brr.push(item) : item.ishidden = true;
        });
        this.setData({
            cardBrr: brr,
            isInputing: true,
            val: val
        });
        this.getuserdata();
        if (val == '') {
            this.setData({
                isInputing: false
            });
        }
    },
    cancelSearch() {
        this.setData({
            val: "",
            isInputing: false
        });
        this.getuserdata();
        return;
    },
    enter(e) {
        wx.navigateTo({
            url: '../../pages/contacts-detail/contacts-detail?&userId=' + e.currentTarget.dataset.userid,
            events: {
                // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                acceptDataFromOpenedPage: function (data) {
                }
            },
            success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('acceptDataFromOpenerPage', {
                    data:{
                        remark: e.currentTarget.dataset.rename,
                        userId: e.currentTarget.dataset.userid,
                        phoneNumber: e.currentTarget.dataset.tele,
                        avatar: e.currentTarget.dataset.avatar,
                        addressId: e.currentTarget.dataset.addressid,
                        delete:e.currentTarget.dataset.delete
                    }
                })
            }
        });
    },
    addPerson(e) {
        wx.navigateTo({
            url: '../../pages/addperson/addperson'
        })

    },
    avatarError: function (e) {
        var errorImgIndex = e.target.dataset.imgindex //获取循环的下标
        var imgObject = "cardArr[" + errorImgIndex + "].avatar" //commentList为源组
        var errorImg = {}
        errorImg[imgObject] = "/image/icon_wode.png" //构建一个对象
        this.setData(errorImg)
    },
}))