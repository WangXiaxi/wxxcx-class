// pages/home/home.js

import HomeModel from '../../models/home/home.js'
const homeModel = new HomeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    swiperList: [], // swiper 内容
    groupList: [] // card 部分
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getHomeData()
  },

  /**
   * 跳转至歌曲列表页
   */
  onSongsTap(e) {
    const { id, groupName } = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/songs/songs?id=${id}&groupName=${groupName}`
    })
  },

  /**
   * 设置当前选中添加 cur 样式名
   */
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  
  /**
   * 获取数据填充
   */
  getHomeData() {
    wx.showLoading()
    return homeModel.getHome().then(res => {
      setTimeout(() => {
        wx.hideLoading()
      }, 300)
      const { focus: { data: { content } }, toplist: { data: { group }}} = res
      this.setData({
        swiperList: content,
        groupList: group
      })
      console.log(this.data.groupList)
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
    this.getHomeData().then(() => {
      wx.stopPullDownRefresh()
    })
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