//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        index: 0,
        array: ['北京城市学院', '北京城市学院', '北京城市学院', '北京城市学院'],
        navArr: [{
                name: '保洁',
                icon: '../../../images/icon/icon_nav_1.png',
                url:'../../cleanKeeping/pages/cleaningList/cleaningList'
            },
            {
                name: '上门维修',
                icon: '../../../images/icon/icon_nav_2.png',
                url: '../../cleanKeeping/pages/cleaningList/cleaningList'
            },
            {
                name: '家电清洗',
                icon: '../../../images/icon/icon_nav_3.png',
                url: '../../cleanKeeping/pages/cleaningList/cleaningList'
            },
            {
                name: '搬家拉货',
                icon: '../../../images/icon/icon_nav_4.png',
                url: '../../cleanKeeping/cleaningList/cleaningList'
            },
            {
                name: '上门安装',
                icon: '../../../images/icon/icon_nav_5.png',
                url: '../../cleanKeeping/pages/cleaningList/cleaningList'
            },
            {
                name: '即刻达',
                icon: '../../../images/icon/icon_nav_6.png',
                url: '../../cleanKeeping/cleaningList/cleaningList'
            },
            {
                name: '家庭维修',
                icon: '../../../images/icon/icon_nav_7.png',
                url: '../../cleanKeeping/pages/cleaningList/cleaningList'
            },
            {
                name: '家电维修',
                icon: '../../../images/icon/icon_nav_8.png',
                url: '../../cleanKeeping/pages/cleaningList/cleaningList'
            },
            {
                name: '管道疏通',
                icon: '../../../images/icon/icon_nav_9.png',
                url: '../../cleanKeeping/pages/cleaningList/cleaningList'
            },
            {
                name: '开锁换锁',
                icon: '../../../images/icon/icon_nav_10.png',
                url: '../../cleanKeeping/pages/cleaningList/cleaningList'
            }
        ],
        classList: [{

        }],
        vipActivity: [{
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
        ]
    },
    //附近技术
    goNearby(){
        wx.navigateTo({
            url: '/page/nearby/pages/nearby/nearby',
        })
    },
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },

})