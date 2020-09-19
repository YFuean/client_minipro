//统一接口封装
const API_BASE_URL = 'http://120.26.177.51:80';
const app = getApp()
const get = (url, data) => { 
  let _url = API_BASE_URL  + url;
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: "正在加载中...",
    })
    wx.request({
      url: _url,
      method: "get",
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Token': app.globalData.token
      },
      success(request) {
        wx.hideLoading();
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      }
    })
  });
}
 const post = (url, data,contentType) => {
  let _url = API_BASE_URL  + url;
  switch(contentType){
    case "form" :
      var headerObj = {'content-type' : 'application/x-www-form-urlencoded',
      'Token': app.globalData.token};
    break;
    case "json" : 
      var headerObj = {'content-type' : 'application/json',
      'Token': app.globalData.token};
    break;
    default :
      var headerObj = {'content-type' : 'application/json',
      'Token': app.globalData.token};
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url      : _url,
      data     : data,
      method   : "POST",
      dataType : JSON,
      header: headerObj,
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      }
    })
  });
}
const put = (url, data,contentType) => {
  let _url = API_BASE_URL  + url;
  switch(contentType){
    case "form" :
      var headerObj = {'content-type' : 'application/x-www-form-urlencoded'};
    break;
    case "json" : 
      var headerObj = {'content-type' : 'application/json'};
    break;
    default :
      var headerObj = {'content-type' : 'application/json'};
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url      : _url,
      data     : data,
      method   : "PUT",
      dataType : JSON,
      header: headerObj,
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      }
    })
  });
}
module.exports ={
  getCode:(data) =>{
    return post('/sendCode',data,'json')//获取手机验证码
  },
  checkCode:(data) =>{
    return post('/verifyCode',data,'json')//验证码验证
  },
  login:(data) =>{
    return post('/user/login',data,'json')//账号密码登录
  },
  phoneLogin:(data) =>{
    return post('/user/code/login',data,'json')//手机验证码登录
  },
  updatePassword:(data) =>{
    return post('/user/password',data,'json')//修改密码
  },
  getMessage:(data)=>{
    return post('/message/all',data,'json')//查询所有信息
  },
  modifyMessage:(data)=>{
    return put('/message/update',data,'json')//修改查询状态
  },
  updateUserInfo:(data) =>{
    return post('/user/update/info',data,'json')//修改用户信息
  },
  feedback:(data) =>{
    return post('/user/feedback',data,'json')//匿名反馈
  },
  getCardBalance:(data) =>{
    return post('/card/balance',data,'json') //查询一卡通余额
  },
  getCardConsume:(data) =>{
    return post('/card/consume',data,'json') //查询清单明细
  },
  cardDeposit:(data) =>{
    return post('/card/deposit',data,'json') //校园卡充值
  },
  electricityDeposit:(data) =>{
    return post('/electricity/deposit',data,'json') //电费充值
  },
  netDeposit:(data) =>{
    return post('/net/deposit',data,'json') //网费充值
  },
  getAllSemester:(data) =>{
    return post('/semester/all',data,'json') //获取所有学期数
  },
  getexamination:(data) =>{
    return post('/examination/list/semester',data,'json') //查询学生成绩
  },
  getScheduleByWeek:(data) =>{
    return post('/course/schedule',data,'json') //按照周次查询课表
  },
  getInformationTop:(data) =>{
    return post('/info/isTap',data,'json')  //获取置顶资讯
  },
  getInformationAll:(data) =>{
    return post('/info/allInfo',data,'json')  //获取全部资讯
  },
  getInformationDetail:(data) =>{
    return post('/info/allInfo',data,'json')  //查询资讯详情（pageSize=1）
  },
  getBorrowBookList:(data) =>{
    return post('/book/borrow',data,'josn') //获取图书
  },
  getInformationType:(data) =>{
    return post('/info/type/all',data,'form')  //查询资讯分类
  },
  getMessageAll:(data) =>{
    return post('/message/all',data,'json')  //获取全部消息
  },
  getMailList:(data) =>{
    return post('/addressBook/all',data,'json')//请求通讯录
  },
  addMail:(data) =>{
    return post('/addressBook',data,'json')//新增通讯录好友
  },
  updateMail:(data) =>{
    return post('/addressBook/id',data,'json')//修改通讯录好友备注
  },
  deleteMail:(data) =>{
    return post('/addressBook/deletion/id',data,'json')//删除通讯录好友
  },
  getUserBykeyword:(data) =>{
    return post('/user/fuzzyQuery',data,'json') //模糊查询用户
  },
  getAllSemester:(data) =>{
    return post('/semester/all',data,'json')//获取所有学期
  },
  getTodayCourse:(data) =>{
    return post('/course/today',data,'json') //获取今日课程
  },
  getAllTower:(data) =>{
    return post('/tower/all',data,'form') //获取所有楼栋
  },
  changeStatus:(data) =>{
    return post('/card/statusChange',data,'json') //改变一卡通挂失状态
  },

  //跳蚤市场模块
  getAllType:(data) =>{
    return post('/flea/type/all',data,'form')  //获取分类数据
  },
  getRewardTop:(data) =>{
    return post('/flea/reward/top',data,'form') //获取最新两条悬赏
  },
  getAllGoods:(data) =>{
    return post('/flea/goods/all',data,'json') //分页查询所有商品
  },
  postGood:(data) =>{
    return post('/flea/goods/increased',data,'json') //发布商品
  },
  getGoodsByTypeId:(data) =>{
    return post('/flea/goods/type',data,'json') //根据类别id查询商品信息
  },
  search:(data) =>{
    return post('/flea/search',data,'json') //模糊搜索
  },
  getTopMark:(data) =>{
    return post('/flea/mark/top',data,'form') //查询top前5标签
  },
  addOrder:(data) =>{
    return post('/flea/order/increased',data,'json') //添加订单
  },
  addCollection:(data) =>{
    return post('/flea/collection/increased',data,'json') //添加收藏
  },
  deleteCollection:(data) =>{
    return post('/flea/collection/deleted',data,'json') //删除收藏
  },
  deleteGood:(data) =>{
    return post('/flea/goods/delete',data,'json') //下架商品
  },
  updateGoodInfo:(data) =>{
    return post('/flea/goods/set',data,'json') //修改商品信息
  },
  ifCollected:(data) =>{
    return post('/flea/collection/judge',data,'josn') //根据商品id和用户id判断该商品是否被该用户收藏
  },
  getCollectionList:(data) =>{
    return post('/flea/collection/all',data,'json') //获取用户收藏列表
  },
  getFabuList:(data) =>{
    return post('/flea/users/release',data,'json') //获取用户发布列表
  },
  getOrderList:(data) =>{
    return post('/flea/users/orders',data,'json') //获取用户订单列表
  },
  getGoodById:(data) =>{
    return post('/flea/goods/id',data,'json') //通过id获取商品详细信息
  },

  // 校园跑腿模块
  getAllOrder:(data)=>{
    return post('/errands/differentOrder',data,'json') //我的订单  获取所有订单
  },
  addNewOrder:(data)=>{
    return post('/errands/order',data,'json') //客户新增跑腿订单
  },
  becomeRunner:(data)=>{
    return post('/reviewfrom/application',data,'json') //申请成为跑腿员
  },
  getAllNotOrder:(data)=>{
    return post('/errands/find/order',data,'json') //我要接单  获取所有未被接取的订单
  },
  pickOrder:(data)=>{
    return post('/transaction/order',data,'json') //我要接单  接取订单
  },
  cancelOrder:(data)=>{
    return post('/errands/cancle/order',data,'json') //我的订单 取消订单
  },
  deleteOrder:(data)=>{
    return post('/errands/delete/order',data,'json') //我的订单 删除已取消订单
  },
  getRunnerAllOrder:(data)=>{
    return post('/transaction/errends/order',data,'json') //我是跑腿 获取跑腿员角色所有订单
  },
  getGoods:(data)=>{
    return post('/transaction/getgoods',data,'json') //我要接单 取件成功
  },
  finshOrder:(data)=>{
    return post('/transaction/finshOrder',data,'json') //我是跑腿 送达目的地完成订单
  },
  isErrends:(data)=>{
    return post('/reviewfrom/isErrends',data,'json') //跑腿首页 判断是否为跑腿员
  },

  //校友圈模块
  getDynamic: (data) => {
    return post('/dynamic', data,'json') //获取所有动态
  },
  getDynamicInfo: (data) => {
    return post('/dynamic/', data,'json') //获取单条动态详情
  },
  insComment: (data) => {
    return post('/dynamic/comment/insert', data,'json') //添加评论
  },
  insReply: (data) => {
    return post('/dynamic/replyComment/insert', data,'json') //添加评论的回复
  },
  putPost: (data) => {
    return post('/dynamic/new', data,'json') //发帖
  },
  thumbLike: (data) => {
    return post('/dynamic/thumbsup', data,'json') //点赞
  },
  getPhoto: (data) => {
    return post('/dynamic/photo', data,'json') //根据Id获取咨询图片
  },
  putPhoto: (data) => {
    return post('/dynamic/photo/new', data,'json') //增加发帖动态图片
  },
  putStar: (data) => {
    return post('/dynamic/Collection/insert', data,'json') //添加收藏动态
  },
  getStar: (data) => {
    return post('/dynamic/Collection', data,'json') //查询所有收藏的动态
  },
  delStar: (data) => {
    return post('/dynamic/Collection/deletion', data,'json') //删除收藏动态
  },
  delComment: (data) => {
    return post('/dynamic/comment/deletion', data,'json') //删除校友评论
  },
  delReply: (data) => {
    return post('/dynamic/replyComment/deletion', data,'json') //删除回复
  },
  recommenBasic: (data) => {
    return post('/dynamic/embedding', data,'json') //埋包
  },
  recommenFriend:(data) => {
    return post ('/dynamic/friend',data,'json') // 推荐好友
  },
  like:(data) => {
    return post ('/dynamic/sentiment',data,'json')//情感分析
  }

}