const API_BASE_URL = "http://120.26.185.155:8078/"
// const API_BASE_URL = "http://localhost/"
const WEBSOCKET_URL = "ws://120.26.185.155:8078/websocket"
// const WEBSOCKET_URL = "ws://localhost/websocket"
// 上传文件地址
const UPLOAD_URL = API_BASE_URL + "upload"
// 获取openid地址
const WECHAT_OPENID_URL = API_BASE_URL + "wechat/openid"
const ALL = API_BASE_URL + "wechat/all"
const SET =  API_BASE_URL + "wechat/send"
export {
  API_BASE_URL,
  WEBSOCKET_URL,
  UPLOAD_URL,
  WECHAT_OPENID_URL,
  ALL,
  SET
}