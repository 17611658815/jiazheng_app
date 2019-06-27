// components/filtrate/filtrate.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        navArr: {          
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
        filtrate_row_2:0,//第二列
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
            let data = {
                seletedDown: !this.data.seletedDown1
            }
            this.triggerEvent("seleted", data);
        },
        //排序下拉框
        sortseleted() {
            this.setData({
                seletedDown2: !this.data.seletedDown2,
                seletedDown1: false,
                seletedDown3: false
            })
            let data = {
                seletedDown: !this.data.seletedDown2
            }
            this.triggerEvent("seleted", data);
        },
        //筛选下拉框
        filtratSeleted() {
            this.setData({
                seletedDown3: !this.data.seletedDown3,
                seletedDown1: false,
                seletedDown2: false
            })
            let data = {
                seletedDown: !this.data.seletedDown3
            }
            this.triggerEvent("seleted", data);
        },
        //父组件方法
        parentFn(e){
            this.triggerEvent("parentEvent");
        },
        //服务商切换
        checked(e) {
            let index = e.currentTarget.dataset.index;
            let data = {
                index: index
            }
            this.setData({
                seletedIndex: index
            })
            this.triggerEvent("checked", data );
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
            let data = {
                seletedDown: !this.data.seletedDown1
            }
            this.triggerEvent("seleted", data);
        },
        //确定服务商
        confirmMerchant() {
            let that = this;
            that.setData({
                seletedDown1: false,
            })
            let data = {
                seletedDown: !this.data.seletedDown1
            }
            this.triggerEvent("seleted", data);
        },
        //选择排序方法
        selectSort(e){
            let index = e.currentTarget.dataset.index;
            this.setData({
                sortTypeIndex:index
            })
        },
        //选择筛选方式
        // 第一行
        selectFiltrate_1(e){
            let index = e.currentTarget.dataset.index;
            this.setData({
                filtrate_row_1:index
            })
        },
        // 第二行
        selectFiltrate_2(e){
            let index = e.currentTarget.dataset.index;
            this.setData({
                filtrate_row_2:index
            })
        },
        //确认筛选
        confirmSelectFiltrate(){
            let that = this;
            that.setData({
                seletedDown3: false,
            })
            let data = {
                seletedDown: !this.data.seletedDown3,
                index: this.data.filtrate_row_2
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
