// miniprogram/pages/order/order.js
const db =wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today:'-',
    hos:['请选择...'],
    choose:['请选择...'],
    doc:["请选择..."],
    office:[],
    dep:[],
    index:0,
    d_index:0,
    h_index:0,
    image:'http://img2.imgtn.bdimg.com/it/u=1903402715,1102906635&fm=26&gp=0.jpg',
    doctemp:[],
    num:0,
    id:''
    
  },
  // toast:function(){
  //   wx.showToast({
  //     title: '预约成功',
  //     icon: 'success',
  //     duration: 2000
  //   })
  //   setTimeout(function(){
  //     wx.navigateTo({
  //       url: '/pages/order/order',
  //     })
  //   },2500)
  // },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    db.collection('order').add({
      data: {
       name: e.detail.value.patients,
        tel:e.detail.value.tel,
        date:e.detail.value.yydate,
        hos:e.detail.value.hos,
        dep:e.detail.value.dep,
        doc:e.detail.value.doc,
        content:e.detail.value.content,
        openid:this.data.openID,
      
      }
    }).then(res => {
      console.log("预约成功")
      // db.collection("hospital").where({
      //   title: e.detail.value.hos
      // }).get().then(res => {
      //   console.log(res.data[0].right_mun);
      //   this.setData({
      //     num: Number(res.data[0].right_mun),
      //     id: res.data[0]._id
      //   })});
      // wx.cloud.callFunction({
      //   name:'updatenum',
      //   data:{
      //     id:this.data.id,
      //     num:this.data.num
      //   }
      // }).then(res=>{
      //   console.log(res)
      // })
      db.collection("hospital").where({
        title: e.detail.value.hos
      }).get().then(res => {
        this.setData({
          num: Number(res.data[0].right_mun),
          id: res.data[0]._id
        })
        this.data.num = this.data.num + 1;
        db.collection("hospital").doc(this.data.id).update({
          data: {
            right_mun: this.data.num.toString()
          }
        }).then(res => {
          console.log(res)
        })
      });
      });
    
   

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
//
  bindhosChange:function(e){
    this.setData({
      index:e.detail.value,
      choose:this.data.office[this.data.index]
    })
  },
  binddepChange:function(e){
    this.setData({
      d_index:e.detail.value,
      doc: (this.data.doctemp[this.data.d_index])[this.data.d_index]
    })
   
  },
  binddocChange:function(e){
    this.setData({
      h_index:e.detail.value
    })
  
  },
  bindDateChange: function (e) {
    this.setData({
      today: e.detail.value
    })
  },
//向dep里面添加数据
// adddep:function(){
//   // wx.cloud.callFunction({
//   //   name:'addDep'
//   // }).then(res=>{
//   //   console.log('success')
//   // })
//   db.collection('dep').add({
//     data:{
//       dep: ['肛肠科', '儿科', '内二妇科', '五官科', '脑科', '外一(普外)急诊内一皮肤科', '外二(骨科', ')口腔科'],
//       hos_name: "哈尔滨市道里区人民医院"
//     }
//   }).then(res=>{
//     console.log('su')
//   })
// },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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