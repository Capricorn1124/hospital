// pages/patreg/patreg.js
const db =wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openID:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    db.collection('patient').add({
      data: {
        name: e.detail.value.name,
        tel: e.detail.value.tel,
        sex: e.detail.value.sex,
        age: e.detail.value.age,
        pat: e.detail.value.pat,
        drug: e.detail.value.drug,
        _id: this.data.openID,
        flag: getApp().pat
      }
    }).then(res => {
      console.log("添加成功")
    });

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