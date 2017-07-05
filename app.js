//app.js
App({
  onLaunch: function () {
    console.log('test');
    var that = this;
    //  获取商城名称
    wx.request({
      url: 'https://api.it120.cc/'+ that.globalData.subDomain +'/config/get-value',
      data: {
        key: 'mallName'
      },
      success: function(res) {
        wx.setStorageSync('mallName', res.data.data.value);
      }
    })
    this.login();
  },
  login : function () {
    var that = this;
    var token = that.globalData.token;
    if (token) {
      wx.request({
        url: 'https://api.it120.cc/' + that.globalData.subDomain + '/user/check-token',
        data: {
          token: token
        },
        success: function (res) {
          if (res.data.code != 0) {
            that.globalData.token = null;
            that.login();
          }
        }
      })
      return;
    }
    wx.login({
      success: function (res) {
        wx.getUserInfo({
          success: function (res) {
            var iv = res.iv;
            var encryptedData = res.encryptedData;
            // 下面开始调用注册接口
           
            wx.hideLoading();
           that.login();
          }
        })
      }
    })
  },
  registerUser: function () {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
       
      }
    })
  },
  globalData:{
    userInfo:null,
    subDomain:"mall"
  }
})