// miniprogram/pages/receive_appointment/receive_appointment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    patList:[]
  },
 getorder:function(){
   wx.cloud.callFunction({
     name:"getorder"
   }).then(res=>{
     for (var i = 0; i < res.result.data.length;i++){
       if (res.result.data[i].doc==="巴雪宇"){
         this.setData({
           patList: this.data.patList.concat(res.result.data[i])
         })
       }
     }
   })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getorder()
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