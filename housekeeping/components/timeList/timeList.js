// components/timeList/timeList.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        
    },

    /**
     * 组件的初始数据
     */
    data: {
        currentTab: 0,
        time:'',
        day:'明天',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //选择时间
        selectTime(e){
            let that= this;
            let index = e.currentTarget.dataset.index;
            let time = e.currentTarget.dataset.time;
            that.setData({
                currentTab: index,
                time: time
            })
        },
        //确定预约时间
        confirm(){
            let that = this;
            let data = {
                time: that.data.time,
                day: that.data.day
            }
            this.triggerEvent("confirm", data);
        },
        
    }
})
