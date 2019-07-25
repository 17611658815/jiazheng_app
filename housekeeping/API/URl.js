export default class Url {
    static PATH = "https://wx.dkjis.com"
    
   
    //获取openid
    static getOpenIdUrl() {
        return 'https://api.weixin.qq.com/sns/jscode2session';
    };
    //wxLogin
    static wxLoginUrl() {
        return Url.PATH + '/api/login/';
    };
}