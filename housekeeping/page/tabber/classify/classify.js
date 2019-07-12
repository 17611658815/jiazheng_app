// pages/tabber/classify/classify.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        toView: '',
        currentTab: 0,
        winHeight:0,
        listArr: [{
            name: '热门',
            id: 1
        }, {
            name: '上门维修',
            id: 2
        }, {
            name: '家电清洗',
            id: 3
        }, {
            name: '搬家拉货',
            id: 4
        }, {
            name: '上门安装',
            id: 5
        }, {
            name: '即刻达',
            id: 6
        }, {
            name: '家庭维修',
            id: 7
        }, {
            name: '家电维修',
            id: 8
        }, {
            name: '管道疏通',
            id: 9
        }, {
            name: '开锁换锁',
            id: 10
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        wx.getSystemInfo({
            success:function(res){
                that.setData({
                    winHeight: res.windowHeight-60
                })
            }
        })
    },
    scrollToViewFn: function(e) {
        let id = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index;
        this.setData({
            toView: 'toView' + id, //toViewG
            currentTab: index
        });
        console.log(this.data.toView)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

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