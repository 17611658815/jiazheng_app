// page/order/pages/bayCartOther/bayCartOther.js
const data = require('./buycart.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mid:0,
        cartidstr:'',
        cart_id:"",//购物车id
        address_id:"",//常用地址id
        couponid:'',//优惠卷id
        remark:'',//留言
        price_h:0,//结算金额
        addres:{},//地址
        shopData:[],//商品列表
        data:[],
        isIphoneX:false,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        let that = this;
        that.setData({
            mid: options.mid,
            cartidstr: options.cartStr,
            cart_id:options.cartid,
            isIphoneX: app.globalData.isIphoneX,
        })
        
        that.getbuyCart()
    },
    // 获取用户地址
    getaddresList() {
        let that = this,
            params = {
                mid: that.data.mid,//客户ID
            }
        app.loading()
        app.net.$Api.addresList(params).then((res) => {
            wx.hideLoading();
            console.log(res)
            if (res.data.code == 200) {
                this.setData({
                    addresList: res.data.Data,
                    address_id: res.data.Data[0].id,
                })
                console.log(res.data.Data)
            } else {

            }
        })
    },
    //去添加地址
    goAddress() {
        wx.navigateTo({
            url: '/page/order/pages/address/address',
        })
    },
    // 留言
    changeText(e) {
        this.setData({
            textVal: e.detail.value
        })
    },
    // 获取购物车清单
    getbuyCart(){
        let that = this,
            params = {
                mid: that.data.mid, // 用户ID
                cartidstr: that.data.cartidstr, 
            }
        app.net.$Api.buycart(params).then((res) => {
            console.log(res)
            that.setData({
                addres: res.data.address,
                price_h: res.data.price_h,
                data: res.data.shopProjectData,
                address_id: res.data.addressid
            })

            console.log(res.data.shopProjectData['1'].Data)
            
        })
    },
    //立即购买
    goPayment(e) {
        let that = this,

          params = {
                mid: that.data.mid,// 用户ID
                cart_id: that.data.cart_id,//购物车id
                couponid: that.data.couponid,//优惠卷id
                pay_type: 'weixin',// 支付方式
                address_id: that.data.address_id, //会员常用地址ID对应
                remark: that.data.textVal,//留言
            }
        console.log(params)
         app.net.$Api.purchase(params).then((res) => {
             console.log(res,104)
            let data = res.data.Data
             data.total = that.data.price_h;
             data.orderid = res.data.Data.order_id
            if (res.data.code == 200) {
                wx.navigateTo({
                    url: '/page/order/pages/payment/payment?data=' + JSON.stringify(data),
                })
            } else {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 2000
                })
            }
        }) 

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
        this.getaddresList()
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