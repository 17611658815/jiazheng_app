// pages/tabber/may/may.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        arr: [
            { status: '待付款', icon:'../../../images/icon/icon_DD_1.png'},
           { status: '进行中', icon: '../../../images/icon/icon_DD_2.png' },
            { status: '已完成', icon: '../../../images/icon/icon_DD_4.png' },
            { status: '已取消', icon: '../../../images/icon/icon_DD_3.png' },
            ],
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
        userInfo:null
    },
    bindgetUserInfo(res) {
        let that = this,
            userInfo = res.detail.userInfo;
        if (res.detail.userInfo) {
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
            // 拒绝授权登录
            wx.showModal({
                title: '提示',
                icon: 'success',
                content: '请确认授权登录',
                showCancel: false,
                success:function(){
                    console.log('确定')
                }
            })
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
        console.log('登录=>',68)
        let that = this,
            params = {
                openid: userInfo.openid,
				nickname: userInfo.nickName,
                sex: userInfo.gender,
				city: userInfo.city,
				country: userInfo.country,
                province: userInfo.province,
                headimgurl: userInfo.avatarUrl,
                subscribe:'0',
                subscribe_time: new Date().getTime(),
				subscribe_scene:"2",
            }
        app.net.$Api.wxLogin(params).then((res) => {
            // 存储用户信息
            that.data.userInfo = res.data.authinfo
            wx.setStorageSync("userinfo", that.data.userInfo);
            that.setData({
                userInfo: that.data.userInfo
            })
        })
    },
    getMsg(){
        wx.request({
            url: 'https://wx.dkjis.com/api/index',
            success:function(res){
                console.log(res,91)
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        let userInfo = wx.getStorageSync('userinfo') || null;
        that.setData({
            userInfo
        })
        this.getMsg()
    },

    onShareAppMessage: function() {

    }
})