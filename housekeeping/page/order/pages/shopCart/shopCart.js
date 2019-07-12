// page/order/pages/shopCart/shopCart.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selectAll: false,//全选
        isIphoneX:false,//判断机型
        Cart:[],//购物车数据
        arr: [{
                name: '日常服务1',
                price:24,
                checked:false,
                count:1
            },
            {
                name: '日常服务2',
                price: 23,
                checked: false,
                count: 2
            },
            {
                name: '日常服务3',
                price: 25,
                checked: false,
                count: 3
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let isIphoneX = app.globalData.isIphoneX
        this.setData({
            isIphoneX: isIphoneX
        })
        wx.setStorageSync('CartData', this.data.arr)
        wx.getStorage({
            key: 'CartData',
            success: (res) => {
                // 合计
                var sum = 0
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].checked) {
                        sum += res.data[i].count * res.data[i].price
                    }
                }
                this.setData({
                    Cart: res.data,
                    total: sum.toFixed(2)
                })
                // 单选
                let Num = 0;
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].checked) {
                        Num++;
                    }
                    if (res.data[i].checked) {
                        this.setData({
                            selectAll: false
                        })
                    }
                    if (Num == res.data.length) {
                        this.setData({
                            selectAll: true
                        })
                    }
                }
                wx: wx.setStorage({
                    key: 'CartData',
                    data: res.data,
                })
            }
        })
    },
    // 全选
    Checked: function (e) {
        wx.getStorage({
            key: 'CartData',
            success: (res) => {
                let selectAll = this.data.selectAll
                selectAll = !selectAll
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].checked = selectAll;            // 改变所有商品状态
                }
                //  合计
                var sum = 0
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].checked) {
                        sum += res.data[i].count * res.data[i].price
                    }
                }
                this.setData({
                    selectAll: selectAll,
                    Cart: res.data,
                    total: sum.toFixed(2)
                })
                wx: wx.setStorage({
                    key: 'CartData',
                    data: res.data,
                })
            }
        })

    },
    // 单选
    SingChecked: function (e) {
        wx.getStorage({
            key: 'CartData',
            success: (res) => {
                let index = e.currentTarget.dataset.index;
                console.log(res)
                res.data[index].checked = !res.data[index].checked

                let Num = 0;
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].checked) {
                        Num++;
                    }
                    if (res.data[i].checked) {
                        this.setData({
                            selectAll: false
                        })
                    }
                    if (Num == res.data.length) {
                        this.setData({
                            selectAll: true
                        })
                    }
                }
                // 合计
                var sum = 0
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].checked) {
                        sum += res.data[i].count * res.data[i].price
                    }
                }
                //更新数据
                this.setData({
                    total: sum.toFixed(2),
                    Cart: res.data
                })

                wx.setStorage({
                    key: 'CartData',
                    data: res.data,
                })
            }
        })
        //
    },
    // 加法
    add: function (e) {
        wx: wx.getStorage({
            key: 'CartData',
            success: (res) => {
                let index = e.currentTarget.dataset.index
                res.data[index].count++
                // 合计
                var sum = 0
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].checked) {
                        sum += res.data[i].count * res.data[i].price
                    }
                }
                //更新数据
                this.setData({
                    total: sum.toFixed(2),
                    Cart: res.data
                })
                wx: wx.setStorage({
                    key: 'CartData',
                    data: res.data,
                })
            }
        })
    },
    // 减法  
    can: function (e) {
        wx: wx.getStorage({
            key: 'CartData',
            success: (res) => {
                let index = e.currentTarget.dataset.index
                res.data[index].count--
                if (res.data[index].count <= 1) {
                    res.data[index].count = 1
                }
                // 合计
                var sum = 0
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].checked) {
                        sum += res.data[i].count * res.data[i].price
                    }
                }
                this.setData({
                    total: sum.toFixed(2),
                    Cart: res.data,
                })
                wx: wx.setStorage({
                    key: 'CartData',
                    data: res.data,
                })

            }
        })
    },
    // 合计
    getsumTotal: function () {
        wx: wx.getStorage({
            key: 'CartData',
            success: (res) => {
                var sum = 0
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].checked) {
                        sum += res.data[i].count * res.data[i].price
                    }
                }
                //更新数据
                this.setData({
                    total: sum.toFixed(2)
                })
                wx: wx.setStorage({
                    key: 'CartData',
                    data: res.data,
                })

            }
        })

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.getStorage({
            key: 'CartData',
            success: (res) => {
                this.setData({
                    Cart: res.data
                })
            }
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