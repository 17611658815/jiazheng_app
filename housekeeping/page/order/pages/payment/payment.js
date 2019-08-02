const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Settimer:'',
        num: 30,
        minute: "15", //分
        second: "00", //秒
        isIphoneX: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        let isIphoneX = app.globalData.isIphoneX
        that.setData({
            isIphoneX: isIphoneX
        })
        console.log(this.data.isIphoneX)
        that.countDown()
    },
    // 倒计时
    countDown() {
        let that = this;
        let num = that.data.num;
        // 记录录音时长
        that.data.Settimer = setInterval(function() {
            console.log(that.data.timer)
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

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        clearInterval(that.data.timer)
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