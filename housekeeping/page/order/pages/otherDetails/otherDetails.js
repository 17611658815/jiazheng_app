// page/order/pages/otherDetails/otherDetails.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mid:0,
        status:0,//订单状态
        orderid:0,//订单id
        isIphoneX:false,
        otherObj:{},//订单详情
        progressArr: [{ name: '派单中', flag: true }, { name: '已接单', flag: true }, { name: '服务中', flag: true }, { name: '已完成', flag: false }] 
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = wx.getStorageSync('userinfo');
        let isIphoneX = app.globalData.isIphoneX;
        this.setData({
            mid: userInfo.member_id,
            status: options.status,
            orderid: options.orderid,//订单id
            isIphoneX: isIphoneX
        })
        this.otherDetails()
    },
    // 订单详情
    otherDetails(){
        let that = this,
            params = {
                mid: that.data.mid,//会员ID
                orderid: that.data.orderid,// 订单ID
                status: that.data.status,//状态 1.待付款 2.待发货3.待确认4.已完成5.退款中6
            }
        app.net.$Api.otherDetails(params).then((res) => {
            that.setData({
                otherObj:res.data.Data,
                status: res.data.Data.status
            })
        })
    },
    //去评价
    goEvaluate(){
        wx.navigateTo({
            url: '/page/order/pages/evaluate/evaluate',
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