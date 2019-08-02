const Promise = require('HttpRequest.js')
const Url = require('URl.js')

/**
 * 接口请求
 */
export const api = {
    /**
     * @param paramObj
     * @returns {Promise}
     */

    // 获取openid
    getOpenId: function (paramObj) {
        return Promise.get(Url.default.getOpenIdUrl(), paramObj);
    },
    // 微信登录
    wxLogin: function (paramObj) {
        return Promise.post(Url.default.wxLoginUrl(), paramObj);
    },
    // 首页图片
    getindexImg: function (paramObj) {
        return Promise.get(Url.default.getindexImgUrl(), paramObj);
    },
    // 分类页标题
    getClassTitle: function (paramObj) {
        return Promise.get(Url.default.getClassTitleUrl(), paramObj);
    },
    // 项目列表
    getTypeList: function (paramObj) {
        return Promise.get(Url.default.getTypeListUrl(), paramObj);
    },
    // 项目详情
    getShopdetails: function (paramObj) {
        return Promise.get(Url.default.getShopdetailsUrl(), paramObj);
    },
    // 项目详情
    getcommentList: function (paramObj) {
        return Promise.get(Url.default.getcommentListUrl(), paramObj);
    },
    // 项目服务时间
    getShopTime: function (paramObj) {
        return Promise.get(Url.default.getShopTimeUrl(), paramObj);
    },
    // 所在地区列表
    getArea: function (paramObj) {
        return Promise.get(Url.default.getAreaUrl(), paramObj);
    },
    // 购物车列表
    getcartList: function (paramObj) {
        return Promise.get(Url.default.getcartListUrl(), paramObj);
    },
    // 添加购物车
    addCart: function (paramObj) {
        return Promise.post(Url.default.addCartUrl(), paramObj);
    },
    // 修改购物车内容
    changeCart: function (paramObj) {
        return Promise.post(Url.default.changeCartUrl(), paramObj);
    },
    // 删除购物车项目
    delCartMsg: function (paramObj) {
        return Promise.post(Url.default.delCartMsgUrl(), paramObj);
    },
    // 订单确认页
    instantBuy: function (paramObj) {
        return Promise.post(Url.default.instantBuyUrl(), paramObj);
    },
    // 收获地址
    addresList: function (paramObj) {
        return Promise.post(Url.default.addresListUrl(), paramObj);
    },
    // 保存收获地址
    saveaddres: function (paramObj) {
        return Promise.post(Url.default.saveaddresUrl(), paramObj);
    },
    // 修改请求地址
    detailsAddres: function (paramObj) {
        return Promise.post(Url.default.detailsAddresUrl(), paramObj);
    },
    // 修改收获地址
    changeAddres: function (paramObj) {
        return Promise.post(Url.default.changeAddresUrl(), paramObj);
    },
}