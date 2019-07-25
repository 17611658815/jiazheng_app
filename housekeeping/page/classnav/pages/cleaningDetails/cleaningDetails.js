var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isIphoneX:false,
        selectShow:false,//选择项目
        selectindex:0,//默认选中服务
        selectName:'',
        count:1,//服务数量
        day:'今天',//日期
        time:"12:00",//服务时间
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let that = this;
        let day = that.data.day
        let time = that.data.time
        if (app.globalData.data) {
            day = app.globalData.data.day
            time = app.globalData.data.time
        }
        that.setData({
            day: day,
            time: time
        })
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
    //子组件事件
    onaddCart(){
        var that = this;
        wx.showLoading({
            title: '加入购物车',
        })
        setTimeout(function () {
            wx.hideLoading()
            // 清理成功toast
        }, 2000)
    },
    //选择项目
    selectItems(){
        let that = this;
        that.setData({
            selectShow: !that.data.selectShow
        })
    },
    //选择项目
    goSelectTime(){
        let that = this;
        wx.navigateTo({
            url: '/page/classnav/pages/selectTime/selectTime',
        })
    },
    //选择服务类型
    selectItemsType(e){
        console.log(e)
        let that = this;
        let index = e.currentTarget.dataset.index
        let name = e.currentTarget.dataset.name
        that.setData({
            selectindex: index,
            selectName: name
        })
        console.log(that.data.selectName)
    },
    //服务详情
    gocleaningDetails(e){

    },
    changeCount(e){
        let that = this;
        let type = e.currentTarget.dataset.type;
        if (type == 'add'){
            that.setData({
                count: that.data.count+1
            })
        }
        if (type == 'sub'){
            if (that.data.count!=1){
                that.setData({
                    count: that.data.count - 1
                })
            }else{
                console.log('减不下去了')
            }
            
        }
    },
    //更多评论
    commentMore(){
        let that = this;
        wx.navigateTo({
            url: '/page/classnav/pages/commentMore/commentMore',
        })
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