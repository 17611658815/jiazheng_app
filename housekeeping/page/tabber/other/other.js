// pages/tabber/other/other.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mid:0,//用户id
        otherArr:[],
        status:0,
        page:0,
        num:10,
        on_off:false,//开关
    },
    onShow: function () {
        let userInfo = wx.getStorageSync('userinfo') || "";
        this.setData({
            mid: userInfo.member_id || 0,
            otherArr:[],
            page:0
        })
        this.getorderList()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       
    },
    // 获取订单列表
    getorderList(){ 
        let that = this,
            params = {
                mid: that.data.mid,//客户ID
                page: that.data.page,
                num: that.data.num,
            }
            app.loading('加载中')
        app.net.$Api.getorderList(params).then((res) => {
            wx.hideLoading();
            console.log(res,555)
            let data = []
            if (res.data.code == 200 && res.data.Data.length>0) {
                that.setData({
                    otherArr: that.data.otherArr.concat(res.data.Data)
                })
            } else {
                console.log('刷新了')
                that.setData({
                    on_off: true
                })
            }
            console.log(that.data.otherArr.length)
        })
    },
    NeworderList(){
        let that = this,
            params = {
                mid: that.data.mid,//客户ID
                page: 0,
                num: that.data.num,
            }
            app.loading('加载中')
        app.net.$Api.getorderList(params).then((res) => {
            wx.hideLoading();
            console.log(res, 555)
            let data = []
            if (res.data.code == 200) {
                that.setData({
                    otherArr:res.data.Data
                })
            } else {
                console.log('刷新了')
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
                            that.NeworderList()
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
    // 再来一单
    /* recurOther(e){
        let that = this;
        let params = {
            mid: that.data.mid,//用户ID
            projectid: e.currentTarget.dataset.item.projectid,//项目/产品/服务人员ID
            num: e.currentTarget.dataset.item.ordernum,//订购数
            spec: that.data.specid,//项目/产品规格
            making_time: that.data.daynum + " " + that.data.time
        }
        let data = {
            pid: e.currentTarget.dataset.item.projectid,//项目id
            mid: that.data.mid,//用户id
            maktime: this.formatTime(new Date())[0] + " " + this.formatTime(new Date())[1],//服务默认时间
            number: e.currentTarget.dataset.item.ordernum,//数量
            specid: e.currentTarget.dataset.item.projectid,//项目id
            cart_id:'',//购物车id
        }
        app.net.$Api.addCart(params).then((res) => {
            console.log(res)
            data.cart_id = res.data.cart_id
            if (res.data.code == 200) {
                wx.navigateTo({
                    url: '/page/order/pages/placeorder/placeorder?data=' + JSON.stringify(data),
                })
            } else {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    }, */
    formatTime(date) {
        var year = date.getFullYear();
        var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        var second = date.getSeconds();
        return [year + "" + month + "" + day, hour + 1 + ":" + minute].map(this.formatNumber);
    },
    formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    

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
        let that = this;
        if (!that.data.on_off){
            console.log('11111')
            that.data.page++;
            that.getorderList()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})