let restify = require('restify-clients');
/**
 * restful rm
 */


 //流程 registerSMS -> signup -> login(获取token) -> setpwd -> communityapply (剩下就是等待审核)
let apiHost = "http://brc.wanthings.com/apiv2";
let beierClient = restify.createJsonClient({
    url: apiHost,
    contentType: 'application/x-www-form-urlencoded',
});
var restClient = function () {
    return {
        config: function (apiHost) {
            beierClient = restify.createJsonClient({
                url: apiHost
            });
        },
        /**
         * 登陆 获取token
         * raw 字符串? app_id=1&captcha=747048&
         * currentsystem_version=11.4.1&
         * mobile=17138349950&
         * password=qq123123&
         * phone_version=iPhone%20X&
         * platform=ios&
         * sign=1dc8a6fae3a0845046e9cb5d2dc7be75&
         * timestamp=1535302401&
         * version_name=1.2.14
         */
        login: function (obj, callback) {
            beierClient.post('/user/login' ,obj, (err, req, res, result) => {
                logger.info('result', result);
                if (err) {
                    throw new Error(err);
                } else {
                    callback(null, result);
                }
            });
        },
        /**
         * 注册
         * raw
         * app_id=1&
         * captcha=740207&  //短信验证码
         * currentsystem_version=11.4.1&  //手机当前的版本
         * invite_code=2cff9&  //邀请的code
         * mobile=17138349950&  //手机号码
         * password=qq123123&    //注册密码
         * phone_version=iPhone%20X& //手机型号
         * platform=ios&    //手机系统
         * version_name=1.2.14 //当前版本
         */
        signup: function (obj, callback) {
            beierClient.post('/user/signup' ,obj, (err, req, res, result) => {
                logger.info('result', result);
                if (err) {
                    throw new Error(err);
                } else {
                    callback(null, result);
                }
            });
        },

        /**
         * 身份证验证
         * app_id=1&
         * card=310104199207140831&   //身份证号码
         * currentsystem_version=11.4.1&
         * name=%E8%96%9B%E5%BA%B7%E6%9D%B0& //身份证名字
         * phone_version=iPhone%20X&
         * platform=ios&
         * token=5b82db026db36&
         * version_name=1.2.14
         */
        communityapply: function (obj, callback) {
            beierClient.post('/user/communityapply' ,obj, (err, req, res, result) => {
                logger.info('result', result);
                if (err) {
                    throw new Error(err);
                } else {
                    callback(null, result);
                }
            });
        },

        /**
         * 设置交易密码
         * app_id=1&
         * currentsystem_version=11.4.1&
         * phone_version=iPhone%20X&
         * platform=ios&
         * pwd=qq123123& //交易密码 
         * pwd2=qq123123&
         * token=5b82db026db36&
         * version_name=1.2.14
         */
        setpwd: function (obj, callback) {
            beierClient.post('/user/setpwd', obj,  (err, req, res, result) => {
                logger.info('result', result);
                if (err) {
                    throw new Error(err);
                } else {
                    callback(null, result);
                }
            });
        },
        
        /** 注册时点击发送验证码api
         * app_id=1&
         * currentsystem_version=11.4.1&
         * mobile=17602131394&
         * phone_version=iPhone%20X&
         * platform=ios&sign=271a3b23ca2afee60d0a8f2514b3fb89&
         * timestamp=1535301269&
         * type=0&
         * version_name=1.2.14
         */
        registerSMS: function (obj, callback) {
            beierClient.post('/sms/submit', obj,  (err, req, res, result) => {
                logger.info('result', result);
                if (err) {
                    throw new Error(err);
                } else {
                    callback(null, result);
                }
            });
        },
    }; 
};





module.exports = restClient();
