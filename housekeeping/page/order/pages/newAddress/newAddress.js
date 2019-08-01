// page/order/pages/newAddress/newAddress.js
const data = require('area.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index:0,
        city: [],
        multiArray:[],
        multiIndex:[0,0],
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
    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
        let that = this;
        let index = that.data.multiIndex
        that.data.city = data.data
        that.data.multiArray = [[...that.data.city], [...that.data.city[index[0]].sonareaData]];
        console.log(that.data.multiArray)
        that.setData({
            multiArray: that.data.multiArray,
            // city: that.data.city
        })
    },
    getArea() {
        let that = this,
            params = {}
        app.net.$Api.getArea(params).then((res) => {
            console.log(res)
        })
    },
    // picker-Change事件
    bindMultiPickerColumnChange: function (e) {
        let city = this.data.city
        var data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        data.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                data.multiArray[1] = city[e.detail.value].sonareaData;
                break;
        }
        this.setData({
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        })
    },
    // picker-确定事件
    bindMultiPickerChange: function (e) {
        this.multiIndex = e.detail.value;
        this.setData({
            multiIndex: e.detail.value,
            pickerFlag: true
        })
        console.log(this.data.multiIndex)
    },
    // 文本域val-change事件
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