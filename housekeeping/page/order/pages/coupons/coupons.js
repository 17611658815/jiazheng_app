// page/order/pages/coupons/coupons.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mid:0,
        flag:true,
        couponid:0,//优惠卷id
        couponPrice:0,//优惠卷面值
        couponList:[],//优惠卷列表
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = wx.getStorageSync('userinfo');
        this.setData({
            mid: userInfo.member_id
        })
        this.couponList()
    },
    couponList(){
        let that = this;
        let params = {
            mid: that.data.mid, // 客户ID
        }
        app.net.$Api.couponList(params).then((res) => {
            that.setData({
                couponList: res.data.Data
            })
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