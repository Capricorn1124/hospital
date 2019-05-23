// pages/personal/personal.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:'none',
    openID:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.cloud.callFunction({
    //   name:'login'
    // }).then(res=>{
    //   this.setData({
    //     openID:res.result.openid
    //   })
    //   db.collection('user').where({
    //     _openid:this.data.openID
    //   }).get().then(res=>{
    //     if(res.data[0].flag===1){
    //       this.setData({
    //         state:'block'
    //       })
    //     }else{
    //       this.setData({
    //         state:'none'
    //       })
    //     }
    //    console.log(res.data[0].flag)
   
    //   })
    // }).catch(err=>{
    //   console.log(err)
    // })
    
    wx.cloud.callFunction({
      name:'login'
    }).then(res=>{
      this.setData({
        openID:res.result.openid
        
      })
      new Promise((reslove,reject)=>{
        db.collection('user').where({
              _openid:this.data.openID
            }).get().then(res=>{
              if(res.data[0].flag===1){
                this.setData({
                  state:'block'
                })
              }else{
                this.setData({
                  state:'none'
                })
              }
             console.log(res.data[0].flag)
         
            });
            reslove();
      })
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