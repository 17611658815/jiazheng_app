var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pid: 0,//商品id
        shopName:'选择保洁项目',//选择项目名称
        shopDetailed:{},//商品详情数据
        isIphoneX:false,
        selectShow:false,//选择项目
        selectindex:0,//默认选中服务
        selectName:'',
        count:1,//服务数量
        day:'今天',//预约日期
        time:"12:00",//预约时间
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
            isIphoneX: isIphoneX,
            pid: options.id || 1
        })
        this.getShopDetaile()
        console.log(this.data.isIphoneX)
    },
    // 获取服务详情
    getShopDetaile() {
        let that = this,
            params = {
                pid: that.data.pid
            }
        app.loading()
        app.net.$Api.getShopdetails(params).then((res) => {
            wx.hideLoading();
            console.log(res)
            if(res.data.code == 200){
                that.setData({
                    shopDetailed: res.data.Data
                })
            }else{
                
            }
        })
    },  
    //子组件事件
    onaddCart(){
        let that = this;
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
            selectShow: !that.data.selectShow,
        })
    },
    //确定服务项目
    confirm(){
        let that = this;
        that.setData({
            selectShow: !that.data.selectShow,
            shopName: that.data.shopDetailed.shopProjectRelevantData[that.data.selectindex].name
        })
        console.log('项目名称=>', that.data.shopName, '项目数量=>',that.data.count)
    },
    //选择项目
    goSelectTime(){
        let that = this;
        let id = that.data.pid;
        wx.navigateTo({
            url: '/page/classnav/pages/selectTime/selectTime?id='+id,
        })
    },
    //选择服务类型
    selectItemsType(e){
        let that = this;
        let index = e.currentTarget.dataset.index
        let name = e.currentTarget.dataset.name
        that.setData({
            selectindex: index,
            selectName: name
        })
    },
    //相关推荐
    gocleaningDetails(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: 'cleaningDetails?id=' + id,
        })
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