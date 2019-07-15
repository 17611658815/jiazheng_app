// page/order/pages/collectible/collectible.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isIphoneX:false,
        currentTab:0,
        winHeight:'',
        navArr:['服务','技师','商家'],
        flag:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }
        });
    },
    // 点击tab切换
    swichNav: function (e) {
        var that = this;
        console.log(e)
        that.setData({
            currentTab: e.currentTarget.dataset.index,
        });
    },
    //滑动切换
    bindChange: function (e) {
        var that = this;
        that.setData({
            currentTab: e.detail.current,
        });
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