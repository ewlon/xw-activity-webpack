const Tool = import('./tool.js')
var refresh="1"; // 有值  就有刷新按钮
var logoType='';
var version = "";
var platform = "";
var shareId = "";
var shareType = "";
var shareLink = window.location.origin+"/hnmccClientWap/2019/07/globalRoaming/index.html";

var shareTitle = "出境流量包助你FUN肆嗨";
var shareContent = "包天流量畅享，全世界任你撒欢";
var iconUrl = "";
var callBack = "shareCallBack";
var shareConfigPT = "JPFX,WX,PYQ,WB,QQ,QQKJ,DX";
//var shareConfigPT = "JPFX";

/** 公用 start */
var request = GetRequest();

/***   获取cookie  start                  */
//获取查询字符串和值
export const GetRequest = () => {
    var url = location.search; // 获取url中"?"符后的字串
    var theRequest = {};
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
    }
    return theRequest;
}


export const shareCallBack = (success, channel, device) => {
    if (1 == success) {
    }else{
        console.log("分享失敗");
    }
}

/**
 * 判断机型
 */
export const judgePlatform = () => {
    if (navigator.userAgent.match(/Android/i)) {
        return platform = "android";
    } else if ((navigator.userAgent.indexOf('iPhone') != -1)) {
        return platform = "iphone";
    } else {
        return platform = "other";
    }
}

//js获取项目根路径，如： http://localhost:8083/uimcardprj
export const getRootPath = () => {
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
}

var ipHost = getRootPath();
var domainHost = getRootPath();
var pathName = "/2019/03/points/index.html";
var qidongUrl = ipHost+pathName;

$(function () {
    version = Tool.getCookie("VersionName");
    var random = Math.floor(Math.random()*20);
    shareLink = window.location.origin+"/hnmccClientWap/2019/07/globalRoaming/index.html";
    //shareLink = domainHost+"/2019/01/purchasesOnAve/index.html";
    //iconUrl = ipHost + "/2018/12/yearbill/images/96-96.png";
    iconUrl = ipHost + "/2019/07/globalRoaming/images/share.jpg";
    //手厅分享
    platform = judgePlatform();
    //Tool.setNativeShare(shareId, shareType, shareLink, shareTitle, shareContent, iconUrl, callBack, shareConfigPT);
    if (version >= '5.3') {
        setShareConfigInfo(platform, version, shareId, shareType, shareLink, shareTitle, shareContent, iconUrl, callBack, shareConfigPT);
    } else {
        setShareConfigInfo(platform, version, shareId, shareType, shareLink, shareTitle, shareContent, iconUrl, callBack);
    }
});


export const goClient = () => {
    Tool.qidong(qidongUrl);
}

/**
 * 分享功能实现        无客服
 * @param platform
 * @param version
 * @param shareId
 * @param shareType
 * @param shareLink
 * @param shareTitle
 * @param shareContent
 * @param iconUrl
 * @param callBack
 * @param shareConfigPT
 */
export const setShareConfigInfo = (platform, version, shareId, shareType, shareLink, shareTitle, shareContent, iconUrl, callBack, shareConfigPT,refresh,logoType) => {


    // 判断当前页面是哪个页面
    /* if (window.location.href==getRootPath()+"/2018/06/test/mayno.html"){
         refresh=1; // 有值  就有刷新按钮
         logoType=''; // 有值  就有在线客服

     }*/
    refresh=1;

    if (!Tool.isNullOrUndefined(version)) {
        if (platform == "iphone") {  //\"refresh \":\""+refresh+"\"   "refresh":"1","logoType":"1"

            if(version > '6.2.0'){


                var jsonT = "{\"functionName\":\"setShareConfig\",\"obj\":{\"shareId\":\"" + shareId + "\",\"shareType\":\"" + shareType + "\",\"shareLink\":\"" + shareLink + "\",\"shareTitle\":\"" + shareTitle + "\",\"shareContent\":\"" + shareContent + "\",\"iconUrl\":\"" + iconUrl + "\",\"callBack\":\"" + callBack + "\",\"shareConfigPT\":\"" + shareConfigPT + "\"},\"refresh\":\"" + refresh + "\"}";//,\"logoType\":\"" + logoType + "\"



                // todo 设置编码格式
                var j=encodeURI(jsonT);

                var finalUrl = "hnmcc://" + j;
                window.location.href = finalUrl;
            }else{

                window.location.href = "hnmcc:$setShareConfig:$" + shareId + ":$" + shareType + ":$" + shareLink + ":$" + shareTitle + ":$" + shareContent + ":$" + iconUrl + ":$" + callBack + ":$" + shareConfigPT + "";

            }
        } else {
            if(version > '6.2.0'){

                var jsonT = "{\"functionName\":\"setShareConfig\",\"obj\":{\"shareId\":\"" + shareId + "\",\"shareType\":\"" + shareType + "\",\"shareLink\":\"" + shareLink + "\",\"shareTitle\":\"" + shareTitle + "\",\"shareContent\":\"" + shareContent + "\",\"iconUrl\":\"" + iconUrl + "\",\"callBack\":\"" + callBack + "\",\"shareConfigPT\":\"" + shareConfigPT + "\"},\"refresh\":\"" + refresh + "\"}";//,\"logoType\":\"" + logoType + "\"
                var finalUrl = "hnmcc://" + jsonT;
                window.location.href = finalUrl;

            }else {
                var jsonT = "{\"functionName\":\"setShareConfig\",\"obj\":{\"shareId\":\"" + shareId + "\",\"shareType\":\"" + shareType + "\",\"shareLink\":\"" + shareLink + "\",\"shareTitle\":\"" + shareTitle + "\",\"shareContent\":\"" + shareContent + "\",\"iconUrl\":\"" + iconUrl + "\",\"callBack\":\"" + callBack + "\",\"shareConfigPT\":\"" + shareConfigPT + "\"}}";
                var finalUrl = "hnmcc://" + jsonT;
                window.location.href = finalUrl;
            }

        }
    }

}


export const fxiang =() => {
    /*$(".popup-box").hide();*/

    try{
        if(!Tool.isNullOrUndefined(cid) && !Tool.isNullOrUndefined(city) && !Tool.isNullOrUndefined(mobile)){
            if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channel,'WT.nv','JFDHX','WT.event','JFDHX_FXTJ','WT.si_n','CB_JFDHX_FXTJ','WT.mobile',mobile,'WT.cid',cid,'WT.city',city,'WT.si_x','20');}
        }else if(Tool.isNullOrUndefined(cid) && Tool.isNullOrUndefined(city) && Tool.isNullOrUndefined(mobile)){
            if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channel,'WT.nv','JFDHX','WT.event','JFDHX_FXTJ','WT.si_n','CB_JFDHX_FXTJ','WT.si_x','20');}
        }else if(Tool.isNullOrUndefined(cid) && !Tool.isNullOrUndefined(city) && !Tool.isNullOrUndefined(mobile)){
            if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('DCS.dcsuri','/event.gif','WT.channel',channel,'WT.nv','JFDHX','WT.event','JFDHX_FXTJ','WT.si_n','CB_JFDHX_FXTJ','WT.mobile',mobile,'WT.city',city,'WT.si_x','20');}
        }
    }catch (e){

    }

    var ua = navigator.userAgent.toLowerCase();
    var group_appflag = (ua.match(/leadeon/i)=="leadeon");
    if(group_appflag){
        group_share();
        return false;
    }

    var random = Math.floor(Math.random()*20);
    //shareLink = domainHost+"/yearBill2018/" + random + ".do?special="+(billObjec?billObjec.special:"")+"&phone="+phone;

    if (Tool.isNullOrUndefined(Tool.getCookie("VersionName"))) {
        Tool.qidong(qidongUrl);
        return;
    }
    platform = judgePlatform();
    version = Tool.getCookie("VersionName");

    if (platform == "iphone") {
        window.location.href = "hnmcc:$jumpToShare:$" + shareId + ":$" + shareType + ":$" + shareLink + ":$" + shareTitle + ":$" + shareContent + ":$" + iconUrl + ":$" + callBack + ":$" + shareConfigPT + "";
    } else {
        jumpShare.jumpToShare(shareId, shareType, shareLink, shareTitle, shareContent, iconUrl, callBack, shareConfigPT);
    }

}

function closePop() {
    $(".pop-tips").hide();
    $(".popup-box").hide();
    return false;
}

//跳转优惠列表
export const youhuilist = () => {

    version = Tool.getCookie("VersionName");
    //适配app6.0版本
    if (version >= '5.2.4') {
        //安卓 版本
        if (platform == 'android') {
            if(version>='6.0'){//todo 跳转链接有变化
                //nativeHelper.toNative("HOTSALE|0","0");
                native.h5JumptoNative("HOTSALE|0");
            }else if (version >= '5.3') {
                nativeHelper.toNative("selectedIndex=2");
            } else {
                /*Tool.qidong(getRootPath() + "/yhcx/index.html");*/
                nativeHelper.toNative("com.xinhang.mobileclient.ui.activity.HomeActivity", "toMarket", "1");
            }
        } else if (platform == 'iphone') {
            if(version>='6.0'){//todo 跳转链接有变化
                iOSBridge.h5JumptoNativeByClassName('HOTSALE|0');
            }else if (version >= '5.3') {
                iOSBridge.h5JumptoNativeByClassName('selectedIndex=2');
            } else {
                window.location.href = getRootPath() + "/yhcx/index.html";
            }
        } else {
            window.location.href = getRootPath() + "/yhcx/index.html";
        }
    } else {
        window.location.href = getRootPath() + "/yhcx/index.html";
    }

}
export const redPaoerCenter = () => {
    if (!Tool.isNullOrUndefined(Tool.getCookie("VersionName"))) {
        window.location.href = getRootPath() + "/redpacketcenter/index.html";
    } else {
        Tool.qidong(ipHost+"/redpacketcenter/index.html");
    }
}


/**
 * 判断机型
 */
export const judgePlatform = () => {
    if (navigator.userAgent.match(/Android/i)) {
        return platform = "android";
    } else if ((navigator.userAgent.indexOf('iPhone') != -1)) {
        return platform = "iphone";
    } else {
        return platform = "other";
    }
}

//js获取项目根路径，如： http://localhost:8083/uimcardprj
function getRootPath() {
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
}


function closeLayer() {
    $(".popup-box").hide();
    return false;
}
