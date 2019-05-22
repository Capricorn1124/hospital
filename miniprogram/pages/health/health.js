// pages/health/health.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList:[],
    current_scroll:'热点'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getarticle:function(){
   wx.cloud.callFunction({
     name:"gethealth"
   }).then(res=>{
     this.setData({
       articleList:this.data.articleList.concat(res.result.data)
     })
   })
  },
  handleChangeScroll: function (e) {
    this.setData({
      current_scroll: e.detail.key,
    })
    if (e.detail.key != "热点") {
      wx.cloud.callFunction({
        name: 'gethealthType',
        data: {
          channel: e.detail.key
        }
      }).then(res => {
        this.setData({
          articleList: res.result.data
        })
      })}else{
      wx.cloud.callFunction({
        name: "gethealth"
      }).then(res => {
        this.setData({
          articleList:[],
          articleList: this.data.articleList.concat(res.result.data)
        })
      })
      }
    
    // db.collection("artical").where({
    //   type: e.detail.key
    // }).get().then(res => {
    //   console.log(res)
     
    // })
  },
  onLoad: function (options) {
    this.getarticle();
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
})