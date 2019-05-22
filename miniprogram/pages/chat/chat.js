const util=require("../../utils/util.js");
Page({
  data: {
    InputBottom: 0,
    increase: false,
    aniStyle:false,
    msg:[],
    content:''
    // msg:["您好，请问医生在嘛"],
    // time:''
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  // deleteSql: function () {
  //   wx.cloud.callFunction({
  //     name: 'batchDelete'
  //   }).then(res => { console.log(res) })
  // },
  //获取照片，传递到云存储
  getImage: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.cloud.uploadFile({
          cloudPath: 'example.png', // 上传至云端的路径
          filePath: tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            db.collection('user').add({
              data: {
                name: 'image',
                fileId: res.fileID
              }
            }).then(res => { console.log(res) }).catch(err => {
              console.log(err)
            })
          },
          fail: console.error
        })
      }
    })
  },
  increase() {
    this.setData({
      increase: true,
      aniStyle: true
    })
  },
  getinput:function(res){
    if (res!= '') {
      var DATE = util.formatTime(new Date());
      this.setData({
        msg: this.data.msg.concat({
          name: res,
          time: DATE

        })
      })
    }
  },
  bindChange(res) {
    this.setData({
      content: res.detail.value
    })
    
  },
  send: function (){
    var a=this.data.content
    this.getinput(a)
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },
  onLoad: function (options) {
    var DATE = util.formatTime(new Date());
    this.setData({
      msg:[{
        name: "您好，请问医生在嘛",
        time: DATE  
      }]
    })
    console.log(this.data.msg[0].name)
  },
})