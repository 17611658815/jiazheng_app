export default class Url {
    static PATH = "https://wx.dkjis.com"
    
   
    // 获取openid
    static getOpenIdUrl() {
        return 'https://api.weixin.qq.com/sns/jscode2session';
    };
    // wxLogin
    static wxLoginUrl() {
        return Url.PATH + '/api/login';
    };
    // 首页数据接口
    static getindexImgUrl() {
        return Url.PATH + '/api/index';
    };
    // 分类标题
    static getClassTitleUrl() {
        return Url.PATH + '/api/type';
    };
    // 项目列表
    static getTypeListUrl() {
        return Url.PATH + '/api/type/list';
    };
    // 项目详情
    static getShopdetailsUrl() {
        return Url.PATH + '/api/details';
    };
    // 项目详情
    static getcommentListUrl() {
        return Url.PATH + '/api/comments';
    };
    // 项目服务时间
    static getShopTimeUrl() {
        return Url.PATH + '/api/details/datetime';
    };
    // 所在地区列表
    static getAreaUrl() {
        return Url.PATH + '/api/area';
    };
    // 购物车列表
    static getcartListUrl() {
        return Url.PATH + '/api/cart';
    };
    // 添加购物车
    static addCartUrl() {
        return Url.PATH + '/api/cart/created';
    };
    // 修改购物车内容
    static changeCartUrl() {
        return Url.PATH + '/api/cart/modify';
    };
    // 删除购物车项目
    static delCartMsgUrl() {
        return Url.PATH + '/api/cart/remove';
    };
    // 立即购买
    static instantBuyUrl() {
        return Url.PATH + '/api/order';
    };
    // 收货地址
    static addresListUrl() {
        return Url.PATH + '/api/address';
    };
    // 保存收货地址
    static saveaddresUrl() {
        return Url.PATH + '/api/address/created';
    };
    // 修改请求地址
    static detailsAddresUrl() {
        return Url.PATH + '/api/address/details';
    };
    // 修改收获地址
    static changeAddresUrl() {
        return Url.PATH + '/api/address/modify';
    };
    //  立即购买
    static purchaseUrl() {
        return Url.PATH + '/api/order/created';
    };
    //  微信支付
    static wxpayUrl() {
        return Url.PATH + '/api/shop/pay/wxpay';
    };

}