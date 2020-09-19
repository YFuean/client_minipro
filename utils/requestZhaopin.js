//统一接口封装
// const API_BASE_URL = 'http://118.31.21.206:8080';
const API_BASE_URL = 'http://120.26.179.70:80';
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
        'Content-Type': 'application/x-www-form-urlencoded'
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
  getJobListRecommend:(data) =>{
    return post('/partJob/list',data,'json')//获取推荐职位列表
  },
  getjobListLast:(data) =>{
    return post('/partJob/list',data,'json')//获取最新职位列表
  },
  getjobListXiaozhao:(data) =>{
    return post('/job/list',data,'json')//获取校招推荐职位列表
  },
  getjobListXiaozhaoLast:(data) =>{
    return post('/job/list',data,'json')//获取校招最新职位列表
  },
  getCompanyList:(data) =>{
    return post('/company/list',data,'json')//获取公司列表
  },
  getjobTypeListXiaozhao:(data) =>{
    return post('/jobType/list',data,'json')//获取职位类型列表
  },
  getJobDetailXiaozhao:(data) =>{
    return post('/job/byId',data,'json')//根据id查询职位详情（校招）
  },
  getJobDetail:(data) =>{
    return post('/partJob/byId',data,'json')//根据id查询职位详情（兼职）
  },
  getCompanyDetail:(data) =>{
    return post('/company/detail',data,'json')//根据id查询公司详情
  },
  getJobListXiaozhaoType:(data) =>{
    return post('/job/listByType',data,'json')//根据类型查询职位（校招）
  },
  getJobListPartType:(data) =>{
    return post('/partJob/list',data,'json')//根据类型查询职位（兼职）
  },
  searchJobByStr:(data) =>{
    return post('/job/keyword',data,'json')//根据关键字模糊查询职位（校招）
  },
  searchPartJobByStr:(data) =>{
    return post('/partJob/keyword',data,'json')//根据关键字模糊查询职位（兼职）
  },
  searchCompanyByStr:(data) =>{
    return post('/company/list',data,'json')//根据关键字模糊公司
  },

  
}