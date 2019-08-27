// page/order/pages/otherType/otherType.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mid:0,
        isIphoneX: false,
        currentTab: 0,
        winWidth:"",
        winHeight: '',
        navArr: ['待付款', '进行中', '已完成','已取消'],
        flag: false,
        otherArr: [],
        status:0,
        page: 0,
        num: 10,
        on_off: false,//开关
    },

    onLoad: function (options) {
        var that = this;
        let userInfo = wx.getStorageSync('userinfo');
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight,
                });
            }
        });
        that.setData({
            mid: userInfo.member_id,
            status: options.type,
            currentTab: options.current,
        })
        that.getorderList()
    },
    // 获取订单列表
    getorderList() {
        let that = this,
            params = {
                mid: that.data.mid,//客户ID
                page: that.data.page,
                status: that.data.status,
                num: that.data.num,
            }
        app.loading()
        app.net.$Api.getorderList(params).then((res) => {
            wx.hideLoading();
            console.log(res)
            if (res.data.code == 200 && res.data.Data.length > 0) {
                that.setData({
                    otherArr: that.data.otherArr.concat(res.data.Data)
                })
            } else {
                that.setData({
                    on_off: true
                })
            }
        })
    },
    // 点击tab切换
    swichNav: function (e) {
        var that = this;
        console.log(e)
        that.setData({
            currentTab: e.currentTarget.dataset.index,
            on_off: false,
            page:0,
            otherArr:[],
            status: e.currentTarget.dataset.index == 3 ? 8 : e.currentTarget.dataset.index/1+1
        });
        that.getorderList()
    },
    //滑动切换
    bindChange: function (e) {
        var that = this;
        that.setData({
            currentTab: e.detail.current,
            on_off: false,
            page: 0,
            otherArr: [],
            status: e.detail.current == 3 ? 8 : e.detail.current / 1 + 1
        });
        that.getorderList()
    },
    // 取消订单
    removeOther(res) {
        console.log(res)
        let that = this,
            params = {
                mid: that.data.mid,//客户ID
                orderid: res.orderid,// 订单ID
                status: res.status,//状态 1.待付款 2.待发货3.待确认4.已完成5.退款中6.已退款7.退款拒绝
            }
        app.net.$Api.removeOther(params).then((res) => {
            if (res.data.code == 200) {
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
            } else {
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
    recallOther(e) {
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
    delOther(e) {
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
    goOtherDetails(e) {
        let orderid = e.currentTarget.dataset.id,
            status = e.currentTarget.dataset.status;
        console.log(e)
        wx.navigateTo({
            url: '/page/order/pages/otherDetails/otherDetails?orderid=' + orderid + "&status=" + status,
        })
    },
    // 去付款
    gopayment(e) {
        let data = e.currentTarget.dataset.item;
        wx.navigateTo({
            url: '/page/order/pages/payment/payment?data=' + JSON.stringify(data),
        })
    },
    // 订单评价
    goCommentMore(e) {
        let orderid = e.currentTarget.dataset.orderid;
        let projectid = e.currentTarget.dataset.projectid
        wx.navigateTo({
            url: '/page/order/pages/evaluate/evaluate?orderid=' + orderid + "&projectid=" + projectid,
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let that = this;
      
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
    pullUpLoad(){
        let that = this;
        if (!that.data.on_off) {
            that.data.page++;
            that.getorderList()
        }
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