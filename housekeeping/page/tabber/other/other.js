// pages/tabber/other/other.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mid:0,//用户id
        // otherArr:[{msg:'待付款',type:1},{msg:'进行中',type:2},{msg:'已完成',type:3},{msg:'已取消',type:4}]
        otherArr:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = wx.getStorageSync('userinfo');
        this.setData({
            mid: userInfo.member_id
        })
        this.getorderList()
    },
    // 获取订单列表
    getorderList(){ 
        let that = this,
            params = {
                mid: that.data.mid,//客户ID
            }
        app.loading()
        app.net.$Api.getorderList(params).then((res) => {
            wx.hideLoading();
            console.log(res)
            if (res.data.code == 200) {
                that.setData({
                    otherArr:res.data.Data
                })
            } else {

            }
        })
    },
    // 取消订单
    removeOther(res){
        console.log(res)
        let that = this,
            params = {
                mid: that.data.mid,//客户ID
                orderid: res.orderid,// 订单ID
                status: res.status,//状态 1.待付款 2.待发货3.待确认4.已完成5.退款中6.已退款7.退款拒绝
            }
        app.net.$Api.removeOther(params).then((res) => {
            if(res.data.code == 200){
                wx.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        setTimeout(function () {
                            that.getorderList()
                        }, 2000)
                    }
                })
            }else{
                wx.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    duration: 2000,
                })
            }

        })
    },
    //去购物车 
    goshopCart() {
        wx.navigateTo({
            url: '/page/order/pages/shopCart/shopCart',
        })
    },
    //取消订单
    recallOther(e){
        let that = this;
        let data = e.currentTarget.dataset.item;
        wx.showModal({
            title: '温馨提示',
            content: '确定取消订单吗？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    that.removeOther(data)
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    //删除订单
    delOther(e){
      
        wx.showModal({
            title: '温馨提示',
            content: '确定删除订单吗？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    //订单详情
    goOtherDetails(e){
        let orderid = e.currentTarget.dataset.id,
            status = e.currentTarget.dataset.status;
        console.log(e)
        wx.navigateTo({
            url: '/page/order/pages/otherDetails/otherDetails?orderid=' + orderid + "&status=" + status,
        })
    },
    // 去付款
    gopayment(e){
        let data = e.currentTarget.dataset.item;
        wx.navigateTo({
            url: '/page/order/pages/payment/payment?data=' + JSON.stringify(data),
        })
    },
    // 订单评价
    goCommentMore(e){
        let orderid = e.currentTarget.dataset.orderid;
        let projectid = e.currentTarget.dataset.projectid
        wx.navigateTo({
            url: '/page/order/pages/evaluate/evaluate?orderid=' + orderid + "&projectid=" + projectid,
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
        let userInfo = wx.getStorageSync('userinfo');
        this.setData({
            mid: userInfo.member_id
        })
        this.getorderList()
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