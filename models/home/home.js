import Request from '../../utils/request'

/**
 * @name    HomeModel封装
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-05-30 10:16:24
 * @version $Id$
 */

class HomeModel extends Request {
  // 获取首页数据
  getHome() {
    return this.request({
      url: 'home'
    })
  }
}

export default HomeModel