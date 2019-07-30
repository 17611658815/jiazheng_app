// components/filtrate/filtrate.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        navArr: {      //导航 
            type: Array,    
        },
        tagData: {     //筛选列表      
            type: Array,    
        },
        shopData: {     //服务商      
            type: Array,    
        },
        parentFn:{
            type:Function
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        currentTab:null,
        seletedIndex: null,//服务商选中状态
        seletedDown1: false,//服务商下拉状态
        seletedDown2: false,//排序下拉状态
        seletedDown3: false,//筛选下拉状态
        sortTypeArr:['销量高','好评多','上门快','价格低'],
        sortTypeIndex:0,
        filtrate_row_1:0,//第一列
        filtrateId:0,//筛选id
        seletedid:0,//服务商id
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //弹出服务商下拉
        seleted(e) {
            this.setData({
                seletedDown1: !this.data.seletedDown1,
                seletedDown2: false,
                seletedDown3: false,
            })
        },
        //排序下拉框
        sortseleted() {
            this.setData({
                seletedDown2: !this.data.seletedDown2,
                seletedDown1: false,
                seletedDown3: false
            })
        },
        //筛选下拉框
        filtratSeleted() {
            this.setData({
                seletedDown3: !this.data.seletedDown3,
                seletedDown1: false,
                seletedDown2: false
            })
        },
        //切换服务商刷新数据
        parentFn(e){
            let id = e.currentTarget.dataset.id;
            let data = {
                index: index
            }
        },
        //服务商切换
        checked(e) {
            let index = e.currentTarget.dataset.index;
            let id = e.currentTarget.dataset.id;
            this.setData({
                seletedIndex: index,
                seletedid: id
            })
        },
        //重置服务商
        resetMerchant() {
            let that = this;
            that.setData({
                seletedIndex: null
            })
        },
        hideShade(){
            this.setData({
                seletedDown1: false,
                seletedDown2: false,
                seletedDown3: false,
            })
        },
        //确定服务商
        confirmMerchant() {
            let that = this;
            that.setData({
                seletedDown1: false,
            })
            let data = {
                seletedDown: !this.data.seletedDown1,
                id: this.data.seletedid
            }
            this.triggerEvent("seleted", data);
        },
        //选择排序方法
        selectSort(e){
            let index = e.currentTarget.dataset.index;
            this.setData({
                sortTypeIndex:index,
                seletedDown2:false
            })
            let data = {
                index: index
            }
            this.triggerEvent("checked", data);
        },
        //选择筛选方式
        selectFiltrate_1(e){
            let index = e.currentTarget.dataset.index;
            let id = e.currentTarget.dataset.id
            this.setData({
                filtrate_row_1:index,
                filtrateId: id
            })
        },
        //确认筛选
        confirmSelectFiltrate(){
            let that = this;
            that.setData({
                seletedDown3: false,
            })
            let data = {
                // seletedDown: !this.data.seletedDown3,
                index: this.data.filtrate_row_1,
                id: this.data.filtrateId
            }
            this.triggerEvent("confirmSF", data);
        },
         //重置筛选
        resetFiltrate() {
            let that = this;
            that.setData({
                filtrate_row_1: null,//第一列
                filtrate_row_2: null,//第二列
            })
        },
    }
})
