// 引用百度地图微信小程序JSAPI模块 
const bmap = require('../../../utils/bmap-wx.min.js');
const app = getApp()
var wxMarkerData = [];
Page({
    data: {
        latitude:"",//经度
        longitude:"",//纬度
        sugData: '',
        loactioninfo:{},
        LocateName:''
    },
    // 绑定input输入 
    bindKeyInput: function (e) {
        var that = this;
        // 新建百度地图对象 
        if (e.detail.value.length > 0){
            var BMap = new bmap.BMapWX({
                ak: app.globalData.ak
            });
            var fail = function (data) {
                console.log(data)
            };
            var success = function (data) {
                that.setData({
                    sugData: data.result
                });
            }
            // 发起suggestion检索请求 
            BMap.suggestion({
                query: e.detail.value,
                region: '北京',
                city_limit: true,
                fail: fail,
                success: success
            });
        }else{
            that.setData({
                sugData: []
            });
        }
       
    },
    //重新定位
    newloactioninfo(){
        let that = this;
        var BMap = new bmap.BMapWX({
            ak: app.globalData.ak
        });
        app.loading('定位中..')
        wx.getLocation({
            type: 'gcj02',
            success: function (res) {
                that.setData({
                    latitude: res.latitude,//经度
                    longitude: res.longitude//纬度
                })
                BMap.regeocoding({
                    location: that.data.latitude + ',' + that.data.longitude,
                    success: function (res) {
                        wxMarkerData = res.wxMarkerData;
                        // app.globalData.LocateName = res.wxMarkerData[0].desc;
                        app.globalData.LocateName = res.originalData.result.sematic_description;
                        app.globalData.loactioninfo = res
                        that.setData({
                            loactioninfo: res,
                            LocateName: res.originalData.result.sematic_description
                        })
                        wx.hideLoading()
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
    // 附近位置
    Selectlocation(e){
        let that = this;
        let item = e.currentTarget.dataset.item;
        var BMap = new bmap.BMapWX({
            ak: app.globalData.ak
        });
        app.loading('加载中..')
         BMap.regeocoding({
            location: item.point.y + ',' + item.point.x,
            success: function (res) {
                wx.hideLoading()
                wxMarkerData = res.wxMarkerData;
                // app.globalData.LocateName = res.wxMarkerData[0].desc;
                app.globalData.LocateName = res.originalData.result.sematic_description;
                app.globalData.loactioninfo = res
                that.setData({
                    loactioninfo: res,
                    LocateName: res.originalData.result.sematic_description
                },()=>{
                    wx.navigateBack({
                        delta: 1
                    })
                })
              
            },
            fail: function () {
                wx.showToast({
                    title: '请检查位置服务是否开启',
                })
            },
        }); 
    },
    // 选择附近位置
    selectAddres(res){
        let that = this;
        let Res = res.currentTarget.dataset.location;
        var BMap = new bmap.BMapWX({
            ak: app.globalData.ak
        });
        app.loading('定位中..')
        BMap.regeocoding({
            location: Res.lat + ',' + Res.lng,
            success: function (res) {
                console.log(res)
                wxMarkerData = res.wxMarkerData;
                // app.globalData.LocateName = res.wxMarkerData[0].desc;
                app.globalData.LocateName = res.originalData.result.sematic_description;
                app.globalData.loactioninfo = res
                that.setData({
                    loactioninfo: res,
                    LocateName: res.originalData.result.sematic_description,
                    sugData:[]
                })
                wx.hideLoading()
            },
            fail: function () {
                wx.showToast({
                    title: '请检查位置服务是否开启',
                })
            },
        })
    },
    onLoad: function () {
        var that = this;
        this.setData({
            loactioninfo: app.globalData.loactioninfo,
            LocateName: app.globalData.LocateName
        })
        console.log(app.globalData.loactioninfo)
    },
})