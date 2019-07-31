// components/addShopCart/addShopCart.js
var app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        isIphoneX:false
    },
   
    attached(){
        let isIphoneX = app.globalData.isIphoneX
        this.setData({
            isIphoneX: isIphoneX
        })
        console.log(this.data.isIphoneX)
    },
    
    /**
     * 组件的方法列表
     */
    methods: {
         //加入购物车
        addCart(e) {
            this.triggerEvent("addCart");
        },
         //加入购物车
        instantBuy(e) {
            this.triggerEvent("instantBuy");
        },
        goindex() {
            wx.switchTab({
                url: "/page/tabber/index/index",
            })
        },
        //立即购买
        purchase(){
            wx.navigateTo({
                url: '/page/order/pages/placeorder/placeorder',
            })
        },
        //去购物车 
        goshopCart() {
            wx.navigateTo({
                url: '/page/order/pages/shopCart/shopCart',
            })
        },
    }
})
