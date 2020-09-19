//filter.js 页面token拦截去登录
const app = getApp()
function identityFilter(pageObj){
  if(pageObj.onShow){
      let _onShow = pageObj.onShow;
      pageObj.onShow = function(){
        console.log(ifToken())
        if(!ifToken()){
          wx.redirectTo({
            url: "/pages/login/login"
        });
        //获取页面实例，防止this劫持
        let currentInstance = getPageInstance();
        _onShow.call(currentInstance);
        }
      }
  }
  return pageObj;
}

function ifToken(){
  return app.globalData.token === null ? false : true
}

function getPageInstance(){
  var pages = getCurrentPages();
  return  pages[pages.length - 1];
}

exports.identityFilter = identityFilter;