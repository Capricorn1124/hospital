// miniprogram/pages/mine_appointment/mine_appointment.js
const db =wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      paList:[],
      openID:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getorder:function(){
    wx.cloud.callFunction({
      name:"getorder"
    }).then(res=>{
      db.collection('order').where({
        _openid:this.data.openID
      }).get().then(res=>{
        this.setData({
          paList:this.data.paList.concat(res.data)
        })
        console.log(this.data.paList)
      })
    })
  },
  onLoad: function (options) {
    
    wx.cloud.callFunction({
      name:'login'
    }).then(res=>{
      this.setData({
        openID:res.result.openid
      })
  
    }).catch(err=>{
      console.log(err)
    })
    this.getorder();
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