// page/order/pages/newAddress/newAddress.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index:0,
        array: ['美国', '中国', '巴西', '日本'],
        pickerFlag:false,//地区选择标记
        defaultFlag:false,//添加默认地址标记
        addresMsg:'',//详细地址

        addresObj:{
            name:'',
            phone:'',
            addres:'',
            details:''
        }
    },
    bindPickerChange(e){
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value,
            pickerFlag:true
        })
    },
    ontextareaChange(e){
        console.log(e)
    },
    //点击默认地址
    selectAcquiescent(){
        console.log(111)
        this.setData({
            defaultFlag: !this.data.defaultFlag
        }) 
        console.log(this.data.defaultFlag)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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