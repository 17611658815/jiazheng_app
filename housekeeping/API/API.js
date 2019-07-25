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
}