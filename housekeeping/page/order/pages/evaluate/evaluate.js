// page/order/pages/evaluate/evaluate.js
const beas64 = require('beas64.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgs:[],//图片数组
        tempFilePaths:{},
        iconArr:[],
        diagnosisStar: 1 ,//默认一星
        diagnosistext:'很差',
        evaluateCurrent:0,//评价当前选中
        evaluateIcon:[
            {
                oldPath:'../../../../images/icon/icon_nogood_1.png',
                newPath:'../../../../images/icon/icon_nogood_2.png',
                text:'差评'
            },
            {
                oldPath:'../../../../images/icon/icon_medium_1.png',
                newPath:'../../../../images/icon/icon_medium_2.png',
                text: '中评'
            },
            {
                oldPath:'../../../../images/icon/icon_good_1.png',
                newPath:'../../../../images/icon/icon_good_2.png',
                text: '好评'
            }
        ],
        tabArr:['态度不好','吃到晚点','服务不专业','工具不齐全']
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            iconArr: beas64
        })
    },
    // 选取图片
    chooseImageTap: function () {
        var that = this;
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: "#00000",
            success: function (res) {
                if (!res.cancel) {
                    if (res.tapIndex == 0) {
                        that.chooseWxImage('album')
                    } else if (res.tapIndex == 1) {
                        that.chooseWxImage('camera')
                    }
                }
            }
        })
    },
    // 选取图片
    chooseWxImage: function (type) {
        var that = this;
        var imgsPaths = that.data.imgs;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: [type],
            success: function (res) {
                var imgsLimit = [];
                var tempFilePaths = that.data.tempFilePaths;
                var imgs = that.data.imgs;
                // that.upImgs(res.tempFilePaths[0], 0, 2)//上传
                for (var i = 0; i < res.tempFilePaths.length; i++) {
                    tempFilePaths[res.tempFilePaths[i]] = '';
                    console.log(res.tempFilePaths[i])
                    imgs.push(res.tempFilePaths[i]);
                };
                //最大限制六张图片
                if (imgs.length > 6) {
                    for (var i = 0; i < 6; i++) {
                        imgsLimit.push(imgs[i]);
                    }
                    that.setData({
                        imgs: imgsLimit,
                        tempFilePaths: tempFilePaths,
                    });
                } else {
                    that.setData({
                        imgs: imgs,
                        tempFilePaths: tempFilePaths,
                    });
                }
            },
        })
    },
    //图片预览
    previewImg(e){
        var that = this
        var index = e.currentTarget.dataset.index
        wx.previewImage({
            current: that.data.imgs[index],     //当前图片地址
            urls: that.data.imgs,               //所有要预览的图片的地址集合 数组形式
        })
    },
    //删除图片
    deletePic(e) {
        var that = this
        var index = e.currentTarget.dataset.index
        that.data.imgs.splice(index, 1);
        // that.data.picPaths.splice(index, 1)
        that.setData({
            imgs: that.data.imgs,
            // picPaths: that.data.picPaths
        })
        console.log(that.data.imgs)
    },
    // 获取点击的星位
    getStar(e) {
        let that = this;
        let star = e.currentTarget.dataset.star;
        switch (star) {
            case 1:
                that.data.diagnosistext = '很差'
                break;
            case 2:
                that.data.diagnosistext = '差'
                break;
            case 3:
                that.data.diagnosistext = '一般'
                break;
            case 4:
                that.data.diagnosistext = '很好'
                break;
            case 5:
                that.data.diagnosistext = '优秀'
                break;
          
        } 
        console.log(star)
        this.setData({ 
            diagnosisStar: star,
            diagnosistext: that.data.diagnosistext
        });
    },
    // 选择评价
    selectEvaluate(e){
        let index = e.currentTarget.dataset.index;
        this.setData({
            evaluateCurrent:index
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