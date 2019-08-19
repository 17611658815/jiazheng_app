// page/order/pages/otherType/otherType.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isIphoneX: false,
        currentTab: 0,
        winHeight: '',
        navArr: ['待付款', '进行中', '已完成','已取消'],
        flag: false,
        otherArr:  [
                {
                    "id": "32",
                    "order_sn": "98167309",
                    "projectid": "1",
                    "shopid": "1",
                    "making_time": "2019-08-19 10:28",
                    "price": 53940,
                    "amount": 5394000,
                    "price_h": 0,
                    "modify": "2019-08-12 14:14:53",
                    "ordernum": "6",
                    "status": "1",
                    "pay_time": "0",
                    "orderid": "32",
                    "shopname": "娄小包",
                    "projectname": "日常保洁"
                },
                {
                    "id": "31",
                    "order_sn": "40122959",
                    "projectid": "1",
                    "shopid": "1",
                    "making_time": "2019-08-19 10:28",
                    "price": 8990,
                    "amount": 899000,
                    "price_h": 0,
                    "modify": "2019-08-12 14:01:01",
                    "ordernum": "1",
                    "status": "-1",
                    "pay_time": "0",
                    "orderid": "31",
                    "shopname": "娄小包",
                    "projectname": "日常保洁"
                },
                {
                    "id": "30",
                    "order_sn": "9974494",
                    "projectid": "1",
                    "shopid": "1",
                    "making_time": "2019-08-19 10:28",
                    "price": 53940,
                    "amount": 5394000,
                    "price_h": 0,
                    "modify": "2019-08-12 14:00:29",
                    "ordernum": "6",
                    "status": "-1",
                    "pay_time": "0",
                    "orderid": "30",
                    "shopname": "娄小包",
                    "projectname": "日常保洁"
                },
                {
                    "id": "29",
                    "order_sn": "64432371",
                    "projectid": "1",
                    "shopid": "1",
                    "making_time": "2019-08-19 10:28",
                    "price": 53940,
                    "amount": 5394000,
                    "price_h": 0,
                    "modify": "2019-08-12 14:00:03",
                    "ordernum": "6",
                    "status": "-1",
                    "pay_time": "0",
                    "orderid": "29",
                    "shopname": "娄小包",
                    "projectname": "日常保洁"
                },
                {
                    "id": "28",
                    "order_sn": "2038901",
                    "projectid": "1",
                    "shopid": "1",
                    "making_time": "2019-08-19 10:28",
                    "price": 8990,
                    "amount": 899000,
                    "price_h": 0,
                    "modify": "2019-08-12 10:22:24",
                    "ordernum": "1",
                    "status": "-1",
                    "pay_time": "0",
                    "orderid": "28",
                    "shopname": "娄小包",
                    "projectname": "日常保洁"
                },
                {
                    "id": "27",
                    "order_sn": "16738249",
                    "projectid": "1",
                    "shopid": "1",
                    "making_time": "2019-08-19 10:28",
                    "price": 8990,
                    "amount": 899000,
                    "price_h": 0,
                    "modify": "2019-08-12 10:07:19",
                    "ordernum": "1",
                    "status": "-1",
                    "pay_time": "0",
                    "orderid": "27",
                    "shopname": "娄小包",
                    "projectname": "日常保洁"
                },
                {
                    "id": "26",
                    "order_sn": "48673232",
                    "projectid": "1",
                    "shopid": "1",
                    "making_time": "2019-08-19 10:28",
                    "price": 8990,
                    "amount": 899000,
                    "price_h": 0,
                    "modify": "2019-08-08 14:38:48",
                    "ordernum": "1",
                    "status": "-1",
                    "pay_time": "0",
                    "orderid": "26",
                    "shopname": "娄小包",
                    "projectname": "日常保洁"
                },
                {
                    "id": "25",
                    "order_sn": "446147",
                    "projectid": "1",
                    "shopid": "1",
                    "making_time": "2019-08-19 10:28",
                    "price": 8990,
                    "amount": 899000,
                    "price_h": 0,
                    "modify": "2019-08-08 14:11:57",
                    "ordernum": "1",
                    "status": "-1",
                    "pay_time": "0",
                    "orderid": "25",
                    "shopname": "娄小包",
                    "projectname": "日常保洁"
                },
                {
                    "id": "24",
                    "order_sn": "3716710",
                    "projectid": "1",
                    "shopid": "1",
                    "making_time": "2019-08-19 10:28",
                    "price": 8990,
                    "amount": 899000,
                    "price_h": 0,
                    "modify": "2019-08-08 14:10:26",
                    "ordernum": "1",
                    "status": "-1",
                    "pay_time": "0",
                    "orderid": "24",
                    "shopname": "娄小包",
                    "projectname": "日常保洁"
                },
                {
                    "id": "23",
                    "order_sn": "19167802",
                    "projectid": "1",
                    "shopid": "1",
                    "making_time": "2019-08-19 10:28",
                    "price": 8990,
                    "amount": 899000,
                    "price_h": 0,
                    "modify": "2019-08-08 13:57:00",
                    "ordernum": "1",
                    "status": "-1",
                    "pay_time": "0",
                    "orderid": "23",
                    "shopname": "娄小包",
                    "projectname": "日常保洁"
                }
            ]

    },

    onLoad: function (options) {
        var that = this;
        console.log(options)
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight,
                    currentTab: options.current
                });
            }
        });
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
        });
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