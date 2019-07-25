// page/order/pages/placeorder/placeorder.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isIphoneX:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let isIphoneX = app.globalData.isIphoneX
        this.setData({
            isIphoneX: isIphoneX
        })
        console.log(this.data.isIphoneX)
    },
    //立即购买
    goPayment(){
        wx.navigateTo({
            url: '/page/order/pages/payment/payment',
        })
    },
    //去添加地址
    goAddress(){
        wx.navigateTo({
            url: '/page/order/pages/address/address',
        })
    },
    // 选择优惠卷
    goSelectTime(){
        wx.navigateTo({
            url: '/page/classnav/pages/selectTime/selectTime',
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