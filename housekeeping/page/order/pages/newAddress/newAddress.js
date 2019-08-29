// page/order/pages/newAddress/newAddress.js
const data = require('area.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        changeBtn: false,
        index: 0,
        addressid: '', //地址id
        city: [],
        multiArray: [],
        multiIndex: [0, 0], //地址索引
        multiId: [], //地址id
        pickerFlag: false, //地区选择标记
        defaultFlag: false, //添加默认地址标记
        addresMsg: '', //详细地址

        mid: '', // 客户ID
        username: '', // 收货人姓名
        mobile: '', //收货人手机号
        province: '', //收货人所在省份
        city: '', //收货人城市
        address: '', //收货人详细地址
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        let userInfo = wx.getStorageSync('userinfo');
        that.getArea()
        that.setData({
            mid: userInfo.member_id || 0
        })
        // 编辑地址回显数据
        if (options.data) {
            let data = JSON.parse(options.data);
            that.detailsAddres(data.id)
        }
    },
    // 联系人姓名
    mobileInpt(e) {
        console.log(e)
        this.setData({
            mobile: e.detail.value
        })
    },
    // 联系人姓名
    usernameInpt(e) {
        console.log(e)
        this.setData({
            username: e.detail.value
        })
    },
    // 文本域val-change事件
    ontextareaChange(e) {
        this.setData({
            addresMsg: e.detail.value
        })
    },
    // 回显数据
    detailsAddres(id) {
        let that = this,
            params = {
                mid: that.data.mid, // 客户ID
                addressid: id, //地址id
            }
        app.net.$Api.detailsAddres(params).then((res) => {
            let data = res.data.Data;
            for (var i = 0; i < that.data.multiArray[0].length; i++) {
                if (data.province == that.data.multiArray[0][i].id) {
                    that.data.multiIndex[0] = i
                }
            }
            for (var i = 0; i < that.data.multiArray[1].length; i++) {
                if (data.province == that.data.multiArray[1][i].id) {
                    that.data.multiIndex[1] = i
                }
            }
            that.setData({
                username: data.username, //姓名
                mobile: data.mobile, //手机号
                addresMsg: data.address, //详细地址
                multiIndex: that.data.multiIndex, //省，市索引
                pickerFlag: true, //回显显示省市
                multiId: [data.province, data.city], //省，市id
                addressid: data.id, //地址id
                changeBtn: true, //显示修改按钮
                defaultFlag: data.status == 1 ? true : false
            })
        })
    },
    // 保存新增地址
    saveAddres() {
        let that = this,
            params = {
                mid: that.data.mid, // 客户ID
                username: that.data.username, // 收货人姓名
                mobile: that.data.mobile, //收货人手机号
                province: that.data.multiId[0], //收货人所在省份
                city: that.data.multiId[1], //收货人城市
                address: that.data.addresMsg, // 收货人详细地址
                status: that.data.defaultFlag ? 1 : 0, // 是否为默认
            }
        if (that.data.username == ''){
            app.alert('请完善联系人姓名~')
            return;
        }
        if (that.data.mobile == '' && that.data.mobile.length>11){
            app.alert('请输入正确的手机号~')
            return;
        }
        if (that.data.multiId.length == 0){
            app.alert('请选择所在地区~')
            return;
        }
        if (that.data.addresMsg == ''){
            app.alert('请输入详细地址~')
            return;
        }
        app.net.$Api.saveaddres(params).then((res) => {
            wx.showToast({
                title: '添加成功',
                icon: 'success',
                duration: 2000,
                success: function() {
                    setTimeout(function() {
                        wx.navigateBack({
                            delta: 1,
                        })
                    }, 2000);
                }
            })
        })
    },
    // 修改地址
    changeAddres() {
        let that = this,
            params = {
                addressid: that.data.addressid, //地址id
                mid: that.data.mid, // 客户ID
                username: that.data.username, // 收货人姓名
                mobile: that.data.mobile, //收货人手机号
                province: that.data.multiId[0], //收货人所在省份
                city: that.data.multiId[1], //收货人城市
                address: that.data.addresMsg, // 收货人详细地址
                status: that.data.defaultFlag ? 1 : 0, // 是否为默认
            }
        app.net.$Api.changeAddres(params).then((res) => {
            wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 2000,
                success: function() {
                    setTimeout(function() {
                        wx.navigateBack({
                            delta: 1,
                        })
                    }, 2000);
                }
            })
        })
    },
    // 获取地区数据
    getArea() {
        let that = this;
        let index = that.data.multiIndex,
        params = {};
        app.net.$Api.getArea(params).then((res) => {
            that.data.city = res.data.Data;
            that.data.multiArray = [
                [...that.data.city],
                [...that.data.city[index[0]].sonareaData]
            ];
            that.setData({
                multiArray: that.data.multiArray,
            })
        })
    },
    // picker-Change事件
    bindMultiPickerColumnChange: function(e) {
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
    bindMultiPickerChange: function(e) {
        this.multiIndex = e.detail.value;
        this.setData({
            multiIndex: e.detail.value,
            "multiId[0]": this.data.multiArray[0][e.detail.value[0]].id,
            "multiId[1]": this.data.multiArray[1][e.detail.value[1]].id,
            pickerFlag: true
        })
    },

    //点击默认地址
    selectAcquiescent() {
        this.setData({
            defaultFlag: !this.data.defaultFlag
        })
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