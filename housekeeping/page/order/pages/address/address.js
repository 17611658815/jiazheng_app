// page/order/pages/address/address.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId:'',//用户id
        addresList:[],//用户地址
        isIphoneX: false,
        currentTab:0,//默认地址选中
        flag:true
    },
    /**
    * 生命周期函数--监听页面显示
    */
    onShow: function () {
        this.onLoad()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = wx.getStorageSync('userinfo');
        let isIphoneX = app.globalData.isIphoneX
        this.setData({
            isIphoneX: isIphoneX,
            userId: userInfo.member_id
        })
        this.getaddresList()
    },
    // 获取用户地址
    getaddresList(){
        let that = this,
            params = {
                mid: that.data.userId,//客户ID
            }
        app.loading()
        app.net.$Api.addresList(params).then((res) => {
            wx.hideLoading();
            console.log(res)
            if (res.data.code == 200) {
                this.setData({
                    addresList:res.data.Data
                })
            } else {

            }
        })
    },
    selectAddres(e){
        let index = e.currentTarget.dataset.index
        this.setData({
            currentTab: index
        })
    },
    // 编辑地址
    changeAddres(e){
        let data = JSON.stringify(e.currentTarget.dataset.item);
        console.log(e)
        wx.navigateTo({
            url: '/page/order/pages/newAddress/newAddress?data=' + data,
        })
    },
    // 新建地址
    addNewAddres(){
        wx.navigateTo({
            url: '/page/order/pages/newAddress/newAddress',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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