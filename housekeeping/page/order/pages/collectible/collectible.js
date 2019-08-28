// page/order/pages/collectible/collectible.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isIphoneX:false,
        currentTab:0,
        winHeight:'',
        collectArr:[],//收藏列表
        navArr:['服务','技师','商家'],
        flag:false,
        mid: 0,//会员ID
        page:0,
        num:10,
    	type: ['project', 'artificer', 'shop']
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let userInfo = wx.getStorageSync('userinfo');
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    mid: userInfo.member_id,
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }
        });
        that.getCollectList()
    },
    // 订单详情
    getCollectList() {
        let that = this,
            currentTab = that.data.currentTab,
            params = {
                mid: that.data.mid,//会员ID
                type: that.data.type[currentTab],
                page: that.data.page,
                num: that.data.num,
            }
        app.net.$Api.collect(params).then((res) => {
            console.log(res)
            if (res.data.Data.length > 0) {
                that.setData({
                    collectArr: that.data.collectArr.concat(res.data.Data)
                })
            } else {
                console.log('刷新了')
                that.setData({
                    on_off: true
                })
            }
        })
        console.log(that.data.collectArr)
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
            collectArr: [],
            page:0,
        });
        that.getCollectList()
    },
    pullUpLoad() {
        let that = this;
        if (!that.data.on_off) {
            that.data.page++;
            that.getCollectList()
        }
    },
    // 服务详情
   /*  gocleaningDetails(e) {
        console.log(e)
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/page/classnav/pages/cleaningDetails/cleaningDetails?id=' + id,
        })
    }, */
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