// page/order/pages/placeorder/placeorder.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        otherData:{},
        pid:'',// 项目 / 产品ID 		
        mid: '',//用户ID
        maktime: '',//预约时间
        number: '',//采购数
        specid:'',
        price:'',//单价
        count: 1,//服务数量
        day: '今天',//预约日期
        time: "",//预约时间
        daynum: "",//预约日期
        total:'',//总价
        addresList:[],//用户地址
        isIphoneX:false
    },
    onShow: function () {
        let that = this;
        let day = that.data.day
        let time = that.data.time
        let daynum = that.data.daynum
        if (app.globalData.data) {
            day = app.globalData.data.day
            time = app.globalData.data.time,
                daynum = app.globalData.data.daynum
        }
        that.setData({
            day: day,
            time: time,
            daynum: daynum
        })
        console.log('日期=>' + that.data.day, '日期num=>', that.data.daynum, 'time=>', that.data.time)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let isIphoneX = app.globalData.isIphoneX;
        let data = JSON.parse(options.data);
        this.setData({
            isIphoneX: isIphoneX,
            pid: data.pid,// 项目 / 产品ID 	
            mid: data.mid,//用户ID
            maktime: data.maktime.split(","),//预约时间
            number: data.number,//采购数	
            specid: data.specid,
           
        })
        this.getaddresList()
        this.instantBuy()
    },
    // 获取用户地址
    getaddresList() {
        let that = this,
            params = {
                mid: that.data.mid,//客户ID
            }
        app.loading()
        app.net.$Api.addresList(params).then((res) => {
            wx.hideLoading();
            console.log(res)
            if (res.data.code == 200) {
                this.setData({
                    addresList: res.data.Data
                })
            } else {

            }
        })
    },
    // 加载订单数据
    instantBuy(){
        let that = this,
            params = {
                pid: that.data.pid,// 项目 / 产品ID 	
                mid: that.data.mid,//用户ID
                maktime: that.data.maktime[0] + " " + that.data.maktime[1],//预约时间
                number: that.data.number,//数量
                projectid: that.data.specid
            }
        app.loading()
        app.net.$Api.instantBuy(params).then((res) => {
            wx.hideLoading();
            console.log(res)
            if (res.data.code == 200) {
                that.setData({
                    otherData:res.data.Data,
                    count: res.data.Data.number,//数量
                    total: res.data.Data.price * res.data.Data.number.toFixed(2),//合计
                    day: res.data.Data.maktime.slice(11, 13),//截取 周几
                    time: res.data.Data.maktime.slice(14, 19),//时间
                    price: res.data.Data.price
                })
                console.log(res.data.Data.maktime,res.data.Data.maktime.slice(14,19) )
            } else {

            }
        })
    },
    //加减
    changeCount(e) {
        let that = this;
        let type = e.currentTarget.dataset.type;
        let total = 0;
        let count = that.data.count;
        if (type == 'add') {
            if (that.data.count >= 10) {
                console.log('超过购买数量')
            } else {
                count++
                total = (count * that.data.price).toFixed(2)
                that.setData({
                    count: count,
                    total: total
                })
            }

        }
        if (type == 'sub') {
            if (that.data.count != 1) {
                count--
                total = (count * that.data.price).toFixed(2)
                that.setData({
                    count: count,
                    total: total
                })
            } else {
                console.log('减不下去了')
            }

        }
    },
    //立即购买
    goPayment(){
        wx.navigateTo({
            url: '/page/order/pages/payment/payment',
        })
    },
    //去添加地址
    goAddress(){
        wx.navigateTo({
            url: '/page/order/pages/address/address',
        })
    },
    // 选择优惠卷
    goSelectTime(){
        wx.navigateTo({
            url: '/page/classnav/pages/selectTime/selectTime',
        })
    },
    //选择事件
    goSelectTime() {
        let that = this;
        let id = that.data.pid;
        wx.navigateTo({
            url: '/page/classnav/pages/selectTime/selectTime?id=' + id,
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