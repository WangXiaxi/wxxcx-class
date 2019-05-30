/**
 * @name    request封装
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-05-29 14:20:53
 * @version $Id$
 */

// 基础路径
const rootDocment = 'https://easy-mock.com/mock/5cef39c508ca6c745f53adb8/api/'

// 默认请求头
const headerDefault = {
  'Accept': 'application/json',
  'content-type': 'application/json; charset=utf-8',
  'Authorization': null
}

// 请求错误前端枚举
const resStatus = {
  400: '请求错误',
  401: '未授权，请登录',
  403: '拒绝访问',
  404: '请求地址出错',
  408: '请求超时',
  500: '服务器内部错误',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持'
}

class Request {
  constructor() {
    this._init()
  }
  // 入口
  _init() {
    Object.assign(this, {
      rootDocment,
      headerDefault,
      resStatus,
      requestArr: [] // 当前请求list
    })
  }

  // 处理header
  setHeader(header) {
    const baseHeader = Object.assign({}, this.headerDefault, header)
    const token = wx.getStorageSync('token')
    if (token) {
      Object.assign(baseHeader, {
        token
      })
    }
    return baseHeader
  }

  /**
   * @function 请求主体方法
   * @params {String} url    接口路径
   * @params {Object} data   请求参数
   * @params {Object} header 自定义请求头
   * @params {Object} method 请求方式
   */
  request({ url, data = {}, header = {}, method = 'get' }) {
    console.log(url)
    return new Promise((resolve, reject) => {
      const resCur = wx.request({
        url: `${this.rootDocment}${url}`,
        data,
        header: this.setHeader(header),
        method,
        success:({ statusCode, data }) => {
          if (statusCode !== 200) return reject({ message: this.resStatus[statusCode] }) // 接口连接报错
          const { status, message } = data
          if (!status) return reject({ message: 'error' }) // 没有状态值直接结束
          // 有 status 代表这是一个有返回后端接口 可以进行进一步的判断
          switch (status) {
            case 200:
              resolve(data)
              break
            default:
              reject(data)
              break
          }
        },
        fail(res) {
          reject(res)
        }
      })
      this.requestArr.push(resCur)
    }).catch(res => {
      const { message } = res
      if(message) return this._showError(message) // reject 提示
      console.warn(message)
    })
  }

  // abort 不完全abort
  abort() {
    if (this.requestArr) {
      this.requestArr.forEach(e => {
        e.abort()
      })
    }
  }

  // showerr
  _showError(content = '请求错误') {
    wx.showModal({
      title: '提示',
      content,
      icon: 'none',
      showCancel: false
    })
  }
}

export default Request