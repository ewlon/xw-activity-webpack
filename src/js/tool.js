/**
 * 公共工具类对象定义
 * @type {{qidong: Tool.qidong, qidongIframe: Tool.qidongIframe, getMobileSystem: Tool.getMobileSystem, getWebviewType: Tool.getWebviewType, getParam: Tool.getParam, getCookie: Tool.getCookie, isNullOrUndefined: Tool.isNullOrUndefined, getCtx: Tool.getCtx, get404Url: Tool.get404Url, nativeJump: Tool.nativeJump, downLoadApp: Tool.downLoadApp, getDeviceUDID: Tool.getDeviceUDID}}
 */
export default {
        /**
         * 判断机型
         */
        judgePlatform: function () {
            if (navigator.userAgent.match(/Android/i)) {
                return platform = "android";
            } else if ((navigator.userAgent.indexOf('iPhone') != -1)) {
                return platform = "iphone";
            } else {
                return platform = "other";
            }
        },
        GetRequest: function () {
            var url = location.search; // 获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
                }
            }
            return theRequest;
        },

        /**
         * js获取项目根路径，如： http://localhost:8083/uimcardprj
         * @returns {string}
         */

        getRootPath: function () {
            //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
            var curWwwPath = window.document.location.href;
            //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
            var pathName = window.document.location.pathname;
            var pos = curWwwPath.indexOf(pathName);
            //获取主机地址，如： http://localhost:8083
            var localhostPaht = curWwwPath.substring(0, pos);
            //获取带"/"的项目名，如：/uimcardprj
            var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
            return (localhostPaht + projectName);
        },


        /**
         * 唤醒app
         * @returns {boolean}
         */
        qidong: function (p1) {
            //操作系统
            var webviewType = this.getWebviewType();
            var mobileSystem = this.getMobileSystem();
            //webview类型如果为微信，提醒在浏览器打开
            if (webviewType == 'weixin' || webviewType == 'qq') {//|| webviewType == 'weibo'
                $('.pop-tips').show();
                return;
            }
            var url = 'hnmcc://hn.10086.cn';
            if (!this.isNullOrUndefined(p1)) {
                url = url + '/' + p1;
            }
            //默认为android
            window.location.href = url;
            if (mobileSystem == 'iOS') {
                window.setTimeout(function () {
                    window.location.href = 'https://itunes.apple.com/us/app/id458828858';
                    return false;
                }, 2000);
                return;
            } else {
                window.setTimeout(function () {
                    window.location.href = window.location.origin + Tool.getCtx() + '/downapp/index.html';
                }, 2000);
                return;
            }
        },
        /**
         * 唤醒app ios 使用iframe  App自身承载活动使用
         * @returns {boolean}
         */
        qidongIframe: function (p1) {
            //操作系统
            var webviewType = this.getWebviewType();
            var mobileSystem = this.getMobileSystem();
            //webview类型如果为微信，提醒在浏览器打开
            if (webviewType == 'weixin') {
                $('.pop-tips').show();
                return;
            }
            var url = 'hnmcc://hn.10086.cn';
            if (!this.isNullOrUndefined(p1)) {
                url = url + '/' + p1;
            }
            // APP 自身承载活动使用
            if (mobileSystem == 'iOS') {
                var ifr = document.createElement('iframe');
                ifr.src = url;
                ifr.style.display = 'none';
                document.body.appendChild(ifr);
            } else {
                //默认为android
                window.location.href = url;
            }


            if (mobileSystem == 'iOS') {
                window.setTimeout(function () {
                    window.location.href = 'https://itunes.apple.com/us/app/id458828858';
                    return false;
                }, 3000);
                return;
            } else {
                window.setTimeout(function () {
                    window.location.href = window.location.origin + Tool.getCtx() + '/downapp/index.html';
                }, 3000);
                return;
            }
        },

        /**
         * 获取手机操作系统 如果获取不到默认Android
         * @returns {*}
         */
        getMobileSystem: function () {
            var u = navigator.userAgent.toLowerCase();
            if (u.indexOf('windows phone') > -1) {
                return "WP";
            } else if (u.indexOf('android') > -1 || u.indexOf('Linux') > -1) {
                return "Android";
            } else if (u.indexOf('iphone') > -1 || u.indexOf('ipad') > -1) {
                return "iOS";
            }
            return "Android";
        },
        /**
         * 获取webview类型
         * @returns {*}
         */
        getWebviewType: function () {
            var u = navigator.userAgent.toLowerCase();
            if (u.match(/MicroMessenger/i) == 'micromessenger') {
                webviewType = "weixin"
            } else if (u.match(/qq/i) == 'qq') {
                webviewType = "qq"
            } else if (u.match('weibo') == 'weibo') {
                webviewType = "weibo"
            } else {
                webviewType = "web"
            }
            return webviewType;
        },
        /**
         * 获取url参数值
         * @param paramName
         * @returns {*}
         */
        getParam: function (paramName) {
            var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        },
        /**
         * 获取cookie值
         * @param name
         * @returns {*}
         */
        getCookie: function (name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return decodeURI(arr[2]);
            else
                return null;
        },
        /**
         * 判断是否为空或者''或者undefined
         * @param obj
         * @returns {boolean}
         */
        isNullOrUndefined: function (obj) {
            if (obj == null || obj === "" || $.trim(obj).length == 0 || obj == 'null' || obj == 'undefined') {
                return true;
            }
            return false;
        },
        /**
         * 获取项目名
         * @returns {string}
         */
        getCtx: function () {
            var pathName = window.document.location.pathname;
            return pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        },
        /**
         * 返回404的地址
         */
        get404Url: function () {
            return window.location.origin + Tool.getCtx() + '/404/error.html'
        },
        /**
         * 处理原生跳转
         * @param url 跳转地址
         * @param isLogin 1-需要登陆 0-不需要登陆 只传递url参数则默认不需要登陆
         */
        nativeJump: function (url, isLogin) {
            native.h5JumptoNative(url, isLogin);
        },
        /**
         * 直接下载app
         */
        downLoadApp: function () {
            var mobileSystem = this.getMobileSystem();
            if (mobileSystem == 'iOS') {
                window.setTimeout(function () {
                    window.location.href = 'https://itunes.apple.com/us/app/id458828858';
                    return false;
                }, 1000);
            } else {
                window.setTimeout(function () {
                    window.location.href = window.location.origin + Tool.getCtx() + '/downapp/index.html';
                }, 1000);
            }
        },
        /**
         * 获取手机emi、手机号、地市信息（以‘’符号隔开）
         */
        getDeviceUDID: function () {

            var arr, reg = new RegExp("(^| )" + "DeviceUDID" + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) {
                var CID = decodeURI(arr[2]);
                var imei = CID.split("&")[0];
                var mobile = CID.split("&")[1];
                var city = CID.split("&")[2];
                return {"imei": imei, "mobile": mobile, "city": cityName[city]};
            } else {
                return {"imei": " ", "mobile": " ", "city": " "};
            }

        },

        qiDoWeiBo: function () {
            //跳转线上签到  2018/01/singactivity
            //window.location.href ='sinaweibo://cardlist?containerid=102803&finish=true&open_direct=1&luicode=10000629&lfid=yidong_henan_001&extparam=from_mobilesign_4261&callbackurl=hnmcc%3a%2f%2f10086.cn%2fhttp%3a%2f%2f112.53.127.41%3a8088%2fhnmccClientWap%2f2018%2f01%2fsingactivity%2findex.html';

            //跳转微博签到  2018/04/weiboSign
            //window.location.href = 'sinaweibo://cardlist?containerid=102803&finish=true&open_direct=1&luicode=10000629&lfid=yidong_henan_001&extparam=from_mobilesign_4261&callbackurl=hnmcc%3a%2f%2f10086.cn%2fhttp%3a%2f%2f112.53.127.41%3a32815%2fhnmccClientWap%2f2018%2f04%2fweiboSign%2findex.html';

            //2018.5.15 改动链接
            window.location.href = 'sinaweibo://cardlist?containerid=102803&finish=true&open_direct=1&luicode=10000629&lfid=henanyidong_9999_001&extparam=from_mobilesign_4261&callbackurl=hnmcc%3a%2f%2f10086.cn%2fhttp%3a%2f%2fh5.ha.chinamobile.com%2fhnmccClientWap%2f2018%2f09%2fweiboSign%2findex.html';

            window.setTimeout(function () {
                window.location.href = 'http://m.weibo.cn/p/index?containerid=102803&extparam=from_mobilesign_4261&wm=90153_90001&featurecode=yidong_henan_001';
            }, 3000);
        },
        /**
         * 获取免等token
         * @returns {*}
         */
        getSSOToken: function () {
            return native.getIDMPToken();
        },
        /**
         * 跳转优惠
         */
        jumpToYHCX: function () {
            var version = this.getAppVersion()
            if (!this.isNullOrUndefined(version)) { // app 直接跳转
                if (version >= '6.0') {
                    this.nativeJump("HOTSALE|0");
                } else {
                    nativeHelper.toNative("selectedIndex=2");
                }
            } else {  // 外媒

                this.qidong("HOTSALE|0")

            }


        },
        /**
         * app活动跳转红包中心
         */
        jumpToRedPacketCenter: function () {
            window.location.href = this.getRootPath() + "/redpacketcenter/index.html";
        },


        /**
         * app活动跳转充值支付页面
         */
        jumpToPay: function () {
            window.location.href = this.getRootPath() + "/pay/index.html";
        },

        /**
         * 跳转金币乐园
         */
        jumpToGoldcoins: function () {
            var mobileSystem = this.getMobileSystem();
            if (mobileSystem == "iOS") {
                var url = "ecmcApp://" + "shakeGoldView";
                document.location = url;

            } else {
                nativeHelper.toNative("com.xinhang.mobileclient.ui.activity.CoinHomeActivity");

            }
        },


        /**
         * 准确获取app的版本号，如果version是空的 说明是外媒
         * @returns {*|string}
         */
        getAppVersion: function () {
            var version = '';
            try {
                version = native.getAppVersion();
            } catch (e) {
                version = '';
            }
            return version;
        },
        /**
         *  true  在app中 false 在外媒渠道
         * @returns {boolean}
         */
        isApp: function () {
            var version = '';
            try {
                version = native.getAppVersion();
            } catch (e) {
                version = '';
            }
            if (this.isNullOrUndefined(version)) {
                return false
            } else {
                return true;
            }
        },
        mask_div: function () {

            var str = '<div class="pop-tips" style="display: none">' +
                '<div class="md-modal">' +
                '<dl>' +
                '<dd>' +
                '<img src="/hnmccClientWap/common/images/pop-tips-icon.png" />' +
                '</dd>' +
                '<dd>' +
                '<a href="javascript:void(0)" class="btn-close"' +
                'onclick="$(\'.pop-tips\').hide();">我知道了</a>' +
                '</dd>' +
                '</dl>' +
                '</div>' +
                '<div class="md-overlay"></div>' +
                '</div>';


            $('body').append(str);
        },
        getChannel:function (channel) {
            var channel = this.getParam(channel);
            var flag = this.isNullOrUndefined(channel);
            if(flag){
                var appFlag = !this.isNullOrUndefined(this.getAppVersion());
                if(appFlag){
                    return "channel_app";
                }
                var webviewType = this.getWebviewType();
                if("weixin" == webviewType){
                    return "channel_wx";
                }else if("qq" == webviewType){
                    return "channel_qq";
                }else if("weibo" == webviewType){
                    return "channel_wb";
                }else{
                    return "channel_web";
                }
            }else{
                return channel;
            }

        }


    }
;

//地市对应表
var cityName = {
    "A": "郑州市", "B": "开封市", "C": "洛阳市", "D": "平顶山市", "E": "安阳市", "F": "鹤壁市",
    "G": "新乡市", "H": "焦作市", "J": "濮阳市", "K": "许昌市", "L": "漯河市", "M": "三门峡市",
    "N": "商丘市", "P": "周口市", "Q": "驻马店市", "R": "南阳市", "S": "信阳市", "U": "济源市"
};

