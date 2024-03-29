var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mid:0,
        pid: '',//商品idf
        shopid:'',
        type:'',//类型
        specid:'',//服务项目id
        shopName:'选择保洁项目',//选择项目名称
        shopDetailed:{},//商品详情数据
        isIphoneX:false,
        selectShow:false,//选择项目
        selectindex:0,//默认选中服务
        selectName:'',
        count:1,//服务数量
        day:'今天',//预约日期
        time:"",//预约时间
        daynum:"",//预约日期
        isCollect:false
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let that = this;
        let day = that.data.day
        let time = that.data.time
        let daynum = that.data.daynum
        if (app.globalData.data) {
            day = app.globalData.data.day
            time = app.globalData.data.time
            daynum = app.globalData.data.daynum
        }
        that.setData({
            day: day,
            time: time,
            daynum: daynum
        })
        console.log('日期=>' + that.data.day, '日期num=>', that.data.daynum,'time=>', that.data.time)
    },
    formatTime(date) {
        var year = date.getFullYear();
        var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        var second = date.getSeconds();
        return [year + "" + month + "" +day, hour+1+":"+minute].map(this.formatNumber);
    },
    formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(this.formatTime(new Date()))
        let userInfo = wx.getStorageSync('userinfo');
        this.setData({
            isIphoneX: app.globalData.isIphoneX,
            pid: options.id,
            time: this.formatTime(new Date())[1],//默认预约时间
            daynum: this.formatTime(new Date())[0],
            mid: userInfo.member_id || 0
        })
        console.log(this.formatTime(new Date()))
        console.log('日期=>' + this.data.day, '日期num=>', this.data.daynum, 'time=>', this.data.time)
        this.getShopDetaile()
    },
    // 获取服务详情
    getShopDetaile() {
        let that = this,
            params = {
                pid: that.data.pid
            }
        app.loading('加载中')
        app.net.$Api.getShopdetails(params).then((res) => {
            wx.hideLoading();
            res.data.Data.projectData.content = res.data.Data.projectData.content.replace(/\<img/gi, '<img class="rich-img" ')
            res.data.Data.projectData.content = res.data.Data.projectData.content.replace(/\<p/gi, '<p class="rich-p fontWeight5" ')

            if(res.data.code == 200){
                that.setData({
                    shopDetailed: res.data.Data
                })
            }else{
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },  
    //子组件事件
    onaddCart(){
        let that = this;
        wx.showLoading({
            title: '加入购物车',
        })
        setTimeout(function () {
            wx.hideLoading()
            // 清理成功toast
        }, 2000)
    },
    //选择项目
    selectItems(){
        let that = this;
        that.setData({
            selectShow: !that.data.selectShow,
        })
    },
    //确定服务项目
    confirm(){
        let that = this;
        that.setData({
            selectShow: !that.data.selectShow,
            shopName: that.data.shopDetailed.shopProjectSpecsData[that.data.selectindex].name,
            specid: that.data.shopDetailed.shopProjectSpecsData[that.data.selectindex].id
        })
        console.log('项目名称=>', that.data.shopName, '项目数量=>', that.data.count, '项目id=>', that.data.specid)
    },
    //选择项目
    goSelectTime(){
        let that = this;
        let id = that.data.pid;
        wx.navigateTo({
            url: '/page/classnav/pages/selectTime/selectTime?id='+id,
        })
    },
    //选择服务类型
    selectItemsType(e){
        let that = this;
        let index = e.currentTarget.dataset.index
        let name = e.currentTarget.dataset.name
        that.setData({
            selectindex: index,
            selectName: name
        })
    },
    //相关推荐
    gocleaningDetails(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: 'cleaningDetails?id=' + id,
        })
    },
    //加减
    changeCount(e){
        let that = this;
        let type = e.currentTarget.dataset.type;
        if (type == 'add'){
            if (that.data.count >10){
                console.log('超过购买数量')
            }else{
                that.setData({
                    count: that.data.count + 1
                })
            }
           
        }
        if (type == 'sub'){
            if (that.data.count!=1){
                that.setData({
                    count: that.data.count - 1
                })
            }else{
                console.log('减不下去了')
            }
            
        }
    },
    //更多评论
    commentMore(){
        let that = this;
        let data = {
            pid: that.data.pid,
    		shopid: that.data.shopDetailed.projectData.shopid,
    		type: that.data.shopDetailed.projectData.typeid,
            mid: that.data.mid,//用户ID
            projectid: that.data.pid,//项目/产品/服务人员ID
            num: that.data.count,//订购数
            spec: that.data.specid,//项目/产品规格
            making_time: that.data.daynum + " " + that.data.time
        }
        wx.navigateTo({
            url: '/page/classnav/pages/commentMore/commentMore?data='+JSON.stringify(data),
        })
    },
    //添加购物车
    onaddCart(){
        let that = this;
        if (that.data.specid == ''){
            // app.alert('您还没选择服务项目~')
            // return;
            that.selectItems();
            return;
        }
        let params = {
            mid: that.data.mid,//用户ID
            projectid: that.data.pid,//项目/产品/服务人员ID
            num: that.data.count,//订购数
            spec: that.data.specid,//项目/产品规格
            making_time: that.data.daynum+" "+that.data.time
        }
        app.net.$Api.addCart(params).then((res) => {
            console.log(res)
            if (res.data.code == 200) {
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 2000,
                    success:function(){
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
    oninstantBuy(){
        let that = this;
        let params = {
            mid: that.data.mid,//用户ID
            projectid: that.data.pid,//项目/产品/服务人员ID
            num: that.data.count,//订购数
            spec: that.data.specid,//项目/产品规格
            making_time: that.data.daynum + " " + that.data.time
        }
        let data = {
            pid: that.data.pid,
            mid: that.data.mid,
            maktime: that.data.daynum + " " + that.data.time,
            number: that.data.count,
            specid: that.data.specid,
        }
        if (that.data.specid == '') {
            that.selectItems();
            return;
        }
        console.log(that.data.mid,243)
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
       
     
        // let params = {
        //     mid: that.data.mid,//用户ID
        //     projectid: that.data.pid,//项目/产品/服务人员ID
        //     maktime:'',//预约时间
    	//     number: that.data.count//采购数
        // }
        // app.net.$Api.instantBuy(params).then((res) => {
        //     console.log(res)
        // })
    },
    // 移到收藏夹
    changeCart(res) {
        console.log(res)
        let that = this,
        params = {
            mid: that.data.mid, // 用户ID
            projectidstr: that.data.pid
        }
        app.net.$Api.collectCreated(params).then((res) => {
            console.log(res)
            wx.showToast({
                title: res.data.msg,
                icon: 'success',
                duration: 500,
                success: function () {
                    setTimeout(function () {
                        that.setData({
                            isCollect: true
                        })
                    }, 550);
                }
            })
        })

    },
    // 评论详情
    gocommentDetails(e){
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/page/classnav/pages/commentDetails/commentDetails?id='+id,
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})