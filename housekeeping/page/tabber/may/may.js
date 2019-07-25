// pages/tabber/may/may.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        arr: ['待付款', '进行中', '已完成', '已取消'],
        navigateArr: [{
            title: '我的购物车',
            path: '/page/order/pages/shopCart/shopCart'
        }, {
            title: '我的优惠卷',
            path: '/page/order/pages/coupons/coupons'
        }, {
            title: '我的收藏',
            path: '/page/order/pages/collectible/collectible'
        }, {
            title: '收货地址',
            path: '/page/order/pages/address/address'
        }, {
            title: '客服',
            path: ''
        }, {
            title: '商家入驻',
            path: ''
        }],
        flag: false
    },
    bindgetUserInfo(res) {
        let that = this,
            userInfo = res.detail.userInfo;
        if (res.detail.userInfo) {
            app.loading()
            wx.login({
                success: function(res) {
                    console.log(res)
                    that.getOpenid(res.code, userInfo)
                },
                fail: function(res) {
                    app.alert('信息获取失败')
                },
                complete: function(res) {
                    wx.hideToast()
                },
            })
        } else {
            app.alert('49')
        }

    },
    // 获取openid
    getOpenid: function(loginCode, userInfo) {
        let that = this,
            params = {
                appid: app.globalData.AppID,
                secret: app.globalData.AppSecret,
                js_code: loginCode
            }
        app.net.$Api.getOpenId(params).then((res) => {
            userInfo.openid = res.data.openid
            that.wxLogin(userInfo)
        })
    },
    // 登录
    wxLogin(userInfo) {
        let that = this,
            params = userInfo;
        app.net.$Api.wxLogin(params).then((res) => {
            console.log(res)
        })
    },
    getmsg(){
        wx.request({
            url: 'https://wx.dkjis.com/api/index/',
            success:function(res){
                console.log(res,78)
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getmsg()
    },

    onShareAppMessage: function() {

    }
})