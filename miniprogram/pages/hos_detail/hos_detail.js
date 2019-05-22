// miniprogram/pages/hos_detail/hos_detail.js
const db=wx.cloud.database();
Page({
  z: 1,
  /**
   * 页面的初始数据
   */
  data: {
    latitude:'',
    longitude:'',
    markers: [{
      id: '',
      latitude: '',
      longitude: '',
    }],
    title:'',
    address:'',
    web:'',
    tel:'',
    detail:'',
    another:'',
    img:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection("hospital").where({
      title: options.title
    }).get().then(res => {
      // console.log(res.data.title)
      this.setData({
        title:res.data[0].title,
        address:res.data[0].address1,
        tel:res.data[0].tel,
        another:res.data[0].another_name,
        detail:res.data[0].introduce,
        web:res.data[0].hos_address,
        img:res.data[0].img,
        longitude: res.data[0].longitude,
        latitude: res.data[0].latitude,
        markers: [{
          id: res.data[0]._id ,
          latitude: res.data[0].latitude,
          longitude: res.data[0].longitude,
        }]
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