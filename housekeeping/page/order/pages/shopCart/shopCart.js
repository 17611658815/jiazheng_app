// page/order/pages/shopCart/shopCart.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mid: 0,
        selectAll: false, //全选
        isIphoneX: false, //判断机型
        Cart: [], //购物车数据
        CartData: [],
        flag: true,
        tapTime: '', //方式快速点击
        cartStr: [], //选中状态
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        let isIphoneX = app.globalData.isIphoneX;
        let userInfo = wx.getStorageSync('userinfo');
        that.setData({
            isIphoneX: isIphoneX,
            mid: userInfo.member_id
        })
        // 获取购物车列表
        that.getcartList()
    },
    // 获取购物车数据
    getcartList() {
        let that = this,
            params = {
                mid: that.data.mid
            }
        app.net.$Api.getcartList(params).then((res) => {
            res.data.Data.forEach(item => {
                item.checked = true,
                item.total = (item.price * item.num / 1).toFixed(2)
            })
            let data = res.data.Data
            that.setData({
                CartData: data
            })
            that.summation()
        })
    },
    //编辑购物车
    redactCart() {
        this.setData({
            flag: false
        })
    },
    //完成编辑
    comRedact() {
        this.setData({
            flag: true
        })
    },
    //删除购物车数据
    delCartMsg() {
        let that = this;
        let Cart = that.data.Cart;
        let cartStr = that.data.cartStr;
        let params = {
            cartidstr: cartStr.join(',')
        }
        console.log(cartStr)
        if (cartStr.length == 0) {
            wx.showModal({
                title: '提示',
                content: '请选择要删除的项目',
                showCancel: false,
            })
            return;
        } else {
            wx.showModal({
                title: '提示',
                content: '确认删除此商品？',
                success(res) {
                    if (res.confirm) {
                        for (var i = 0; i < Cart.length; i++) {
                            if (Cart[i].checked) {
                                Cart.splice(i, 1)
                            }
                        }
                        app.net.$Api.delCartMsg(params).then((res) => {
                            wx.showToast({
                                title: res.data.msg,
                                icon: 'success',
                                duration: 500,
                                success: function() {
                                    setTimeout(function() {
                                        that.setData({
                                            Cart: Cart,
                                            CartData: Cart
                                        })
                                    }, 550);
                                }
                            })
                            wx.removeStorage({
                                key: 'CartData',
                            })
                        })
                        console.log(that.data.Cart, that.data.CartData)
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }



    },
    //合计单选
    summation() {
        let CartData = this.data.CartData;
        // 合计
        var sum = 0
        let cartStr = []
        for (var i = 0; i < CartData.length; i++) {
            if (CartData[i].checked) {
                cartStr.push(CartData[i].id)
                sum += CartData[i].num * CartData[i].price
            }
        }
        this.setData({
            Cart: CartData,
            cartStr: cartStr, //选中状态
            total: sum.toFixed(2) //合计
        })
        console.log(cartStr)
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
    Checked: function(e) {
        let CartData = this.data.CartData;
        let selectAll = this.data.selectAll;
        selectAll = !selectAll
        for (let i = 0; i < CartData.length; i++) {
            CartData[i].checked = selectAll; // 改变所有商品状态
        }
        //  合计
        var sum = 0
        let cartStr = []
        for (var i = 0; i < CartData.length; i++) {
            if (CartData[i].checked) {
                cartStr.push(CartData[i].id)
                sum += CartData[i].num * CartData[i].price
            }
        }
        this.setData({
            selectAll: selectAll,
            Cart: CartData,
            cartStr: cartStr,
            total: sum.toFixed(2)
        })
        wx.setStorage({
            key: 'CartData',
            data: CartData,
        })
        console.log(cartStr)
    },
    // 单选
    SingChecked: function(e) {
        let CartData = this.data.CartData;
        let index = e.currentTarget.dataset.index;
        CartData[index].checked = !CartData[index].checked
        let Num = 0;
        let cartStr = []
        for (var i = 0; i < CartData.length; i++) {
            if (CartData[i].checked) {
                cartStr.push(CartData[i].id)
                Num++;
            } else {
                cartStr.splice(i, 1)
            }
            if (CartData[i].checked) {
                this.setData({
                    selectAll: false
                })
                console.log(this.data.selectAll, 260)
            }
            if (Num == CartData.length) {
                this.setData({
                    selectAll: true
                })
            } else {
                this.setData({
                    selectAll: false
                })
            }
            console.log(cartStr)
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
            Cart: CartData,
            cartStr: cartStr
        })

        wx.setStorage({
            key: 'CartData',
            data: CartData,
        })

    },
    // 加法
    add: function(e) {
        // var nowTime = new Date();
        // if (nowTime - this.data.tapTime < 1000) {
        //     console.log('阻断')
        //     return;
        // }
        let CartData = this.data.CartData;
        let index = e.currentTarget.dataset.index
       
        if (CartData[index].num < 10) { //计算单个商品总价
            CartData[index].num++;
            CartData[index].total = 0
            CartData[index].total = (CartData[index].price * CartData[index].num / 1).toFixed(2)
        } else {
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
            Cart: CartData,
            // tapTime: nowTime
        })
        this.changeCart(CartData[index]); //同时后台也进行修改
        wx.setStorage({
            key: 'CartData',
            data: CartData,
        })

    },
    // 减法  
    can: function(e) {
        let CartData = this.data.CartData;
        let index = e.currentTarget.dataset.index;
      
            if (CartData[index].num <= 1) { //计算单个商品总价
                CartData[index].num = 1
                CartData[index].total =0;
                CartData[index].total = (CartData[index].price * CartData[index].num / 1).toFixed(2)
            }else{
                CartData[index].num--
                CartData[index].total = 0;
                CartData[index].total = (CartData[index].price * CartData[index].num / 1).toFixed(2)
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
            // tapTime: nowTime
        })
        this.changeCart(CartData[index]) //同时后台也进行修改
        wx.setStorage({
            key: 'CartData',
            data: CartData,
        })
    },
    // 合计
    getsumTotal: function() {
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
    changeCart(res) {
        console.log(res)
        let that = this,
            params = {
                mid: res.member_id, // 用户ID
                projectid: res.projectid, // 项目 / 产品 / 服务人员ID
                num: res.num, // 订购数
                cartid: res.id, //购物车ID
            }
        app.net.$Api.changeCart(params).then((res) => {
            console.log(res)
        })
    },
    // 去下单
    goPayment(e) {
        let data = {
            /*    pid: this.data.pid,
               mid: this.data.mid,
               maktime: that.data.daynum + "," + that.data.time,
               number: this.data.count,
               specid: this.data.specid, */
        }
        wx.navigateTo({
            url: '/page/order/pages/placeorder/placeorder',
        })
    },
    // 下单
    order: function(e) {
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