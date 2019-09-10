//index.js
//获取应用实例
const app = getApp()
const bmap = require('../../../utils/bmap-wx.min.js');
var wxMarkerData = [];  //定位成功回调对象  
Page({
    data: {
        LocateName:'请选择您的位置',
        homePicData:{},//轮播图片
        index: 0,
        array: ['北京城市学院', '北京城市学院', '北京城市学院', '北京城市学院'],
        navArr: [{
                name: '保洁',
                icon: '../../../images/icon/icon_nav_1.png',
                url:'../../classnav/pages/cleaningList/cleaningList'
            },
            {
                name: '上门维修',
                icon: '../../../images/icon/icon_nav_2.png',
                url: '../../classnav/pages/cleaningList/cleaningList'
            },
            {
                name: '家电清洗',
                icon: '../../../images/icon/icon_nav_3.png',
                url: '../../classnav/pages/cleaningList/cleaningList'
            },
            {
                name: '搬家拉货',
                icon: '../../../images/icon/icon_nav_4.png',
                url: '../../classnav/pages/cleaningList/cleaningList'
            },
            {
                name: '上门安装',
                icon: '../../../images/icon/icon_nav_5.png',
                url: '../../classnav/pages/cleaningList/cleaningList'
            },
            {
                name: '即刻达',
                icon: '../../../images/icon/icon_nav_6.png',
                url: '../../classnav/pages/cleaningList/cleaningList'
            },
            {
                name: '家庭维修',
                icon: '../../../images/icon/icon_nav_7.png',
                url: '../../classnav/pages/cleaningList/cleaningList'
            },
            {
                name: '家电维修',
                icon: '../../../images/icon/icon_nav_8.png',
                url: '../../classnav/pages/cleaningList/cleaningList'
            },
            {
                name: '管道疏通',
                icon: '../../../images/icon/icon_nav_9.png',
                url: '../../classnav/pages/cleaningList/cleaningList'
            },
            {
                name: '开锁换锁',
                icon: '../../../images/icon/icon_nav_10.png',
                url: '../../classnav/pages/cleaningList/cleaningList'
            }
        ],
        classList: [],
        vipActivity: [
            {
                bgUrl: 'http://pic.39yst.com/group1/M00/5D/1C/Pb832l0K7xOAF6a_AABNE3A_0V8898.png',
                text1:'充值',
                text2:'立即返现'
            },
            {
                bgUrl: 'http://pic.39yst.com/group1/M00/27/1B/Co0f9V0K7xKAIFcYAABFPSr2ZXY897.png',
                text1: '分享',
                text2: '得万元奖金'
            }, {
                bgUrl: 'http://pic.39yst.com/group1/M00/5D/1C/Pb832l0K7xKACxl4AABC_mW3OSc245.png',
                text1: '抽奖',
                text2: '免单等你来'
            }
        ],
       
        markers: [],
        longitude: '',   //经度  
        latitude: '',    //纬度  
        address: '',     //地址  
        cityInfo: {},     //城市信息
        rgcData:{},
    },
    onLoad(){
        var that = this;
        var BMap = new bmap.BMapWX({
            ak: app.globalData.ak
        });

        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                that.setData({
                    latitude: res.latitude,//经度
                    longitude: res.longitude//纬度
                })
                console.log(res,'经纬度')
                BMap.regeocoding({
                    location: that.data.latitude + ',' + that.data.longitude,
                    success: function (res) {
                        console.log(res)
                        wxMarkerData = res.wxMarkerData;
                        app.globalData.loactioninfo = res
                        app.globalData.LocateName = res.wxMarkerData[0].desc
                        that.setData({
                            LocateName: res.wxMarkerData[0].desc
                        })
                    },
                    fail: function () {
                        wx.showToast({
                            title: '请检查位置服务是否开启',
                        })
                    },
                });
            },
            fail: function () {
                console.log('小程序得到坐标失败')
            }
        })
        
       
    },
    onShow(){
        let that = this;
        that.setData({
            LocateName: app.globalData.LocateName
        })
        that.getindexImg()
    },
    // 获取首页图片
    // 获取openid
    getindexImg() {
        let that = this,
            params = {}
        app.net.$Api.getindexImg(params).then((res) => {
            that.setData({
                homePicData: res.data
            })
        })
    },
    //附近技术
    goNearby(){
        wx.navigateTo({
            url: '/page/nearby/pages/nearby/nearby',
        })
    },
    // 服务详情
    gocleaningDetails(e) {
        console.log(e)
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/page/classnav/pages/cleaningDetails/cleaningDetails?id=' + id,
        })
    },
    // 去选择定位
    goMapPage(){
        wx.navigateTo({
            url: '/page/tabber/mappage/mappage',
        })
    },
    // 选择定位
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },

})