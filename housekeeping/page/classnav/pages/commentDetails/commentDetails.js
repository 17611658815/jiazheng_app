// page/classnav/pages/commentDetails/commentDetails.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:'',
        isfocus: false,//评论文本框
        bottom: '',//文本框据底部距离
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id: options.id
        })
        this.getCommentDetaile()

    },
    getCommentDetaile(){
        let that = this,
            params = {
                cid: that.data.id
            }
        app.loading()
        app.net.$Api.commDetails(params).then((res) => {
            wx.hideLoading();
            console.log(res)
        })
    },
    //点击评论
    comment(e) {
        this.setData({
            isfocus: true
        })
    },
    //获取焦点
    onbindfocus(e) {
        console.log(e)
        this.setData({
            bottom: e.detail.height
        })
    },
    onbindblur() {
        this.setData({
            isfocus: false,
            bottom: 0
        })
    },
    onbindconfirm() {
        let that = this;
        that.data.commentMsgArr.push(that.data.oncommentMsg)
        this.setData({
            isfocus: false,
            bottom: 0,
            commentMsgArr: that.data.commentMsgArr
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