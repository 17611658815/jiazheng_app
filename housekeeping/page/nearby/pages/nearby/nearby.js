// page/nearby/pages/nearby/nearby.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab:0,
        isIphoneX:false,
        navArr: ['推荐即使', '维修安装', '推拿按摩', '美容美妆','美容美妆']
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
    //技师详情
    goTechnicianDetails(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/page/nearby/pages/techniciandetails/techniciandetails',
        })

    },
    // 导航tab切换
    swatchTab(e) {
        let index = e.currentTarget.dataset.index
        this.setData({
            currentTab: index
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