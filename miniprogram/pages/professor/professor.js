// pages/professor/professor.js

const db = wx.cloud.database();
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    docList:[],
    current_scroll: "内科"
  },
getContent:function(){
wx.cloud.callFunction({
  name:"addnk"
}).then(res=>{
  this.setData({
    docList:this.data.docList.concat(res.result.data)
  })
  // console.log(this.data.docList)
})
},
handleChangeScroll:function(e){
  this.setData({
    current_scroll: e.detail.key,
    // docList:[]
  })
  // console.log(e.detail)
  // console.log(e.detail.key);
  db.collection("online").where({
    type:e.detail.key
  }).get().then(res=>{
    // console.log(res)
    this.setData({
      docList:res.data
    })
  })
  
  this.setData({
    current_scroll: e.detail.key
  })

  
},
picture:function () {  
  
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
this.getContent();
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