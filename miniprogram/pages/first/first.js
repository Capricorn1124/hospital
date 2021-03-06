//index.js
//获取应用实例
const db =wx.cloud.database();
const app = getApp()

Page({
  data: {
    motto: '欢迎使用安心医疗,点击进入',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openID:''
  },
  onTap: function () {
    db.collection('user').where({
      _openid:this.data.openID
    }).get().then(res=>{
      if(res.data[0]==undefined){
        wx.redirectTo({
          url: '../iden/iden',
        })
      }else{
        wx.redirectTo({
          url: '../index/index',
        })
      }
    })
   },
onLoad: function () {
  wx.cloud.callFunction({
    name:'login'
  }).then(res=>{
    this.setData({
      openID:res.result.openid
    })
  }).catch(err=>{
    console.log(err)
  });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.login({
      success(res) {
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onHide: function () {

  }
})
