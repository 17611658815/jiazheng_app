// page/classnav/pages/selectTime/selectTime.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pid:0,
        currentTime: 0,//时间索引
        currentDay: 0,//日期索引
        day:'',
        daynum:'',
        time: '',
        daysData: [],
        code:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        that.setData({
            pid: options.id,
            currentDay: that.formatTime(new Date()), //年月日索引
        })
        console.log(that.data.currentDay)
        that.getShopTime()
    },
    //获取当日时间为默认索引
    formatTime(date) {
        var year = date.getFullYear()
        var month = date.getMonth()+1
        var day = date.getDate() 
        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()
        return [year, month, day].map(this.formatNumber).join('')
    },
    formatNumber(n){
        n = n.toString()
        return n[1] ? n : '0' + n
    },
    onconfirm(){
        app.globalData.data = {
            daynum: this.data.daysData[this.data.currentDay].time,
            day: this.data.daysData[this.data.currentDay].day,
            time: this.data.daysData[this.data.currentDay].hourArr[this.data.currentTime].hour
        };
        console.log(app.globalData.data)
        wx.navigateBack({
            delta: 1
        })
    },

    getShopTime() {
        let that = this,
            params = {
                pid: that.data.pid
            }
            app.loading('加载中')
        app.net.$Api.getShopTime(params).then((res) => {
            wx.hideLoading();
            console.log(res)
            let daysData = res.data.Data.daysData;
            if (res.data.code == 200) {
                that.setData({
                    daysData, code:res.data.code
                })
            } else {

            }
        })
    },
    //选择日期
    selectDays(e) {
        let that = this;
        let index = e.currentTarget.dataset.index;
        let day = e.currentTarget.dataset.day;
        console.log(index)
        that.setData({
            currentDay: index,
            day: that.data.daysData[index].day
        })
    },
    //选择时间
    selectTime(e) {
        let that = this;
        let index = e.currentTarget.dataset.index;
        let time = e.currentTarget.dataset.time;
        that.setData({
            currentTime: index,
            time: time
        })
    },
})