// page/nearby/pages/nearby/nearby.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        scrollLeft: 0,
        currentTab:0,
        isIphoneX:false,
        navArr: [{ name: '推荐即使' }, { name: '推荐即使' }, { name: '推荐即使' }, { name: '推荐即使' }, { name: '推荐即使' }, { name: '推荐即使' }, { name: '推荐即使' }]
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
    // 获取元素位置
    handleScroll(selectedId) {
        var that = this;
        var query = wx.createSelectorQuery();//创建节点查询器
        query.select('#item-' + selectedId).boundingClientRect();//选择id='#item-' + selectedId的节点，获取节点位置信息的查询请求
        query.select('#scroll-view').boundingClientRect();//获取滑块的位置信息
        //获取滚动位置
        query.select('#scroll-view').scrollOffset();//获取页面滑动位置的查询请求
        query.exec(function (res) {
            console.log("res:", res)
            that.setData({
                scrollLeft: res[2].scrollLeft + res[0].left + res[0].width / 2 - res[1].width / 2
            });
            console.log(that.data.scrollLeft)
        });
    },
    // 导航tab切换
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        this.handleScroll(index)
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