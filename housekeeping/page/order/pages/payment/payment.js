const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        timer: '',
        num: 900,
        minute: "15", //分
        second: "00", //秒
        isIphoneX: false,
        total: '', //支付金额
        mid: 0, //用户id
        order_id: '', // 订单ID
        order_sn: '', //  订单编号
        pay_type: 'weixin', //  支付方式
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        let userInfo = wx.getStorageSync('userinfo');
        let data = JSON.parse(options.data)
        console.log(data)
        that.setData({
            mid: userInfo.member_id,
            isIphoneX: app.globalData.isIphoneX,
            order_id: data.orderid,
            order_sn: data.order_sn,
            pay_type: data.pay_type || that.data.pay_type,
            total: data.total || data.price,
        })

        that.countDown()
    },
    // 倒计时
    countDown() {
        let that = this;
        let num = that.data.num;
        // 记录录音时长
        that.data.timer = setInterval(function() {
            num--;
            let time = num;
            let second = (time % 60) < 10 ? "0" + (time % 60) : (time % 60); //秒
            let minute = parseInt(time / 60) < 10 ? "0" + parseInt(time / 60) : parseInt(time / 60); //分钟
            that.setData({
                num: num,
                second: second,
                minute: minute,
            })
            if (num == 0) {
                console.log('计时结束')
                clearInterval(that.data.timer)
            }
        }, 1000);
    },
    // 微信支付
    wxpay() {
        let that = this,
            params = {
                mid: that.data.mid, //客户ID
                order_id: that.data.order_id, // 订单ID
                pay_type: that.data.pay_type, // 支付类型
                order_sn: that.data.order_sn, //支付订单号
            }
        app.net.$Api.wxpay(params).then((res) => {
            console.log(res)
            wx.requestPayment({
                timeStamp: res.data.data.timeStamp, //时间戳
                nonceStr: res.data.data.nonceStr, //随机字符串
                package: res.data.data.package, //prepay_id 
                signType: 'MD5',
                paySign: res.data.data.paySign, //签名
                success(res) {
                    that.paybac()
                },
                fail(res) {
                    console.log(res)
                }
            })
        })
    },
    // 支付成功记录
    paybac(){
        let that = this,
            params = {
                mid: that.data.mid, //客户ID
                order_id: that.data.order_id, // 订单ID
                order_sn: that.data.order_sn, //支付订单号
            }
        app.net.$Api.paybac(params).then((res) => {
            wx.switchTab({
                url: '/page/tabber/index/index',
            })
           
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        
        clearInterval(this.data.timer)
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})