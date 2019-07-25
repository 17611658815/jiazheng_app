// page/classnav/pages/cleaningList/cleaningList.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        typeid:'',// 分类ID
        shopid: '',//店铺ID
        field: '',//排序字段
        orderbytype: '',//排序类型，desc：降序 asc: 升序
        projecttagid: '',//项目分类标签ID
        nums: 10,//获取条数
        page: 1,// 页码
        typeData: [],
        currentTab:0,//导航默认选中
        seletedDown:true,//是否固定高度
    },
    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
        let that = this;
        that.setData({
            typeid: options.id
        })
        that.getTypeList()
        console.log(options)
    },

    // 导航tab切换
    swatchTab(e){
        let index = e.currentTarget.dataset.index
        this.setData({
            currentTab:index
        })
    },
    getTypeList(){
        let that = this,
            params = {
                typeid: that.data.typeid,// 分类ID
    			shopid: '',//店铺ID
    			field: '',//排序字段
    			orderbytype: '',//排序类型，desc：降序 asc: 升序
    			projecttagid:'',//项目分类标签ID
                nums: that.data.nums,//获取条数
                page: that.data.page,// 页码
            }
        app.net.$Api.getTypeList(params).then((res) => {
            console.log(res)
            that.setData({
                typeData: res.data.typeData,//导航list

            })
        })
    },  
    //接收子组件方法
    onChecked(e){
        console.log(e.detail)
    },
    parentFn(e) {
        console.log('123')
    },
    onSeleted(e){
        this.setData({
            seletedDown: e.detail.seletedDown
        })
        console.log(e)
    },
    onconfirmSF(e){ 
        this.setData({
            seletedDown: e.detail.seletedDown
        })
        console.log(e.detail.seletedDown)
    },
    //保洁服务详情
    gocleaningDetails(e){
        console.log(e)
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/page/classnav/pages/cleaningDetails/cleaningDetails?id='+id,
        })
    },
   
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    // onReady: function () {
    //     this.filtrate = this.selectComponent('#filtrate')
    // },
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
        console.log('触底了...')
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})