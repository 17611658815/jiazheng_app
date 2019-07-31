// page/order/pages/shopCart/shopCart.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId:0,
        selectAll: false,//全选
        isIphoneX:false,//判断机型
        Cart:[],//购物车数据
        CartData:[],
        flag:true
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let isIphoneX = app.globalData.isIphoneX;
        let userInfo = wx.getStorageSync('userinfo');
        that.setData({
            isIphoneX: isIphoneX,
            userId: userInfo.member_id
        })
        // 获取购物车列表
        that.getcartList()
    },
    getcartList() {
        let that = this,
            params = {
                mid: that.data.userId
            }
        app.net.$Api.getcartList(params).then((res) => {
            res.data.Data.forEach(item => {
                item.checked = true
            })
            let data = res.data.Data
            that.setData({
                CartData: data
            })
            that.summation()
        })
    },
    //编辑购物车
    redactCart(){
        this.setData({
            flag:false
        })
    },
    //完成编辑
    comRedact(){
        this.setData({
            flag:true
        })
    },
    //合计单选
    summation(){
        let CartData = this.data.CartData;
        // 合计
        var sum = 0
        for (var i = 0; i < CartData.length; i++) {
            if (CartData[i].checked) {
                sum += CartData[i].num * CartData[i].price
            }
        }
        this.setData({
            Cart: CartData,
            total: sum.toFixed(2)
        })
        // 单选
        let Num = 0;
        for (var i = 0; i < CartData.length; i++) {
            console.log(Num, 107)
            if (CartData[i].checked) {
                Num++;
               
            }
            if (CartData[i].checked) {
                this.setData({
                    selectAll: false
                })
            }
            if (Num == CartData.length) {
                this.setData({
                    selectAll: true
                })
            }
        }
        wx.setStorage({
            key: 'CartData',
            data: CartData,
        })
    },
    // 全选
    Checked: function (e) {
        let CartData = this.data.CartData;
        let selectAll = this.data.selectAll;
        selectAll = !selectAll
        for (let i = 0; i < CartData.length; i++) {
            CartData[i].checked = selectAll;// 改变所有商品状态
        }
        //  合计
        var sum = 0
        for (var i = 0; i < CartData.length; i++) {
            if (CartData[i].checked) {
                sum += CartData[i].num * CartData[i].price
            }
        }
        this.setData({
            selectAll: selectAll,
            Cart: CartData,
            total: sum.toFixed(2)
        })
        wx.setStorage({
            key: 'CartData',
            data: CartData,
        })

    },
    // 单选
    SingChecked: function (e) {
        let CartData = this.data.CartData;
        let index = e.currentTarget.dataset.index;
        CartData[index].checked = !CartData[index].checked

        let Num = 0;
        for (var i = 0; i < CartData.length; i++) {
            if (CartData[i].checked) {
                Num++;
            }
            if (CartData[i].checked) {
                this.setData({
                    selectAll: false
                })
                console.log(this.data.selectAll,260)
            }
            if (Num == CartData.length) {
                this.setData({
                    selectAll: true
                })
            }else{
                this.setData({
                    selectAll: false
                })
            }
        }
        // 合计
        var sum = 0
        for (var i = 0; i < CartData.length; i++) {
            if (CartData[i].checked) {
                sum += CartData[i].num * CartData[i].price
            }
        }
        //更新数据
        this.setData({
            total: sum.toFixed(2),
            Cart: CartData
        })

        wx.setStorage({
            key: 'CartData',
            data: CartData,
        })
     
    },
    // 加法
    add: function (e) {
        let CartData = this.data.CartData;
        let index = e.currentTarget.dataset.index
        
        if (CartData[index].num < 10) {
            CartData[index].num++
        }else{
            CartData[index].num = 10;
            console.log('超过购买数量')
        }
        // 合计
        var sum = 0
        for (var i = 0; i < CartData.length; i++) {
            if (CartData[i].checked) {
                sum += CartData[i].num * CartData[i].price
            }
        }
        //更新数据
        this.setData({
            total: sum.toFixed(2),
            Cart: CartData
        })
        this.changeCart(CartData[index]);//同时后台也进行修改
        wx.setStorage({
            key: 'CartData',
            data: CartData,
        })
     
    },
    // 减法  
    can: function (e) {
        let CartData = this.data.CartData;
        let index = e.currentTarget.dataset.index
        CartData[index].num--
        if (CartData[index].num <= 1) {
            CartData[index].num = 1
        }
        // 合计
        var sum = 0
        for (var i = 0; i < CartData.length; i++) {
            if (CartData[i].checked) {
                sum += CartData[i].num * CartData[i].price
            }
        }
        this.setData({
            total: sum.toFixed(2),
            Cart: CartData,
        })
        this.changeCart(CartData[index])//同时后台也进行修改
        wx.setStorage({
            key: 'CartData',
            data: CartData,
        })
    },
    // 合计
    getsumTotal: function () {
        let sum = 0;
        let CartData = this.data.CartData;
        for (var i = 0; i < CartData.length; i++) {
            if (CartData[i].checked) {
                sum += CartData[i].num * CartData[i].price
            }
        }
        //更新数据
        this.setData({
            total: sum.toFixed(2)
        })
        wx.setStorage({
            key: 'CartData',
            data: CartData,
        })
    },
    // 修改购物车商品
    changeCart(res){
        console.log(res)
        let that = this,
            params = {
                mid: res.member_id,// 用户ID
                projectid: res.projectid,// 项目 / 产品 / 服务人员ID
                num: res.num,// 订购数
                cartid: res.id,//购物车ID
            }
        app.net.$Api.changeCart(params).then((res) => {
            console.log(res)
        })
    },
    // 下单
    order: function (e) {
        wx.getStorage({
            key: 'CartData',
            success: (res) => {
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].checked === false) {
                        wx.navigateTo({
                            url: '../order/order',
                        })
                    } else {
                        wx.showToast({
                            title: '请选择商品',
                            icon: 'none',
                            mask: true
                        })
                    }
                }
                this.setData({
                    Cart: res.data
                })
            }
        })
    }
})