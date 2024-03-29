// pages/tabber/classify/classify.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        toView: '',
        currentTab: 0,
        winHeight:0,
        listArr: [],
        recommendData:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        wx.getSystemInfo({
            success:function(res){
                that.setData({
                    winHeight: res.windowHeight-60
                })
            }
        });
        that.getClassTitle()
    },
    //服务详情
    gocleaningDetails(e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/page/classnav/pages/cleaningDetails/cleaningDetails?id=' + id,
        })
    },
    scrollToViewFn: function(e) {
        let id = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentTab: index
        });
    },
    getClassTitle(){
        let that = this;
        app.net.$Api.getClassTitle().then((res) => {
            console.log(res)
            that.setData({
                listArr: res.data.Data,
                recommendData: res.data.recommendData
            })
        })
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