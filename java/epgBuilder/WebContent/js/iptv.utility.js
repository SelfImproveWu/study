//本文件依赖json2.js

var DEBUG_INFO_ELEMENT_ID = "topdraw_tv_debug_info";
var EC2106V1_PAGE_KEY="EC2106V1PageCookie";
var OPERATOR_PLATFORM= (getCookie("operatorPlatform"))?getCookie("operatorPlatform"):"zte" ;//取值为 zte|huawei

/**
 *  IPTV 2.2系列规范中对于遥控器键值
 */
var KEY = {
	//基本按键（键值范围0-0x007F，定义与键盘键值无冲突的基本功能和浏览器基本功能）
	KEY_BACK:0x0008,//返回/删除
	KEY_ENTER:0x000D,//确定
	
	KEY_UT_UP:0x001C,   //UT浏览器青语浏览器就是个渣
	KEY_UT_LEFT:0x001D,
	KEY_UT_RIGHT:0x001E,
	KEY_UT_DOWN:0x001F,
	
	
    KEY_VIRTUAL_PRESS:0x0300,//虚拟按键
	KEY_SPACEBAR:0x0020,//空格
	KEY_PAGE_UP:0x0021,//上页
	KEY_PAGE_DOWN:0x0022,//下页
	KEY_LEFT:0x0025,//左
	KEY_UP:0x0026,//上
	KEY_RIGHT:0x0027,//右
	KEY_DOWN:0x0028,//下
	KEY_0:0x0030,//0
	KEY_1:0x0031,//1
	KEY_2:0x0032,//2
	KEY_3:0x0033,//3
	KEY_4:0x0034,//4
	KEY_5:0x0035,//5
	KEY_6:0x0036,//6
	KEY_7:0x0037,//7
	KEY_8:0x0038,//8
	KEY_9:0x0039,//9
	KEY_A:0x0041,//A
	KEY_B:0x0042,//B
	KEY_C:0x0043,//C
	KEY_D:0x0044,//D
	KEY_E:0x0045,//E
	KEY_F:0x0046,//F
	KEY_G:0x0047,//G
	KEY_H:0x0048,//H
	KEY_I:0x0049,//I
	KEY_J:0x004A,//J
	KEY_K:0x004B,//K
	KEY_L:0x004C,//L
	KEY_M:0x004D,//M
	KEY_N:0x004E,//N
	KEY_O:0x004F,//O
	KEY_P:0x0050,//P
	KEY_Q:0x0051,//Q
	KEY_R:0x0052,//R
	KEY_S:0x0053,//S
	KEY_T:0x0054,//T
	KEY_U:0x0055,//U
	KEY_V:0x0056,//V
	KEY_W:0x0057,//W
	KEY_X:0x0058,//X
	KEY_Y:0x0059,//Y
	KEY_Z:0x005A,//Z
	KEY_POUND:0x0069,//#，输入法切换
	KEY_STAR:0x006A,//*
	KEY_F1:0X0070,//F1，导航（进入分组EPG首页）
	KEY_F2:0X0071,//F2，系统设置
	KEY_F3:0x0072,//F3
	KEY_F4:0x0073,//F4
	KEY_F5:0x0074,//F5
	KEY_F6:0x0075,//F6
	KEY_F7:0x0076,//F7
	KEY_F8:0x0077,//F8
	KEY_F9:0x0078,//F9
	KEY_F10:0x0079,//F10
	KEY_F11:0x007A,//F11
	KEY_F12:0x007B,//F12
	KEY_F13:0x007C,//F13
	KEY_F14:0x007D,//F14
	KEY_F15:0x007E,//F15
	KEY_F16:0x007F,//F16
		 
	//扩展按键（0x007F以上，扩展其他按键）
		 
	//增强的电视业务扩展按键（0x007F-0x00FF）
	KEY_TV_IPTV:0x0081,//切换电视、IPTV的遥控/显示模式
	KEY_TV_PC:0x0082,//切换电视、PC的遥控/显示模式
	KEY_SOURCE:0x0083,//切换输入源
	KEY_PIP:0x0084,//切换画中画功能

		 
	//IPTV业务基本操作功能按键（0x0100-0x010F）
	KEY_POWER:0x0100,//电源
	KEY_CHANNEL_UP:0x0101,//ch+，频道加
	KEY_CHANNEL_DOWN:0x0102,//ch-，频道减
	KEY_VOL_UP:0x0103,//Vol+，音量加
	KEY_VOL_DOWN:0x0104,//Vol-，音量减
	KEY_MUTE:0x0105,//Mute，静音
	KEY_TRACK:0x0106,//Audio Track，切换音轨
	KEY_PAUSE_PLAY:0x0107,//> ||，播放，暂停
	KEY_FAST_FORWARD:0x0108,// >> ，快进
	KEY_FAST_REWIND:0x0109,// << ，快退
	KEY_GO_END:0x010A,// >>||，快进到末尾
	KEY_GO_BEGINNING:0x010B,// ||<<，快退到开始
	KEY_INFO:0x010C,// KEY_INFO，信息，在媒体播放时按下显示节目信息
	KEY_INTERX:0x010D,// KEY_INTERX，互动，在媒体播放时按下进行互动操作
	KEY_STOP:0x010E,// 停止
	KEY_POS:0x010F,// 定位，在媒体播放时按下进行直接时间位置的定位
		 
	//IPTV业务导航功能按键（0x0110-0x0130）
	KEY_PORTAL:0x0110,//首页，进入首页
	KEY_RED:0x0113,//快捷键（红色），频道
	KEY_GREEN:0x0114,//快捷键（绿色），回看
	KEY_YELLOW:0x0115,//快捷键（黄色），点播
	KEY_BLUE:0x0116,//快捷键（蓝色），信息
	KEY_GREY:0x0117,//快捷键（灰色），应用
	KEY_SWITCH:0x0118,//频道快速回切键
	KEY_FAVORITE:0x0119,//进入收藏夹
	KEY_BOOKMARK:0x011A,//书签，增加书签
	KEY_CHANNEL_POS:0x011B,//-/--，频道位数切换
	KEY_HELP:0x011C//帮助
		 
	//虚拟事件按键（0x0300）
	//占未定义
}

var g_fnOnPageKeyDown = null;
var g_fnOnPageKeyUp = null;

//var g_aTestKeyCode = ['KEY_POUND','KEY_8','KEY_3','KEY_7','KEY_8','KEY_8','KEY_4','KEY_3','KEY_3','KEY_6'];//秘籍 可访问到 #testvideo
var g_aTestKeyCode = ['KEY_7','KEY_6','KEY_7','KEY_7','KEY_6'];//秘籍 可访问到 
var g_iTestKeyCodeCurrentIndex=0;

var g_aDebugKeyCode = [];//用于某些其他秘籍还没想好

var g_strFocusElementId = g_strFocusElementId || ""; //此变量需要赋值为初始值，定义在页面

var g_bIsEntrance = false;


//每个页面离开时记忆的上下文  页数，焦点位置等，将压到Cookie已备回退，回退地址不压入Cookie, 
/*
//Example
{
	pageContext:[{"somePageIndex":3,"focusId":"image_cell_0" },{"somePageIndex":3,"focusId":"image_cell_0" }],
	backStatus:true  //是否是回退状态 这个值目前废了	
}
*/
var g_oPageContext={};  

//String功能扩展
String.prototype.trim=function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim=function(){
    return this.replace(/(^\s*)/g,"");
}
String.prototype.rtrim=function(){
	return this.replace(/(\s*$)/g,"");
}


//获取CSS文件这里介绍两个方法针对不同浏览器
//1. obj.currentStyle
//2window.getComputedStyle
// Sample :  getCurrentCSS(element,"fontSize");
function getCurrentCSS(element,prop){
	//var obj = document.getElementById(id);
	if (element.currentStyle) {
		
		return element.currentStyle[prop];
	} else if (window.getComputedStyle) {
		//propprop = prop.replace(/([A-Z])/g, "-$1");
		//propprop = prop.toLowerCase();
		return document.defaultView.getComputedStyle(element, null)[prop];
		
	} else {//if (element.style) {
		//Log.info("3");
	}
	return null;
}


////////////日志相关 Start////////////

var Log = {};
Log.getElement = function () {

    var elDebugInfo = document.getElementById(DEBUG_INFO_ELEMENT_ID);

    if (!elDebugInfo) {
        elDebugInfo = document.createElement('div');
        elDebugInfo.id = DEBUG_INFO_ELEMENT_ID;
        elDebugInfo.setAttribute("style","position:absolute; top:0px;left:0px; width:100%;height:200px; color:#000000; font-size: 12px;z-index: 999; background-image: url('./image/000000_1x1a60.png'); word-wrap:break-word;word-break:break-all;display:none;");

        // "<div id='" + DEBUG_INFO_ELEMENT_ID + "' style='position: absolute; top: 0px;left: 0px; width: 100%;height: 200px; overflow-y: auto; color:#000000; font-size: 14px;z-index: 999; scrollbar-face-color: #ffffff; scrollbar-highlight-color: #ffffff; scrollbar-shadow-color: #919192; scrollbar-3dlight-color:#ffffff; scrollbar-arrow-color: #919192; scrollbar-track-color: #ffffff; scrollbar-darkshadow-color: #ffffff; border:0px solid #ffffff; background-image: url('../image/000000_1x1a60.png);'></div>");
        document.body.appendChild(elDebugInfo);

    }
    return elDebugInfo;
    /*
    #debug_info{ position: absolute; top: 0px;left: 0px; width: 100%;height: 200px;
    overflow-y: auto; color:#000000; font-size: 14px;z-index: 999;
    scrollbar-face-color: #ffffff;  
    scrollbar-highlight-color: #ffffff;
    scrollbar-shadow-color: #919192;  
    scrollbar-3dlight-color:#ffffff; 
    scrollbar-arrow-color: #919192; 
    scrollbar-track-color: #ffffff; 
    scrollbar-darkshadow-color: #ffffff; 
    border:0px solid #ffffff;
    background-image: url('../image/000000_1x1a60.png');*/
}


Log.info = function (strText) {
	if(0==GOD_MODE){return}
    var elDebugInfo = Log.getElement();
    if (elDebugInfo.innerHTML.length>=30000){
		elDebugInfo.innerHTML = "";
	}
	elDebugInfo.innerHTML += ("<div style=' position: relative;color:#00ff21;word-wrap:break-word;word-break:break-all;width:100%;float:left;'>INFO: " + strText + "</div>");
	
}

Log.warning = function (strText) {
	if(0==GOD_MODE){return}
	var elDebugInfo = Log.getElement();
	if (elDebugInfo.innerHTML.length>=30000){
		elDebugInfo.innerHTML = "";
	}
    elDebugInfo.innerHTML += ("<div style='position: relative;color:#ffd800;word-wrap:break-word;word-break:break-all;width:100%;float:left;z-index: 999;'>WARN: " + strText + "</div>");
}

Log.error = function (strText) {
	if(0==GOD_MODE){return}
    var elDebugInfo = Log.getElement();
	if (elDebugInfo.innerHTML.length>=30000){
		elDebugInfo.innerHTML = "";
	}
    elDebugInfo.innerHTML += ("<div style='position: relative;color:#fd5d5d;word-wrap:break-word;word-break:break-all;width:100%;float:left;z-index: 999;'>ERROR: " + strText + "</div>");
}

Log.clear = function () {
    var elDebugInfo = Log.getElement();
    elDebugInfo.innerHTML = "";
}


function WhereAmI() {
    
    var strUAInfo = "";
    
    strUAInfo = strUAInfo.concat("appName: ").concat(navigator.appName ? navigator.appName : "N/A").concat(" | ");
    strUAInfo = strUAInfo.concat("appVersion: ").concat(navigator.appVersion ? navigator.appVersion : "N/A").concat(" | ");
    strUAInfo = strUAInfo.concat("appCodeName: ").concat(navigator.appCodeName ? navigator.appCodeName : "N/A").concat("<br/>");
    
    strUAInfo = strUAInfo.concat( "userAgent: ").concat(navigator.userAgent ? navigator.userAgent : "N/A") .concat( " | ");
    strUAInfo = strUAInfo.concat( "platform: ").concat(navigator.platform ? navigator.platform : "N/A");
        
    return strUAInfo;
}

/////////日志相关 End

//var ajax = {}

/*
 * 创建XMLHttpRequest对象
 */
var ajax = function (strMethod, strURL, astrContentType, oDataOrPostBody, onSuccess, onError,oAdditionalData) {
    var xlr = null;
    if (window.XMLHttpRequest) {// code for IE7, Firefox, Opera, etc.
        xlr = new XMLHttpRequest(); //Log.info('XMLHttpRequest');
    } else if (window.ActiveXObject) {// code for IE6, IE5
        xlr = new ActiveXObject("Microsoft.XMLHTTP"); //Log.info('ActiveXObject');
    }
    
    if (!xlr) {
        Log.warning("Your browser does not support XMLHTTP, using iframe instead..");
        //退化到使用iframe                                              //这里两个函数名需要字符串输入
        iframeRequest(strMethod, strURL, astrContentType, oDataOrPostBody, onSuccess, onError, oAdditionalData)
        return;
    }

    function onStateChange() {
        if (xlr.readyState == 4) {// 4 = "loaded"
            if (xlr.status == 200) {// 200 = OK
                onSuccess(xlr.responseText,oAdditionalData);
                //alert(xlr.responseText);
            } else {
                onError(xlr.responseText,oAdditionalData);
                //alert("Problem retrieving XML data");
            }
            xlr=null;
        }
    }
    
    
 
    strMethod = strMethod.toUpperCase();
    var strDataOrPostBody = '';
    if (strMethod == "GET") {

        //以下这段可使用正则表达式改造
        if (oDataOrPostBody) {
            if (strURL.indexOf('?') > 0) { //有问号
                if (strURL.indexOf('=') > strURL.indexOf('?') //并且有等号在问号右边
                    && strURL.lastIndexOf('&') != strURL.length - 1) //最后一个不是&
                {
                    strURL = strURL.concat('&');
                } else { //光有问号没等号
                    alert("Unavailable Request URL!")
                    return;
                }
            } else {//没问号
                strURL = strURL.concat('?');
            }

            if (typeof oDataOrPostBody == "string") {
                strDataOrPostBody = oDataOrPostBody;
            } else if (oDataOrPostBody instanceof Object) {
                for (var key in oDataOrPostBody) {
                    strDataOrPostBody = strDataOrPostBody.concat(key).concat('=').concat(oDataOrPostBody[key]).concat('&');
                }
                strDataOrPostBody = strDataOrPostBody.substring(0, strDataOrPostBody.length - 1);
                //strDataOrPostBody.TrimEnd('&');
            } else {
                Log.info("Unavailable Parameters!");
                return
            }
        }

        strURL = strURL.concat(strDataOrPostBody);
    }

    xlr.onreadystatechange = onStateChange;
    xlr.open(strMethod, strURL, true);

    var isWWWFormURLEncoded = false;
    if (astrContentType) {
        for (var i = 0; i < astrContentType.length; i++) {
            xlr.setRequestHeader('Content-type', astrContentType[i]);
            if (astrContentType[i] == 'application/x-www-form-urlencoded') {
                isWWWFormURLEncoded = true;
				break;
            }
        }
    }
    //xlr.setRequestHeader('Connection', 'close');

    switch (strMethod) {
        case 'GET':
            xlr.send(null);
            break;
        case 'POST':
            if (isWWWFormURLEncoded) {

            }
            if (oDataOrPostBody) {
                /*
				if (isWWWFormURLEncoded) {
					var fd=new FormData();
					if (typeof oDataOrPostBody == "string") {
						strDataOrPostBody = oDataOrPostBody;
						
						var aParameters1=oDataOrPostBody.split('&');
						for (var i=0;i<aParameters1.length;i++){
							var aPairs1=aParameters1.split('=');
							if (aPairs1[0] && aPairs1[1]){
								fd.append(aPairs1[0],aPairs1[1]);
							}
						}
						
					} else if (oDataOrPostBody instanceof Object) {
						for (var key in oDataOrPostBody) {
							fd.append(key,oDataOrPostBody[key]);
						}
						//strDataOrPostBody.TrimEnd('&');
						//strDataOrPostBody = strDataOrPostBody.substring(0, strDataOrPostBody.length - 1);
					} else {
						console.log("Unavailable Parameters!");
						return
					}
					xlr.send(fd);
				}else{*/
					if (typeof oDataOrPostBody == "string") {
						strDataOrPostBody = oDataOrPostBody;
	
					} else if (oDataOrPostBody instanceof Object) {
						for (var key in oDataOrPostBody) {
								strDataOrPostBody = strDataOrPostBody.concat(key).concat('=').concat(oDataOrPostBody[key]).concat('&');
						}
						//strDataOrPostBody.TrimEnd('&');
						strDataOrPostBody = strDataOrPostBody.substring(0, strDataOrPostBody.length - 1);
					} else {
						Log.info("Unavailable Parameters!");
						return
					}
					xlr.send(strDataOrPostBody);
				//}
            } else {
                xlr.send(null);
            }

            break;
    }


}

//此函数未完成，但很少有机顶盒会进入
var iframeRequest = function (strMethod, strURL, astrContentType, oDataOrPostBody, strOnSuccess, strOnError, oAdditionalData) {

    var strRemotingIFrameId = "remoting_iframe";

    var elRemotingContainer = document.getElementById('remoting_div');
    if (!elRemotingContainer) {
        elRemotingContainer = document.createElement('div');
        elRemotingContainer.id = 'remoting_div';
        document.body.appendChild(elRemotingContainer);
    }
    


    var elRemotingIFrame = document.getElementById(strRemotingIFrameId);
    if (!elRemotingIFrame) {
        var style = 'border:0;width:0px;height:0px;'; //display还是不设置隐藏因为有些浏览器的关系。  
        elRemotingContainer.innerHTML = "<iframe width='0' height='0' name='" + strRemotingIFrameId + "' id='" + strRemotingIFrameId + "' style='" + style + "'></iframe>";
        elRemotingIFrame = document.getElementById(strRemotingIFrameId);
    }
    //elRemotingIFrame.

    strMethod = strMethod.toUpperCase();
    var elRemotingForm = null;
    var strDataOrPostBody = '';
    switch (strMethod) {
        case 'GET':
            if (oDataOrPostBody) {
                if (typeof oDataOrPostBody == "string") {
                    strDataOrPostBody = oDataOrPostBody;

                } else if (oDataOrPostBody instanceof Object) {
                    for (var key in oDataOrPostBody) {
                        strDataOrPostBody = strDataOrPostBody.concat(key).concat('=').concat(oDataOrPostBody[key]).concat('&');
                    }
                    //strDataOrPostBody.TrimEnd('&');
                    strDataOrPostBody = strDataOrPostBody.substring(0, strDataOrPostBody.length - 1);
                } else {
                    Log.info("iframeRequesst: Unavailable Parameters!");
                    return
                }
            }
			
			if (""==strDataOrPostBody){  //这里没改写完
				strDataOrPostBody=strDataOrPostBody.concat("inIFrame=1&").concat("onSuccess=").concat(strOnSuccess);
			}else{
				strDataOrPostBody=strDataOrPostBody.concat("&inIFrame=1&").concat("onSuccess=").concat(strOnSuccess);
			}

            elRemotingIFrame.src = strURL.concat('?').concat(strDataOrPostBody);
			
            break;
        case 'POST':
            elRemotingForm = document.getElementById('remoting_form');
            if (!elRemotingForm) {
                elRemotingContainer.form = document.createElement('form');

            }
            elRemotingContainer.form.setAttribute('id', 'remoting_form');
            elRemotingContainer.form.setAttribute('action', strURL);
            elRemotingContainer.form.setAttribute('target', strRemotingIFrameId);
            elRemotingContainer.form.target = strRemotingIFrameId;
            elRemotingContainer.form.setAttribute('method', strMethod.toLowerCase());

            //添加FormData参数 但是那个PostBody啥怎么办
            
            elRemotingContainer.form.innerHTML =""; 
                
            if (oDataOrPostBody instanceof Object) {
                for (var key in oDataOrPostBody) {
                    strDataOrPostBody = strDataOrPostBody.concat(key).concat('=').concat(oDataOrPostBody[key]).concat('&');
                    elRemotingContainer.form.innerHTML = "<input type='hidden' name='"+key+"' id='request_param_" + id + "' value='"+oDataOrPostBody[key]+"' />";
                }
                
            }
            elRemotingForm = document.getElementById('remoting_form');
            remotingDiv.form.submit();  

            break;
    }

}
//清洁backstautus
function cleanEPGURLBackStatus(strURL,bKeepReferURL){
    try{
        
        var aURLSegments=strURL.split("?");  //a=1&b=2
        if (!aURLSegments[1]){
            return strURL;
        }
        var aParameterSegments=aURLSegments[1].split("&");  // a=1
        var aRemainedParameterSegments=[];
        
        for(var i=0;i<=aParameterSegments.length-1;i++){
            var aParameterParts=aParameterSegments[i].split("=");
            //if key is special
            if (  aParameterParts[0]=="serverPath"
                || aParameterParts[0]=="partner"
                || aParameterParts[0]=="ossUserId"
                || aParameterParts[0]=="ossUserToken"
                || aParameterParts[0]=="token"
                //|| aParameterParts[0]=="appId"
                || aParameterParts[0]=="referURL"
                || aParameterParts[0]=="backStatus"//kanny
                )
            {
                if(bKeepReferURL && aParameterParts[0]=="referURL" ) {
                    aRemainedParameterSegments.push(aParameterSegments[i]);
                }
            }else{
                aRemainedParameterSegments.push(aParameterSegments[i]);
            }
        }
        
        
        var strResultURL=aURLSegments[0];
        if (aRemainedParameterSegments.length>0){
            strResultURL+="?";
        }
        for (var j=0;j<=aRemainedParameterSegments.length-1;j++){
            strResultURL+=( aRemainedParameterSegments[j] + ((j<aRemainedParameterSegments.length-1)?"&":"") );
            
        }
        return strResultURL;
    }catch(err){
        Log.error(err);
        return null;
    }
}
//清洁URL
function cleanEPGURL(strURL,bKeepReferURL){ 
	try{
		
		var aURLSegments=strURL.split("?");  //a=1&b=2
		if (!aURLSegments[1]){
			return strURL;
		}
		var aParameterSegments=aURLSegments[1].split("&");  // a=1
		var aRemainedParameterSegments=[];
		
		for(var i=0;i<=aParameterSegments.length-1;i++){
			var aParameterParts=aParameterSegments[i].split("=");
			//if key is special
			if (  aParameterParts[0]=="serverPath"
				|| aParameterParts[0]=="partner"
				|| aParameterParts[0]=="ossUserId"
                || aParameterParts[0]=="ossUserToken"
				|| aParameterParts[0]=="token"
				//|| aParameterParts[0]=="appId"
				|| aParameterParts[0]=="referURL"
				)
			{
				if(bKeepReferURL && aParameterParts[0]=="referURL" ) {
					aRemainedParameterSegments.push(aParameterSegments[i]);
				}
			}else{
				aRemainedParameterSegments.push(aParameterSegments[i]);
			}
		}
		
		
		var strResultURL=aURLSegments[0];
		if (aRemainedParameterSegments.length>0){
			strResultURL+="?";
		}
		for (var j=0;j<=aRemainedParameterSegments.length-1;j++){
			strResultURL+=( aRemainedParameterSegments[j] + ((j<aRemainedParameterSegments.length-1)?"&":"") );
			
		}
		return strResultURL;
	}catch(err){
		Log.error(err);
		return null;
	}
}
/*
function removeReferURL(){
	try{
		var aURLSegments=strURL.split("?");  //a=1&b=2
		if (!aURLSegments[1]){
			return strURL;
		}
		var aParameterSegments=aURLSegments[1].split("&");  // a=1
		var aRemainedParameterSegments=[];
		
		for(var i=0;i<=aParameterSegments.length-1;i++){
			var aParameterParts=aParameterSegments[i].split("=");
			//if key is special
			if (  aParameterParts[0]=="referURL"){

			}else{
				aRemainedParameterSegments.push(aParameterSegments[i]);
			}
		}
		var strResultURL=aURLSegments[0];
		if (aRemainedParameterSegments.length>0){
			strResultURL+="?";
		}
		for (var j=0;j<=aRemainedParameterSegments.length-1;j++){
			strResultURL+=( aRemainedParameterSegments[j] + ((j<aRemainedParameterSegments.length-1)?"&":"") );
		}
		return strResultURL;
	}catch(err){
		Log.error(err);
		return null;
	}
}*/


// //访问内部网页
function forward3(strForwardURL) {
	var strPrevPageURL=document.location.href;
	Log.info("Original:"+strPrevPageURL);
	var iFeatureIndex=strPrevPageURL.indexOf(OPERATION_PATH_FEATURE);
	Log.info("FeatureIndex:"+iFeatureIndex);
	if (-1!=iFeatureIndex){  //故障备机和性能备机的路径会和现网不同，特别注意
		strPrevPageURL=strPrevPageURL.substr(iFeatureIndex+OPERATION_PATH_FEATURE.length); //只取相对路径
	}
	Log.info("After Base Cut to Relative:"+strPrevPageURL);
	
	//strPrevPageURL 要去除杂七杂八的东西 防止失效的token 和 serverPath等串入
	strPrevPageURL=cleanEPGURL(strPrevPageURL,true);
	Log.info("After Clean:"+strPrevPageURL);
	
	
	if (-1==strForwardURL.indexOf('?')){ //没有问号
		strForwardURL=strForwardURL+"?referURL="+encodeURIComponent(strPrevPageURL);
	}else{
		strForwardURL=strForwardURL+"&referURL="+encodeURIComponent(strPrevPageURL);
	}
	
	
	//处理页面上下文 以便回退
	var strCookiePageContext=getCookie(TOPDRAW_PAGE_CONTEXT_KEY);
	var oCookiePageContext=null;
	if (!strCookiePageContext || strCookiePageContext==""){ 
		oCookiePageContext={ pageContext:[], backStatus:false };
	}else{
		oCookiePageContext=JSON.parse(strCookiePageContext);
	}
	
	var aPageContext=oCookiePageContext.pageContext;
	if (!g_oPageContext){
		g_oPageContext={};
	}
	g_oPageContext.focusId=g_strFocusElementId; //不管如何记录下光标焦点位置
	aPageContext.push(g_oPageContext);
	
	oCookiePageContext.pageContext=aPageContext;
	setCookie(TOPDRAW_PAGE_CONTEXT_KEY,JSON.stringify(oCookiePageContext));
	
    
	
	Log.info(strForwardURL);
    
	document.location = strForwardURL;
}
function forward(strForwardURL){//kanny backstatus作为参数加到地址后面
    var strPrevPageURL=document.location.href;
    //Log.info("Original:"+strPrevPageURL);
    var iFeatureIndex=strPrevPageURL.indexOf(OPERATION_PATH_FEATURE);
    //Log.info("FeatureIndex:"+iFeatureIndex);
    if (-1!=iFeatureIndex){  //故障备机和性能备机的路径会不同，特别注意
        strPrevPageURL=strPrevPageURL.substr(iFeatureIndex+OPERATION_PATH_FEATURE.length); //只取相对路径
    }
    //Log.info("After Base Cut to Relative:"+strPrevPageURL);
    
    //strPrevPageURL 要去除杂七杂八的东西 防止失效的token 和 serverPath等串入
    strPrevPageURL=cleanEPGURLBackStatus(strPrevPageURL,true);
    //Log.info("After Clean:"+strPrevPageURL);
    if(-1==strPrevPageURL.indexOf('?')){
        strPrevPageURL=strPrevPageURL+'?backStatus=1';
    }else{
        strPrevPageURL=strPrevPageURL+'&backStatus=1';
    }
    
    
    if (-1==strForwardURL.indexOf('?')){ //没有问号
        strForwardURL=strForwardURL+"?referURL="+encodeURIComponent(strPrevPageURL);
    }else{
        strForwardURL=strForwardURL+"&referURL="+encodeURIComponent(strPrevPageURL);
    }
    
    
    //处理页面上下文 以便回退
    var strCookiePageContext=getCookie(TOPDRAW_PAGE_CONTEXT_KEY);
    var oCookiePageContext=null;
    if (!strCookiePageContext || strCookiePageContext==""){ 
        oCookiePageContext={ pageContext:[],backStatus:false};
    }else{
        oCookiePageContext=JSON.parse(strCookiePageContext);
    }
    
    var aPageContext=oCookiePageContext.pageContext;
    if (!g_oPageContext){
        g_oPageContext={};
    }
    g_oPageContext.focusId=g_strFocusElementId; //不管如何记录下光标焦点位置
    aPageContext.push(g_oPageContext);
    
    oCookiePageContext.pageContext=aPageContext;
    setCookie(TOPDRAW_PAGE_CONTEXT_KEY,JSON.stringify(oCookiePageContext));
    
    
    
    //Log.info(strForwardURL);
    document.location=strForwardURL;
}

//新版Forward函数(尚未使用)
function forward2(strForwardURL,strBIKey,bDoGo) {
	
	var strPrevPageURL=document.location.href;
	Log.info("Original:"+strPrevPageURL);
	var iFeatureIndex=strPrevPageURL.indexOf(OPERATION_PATH_FEATURE);
	Log.info("FeatureIndex:"+iFeatureIndex);
	strPrevPageURL=strPrevPageURL.substr(iFeatureIndex+OPERATION_PATH_FEATURE.length); //只取相对路径
	Log.info("After Relative Cut:"+strPrevPageURL);
	
	//strPrevPageURL 要去除杂七杂八的东西 防止失效的token 和 serverPath等串入
	strPrevPageURL=cleanEPGURL(strPrevPageURL,true);
	Log.info("After Clean:"+strPrevPageURL);
	
	
	if (-1==strForwardURL.indexOf('?')){ //没有问号
		strForwardURL=strForwardURL+"?referURL="+encodeURIComponent(strPrevPageURL);
	}else{
		strForwardURL=strForwardURL+"&referURL="+encodeURIComponent(strPrevPageURL);
	}
	
	
	//处理页面上下文 以便回退
	var strCookiePageContext=getCookie(TOPDRAW_PAGE_CONTEXT_KEY);
	var oCookiePageContext=null
	if (!strCookiePageContext || strCookiePageContext==""){ 
		oCookiePageContext={ pageContext:[], backStatus:false };
	}else{
		oCookiePageContext=JSON.parse(strCookiePageContext);
	}
	
	var aPageContext=oCookiePageContext.pageContext;
	if (!g_oPageContext){
		g_oPageContext={};
	}
	g_oPageContext.focusId=g_strFocusElementId; //不管如何记录下光标焦点位置
	aPageContext.push(g_oPageContext);
	
	oCookiePageContext.pageContext=aPageContext;
	setCookie(TOPDRAW_PAGE_CONTEXT_KEY,JSON.stringify(oCookiePageContext));
	
	Log.info(strForwardURL);
	
	
	/* BI Temporary Probe START  */
	try{
		if (strBIKey && strBIKey!=''){
			var aParams=[];
			var strPlatformAccount=getCookie("platformAccount");
			
			aParams.platformAccount=strPlatformAccount;
			
			//为了BI方便统计，做些变形
			var strBIURL='/NoPage/TopdrawPromotionDispacher?key='+strBIKey;
			
			aParams.url=strBIURL;
					
			var strArgs = ''; 
			for(var key in aParams) {
				if(strArgs != '') {
					strArgs += '&';
				}   
				strArgs += (key + '=' + encodeURIComponent(aParams[key]));
			}  
		
			var img = new Image(1, 1); 
			img.src = BI_BASE_PATH + strArgs;
			img.style.display='none';
			
			Log.warning(BI_BASE_PATH + strArgs);
		}
	
	}catch(err){
		Log.error("BI Probe Request Error..."+err);
	}
			
	/* BI Temporary Probe END    */
    
	if (bDoGo){
		document.location = strForwardURL;
	}
	
}

//App之间互相跳转（当前环境）
function across(strDestURL,strDestAppId,bDoGo){
	
	across2Anywhere(strDestURL, strDestAppId, TOPDRAW_API_SERVER, bDoGo);
}
function across4SqdanceLuck(strDestURL,strDestAppId,strDestLoginBridge,getPath,bDoGo){
    var strServerPath=getCookie('serverPath');
    var strFirstBackURL='http://172.0.12.163/sparrow.silkworm/indexNew.html';//第一级广场舞返回
    var strSecondBackURL=getPath;//返回到封套
    var strSecondDestAppId='';
    var strThirdBackURL='';
    if((OPERATOR_PLATFORM.toLowerCase())=='huawei'){
        strSecondBackURL=strSecondBackURL+'Category.jsp';
    }else if((OPERATOR_PLATFORM.toLowerCase())=='zte'){
        strSecondBackURL=strSecondBackURL+'portal.jsp';
    }
    Log.warning('strSecondBackURL='+strSecondBackURL);
    //var =cleanEPGURL(document.location.href,false); //TODO:这里可能有点问题 是否要去掉地址中的referURL
   // var strReferURLNow=cleanEPGURL(decodeURIComponent(getQueryStringByName('referURL')),true);
    var strFirstDestAppId='tdc56a865b09f3f2a9';

    try{ 
         var strSecondReferURL=strServerPath + OPERATOR_PLATFORM  //返回音乐大厅第二级
            + 'AwayBridge.jsp?pageURL='+encodeURIComponent(strSecondBackURL) //back to here
            +'&referURL='+encodeURIComponent(strThirdBackURL?strThirdBackURL:"")  
            +'&appId='+(strSecondDestAppId?strSecondDestAppId:'')
            +'&loginBridge='+encodeURIComponent(strDestLoginBridge);



        var strFirstReferURL=strServerPath + OPERATOR_PLATFORM  //返回第一级
                + 'AwayBridge.jsp?pageURL='+encodeURIComponent(strFirstBackURL) //back to here
                +'&referURL='+encodeURIComponent(strSecondReferURL?strSecondReferURL:"")   
                +'&appId='+(strFirstDestAppId?strFirstDestAppId:'')
                +'&loginBridge='+encodeURIComponent(strDestLoginBridge);

       
        Log.info("referURL1:"+strSecondReferURL);
        var strAwayRequestParameters="pageURL="+encodeURIComponent(strDestURL)
                                        +"&referURL="+encodeURIComponent(strFirstReferURL)
                                        +"&appId="+(strDestAppId?strDestAppId:'')
                                        +"&loginBridge="+encodeURIComponent((strDestLoginBridge?strDestLoginBridge:''));
        var strLocation=null;
        if (strServerPath && strServerPath!=null){
            strLocation=strServerPath + OPERATOR_PLATFORM + 'AwayBridge.jsp?' + strAwayRequestParameters;
        }else{
            Log.error('ServerPath is not Available...');
        }
        Log.info(strLocation);
        if (bDoGo){
            document.location=strLocation;
        }
    }catch(err){
        Log.error('err....'+err);
    }

   
}
function across2Anywhere4Activity(strDestURL,strDestAppId,strDestLoginBridge,strBackURL,bDoGo){
    var strToReferURL='';
    var strServerPath=getCookie('serverPath');
    var strLocationNow=cleanEPGURL(strBackURL,false); //TODO:这里可能有点问题 是否要去掉地址中的referURL
    
    var aURLSegments=strBackURL.split('?');
    if (aURLSegments[1]){
	    var aParameterSegments=aURLSegments[1].split("&");
	    for(var i=0;i<=aParameterSegments.length-1;i++){
	        var aParameterParts=aParameterSegments[i].split("=");
	        if(aParameterParts[0]=="referURL"){
	    		strToReferURL= aParameterParts[1];
	        }
	    }
	}else{
		strToReferURL="";
	}

    var strReferURLNow=cleanEPGURL(decodeURIComponent(strToReferURL),true);
    
    //cross an app need reLogin from platform epg jsp
    //cross always go through servers, so full absolute path is needed.
    var strReferURL=strServerPath + OPERATOR_PLATFORM  //返回的时候从正式环境走
            + 'AwayBridge.jsp?pageURL='+encodeURIComponent(strLocationNow) //back to here
            +'&referURL='+encodeURIComponent(strReferURLNow?strReferURLNow:"")    //when back here, the referURL should equal the one in my query string now
            +'&appId='+SELF_APPID
            +'&loginBridge='+encodeURIComponent(TOPDRAW_API_SERVER);
    //Log.info("referURL1:"+strReferURLNow);
    var strAwayRequestParameters="pageURL="+encodeURIComponent(strDestURL)
                                    +"&referURL="+encodeURIComponent(strReferURL)
                                    +"&appId="+(strDestAppId?strDestAppId:'')
                                    +"&loginBridge="+encodeURIComponent((strDestLoginBridge?strDestLoginBridge:''));
    var strLocation=null;
    if (strServerPath && strServerPath!=null){
        strLocation=strServerPath + OPERATOR_PLATFORM + 'AwayBridge.jsp?' + strAwayRequestParameters;
    }else{
        Log.error('ServerPath is not Available...');
    }
    Log.info(strLocation);
    if (bDoGo){
        document.location=strLocation;
    } 
}


//App之间互相跳转（跨环境）
function across2Anywhere2(strDestURL,strDestAppId,strDestLoginBridge,bDoGo){
	var strServerPath=getCookie('serverPath');
	var strLocationNow=cleanEPGURL(document.location.href,false); //TODO:这里可能有点问题 是否要去掉地址中的referURL
	var strReferURLNow=cleanEPGURL(decodeURIComponent(getQueryStringByName('referURL')),true);
	
	//cross an app need reLogin from platform epg jsp
	//cross always go through servers, so full absolute path is needed.
	var strReferURL=strServerPath + OPERATOR_PLATFORM  //返回的时候从正式环境走
			+ 'AwayBridge.jsp?pageURL='+encodeURIComponent(strLocationNow) //back to here
	     		+'&referURL='+encodeURIComponent(strReferURLNow?strReferURLNow:"")    //when back here, the referURL should equal the one in my query string now
			+'&appId='+SELF_APPID
			+'&loginBridge='+encodeURIComponent(TOPDRAW_API_SERVER);
	//Log.info("referURL1:"+strReferURLNow);
	var strAwayRequestParameters="pageURL="+encodeURIComponent(strDestURL)
									+"&referURL="+encodeURIComponent(strReferURL)
									+"&appId="+(strDestAppId?strDestAppId:'')
									+"&loginBridge="+encodeURIComponent((strDestLoginBridge?strDestLoginBridge:''));
	var strLocation=null;
	if (strServerPath && strServerPath!=null){
		strLocation=strServerPath + OPERATOR_PLATFORM + 'AwayBridge.jsp?' + strAwayRequestParameters;
	}else{
		Log.error('ServerPath is not Available...');
	}
	Log.info(strLocation);
	if (bDoGo){
		document.location=strLocation;
	}
}
function across2Anywhere(strDestURL,strDestAppId,strDestLoginBridge,bDoGo){//kanny add backStatus

    try{
        var strServerPath=getCookie('serverPath');
        var strLocationNow=cleanEPGURLBackStatus(document.location.href,false); //TODO:这里可能有点问题 是否要去掉地址中的referURL
        var strReferURLNow=cleanEPGURL(decodeURIComponent(getQueryStringByName('referURL')),true);
        if(-1==strLocationNow.indexOf('?')){
            strLocationNow=strLocationNow+"?backStatus=1";
        }else{
            strLocationNow=strLocationNow+'&backStatus=1';
        }
        
        //cross an app need reLogin from platform epg jsp
        //cross always go through servers, so full absolute path is needed.
        var strReferURL=strServerPath + OPERATOR_PLATFORM  //返回的时候从正式环境走
                + 'AwayBridge.jsp?pageURL='+encodeURIComponent(strLocationNow) //back to here
                    +'&referURL='+encodeURIComponent(strReferURLNow?strReferURLNow:"")    //when back here, the referURL should equal the one in my query string now
                +'&appId='+SELF_APPID
                +'&loginBridge='+encodeURIComponent(TOPDRAW_API_SERVER);
        //Log.info("referURL1:"+strReferURLNow);
        var strAwayRequestParameters="pageURL="+encodeURIComponent(strDestURL)
                                        +"&referURL="+encodeURIComponent(strReferURL)
                                        +"&appId="+(strDestAppId?strDestAppId:'')
                                        +"&loginBridge="+encodeURIComponent((strDestLoginBridge?strDestLoginBridge:''));
        var strLocation=null;
        if (strServerPath && strServerPath!=null){
            strLocation=strServerPath + OPERATOR_PLATFORM + 'AwayBridge.jsp?' + strAwayRequestParameters;
        }else{
            Log.error('ServerPath is not Available...');
        }

                    //处理页面上下文 以便回退
        var strCookiePageContext=getCookie(TOPDRAW_PAGE_CONTEXT_KEY);
        var oCookiePageContext=null;
        if (!strCookiePageContext || strCookiePageContext==""){ 
            oCookiePageContext={ pageContext:[] };
        }else{
            oCookiePageContext=JSON.parse(strCookiePageContext);
        }
        
        var aPageContext=oCookiePageContext.pageContext;
        if (!g_oPageContext){
            g_oPageContext={};
        }
        g_oPageContext.focusId=g_strFocusElementId; //不管如何记录下光标焦点位置
        aPageContext.push(g_oPageContext);
        
        oCookiePageContext.pageContext=aPageContext;
        setCookie(TOPDRAW_PAGE_CONTEXT_KEY,JSON.stringify(oCookiePageContext));


        Log.info(strLocation);
        if (bDoGo){
            document.location=strLocation;
        }
    }catch(err){
        Log.error('across2anywhere err=='+err);
    }
    
}
//App之间互相跳转（当前环境）  通过传送门
function stride(strDestDir,strDestURL,strDestAppId,bDoGo){
	
	stride2Anywhere(strDestDir,strDestURL, strDestAppId, TOPDRAW_API_SERVER, bDoGo);
}

//App之间互相跳转（跨环境）  通过传送门
function stride2Anywhere(strDestDir,strDestURL,strDestAppId,strDestLoginBridge,bDoGo){//kanny 
	var strServerPath=getCookie('serverPath');
	var strLocationNow=cleanEPGURLBackStatus(document.location.href,false); //TODO:这里可能有点问题 是否要去掉地址中的referURL
	var strReferURLNow=cleanEPGURL(decodeURIComponent(getQueryStringByName('referURL')),true);
	
	//cross an app need reLogin from platform epg jsp
	//cross always go through servers, so full absolute path is needed.
	var strReferURL=strServerPath + OPERATOR_PLATFORM  //返回的时候从正式环境走
			+ 'AwayBridge.jsp?pageURL='+encodeURIComponent(TOPDRAW_EPG_SERVER+'gate.html?targetURL='+encodeURIComponent(strLocationNow+(strLocationNow.indexOf("?")==-1?"?":"&")+"backStatus=1")) //back to here
	     		+'&referURL='+encodeURIComponent(strReferURLNow?strReferURLNow:"")    //when back here, the referURL should equal the one in my query string now
			+'&appId='+SELF_APPID
			+'&loginBridge='+encodeURIComponent(TOPDRAW_API_SERVER);
	//Log.info("referURL1:"+strReferURLNow);
	var strAwayRequestParameters="pageURL="+encodeURIComponent(strDestDir+'gate.html?targetURL='+encodeURIComponent(strDestDir+strDestURL))
									+"&referURL="+encodeURIComponent(strReferURL)
									+"&appId="+(strDestAppId?strDestAppId:'')
									+"&loginBridge="+encodeURIComponent((strDestLoginBridge?strDestLoginBridge:''));
	
	var strLocation=null;
	if (strServerPath && strServerPath!=null){
		strLocation=strServerPath + OPERATOR_PLATFORM + 'AwayBridge.jsp?' + strAwayRequestParameters;
	}else{
		Log.error('ServerPath is not Available...');
	}
	
	//处理页面上下文 以便回退
	var strCookiePageContext=getCookie(TOPDRAW_PAGE_CONTEXT_KEY);
	var oCookiePageContext=null;
	if (!strCookiePageContext || strCookiePageContext==""){ 
		oCookiePageContext={ pageContext:[] };
	}else{
		oCookiePageContext=JSON.parse(strCookiePageContext);
	}
	
	var aPageContext=oCookiePageContext.pageContext;
	if (!g_oPageContext){
		g_oPageContext={};
	}
	g_oPageContext.focusId=g_strFocusElementId; //不管如何记录下光标焦点位置
	aPageContext.push(g_oPageContext);
	
	oCookiePageContext.pageContext=aPageContext;
	setCookie(TOPDRAW_PAGE_CONTEXT_KEY,JSON.stringify(oCookiePageContext));
	
	Log.info(strLocation);
	if (bDoGo){
		document.location=strLocation;
	}
}
function stride2OwnSubject(strSubjectId,strDestURL,bDoGo){
    stride2Subject(strSubjectId,strDestURL,SELF_APPID,bDoGo);
}
/*跳转到专题模板*/
function stride2OwnSubject(strSubjectId,strDestURL,bDoGo){
	stride2Subject(strSubjectId,strDestURL,SELF_APPID,bDoGo);
}
function stride2Subject(strSubjectId,strDestURL,strDestAppId,bDoGo){
	// 'http://172.0.12.159:9090/griffin.resource/
	stride2AnySubject(strSubjectId,strDestURL,strDestAppId,TOPDRAW_API_SERVER,bDoGo);
}



/*
* 第一个专题id[string]
 第二个目标专题页面名称[string]
 第三个专题所属应用[string]
 第四个是跳转地址环境[string]
 第五个是否跳转[boolean]
* */
//跳转到任意专题模板for Engineer  不包含Gate
function stride2AnySubject(strSubjectId,strDestURL,strDestAppId,strDestLoginBridge,bDoGo){
	var strPageURL=encodeURIComponent('index.html');
	if (null!=strDestURL){
		strPageURL=encodeURIComponent(strDestURL);
	}
	if(-1!=strDestLoginBridge.indexOf("sparrow.concert")){
		var strResourceURL=strDestLoginBridge.replace(/sparrow.concert/,"sparrow.resource");
	}else{
		var strResourceURL=strDestLoginBridge.replace(/griffin.cinema/,"griffin.resource");
	}
	var strDestURL2=strResourceURL+'upload/subject_template/default/gate.html?subjectId='+strSubjectId+'&pageURL='
						+strPageURL;
	//across2Anywhere(strDestURL2,strDestAppId,strDestLoginBridge,bDoGo);
	try{
        var strServerPath=getCookie('serverPath');
        var strLocationNow=cleanEPGURLBackStatus(document.location.href,false); //TODO:这里可能有点问题 是否要去掉地址中的referURL
        var strReferURLNow=cleanEPGURL(decodeURIComponent(getQueryStringByName('referURL')),true);
        var strBackURL=TOPDRAW_EPG_SERVER+'gate.html?targetURL='+encodeURIComponent(strLocationNow+(strLocationNow.indexOf("?")==-1?"?":"&")+"backStatus=1");
        /*if(-1==strLocationNow.indexOf('?')){
            strLocationNow=strLocationNow+"?backStatus=1";
        }else{
            strLocationNow=strLocationNow+'&backStatus=1';
        }*/
        
        //cross an app need reLogin from platform epg jsp
        //cross always go through servers, so full absolute path is needed.
        var strReferURL=strServerPath + OPERATOR_PLATFORM  //返回的时候从正式环境走
                + 'AwayBridge.jsp?pageURL='+encodeURIComponent(strBackURL) //back to here
                    +'&referURL='+encodeURIComponent(strReferURLNow?strReferURLNow:"")
                +'&appId='+SELF_APPID
                +'&loginBridge='+encodeURIComponent(TOPDRAW_API_SERVER);
        //Log.info("referURL1:"+strReferURLNow);
        var strAwayRequestParameters="pageURL="+encodeURIComponent(strDestURL2)
                                        +"&referURL="+encodeURIComponent(strReferURL)
                                        +"&appId="+(strDestAppId?strDestAppId:SELF_APPID)
                                        +"&loginBridge="+encodeURIComponent((strDestLoginBridge?strDestLoginBridge:''));
        var strLocation=null;
        if (strServerPath && strServerPath!=null){
            strLocation=strServerPath + OPERATOR_PLATFORM + 'AwayBridge.jsp?' + strAwayRequestParameters;
        }else{
            Log.error('ServerPath is not Available...');
        }

                    //处理页面上下文 以便回退
        var strCookiePageContext=getCookie(TOPDRAW_PAGE_CONTEXT_KEY);
        var oCookiePageContext=null;
        if (!strCookiePageContext || strCookiePageContext==""){ 
            oCookiePageContext={ pageContext:[] };
        }else{
            oCookiePageContext=JSON.parse(strCookiePageContext);
        }
        
        var aPageContext=oCookiePageContext.pageContext;
        if (!g_oPageContext){
            g_oPageContext={};
        }
        g_oPageContext.focusId=g_strFocusElementId; //不管如何记录下光标焦点位置
        aPageContext.push(g_oPageContext);
        
        oCookiePageContext.pageContext=aPageContext;
        setCookie(TOPDRAW_PAGE_CONTEXT_KEY,JSON.stringify(oCookiePageContext));


        Log.info(strLocation);
        if (bDoGo){
            document.location=strLocation;
        }
    }catch(err){
        Log.error('across2anywhere err=='+err);
    }

}
function stride2SubjectStupidly(strSubjectId,strDestURL,strDestAppId,strBackDirURL,strBackDestURL,bDoGo){
    stride2AnySubjectStupidly(strSubjectId,strDestURL,strDestAppId,TOPDRAW_API_SERVER,strBackDirURL,strBackDestURL,bDoGo);
}
function stride2AnySubjectStupidly(strSubjectId,strDestURL,strDestAppId,strDestLoginBridge,strBackDirURL,strBackDestURL,bDoGo){//返回到特定的首页
    var strPageURL=encodeURIComponent('index.html');
    if (null!=strDestURL){
        strPageURL=encodeURIComponent(strDestURL);
    }
    if(-1!=strDestLoginBridge.indexOf("sparrow.concert")){
        var strResourceURL=strDestLoginBridge.replace(/sparrow.concert/,"sparrow.resource");
    }else{
        var strResourceURL=strDestLoginBridge.replace(/griffin.cinema/,"griffin.resource");
    }
    var strDestURL2=strResourceURL+'upload/subject_template/default/gate.html?subjectId='+strSubjectId+'&pageURL='
                        +strPageURL;
    //across2Anywhere(strDestURL2,strDestAppId,strDestLoginBridge,bDoGo);
    try{
        var strServerPath=getCookie('serverPath');//保留referURL
        var strLocationNow=cleanEPGURLBackStatus(document.location.href,false); //TODO:这里可能有点问题 是否要去掉地址中的referURL
        var strReferURLNow=cleanEPGURL(decodeURIComponent(getQueryStringByName('referURL')),true);
        //var strBackURL=TOPDRAW_EPG_SERVER+'gate.html?targetURL='+strLocationNow+'&backStatus=1';
        //==================kanny start===========
        var strSecondBackURL=TOPDRAW_EPG_SERVER+'gate.html?targetURL='+encodeURIComponent(strLocationNow+(strLocationNow.indexOf("?")==-1?"?":"&")+'backStatus=1');
        var strFirstBackURL=strBackDirURL+'gate.html?targetURL='+encodeURIComponent(strBackDirURL+strBackDestURL);
        //===================kanny end============
        //cross an app need reLogin from platform epg jsp
        //cross always go through servers, so full absolute path is needed.
        var strSecondReferURL=strServerPath + OPERATOR_PLATFORM  //返回音乐大厅首页
                + 'AwayBridge.jsp?pageURL='+encodeURIComponent(strSecondBackURL) //back to here
                    +'&referURL='+encodeURIComponent(strReferURLNow?strReferURLNow:"")    //when back here, the referURL should equal the one in my query string now
                +'&appId='+SELF_APPID
                +'&loginBridge='+encodeURIComponent(TOPDRAW_API_SERVER);

        var strFirstReferURL=strServerPath + OPERATOR_PLATFORM  //返回模板首页
                + 'AwayBridge.jsp?pageURL='+encodeURIComponent(strFirstBackURL) //back to here
                    +'&referURL='+encodeURIComponent(strSecondReferURL?strSecondReferURL:"")    //when back here, the referURL should equal the one in my query string now
                +'&appId='+(strDestAppId?strDestAppId:'')
                +'&loginBridge='+encodeURIComponent(TOPDRAW_API_SERVER);
        //Log.info("referURL1:"+strReferURLNow);
        var strAwayRequestParameters="pageURL="+encodeURIComponent(strDestURL2)
                                        +"&referURL="+encodeURIComponent(strFirstReferURL)
                                        +"&appId="+(strDestAppId?strDestAppId:'')
                                        +"&loginBridge="+encodeURIComponent((strDestLoginBridge?strDestLoginBridge:''));
        var strLocation=null;
        if (strServerPath && strServerPath!=null){
            strLocation=strServerPath + OPERATOR_PLATFORM + 'AwayBridge.jsp?' + strAwayRequestParameters;
        }else{
            Log.error('ServerPath is not Available...');
        }

                    //处理页面上下文 以便回退
        var strCookiePageContext=getCookie(TOPDRAW_PAGE_CONTEXT_KEY);
        var oCookiePageContext=null;
        if (!strCookiePageContext || strCookiePageContext==""){ 
            oCookiePageContext={ pageContext:[] };
        }else{
            oCookiePageContext=JSON.parse(strCookiePageContext);
        }
        
        var aPageContext=oCookiePageContext.pageContext;
        if (!g_oPageContext){
            g_oPageContext={};
        }
        g_oPageContext.focusId=g_strFocusElementId; //不管如何记录下光标焦点位置
        aPageContext.push(g_oPageContext);
        
        oCookiePageContext.pageContext=aPageContext;
        setCookie(TOPDRAW_PAGE_CONTEXT_KEY,JSON.stringify(oCookiePageContext));


        Log.info(strLocation);
        if (bDoGo){
            document.location=strLocation;
        }
    }catch(err){
        Log.error('across2anywhere err=='+err);
    }
}



//访问EPG模板以外的地方
function away(strURL,strAppId,strLoginBridge,bDoGo){
	var strEPGInfoRequestParameters="pageURL="+encodeURIComponent(strURL)
						//+"&referURL="+encodeURIComponent(document.location.href)
						+"&referURL="+encodeURIComponent(getCookie("homePage"))
						+"&appId="+(strAppId?strAppId:'')
						+"&loginBridge="+(strLoginBridge?encodeURIComponent(strLoginBridge):'');
	
	//Log.info('./service/' + OPERATOR_PLATFORM + 'EPGInfoService.jsp?'+strEPGInfoRequestParameters);
	ajax('GET', './service/' + getCookie("operatorPlatform") + 'EPGInfoService.jsp', null, strEPGInfoRequestParameters,
		function(responseText){//success
			Log.info(responseText);
			try{
				var oJSONResult = JSON.parse(responseText);
					
				if (oJSONResult.businessCode == "success") {
					
					Log.info('Business: Get EPGInfo Success...');
					
					var strLocation=TOPDRAW_API_SERVER+"Platform/Login?view=json&info=" //+"8abcdefghijklm1nopqrstuvwxyz";
					
						//+oJSONResult.resultSet[0].epgInfo.substring(0,10);
					
						+"td_"+encodeURIComponent(oJSONResult.resultSet[0].epgInfo);
					
					Log.info(strLocation);
					
					if (bDoGo){
						document.location=strLocation;
					}	
						//+encodeURIComponent(oJSONResult.resultSet[0].epgInfo.substring(0,30));						
					
					//document.location="http://172.25.45.88:8080/Common/EPGLogin?view=json&epgInfo=AAAAAAAAAAAAAAAA";
					
					
				} else {
					Log.error('Business: Get EPGInfo Error...');
				}
			}catch(err){
				Log.error("Business: Get EPGInfo.." +err+" "+responseText);
			}
		}, 
		function(responseText){//error
			Log.error('Communication: GET EPGInfo Error...'+responseText);
		}
	);
}
function firstStride(strDestDir,strDestURL,strAppId,strLoginBridge,bDoGo){
    //gate.html?targetURL=strURL
    var strEPGInfoRequestParameters="pageURL="+encodeURIComponent(strDestDir+'gate.html?targetURL='+encodeURIComponent(strDestDir+strDestURL))
                        //+"&referURL="+encodeURIComponent(document.location.href)
                        +"&referURL="+encodeURIComponent(getCookie("homePage"))
                        +"&appId="+(strAppId?strAppId:'')
                        +"&loginBridge="+(strLoginBridge?encodeURIComponent(strLoginBridge):'');

    
    //Log.info('./service/' + OPERATOR_PLATFORM + 'EPGInfoService.jsp?'+strEPGInfoRequestParameters);
    ajax('GET', './service/' + getCookie("operatorPlatform") + 'EPGInfoService.jsp', null, strEPGInfoRequestParameters,
        function(responseText){//success
            Log.info(responseText);
            try{
                var oJSONResult = JSON.parse(responseText);
                    
                if (oJSONResult.businessCode == "success") {
                    
                    Log.info('Business: Get EPGInfo Success...');
                    
                    var strLocation=TOPDRAW_API_SERVER+"Platform/Login?view=json&info=" //+"8abcdefghijklm1nopqrstuvwxyz";
                    
                        //+oJSONResult.resultSet[0].epgInfo.substring(0,10);
                    
                        +"td_"+encodeURIComponent(oJSONResult.resultSet[0].epgInfo);
                    
                    Log.info(strLocation);
                    
                    if (bDoGo){
                        document.location=strLocation;
                    }   
                        //+encodeURIComponent(oJSONResult.resultSet[0].epgInfo.substring(0,30));                        
                    
                    //document.location="http://172.25.45.88:8080/Common/EPGLogin?view=json&epgInfo=AAAAAAAAAAAAAAAA";
                    
                    
                } else {
                    Log.error('Business: Get EPGInfo Error...');
                }
            }catch(err){
                Log.error("Business: Get EPGInfo.." +err+" "+responseText);
            }
        }, 
        function(responseText){//error
            Log.error('Communication: GET EPGInfo Error...'+responseText);
        }
    );
}



//访问EPG模板以外的地方
function across4Chen(strDestURL,strDestAppId,p,bDoGo){
	var strDestLoginBridge = TOPDRAW_API_SERVER;
	var strServerPath=getCookie('serverPath');
	var strLocationNow=cleanEPGURL(document.location.href,false);
	var strReferURLNow=cleanEPGURL(decodeURIComponent(getQueryStringByName('referURL')),true);
	
	var strReferURL=strServerPath + OPERATOR_PLATFORM
						+ 'AwayBridge.jsp?pageURL='+encodeURIComponent(strLocationNow)
	     				+'&referURL='+encodeURIComponent(strReferURLNow?strReferURLNow:"")
						+'&appId='+SELF_APPID
						+'&loginBridge='+encodeURIComponent(TOPDRAW_API_SERVER)
						+'&InitIndex='+p;

	var strAwayRequestParameters="pageURL="+encodeURIComponent(strDestURL)
									+"&referURL="+encodeURIComponent(strReferURL)
									+"&appId="+(strDestAppId?strDestAppId:'')
									+"&loginBridge="+encodeURIComponent((strDestLoginBridge?strDestLoginBridge:''));

	var strLocation=null;
	if (strServerPath && strServerPath!=null){
		strLocation=strServerPath + OPERATOR_PLATFORM + 'AwayBridge.jsp?' + strAwayRequestParameters;
	}else{
		Log.error('ServerPath is not Available...');
	}
	Log.info(strLocation);

	if (bDoGo){
		document.location=strLocation;
	}
}

//首次降临
function firstIn(strURL,strAppId,bIsTest,bDoGo){
	
	// 针对蓝光高清的问题
	var strHomePage=getCookie("homePage");
	var strURLNow=document.location.href;
	
	var strCombinedHomeURL="";
	
	var iFirstPosition=0;
	var iSecondPosition=0;
	 
	
	if ( 0!=strHomePage.indexOf("http://")){ //如果给出的是相对地址
		if ('zte'==getCookie("operatorPlatform")){
			iFirstPosition=strURLNow.indexOf("/iptvepg/frame")+13+1;
			iSecondPosition=strHomePage.indexOf("../frame")+7+1;
			strCombinedHomeURL=strURLNow.substring(0,iFirstPosition)+strHomePage.substring(iSecondPosition);
			
		}else if ('huawei'==getCookie("operatorPlatform")){
			
			iFirstPosition=strURLNow.indexOf("/EPG/jsp/")+8+1;
			iSecondPosition=strHomePage.indexOf("../../")+5+1;
			
			//document.getElementById("debug_info").innerHTML+=("<br/>[[["+strURLNow+"<br/>]]]"+strHomePage);
			
			strCombinedHomeURL=strURLNow.substring(0,iFirstPosition)+strHomePage.substring(iSecondPosition);
		}
	}else{
		strCombinedHomeURL=strHomePage;
	}
	
	//document.getElementById("debug_info").innerHTML+=("<br/><br/>&nbsp;CombinedHomeURL"+strCombinedHomeURL+"<br/><br/>");
	//return;
	Log.info('CombinedHomeURL:'+strCombinedHomeURL);
	
	var strEPGInfoRequestParameters="pageURL="+encodeURIComponent(strURL)
									+"&referURL="+encodeURIComponent(strCombinedHomeURL)
									+"&appId="+(strAppId?strAppId:'');
	
	//Log.info('./service/' + OPERATOR_PLATFORM + 'EPGInfoService.jsp?'+strEPGInfoRequestParameters);
	ajax('GET', './service/' + getCookie("operatorPlatform") + 'EPGInfoService.jsp', null, strEPGInfoRequestParameters,
		function(responseText){//success
			//Log.info(responseText);
			try{
				var oJSONResult = JSON.parse(responseText);
					
				if (oJSONResult.businessCode == "success") {
					
					Log.info('Business: Get EPGInfo Success...');
					//document.getElementById("debug_info").innerHTML+=("&nbsp;"+responseText+"<br/>");
					var strLocation="";
					if (bIsTest){
						//此处为阿里云代理地址
						strLocation="http://172.0.12.159:9090/sparrow.concert/Platform/Login?view=json&info=" 
							+"td_"+encodeURIComponent(oJSONResult.resultSet[0].epgInfo);
					}else{
						strLocation=TOPDRAW_API_SERVER+"Platform/Login?view=json&info=" 
							+"td_"+encodeURIComponent(oJSONResult.resultSet[0].epgInfo);
					}
					
					//document.getElementById("debug_info").innerHTML+=("<br/><br/>&nbsp;Location:"+strLocation+"<br/><br/>");
					Log.info(strLocation);
					if (bDoGo){
						//Log.warning("&nbsp;===>GoGoGo11");
						document.location=strLocation;
						//Log.warning("&nbsp;===>GoGoGo22");
					}	
						//+encodeURIComponent(oJSONResult.resultSet[0].epgInfo.substring(0,30));						
					
					//document.location="http://172.25.45.88:8080/Common/EPGLogin?view=json&epgInfo=AAAAAAAAAAAAAAAA";
					
					
				} else {
					Log.error('Business: Get EPGInfo Error...');
				}
			}catch(err){
				Log.error("Business: Get EPGInfo..." +err+" "+responseText);
			}
		}, 
		function(responseText){//error
			Log.error('Communication: away Errror...'+responseText);
		}
	);
}

//第一次访问EPG模板以外的地方
function firstIn2Easy(strURL,strAppId,strHomePage,bIsTest,bDoGo){
	
	// 针对蓝光高清的问题
	var strHomePage=strHomePage;
	var strURLNow=document.location.href;
	
	var strCombinedHomeURL="";
	
	var iFirstPosition=0;
	var iSecondPosition=0;
	 
	Log.info("HomePage:"+strHomePage);
	Log.info("URLNow:"+strURLNow);
	
	Log.info("op:"+getCookie("operatorPlatform"));
	
	if ( 0!=strHomePage.indexOf("http://")){ //如果给出的是相对地址
		if ('zte'==getCookie("operatorPlatform")){
			iFirstPosition=strURLNow.indexOf("/iptvepg/frame")+13+1;
			iSecondPosition=strHomePage.indexOf("../frame")+7+1;
			strCombinedHomeURL=strURLNow.substring(0,iFirstPosition)+strHomePage.substring(iSecondPosition);
			
		}else if ('huawei'==getCookie("operatorPlatform")){
			
			iFirstPosition=strURLNow.indexOf("/EPG/jsp/")+8+1;
			iSecondPosition=strHomePage.indexOf("../../")+5+1;
			
			//document.getElementById("debug_info").innerHTML+=("<br/>[[["+strURLNow+"<br/>]]]"+strHomePage);
			
			strCombinedHomeURL=strURLNow.substring(0,iFirstPosition)+strHomePage.substring(iSecondPosition);
		}
	}else{
		strCombinedHomeURL=strHomePage;
	}
	
	//document.getElementById("debug_info").innerHTML+=("<br/><br/>&nbsp;组合的HomeURL:"+strCombinedHomeURL+"<br/><br/>");
	//return;
	Log.info('CombinedHomeURL:'+strCombinedHomeURL);
	
	var strEPGInfoRequestParameters="pageURL="+encodeURIComponent(strURL)
									+"&referURL="+encodeURIComponent(strCombinedHomeURL)
									+"&appId="+(strAppId?strAppId:'');
	
	//Log.info('./service/' + OPERATOR_PLATFORM + 'EPGInfoService.jsp?'+strEPGInfoRequestParameters);
	ajax('GET', './service/' + getCookie("operatorPlatform") + 'EPGInfoService.jsp', null, strEPGInfoRequestParameters,
		function(responseText){//success
			//Log.info(responseText);
			try{
				var oJSONResult = JSON.parse(responseText);
					
				if (oJSONResult.businessCode == "success") {
					
					Log.info('Business: Get EPGInfo Success...');
					//document.getElementById("debug_info").innerHTML+=("&nbsp;"+responseText+"<br/>");
					var strLocation="";
					if (bIsTest){
						//此处为阿里云代理地址
						strLocation="http://172.0.12.159:9090/sparrow.concert/Platform/Login?view=json&info=" 
							+"td_"+encodeURIComponent(oJSONResult.resultSet[0].epgInfo);
					}else{
						strLocation=TOPDRAW_API_SERVER+"Platform/Login?view=json&info=" 
							+"td_"+encodeURIComponent(oJSONResult.resultSet[0].epgInfo);
					}
					
					//document.getElementById("debug_info").innerHTML+=("&nbsp;Redirect Location:"+strLocation+"<br/>");
					//Log.info(strLocation);
					if (bDoGo){
						//Log.warning("&nbsp;===>GoGoGo11");
						document.location=strLocation;
						//Log.warning("&nbsp;===>GoGoGo22");
					}
					
				} else {
					Log.error('Business: Get EPGInfo Error...');
				}
			}catch(err){
				Log.error("Business: Get EPGInfo..." +err+" "+responseText);
			}
		}, 
		function(responseText){//error
			Log.error('Communication: away Errror...'+responseText);
		}
	);
}


//专门用于封套推荐位的跳入
function landing(strURL,strAppId,strReferURLIn,bDoGo){
	//1.针对蓝光高清的问题 处理成绝对地址
	var strURLNow=document.location.href;
	var strCombinedReferURL="";
	
	var strReferURL=strReferURLIn;
	var iFirstPosition=0;
	var iSecondPosition=0;
	if ( 0!=strReferURL.indexOf("http://")){ //如果给出的是相对地址
		if ('zte'==getCookie("operatorPlatform")){
			iFirstPosition=strURLNow.indexOf("/iptvepg/frame")+13+1;
			iSecondPosition=strReferURL.indexOf("../frame")+7+1;
			strCombinedReferURL=strURLNow.substring(0,iFirstPosition)+strReferURL.substring(iSecondPosition);
		}else if ('huawei'==getCookie("operatorPlatform")){
			iFirstPosition=strURLNow.indexOf("/EPG/jsp/")+8+1;
			iSecondPosition=strReferURL.indexOf("../../")+5+1;
			//document.getElementById("debug_info").innerHTML+=("<br/>[[["+strURLNow+"<br/>]]]"+strHomePage);
			strCombinedReferURL=strURLNow.substring(0,iFirstPosition)+strReferURL.substring(iSecondPosition);
		}
	}else{
		strCombinedReferURL=strReferURL;
	}
	document.getElementById('debug_info').innerHTML+="strCombinedReferURL:"+strCombinedReferURL+"<br />";
	
	if(null==strReferURLIn){
		document.getElementById('debug_info').innerHTML+="strReferURLIn:"+strReferURLIn+"<br />";
		Log.error("strReferURLIn:"+strReferURLIn);
		return false;
	}
	
	var strAwayRequestParameters = "pageURL="+encodeURIComponent(strURL)
								+"&referURL="+encodeURIComponent(strCombinedReferURL)
								+"&appId="+(strAppId?strAppId:'')
								+'&loginBridge='+encodeURIComponent(TOPDRAW_API_SERVER);
	
	var strLocation="./" + OPERATOR_PLATFORM + 'AwayBridge.jsp?' + strAwayRequestParameters;
	document.getElementById('debug_info').innerHTML+="strLocation:"+strLocation+"<br />";

	if (bDoGo){
		window.location.href = strLocation;
	}else{
		document.getElementById('debug_info').innerHTML+="bDoGo:"+bDoGo+"<br />";
		document.getElementById('debug_info').innerHTML+="strLocation:"+strLocation+"<br />";
		Log.error("bDoGo:"+bDoGo);
	}
	
}
function promotionBIProbe(strPromotionId){
    try{
        var aParams=[];
        var strPlatformAccount=getCookie("platformAccount");
            
        aParams.platformAccount=strPlatformAccount;
            
        //为了BI方便统计，做些变形
        var strBIURL='./NoPage/TopdrawPromotion?id='+strPromotionId;
            
        aParams.url=strBIURL;
                    
        var strArgs = ''; 
        for(var key in aParams) {
            if(strArgs != '') {
                strArgs += '&';
            }   
            strArgs += (key + '=' + encodeURIComponent(aParams[key]));
        }
        strArgs+='&random='+(Math.random())*(Math.random())*1000;
        strArgs=strArgs.substr(0,strArgs.length-1);
        var BI_PATH=BI_BASE_PATH.substr(0,BI_BASE_PATH.length-1);  
        ajax('GET',BI_PATH,null,strArgs,function(responseText){
                Log.info("探针 Business::");
                //eval("forward('personalShow.html?cId=44')");
            },function(responseText){
                Log.info("探针 Communication::");
            });
        Log.warning(BI_BASE_PATH + strArgs);
    
    }catch(err){
        Log.error("BI Probe Request Error..."+err);
    }
}
function promotionBIProbe2(strPromotionId){
	/* BI Temporary Probe START  */
	try{
		var aParams=[];
		var strPlatformAccount=getCookie("platformAccount");
			
		aParams.platformAccount=strPlatformAccount;
			
		//为了BI方便统计，做些变形
		var strBIURL='./NoPage/TopdrawPromotion?id='+strPromotionId;
			
		aParams.url=strBIURL;
					
		var strArgs = ''; 
		for(var key in aParams) {
			if(strArgs != '') {
				strArgs += '&';
			}   
			strArgs += (key + '=' + encodeURIComponent(aParams[key]));
		}  
		
		var img = new Image(1, 1); 
		img.src = BI_BASE_PATH + strArgs;
		img.style.display='none';
			
		Log.warning(BI_BASE_PATH + strArgs);
	
	}catch(err){
		Log.error("BI Probe Request Error..."+err);
	}
	/* BI Temporary Probe END    */
}

function initEPGLoginParameters(){
	var strServerPath=decodeURIComponent(getQueryStringByName('serverPath'));
	var strPartner=getQueryStringByName('partner');
	//var strReferURL=getQueryStringByName('referURL');
	var strAPIToken=getQueryStringByName('token');
	
	
	
	Log.warning(strAPIToken);
	var strUserId=decodeURIComponent(getQueryStringByName('ossUserId'));
	
	//Log.info(strServerPath+','+strPartner+','+strAPIToken+','+strUserId);
	
	if (strAPIToken){
		setCookie('apiToken',strAPIToken);
	}
	if (strUserId){
		setCookie('userId',strUserId);
		setCookie('platformAccount',strUserId);
	}
	if (strPartner){
		OPERATOR_PLATFORM=strPartner; //有可能之前没拿到
		//setCookie('partner',strPartner);
		setCookie('operatorPlatform',strPartner);
		//Log.warning(strPartner);
	}
	if (strServerPath){
		setCookie('serverPath',strServerPath);
	}
}



    

//获得QueryString数据
function getQueryStringByName(name){
	var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
	if(result == null || result.length < 1){
	   return "";
	}
	return result[1];
}







function doesElementDisplay(elIn){
	var elTemp=elIn;
	do{
		//console.log(elTemp.id+":"+elTemp.tagName+":"+elTemp.style.display);
		if ("BODY"==elTemp.tagName){
			break;
		}
		if (   "none"==elTemp.style.display 
			|| "none"==getCurrentCSS(elTemp,"display")	
			|| "hidden"==elTemp.style.visibility 
			|| "hidden"==getCurrentCSS(elTemp,"visibility")
		){ 
			return false;
		}
	}while(elTemp=elTemp.parentNode)
	return true;
}

function removeElement(elIn){
	var elParent = elIn.parentNode;
	if(elParent){
		elParent.removeChild(elIn);  
	}
}

function removeAllChild(elIn){
	/*
    while(elIn.hasChildNodes()) {//当div下还存在子节点时 循环继续
    	Log.info("a");
    	elIn.removeChild(elIn.firstChild);
    }*/
   	
   	while (elIn.firstChild) {
    	var oldNode = elIn.removeChild(elIn.firstChild);
       	oldNode = null;
    }
}





//添加删除切换Element的Class
function hasClass(obj, cls) {  
	//Log.info(obj.className);
	//Log.info('ut_focus_style fdkdkd'.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))+'aaa');

    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
}  
  
function addClass(obj, cls) {  
    if (!this.hasClass(obj, cls)) {
		obj.className +=(" " + cls);
	}  
}  
  
function removeClass(obj, cls) {  
    if (hasClass(obj, cls)) {  
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
        obj.className = obj.className.replace(reg, ' ').trim();  
    }  
}  
function toggleClass(obj,cls){  
    if(hasClass(obj,cls)){  
        removeClass(obj, cls);  
    }else{  
        addClass(obj, cls);  
    }  
}  



//<<<<<<<<<<< Cookie 相关设置 (Start)>>>>>>>>>>>
/*
JS设置cookie:
假设在A页面中要保存变量username的值("jack")到cookie中,key值为name，则相应的JS代码为： 
document.cookie="name="+username;  

JS读取cookie:
假设cookie中存储的内容为：name=jack;password=123
 
则在B页面中获取变量username的值的JS代码如下：
var username=document.cookie.split(";")[0].split("=")[1];  
*/
function setCookie4EC2106V1(strName,strValue,expireDuration) {
	var strCookiePage=getCookie4EC2106V1();
	var oCookiePage=null;
	if (!strCookiePage){
		oCookiePage={};
	}else{
		oCookiePage=JSON.parse(strCookiePage);
	}
	oCookiePage[strName]=strValue;
	var iDuration=30*24*60*60*1000;
	if (expireDuration){
		iDuration=expireDuration;
	}
	var expireTime = new Date();
	expireTime.setTime(expireTime.getTime() + iDuration);
	strCookiePage=JSON.stringify(oCookiePage);
	var iCookiePageIndex=Math.ceil(strCookiePage.length/2000);
	document.cookie = EC2106V1_PAGE_KEY  + "="+iCookiePageIndex+ escape(strCookiePage.substr(0,2000-1)) + ";expires=" + expireTime.toGMTString();
	for(var i=1;i<iCookiePageIndex;i++){
		document.cookie = EC2106V1_PAGE_KEY+"_"+i  + "="+ escape(strCookiePage.substr(i*2000,2000)) + ";expires=" + expireTime.toGMTString();
	}

}
function getCookie4EC2106V1(strName){
	var arr,reg=new RegExp("(^| )"+EC2106V1_PAGE_KEY+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)){
		var strCookiePage_0=unescape(arr[2]);
	}else{
		return null;
	}
	var iCookiePageIndex=strCookiePage_0.substr(0,1);
	var strCookiePage=strCookiePage_0.substring(1);
	for(var i=1;i<iCookiePageIndex;i++){
		var arrTemp,regTemp=new RegExp("(^| )"+EC2106V1_PAGE_KEY+"_"+i+"=([^;]*)(;|$)");
		if(arrTemp=document.cookie.match(regTemp)){
			strCookiePage+=unescape(arrTemp[2]);
		}

	}
	if(strName){
		var oCookiePage=JSON.parse(strCookiePage);
		if(oCookiePage[strName]||0==oCookiePage[strName]){
			return oCookiePage[strName];
		}else{
			return null;
		}
		
	}else{
		return strCookiePage;
	}

}
function setCookie(strName,strValue,expireDuration) { 
    if (-1!=navigator.userAgent.indexOf('EC2106V')){
        setCookie4EC2106V1(strName,strValue,expireDuration);
        return;
    }


    var iDuration=30*24*60*60*1000;
    if (expireDuration){
		iDuration=expireDuration;
	}
	var expireTime = new Date(); 
    expireTime.setTime(expireTime.getTime() + iDuration); 
    document.cookie = strName + "="+ escape(strValue) + ";expires=" + expireTime.toGMTString(); 
    //Log.warning('utility setCookie');
} 


//读取cookies 
function getCookie(strName){ 
    if (-1!=navigator.userAgent.indexOf('EC2106V')){
        var strCookieValue=getCookie4EC2106V1(strName);
        return strCookieValue;
    } 
    var arr,reg=new RegExp("(^| )"+strName+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg)){
    	return unescape(arr[2]); 
    }else{ 
        return null; 
    }
} 

//删除cookies 
function delCookie(strName){ 
    var expireTime = new Date(); 
    expireTime.setTime(expireTime.getTime() - 1); 
    var strValue=getCookie(strName); 
    if(strValue!=null) {
        document.cookie= strName + "="+strValue+";expires="+expireTime.toGMTString(); 
	}
} 
//使用示例 
//setCookie("name","hayden"); 
//alert(getCookie("name")); 




//<<<<<<<<<<< Cookie 相关设置 (End)>>>>>>>>>>>



/**
 * 返回上一页
 */
function backAPage() {
    Log.info("back:"+decodeURIComponent(getQueryStringByName("referURL")));
	
	//处理页面上下文
	if (!g_bIsEntrance){
		var strCookiePageContext=getCookie(TOPDRAW_PAGE_CONTEXT_KEY);
		var oCookiePageContext=null;
		if (!strCookiePageContext || strCookiePageContext==""){ 
			oCookiePageContext={ pageContext:[], backStatus:false };
		}else{
			oCookiePageContext=JSON.parse(strCookiePageContext);
		}
		oCookiePageContext.backStatus=true;
		setCookie(TOPDRAW_PAGE_CONTEXT_KEY,JSON.stringify(oCookiePageContext));
		
	}else{
		oCookiePageContext={ pageContext:[], backStatus:false };
		setCookie(TOPDRAW_PAGE_CONTEXT_KEY,JSON.stringify(oCookiePageContext));
	}
	//Log.info('referURL------'+decodeURIComponent(getQueryStringByName("referURL")))
	window.location.href = decodeURIComponent(getQueryStringByName("referURL"));
}





function getInputBoxCursorPosition (ctrl) {
    var CaretPos = 0;   
    if (document.selection) {// IE Support
		ctrl.focus ();
        var Sel = document.selection.createRange ();
        Sel.moveStart ('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    }else if (ctrl.selectionStart || ctrl.selectionStart == '0'){ // Firefox support
        CaretPos = ctrl.selectionStart;
	}
    return (CaretPos);
}

function setInputBoxCursorPosition(ctrl, pos){
    if(ctrl.setSelectionRange){
        ctrl.focus();
        ctrl.setSelectionRange(pos,pos);
    }else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

function showObjProperty(obj){ 
	var strPropertyList='<br/>'; 
	var iPropertyCount=0; 
	var j=0;
	for(var key in obj){ 
		if(Object.prototype.toString.call(obj[key]) === "[object Function]" ) {
			/*
			var strVars="";
			for (var inkey in obj[key]){
				strVars+=(obj[key]+"=>"+obj[key][inkey] );
			}*/
			strPropertyList=strPropertyList+'方法:'+key /*+'='+obj[key]+'&nbsp;&nbsp;&nbsp;形参数('*/+'(' +obj[key].length/*+':'+strVars*/+ ') ### ';
		}else{ 
			strPropertyList=strPropertyList+'属性:'+key+'='+obj[key]+' ### '; 
		}
		if (j % 6 ==5){ strPropertyList= strPropertyList+ "<br/>"}
		j++;
	} 
	return strPropertyList; 
} 

function formatTimeStamp(iInSeconds) {
	var iHour = Math.floor(iInSeconds / 3600);
	var iMinute = Math.floor((iInSeconds - iHour * 3600) / 60);
	var iSecond = iInSeconds - iHour * 3600 - iMinute* 60;
	
	var strHour=((iHour<10)?'0':'')+iHour;
	var strMinute=((iMinute<10)?'0':'')+iMinute;
	var strSecond=((iSecond<10)?'0':'')+iSecond;
	
	return strHour + ":" + strMinute + ":" + strSecond;
}

//初始化页面键盘处理程序
function initPageKey(fnOnPageKeyDown,fnOnPageKeyUp){
	if (fnOnPageKeyDown){
		g_fnOnPageKeyDown = fnOnPageKeyDown;
	}
	if (fnOnPageKeyUp){
		g_fnOnPageKeyUp = fnOnPageKeyUp;
	}
}

function setGlobalVolume(iVolume){
	setCookie("GlobalVolume",iVolume.toString()); 
	Log.info("设置全局音量:"+iVolume);
}

function getGlobalVolume(){
	var strGlobalVolume=getCookie("GlobalVolume");
	Log.info("获取全局音量:"+strGlobalVolume);
	return parseInt(strGlobalVolume?strGlobalVolume:"-1" ); 
}



function onKeyDown(e) {
	e = e ? e : window.event;
	var keyCode = e.which ? e.which : e.keyCode;
	
	//var keyCode = e.which;
    //if (!keyCode) keyCode = e.keyCode;
	
	    
	if (g_fnOnPageKeyDown) { 
	
		var bIsContinueBubbling=g_fnOnPageKeyDown(e); 
		
		if  (!bIsContinueBubbling) {return;}
	}
	
	//Log.info(ShowObjProperty(event));
	
	//Log.info(keyCode.toString()+":KeyDown");
	
	//任何一个页面都可以跳到秘籍
	//g_aTestKeyCode = ['KEY_POUND','KEY_8','KEY_8','KEY_8','KEY_8','KEY_9'];//秘籍 可访问到 #testvideo
	//g_iTestKeyCodeLength = 6;
	//g_iTestKeyCodeCurrentIndex
	
	if (keyCode== KEY[g_aTestKeyCode[g_iTestKeyCodeCurrentIndex]]){
		if (g_iTestKeyCodeCurrentIndex>=g_aTestKeyCode.length-1){//激活秘籍
			//forward('./index.html');
			GOD_MODE=parseInt(getCookie("god_mode"));
			Log.info("GodMode is read from cookie:"+GOD_MODE);
			GOD_MODE=((GOD_MODE==1)?0:1);
			setCookie("god_mode",GOD_MODE);
			Log.info("GodMode is Set to:"+GOD_MODE);
			g_iTestKeyCodeCurrentIndex=0;
		}else{//继续秘籍
			g_iTestKeyCodeCurrentIndex++;
		}
		
	}else{//放弃秘籍
		g_iTestKeyCodeCurrentIndex=0;
	}
	
	
    if(keyCode == KEY["KEY_ENTER"] || keyCode == KEY["KEY_OK"]){
        //TODO:tvlink 跳转和AJAX类型
		var elCurrentFocus=document.getElementById(g_strFocusElementId);
		var strTVLink="";
		if (elCurrentFocus){
			strTVLink=elCurrentFocus.getAttribute("tvlink"); 
			//if (';'==strTVLink.charAt(strTVLink.length - 1)){
			//	strTVLink=strTVLink.substr(0,strTVLink.length - 1);
			//}
			
			if (strTVLink && strTVLink !=''){
				eval(strTVLink);
			}else{
				Log.warning(elCurrentFocus.id+': tvlink=null');
			}
		}
    }
    if(keyCode == KEY["KEY_2"]){
    	Log.getElement();
	if(0==GOD_MODE){return;}
        if (DEBUG_INFO_ELEMENT_ID){
            var elDebugInfo=document.getElementById(DEBUG_INFO_ELEMENT_ID);
            if (elDebugInfo) {
                if (elDebugInfo.style.display=="none"){
                    elDebugInfo.style.display = "block";
                }else{
                    elDebugInfo.style.display = "none";
                }
            }
        }
        
    }
    if(keyCode == KEY["KEY_0"]){
        //Log.info("Press KEY_0");
		if(1 == GOD_MODE){
            location.reload();
        }
    }
    if(keyCode == KEY["KEY_1"]){
        Log.warning(WhereAmI());
    }
	
    if(keyCode == KEY["KEY_3"]){
        
    }
    if(keyCode == KEY["KEY_8"]){
        
    }
    if(keyCode == KEY["KEY_9"]){
        Log.clear();
    }
    if(keyCode == KEY["KEY_BACK"]){
    	if (0==g_iFocusStatus) {
    		backAPage();
        }
    }

    //页面自定义的处理情况
    /* //下面注释掉的这些部分，每个页面处理情况不一样所以放到叶面里去实现
    if(keyCode == KEY["KEY_LEFT"]){
        //Log.info("Press KEY_LEFT");
        moveFocus(g_aFocusTargets,"left",g_fScaleFactor,0);
    }
    if(keyCode == KEY["KEY_RIGHT"]){
        //Log.info("Press KEY_RIGHT");
        moveFocus(g_aFocusTargets,"right",g_fScaleFactor,0);
    }
    if(keyCode == KEY["KEY_UP"]){
        //Log.info("Press KEY_UP");
        moveFocus(g_aFocusTargets,"up",g_fScaleFactor,0);
    }
    if(keyCode == KEY["KEY_DOWN"]){
        //Log.info("Press KEY_DOWN");
        moveFocus(g_aFocusTargets,"down",g_fScaleFactor,0);
    }*/
    
   
}

function onKeyUp(e) {
    e = e ? e : window.event;
	var keyCode = e.which ? e.which : e.keyCode;
	
	//var keyCode = e.which;
    //if (!keyCode) keyCode = e.keyCode;
	
    
    if (g_fnOnPageKeyUp) {
		var bIsContinueBubbling= g_fnOnPageKeyUp(e); 
		if  (!bIsContinueBubbling) {return;}
	}
   	//Log.info(ShowObjProperty(event));
	//Log.info(keyCode.toString()+":keyUp");
	
    /*
    if(keyCode == KEY["KEY_ENTER"]){
      
    }
    if(keyCode == KEY["KEY_LEFT"]){
        
    }
	if(keyCode == KEY["KEY_RIGHT"]){
        
    }*/

}

