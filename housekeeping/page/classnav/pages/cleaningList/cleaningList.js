// page/classnav/pages/cleaningList/cleaningList.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        data:[],//列表数据
        typeid:'',// 分类ID
        shopid: '',//店铺ID
        field: '',//排序字段
        orderbyIndex:0,//排序索引
        orderbytype: ['desc','asc','',''],//排序类型，desc：降序 asc: 升序
        projecttagid: '',//项目分类标签ID
        nums: 10,//获取条数
        page: 1,// 页码
        on_off:false,//分页开关
        typeData: [],//
        tagData:[],//筛选
        shopData:[],//服务商
        currentTab:0,//导航默认选中
        seletedDown:true,//是否固定高度
        scrollLeft:0,//导航自动滚动距离
    },
    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
        console.log(options.name)
        let that = this;
        that.setData({
            typeid: options.id,
        })
        wx.setNavigationBarTitle({
            title: options.name 
        })
        that.getTypeList()
        console.log(options)
    },
    // 获取元素位置
    handleScroll(selectedId) {
        var that = this;
        var query = wx.createSelectorQuery();//创建节点查询器
        query.select('#item-' + selectedId).boundingClientRect();//选择id='#item-' + selectedId的节点，获取节点位置信息的查询请求
        query.select('#scroll-view').boundingClientRect();//获取滑块的位置信息
        //获取滚动位置
        query.select('#scroll-view').scrollOffset();//获取页面滑动位置的查询请求
        query.exec(function (res) {
            console.log("res:", res)
            that.setData({
                scrollLeft: res[2].scrollLeft + res[0].left + res[0].width / 2 - res[1].width / 2
            });
            console.log(that.data.scrollLeft)
        });
    },
    // 导航tab切换
    swatchTab(e){
        let that = this;
        let index = e.currentTarget.dataset.index;
        let id = e.currentTarget.dataset.id;
        that.handleScroll(index)
        console.log(index, id)
        console.log(that.data.typeData)
        that.setData({
            currentTab:index,
            projecttagid: that.data.typeData[index].id,
            page:1,
            data: [],
            on_off: false,//分页开关
        })
        that.getTypeList()
    },
    // 初始化数据
    getTypeList(){
        let that = this,
            params = {
                typeid: that.data.typeid,// 分类ID
                shopid: that.data.shopid,//店铺ID
                field: that.data.field,//排序字段
                orderbytype: that.data.orderbytype[that.data.orderbyIndex],//排序类型，desc：降序 asc: 升序
                projecttagid: that.data.projecttagid,//项目分类标签ID
                nums: that.data.nums,//获取条数
                page: that.data.page,// 页码
            }
            app.loading('加载中')
        app.net.$Api.getTypeList(params).then((res) => {
            wx.hideLoading();
            if (res.data.data.length>0){
                that.setData({
                    data: that.data.data.concat(res.data.data),
                    typeData: res.data.typeData,//导航list
                    tagData: res.data.tagData,//筛选
                    shopData: res.data.shopData,//服务商
                })
            }else{
                that.setData({
                    on_off:true
                })
            }
           
        })
    },  
    //排序
    onChecked(e){
        this.setData({
            orderbyIndex: e.detail.index,
            data:[],
            on_off: false,//分页开关
        })
        this.getTypeList()
    },
    //服务商确定选中
    onSeleted(e){
        this.setData({
            shopid: e.detail.id,
            data: [],
            on_off: false,//分页开关
        })
        this.getTypeList()
    },
    //筛选更新数据
    onconfirmsf(e){ 
        this.setData({
            typeid: e.detail.id,
            data: [],
            on_off: false,//分页开关
        })
        this.getTypeList()
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
        if(!this.data.page){
            this.data.page++;
            this.getTypeList()
        }
        console.log('触底了...')
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})