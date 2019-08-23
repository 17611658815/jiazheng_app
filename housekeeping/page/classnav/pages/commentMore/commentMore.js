// page/classnav/pages/commentMore/commentMore.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pid:'',// 项目ID
        shopid:'',//店铺ID
        type:0,//类型
        nums:10,// 每一页条数
        page:1,// 页数
        selected:false,//只看当前选中状态
        currentTab:0,// 好评/中评/差评/筛选/当前选中项
        isIphoneX:false,
        commentArr: ['全部', '好评', '中评', '差评','投诉'],
        isfocus: false,//评论文本框
        bottom:'',//文本框据底部距离
        commentMsgArr: [],//评论列表
        oncommentMsg:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let isIphoneX = app.globalData.isIphoneX;
        let optData = JSON.parse(options.data)
        this.setData({
            isIphoneX: isIphoneX,
            pid: optData.pid,// 项目ID
            shopid: optData.shopid,//店铺ID
        })
        this.getcommentList()
    },
    oncommentMsg(e){
        let that = this;
        let msg = e.detail.value
        that.setData({
            oncommentMsg: msg
        })
    },
    getcommentList(){
        let that = this;
        let params = {
            pid: that.data.pid,//用户ID
            shopid: that.data.shopid,//项目/产品/服务人员ID
            nums: that.data.nums,//订购数
            page: that.data.page,//项目/产品规格
            type: that.data.type,//项目/产品规格
        }
        app.net.$Api.getcommentList(params).then((res) => {
            console.log(res)
            if (res.data.code == 200) {
                that.setData({
                    commentMsgArr: that.data.commentMsgArr.concat(res.data.Data)
                })
            } else {
               
            }
        })
    },
    swatchChange(e){
        let index = e.currentTarget.dataset.index;
        this.setData({
            type: e.currentTarget.dataset.index,
            currentTab: index,
            commentMsgArr:[]
        })
        this.getcommentList()
    },
    selectedChange(){
        let that = this;
        that.setData({
            selected: !that.data.selected
        })
    },
    //点击评论
    comment(e){
        this.setData({
            isfocus:true 
        })
    },
    //获取焦点
    onbindfocus(e){
        console.log(e)
        this.setData({
            bottom: e.detail.height
        })
    },
    onbindblur(){
        this.setData({
            isfocus: false,
            bottom: 0
        })
    },
    onbindconfirm(){
        let that = this;
        that.data.commentMsgArr.push(that.data.oncommentMsg)
        this.setData({
            isfocus: false,
            bottom: 0, 
            commentMsgArr: that.data.commentMsgArr
        })
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