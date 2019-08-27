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
        on_off:false,//下拉开关
        currentTab:0,// 好评/中评/差评/筛选/当前选中项
        isIphoneX:false,
        commentArr: ['全部', '好评', '中评', '差评','投诉'],
        isfocus: false,//评论文本框
        bottom:'',//文本框据底部距离
        commentMsgArr: [],//评论列表
        oncommentMsg:'',
        optData:{}
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
            optData: optData
        })
        console.log(optData)
        this.getcommentList()
    },
    oncommentMsg(e){
        let that = this;
        let msg = e.detail.value
        that.setData({
            oncommentMsg: msg
        })
    },
    //图片预览
    previewImg(e) {
        var that = this;
        let imgArr = e.currentTarget.dataset.img
        wx.previewImage({
            current: imgArr,     //当前图片地址
            urls: imgArr,               //所有要预览的图片的地址集合 数组形式
        })
    },
    //添加购物车
    onaddCart() {
        let that = this;
        if (that.data.optData.spec == '') {
            // app.alert('您还没选择服务项目~')
            // return;
            wx.showModal({
                title: '温馨提示',
                content: '您还没选择服务项目',
                showCancel: false,
                success:function(){
                    wx.navigateBack({
                        delta: 1
                    })
                }
            })
            return;
        }
        let params = {
            mid: that.data.optData.mid,//用户ID
            projectid: that.data.optData.projectid,//项目/产品/服务人员ID
            num: that.data.optData.num,//订购数
            spec: that.data.optData.spec,//项目/产品规格
            making_time: that.data.optData.making_time
        }
        app.net.$Api.addCart(params).then((res) => {
            console.log(res)
            if (res.data.code == 200) {
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        // that.setData({
                        //     specid: '',
                        //     count:1,
                        // })
                    }
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
    //立即购买
    oninstantBuy() {
        let that = this;
        let params = {
            mid: that.data.optData.mid,//用户ID
            projectid: that.data.optData.projectid,//项目/产品/服务人员ID
            num: that.data.optData.num,//订购数
            spec: that.data.optData.spec,//项目/产品规格
            making_time: that.data.optData.making_time
        }
        let data = {
            pid: that.data.optData.pid,
            mid: that.data.optData.mid,
            maktime: that.data.optData.making_time,
            number: that.data.optData.num,
            specid: that.data.optData.spec,
        }
        if (that.data.optData.spec == '') {
            wx.showModal({
                title: '温馨提示',
                content: '您还没选择服务项目',
                showCancel: false,
                success: function () {
                    wx.navigateBack({
                        delta: 1
                    })
                }
            })
            return;
        }
        console.log(that.data.mid, 243)
        if (that.data.mid == 0) {
            wx.showModal({
                title: '温馨提示',
                content: '您还未登录',
                showCancel: false,
                success: function () {
                    wx.switchTab({
                        url: "/page/tabber/may/may",
                    })
                }
            })
            return;
        }
        app.net.$Api.addCart(params).then((res) => {
            console.log(res)
            data.cart_id = res.data.cart_id
            if (res.data.code == 200) {
                wx.navigateTo({
                    url: '/page/order/pages/placeorder/placeorder?data=' + JSON.stringify(data),
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
            if (res.data.code == 200 && res.data.Data.length>0) {
                that.setData({
                    commentMsgArr: that.data.commentMsgArr.concat(res.data.Data)
                })
                console.log(that.data.commentMsgArr)
            } else {
                that.setData({
                    on_off: true,//下拉开关
                })
            }
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let that = this;
        if (!that.data.on_off){
            that.data.page++;
            that.getcommentList()
        }
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
    gocommentDetails(e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/page/classnav/pages/commentDetails/commentDetails?id=' + id,
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})