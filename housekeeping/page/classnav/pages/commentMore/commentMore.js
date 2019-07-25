// page/classnav/pages/commentMore/commentMore.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selected:false,
        currentTab:0,
        isIphoneX:false,
        commentArr:['全部','好评','中评','差评','有图'],
        isfocus:false,
        bottom:'',
        commentMsgArr: [],
        oncommentMsg:''
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
    oncommentMsg(e){
        let that = this;
        let msg = e.detail.value
       
        that.setData({
            oncommentMsg: msg
        })
        console.log(e)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    swatchChange(e){
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentTab: index
        })
    },
    selectedChange(){
        let that = this;
        that.setData({
            selected: !that.data.selected
        })
    },
    //点击评论
    comment(e){
        this.setData({
            isfocus:true 
        })
    },
    //获取焦点
    onbindfocus(e){
        console.log(e)
        this.setData({
            bottom: e.detail.height
        })
    },
    onbindblur(){
        this.setData({
            isfocus: false,
            bottom: 0
        })
    },
    onbindconfirm(){
        let that = this;
        that.data.commentMsgArr.push(that.data.oncommentMsg)
        this.setData({
            isfocus: false,
            bottom: 0, 
            commentMsgArr: that.data.commentMsgArr
        })
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