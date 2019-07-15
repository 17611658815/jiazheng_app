// pages/tabber/may/may.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        arr: ['待付款', '进行中', '已完成', '已取消'],
        navigateArr: [{
            title: '我的购物车',
            path:'/page/order/pages/shopCart/shopCart'
        }, {
            title: '我的优惠卷',
            path:'/page/order/pages/coupons/coupons'
        }, {
            title: '我的收藏',
            path:'/page/order/pages/collectible/collectible'
        }, {
            title: '收货地址',
             path:'/page/order/pages/address/address'
        }, {
            title: '客服',
            path:''
        }, {
            title: '商家入驻',
            path:''
        }
        ]


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})