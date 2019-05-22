// pages/docreg/docreg.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    education:['本科','硕士','博士','博士后'],
    index:0,
    d_index:0,
    e_index:0,
    office:[],
    hos:['请选择...'],
    choose:['请选择...'],
    dep:[],
    doctemp:[],
    openID:''
  },
  toast:function(){
    wx.showToast({
      title: '提交成功，待审核',
      icon: 'success',
      duration: 2000
    })
    setTimeout(function(){
      wx.navigateTo({
        url: '/pages/index/index',
      })
    },2500)
  },
  bindhosChange:function(e){
    this.setData({
      index:e.detail.value,
      choose:this.data.office[this.data.index]
    })
  },
  binddepChange:function(e){
    this.setData({
      d_index:e.detail.value,
    })
   
  },
  getdep:function(){
    wx.cloud.callFunction({
      name:'getdep'
    }).then(res=>{
      this.setData({
        dep: this.data.dep.concat(res.result.data)
      }
      )
      // console.log(this.data.dep.length)
      for (var i = 0; i < this.data.dep.length; i++) {
        var temp = [];
        var temp1=[];
        for (var j = 0; j < this.data.dep[i].dep.length; j++) {
          temp.push(this.data.dep[i].dep[j].name)
          temp1.push(this.data.dep[i].dep[j].doc);
        }
        // console.log(temp1)
        this.setData({
          office: this.data.office.concat([temp]),
          doctemp: this.data.doctemp.concat([temp1])
        })
      
      }
      for (var i = 0; i < this.data.dep.length; i++) {
        // console.log(this.data.dep[i].dep)
        this.setData({
          hos: this.data.hos.concat(this.data.dep[i].hos_name)
        })
      }
      // this.setData({
      //   choose:this.data.dep[0].dep
      // })
      // console.log(this.data.hos)
    })
    },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    db.collection('user').add({
      data: {
       name: e.detail.value.name,
        tel:e.detail.value.tel,
        sex:e.detail.value.sex,
        age:e.detail.value.age,
        hos:e.detail.value.hos,
        dep:e.detail.value.dep,
        edu:e.detail.value.edu,
        _id:this.data.openID,
        flag:getApp().doc
      }
    }).then(res => {
        console.log("添加成功")
      });
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  bindPickerChange:function (e) {
    this.setData({
      e_index:e.detail.value,
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
    this.getdep();
    
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