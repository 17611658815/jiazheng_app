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
        this.getUserLocation()
    },
    // 获取地图信息
    getUserLocation() {
        let that = this;
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
                    wx.showModal({
                        title: '请求授权当前位置',
                        content: '需要获取您的地理位置，请确认授权',
                        success: res => {
                            if (res.cancel) {
                                console.log('拒绝授权')
                                wx.showToast({
                                    title: '拒绝授权',
                                    icon: 'none',
                                    duration: 1000,
                                })
                            } else if (res.confirm) {
                                wx.openSetting({
                                    success: res => {
                                        if (res.authSetting["scope.userLocation"] == true) {
                                            wx.showToast({
                                                title: '授权成功',
                                                icon: 'success',
                                                duration: 1000
                                            })
                                        }
                                    }
                                })
                            } else {
                                wx.showToast({
                                    title: '拒绝授权',
                                    icon: 'none',
                                    duration: 1000,
                                })
                            }
                        }
                    })
                } else if (res.authSetting['scope.userLocation'] == undefined) {
                    // 调用getLoaction
                    // that.getLocation()
                } else {
                    // that.getLocation()
                }
            },
            fail: res => {
                console.error(res, 'fail')
            }
        })
    },
    globalData: {
        userInfo: {},
        isIphoneX: false,
        AppSecret: 'e59d0cdd609f571d478f9b482a55cea3',
        AppID: 'wx2490759807dcf531',
    },
    //挂载网络请求api
    net: {
        $Api: Api.api,
    },
    loading: function() {
        wx.showLoading({
            mask: true,
            title: '加载中',
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