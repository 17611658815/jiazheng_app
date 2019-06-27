// page/cleanKeeping/pages/cleaningList/cleaningList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navArr: ['全部', '日常保洁', '开荒保洁', '深度保洁', '擦玻璃','深度保洁'],
        currentTab:0,//导航默认选中
        seletedDown:true,//是否固定高度
       
    },
    // 导航tab切换
    swatchTab(e){
        let index = e.currentTarget.dataset.index
        this.setData({
            currentTab:index
        })
    },
    //接收子组件方法
    onChecked(e){
        console.log(e.detail)
    },
    parentFn(e) {
        console.log('123')
    },
    onSeleted(e){
        this.setData({
            seletedDown: e.detail.seletedDown
        })
        console.log(e)
    },
    onconfirmSF(e){ 
        this.setData({
            seletedDown: e.detail.seletedDown
        })
        console.log(e.detail.seletedDown)
    },
    //保洁服务详情
    gocleaningDetails(e){
        console.log(e)
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/page/cleanKeeping/pages/cleaningDetails/cleaningDetails?id='+id,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    // onReady: function () {
    //     this.filtrate = this.selectComponent('#filtrate')
    // },
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
        console.log('触底了...')
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})