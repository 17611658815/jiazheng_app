// page/order/pages/address/address.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mid:'',//用户id
        addresList:[],//用户地址
        isIphoneX: false,
        currentTab:0,//默认地址选中
        flag:true
    },
    /**
    * 生命周期函数--监听页面显示
    */
    onShow: function () {
        this.onLoad()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = wx.getStorageSync('userinfo');
        let isIphoneX = app.globalData.isIphoneX
        this.setData({
            isIphoneX: isIphoneX,
            mid: userInfo.member_id
        })
        this.getaddresList()
    },
    // 获取用户地址
    getaddresList(){
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
                    addresList:res.data.Data
                })
            } else {

            }
        })
    },
    // 删除服务地址
    removeAddres(e){ 
        let that = this,
            id = e.currentTarget.dataset.id,
            params = {
                mid: that.data.mid,//客户ID
                addressid: id
            }
        wx.showModal({
            title: '温馨提示',
            content: '确认删除此地址？',
            success(res) {
                if (res.confirm) {
                    app.net.$Api.removeAddres(params).then((res) => {
                        console.log(res)
                        if (res.data.code == 200) {
                            that.onLoad()
                        } else {

                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    // 设置默认地址
    setaddres(e){
        let that = this;
        let data = e.currentTarget.dataset.item;
        let  params = {
                addressid: data.id, //地址id
                mid: that.data.mid, // 客户ID
                status: data.status == 1 ? 0 : 1
        } 
        app.net.$Api.modifystatus(params).then((res) => {
            wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 2000,
                success: function () {
                    setTimeout(function () {
                        that.onLoad()
                    }, 2000);
                }
            })
            
        }) 
    },
    selectAddres(e){
        let index = e.currentTarget.dataset.index
        this.setData({
            currentTab: index
        })
    },
    // 编辑地址
    changeAddres(e){
        let data = JSON.stringify(e.currentTarget.dataset.item);
        console.log(e)
        wx.navigateTo({
            url: '/page/order/pages/newAddress/newAddress?data=' + data,
        })
    },
    // 新建地址
    addNewAddres(){
        wx.navigateTo({
            url: '/page/order/pages/newAddress/newAddress',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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