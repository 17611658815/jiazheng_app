export default class Url {
    static PATH = "https://wx.dkjis.com"
    
   
    //获取openid
    static getOpenIdUrl() {
        return 'https://api.weixin.qq.com/sns/jscode2session';
    };
    //wxLogin
    static wxLoginUrl() {
        return Url.PATH + '/api/login';
    };
    //首页数据接口
    static getindexImgUrl() {
        return Url.PATH + '/api/index';
    };
    //分类标题
    static getClassTitleUrl() {
        return Url.PATH + '/api/type';
    };
    //项目列表
    static getTypeListUrl() {
        return Url.PATH + '/api/type/list';
    };
}