// pages/tabber/other/other.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        otherArr:[{msg:'待付款',type:1},{msg:'进行中',type:2},{msg:'已完成',type:3},{msg:'已取消',type:4}]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    //去购物车 
    goshopCart() {
        wx.navigateTo({
            url: '/page/order/pages/shopCart/shopCart',
        })
    },
    //取消订单
    recallOther(){
        wx.showModal({
            title: '温馨提示',
            content: '确定取消订单吗？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    //删除订单
    delOther(){
        wx.showModal({
            title: '温馨提示',
            content: '确定删除订单吗？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    //订单详情
    goOtherDetails(){
        wx.navigateTo({
            url: '/page/order/pages/otherDetails/otherDetails',
        })
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