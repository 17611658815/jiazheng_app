//app.js
const Api = require('API/API.js');
App({
    onLaunch: function() {
        wx.getSystemInfo({
            success: (res) => {
                console.log(res)
                if (res.model.search('iPhone X') != -1) {
                    this.globalData.isIphoneX = true
                }
            }
        })
        // this.getUserLocation()
    },
    // 获取地图信息
     getUserLocation() {
        let that = this;
        console.log('66666')
         wx.getSetting({
             success(res) {
                 console.log(res)
                 if (!res.authSetting['scope.userLocation']) {
                     wx.authorize({
                         scope: "scope.userLocation",
                         success: function (res) {
                             console.log(res)
                             that.getLocation()
                             console.log('允许授权位置')
                         },
                         fail: function (res) {
                             console.log(res)
                             if (res.errMsg == 'authorize:fail auth deny') { //用户拒绝授权，需删除小程序重新进入授权
                                 that.alert('您已拒绝授权');
                             }
                         },
                         complete: function (res) {
                             console.log('complete')
                         },
                     });
                 }
             }
         })
    }, 
    getLocation(){
        let that = this;
        wx.getLocation({
            type: 'wgs84',
            success:function(res){
                that.globalData.location = res
                console.log(res,51)
            }
        })
    },
    globalData: {
        userInfo: {},
        isIphoneX: false,
        AppSecret: 'e59d0cdd609f571d478f9b482a55cea3',
        AppID: 'wx2490759807dcf531',
        ak: "jTvAgQfAwt9QHpu2DocWiOg7mR1UQI8A", //填写申请到的ak  
        loactioninfo:{},
        LocateName: '请选择您的位置',
    },
    //挂载网络请求api
    net: {
        $Api: Api.api,
    },
    loading: function(content) {
        wx.showLoading({
            mask: true,
            title: content,
            icon: 'loading',
        })
    },
    alert: function (content) {
        wx.showModal({
            title: '温馨提示',
            content: content,
            showCancel: false
        })
        return this
    },
    
})