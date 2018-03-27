/**
 * Created by admin on 2017/8/28.
 */
/**
 * Created by wuzq on 2017/8/28
 * collect some common function in this file , to cut down functions in other html pages.
 * have a try!!
 */


/**
 * initPlayer
 * 初始化播放器
 * @paramaters iLeft iTop iWidth iHeight
 */
function initPlayer(iLeft, iTop, iWidth, iHeight) {
    try {
        g_mediaPlayer = new MediaPlayer();
        g_mediaPlayerInstanceId = g_mediaPlayer.getNativePlayerInstanceID(); //读取本地的媒体播放实例的标识
        var playListFlag = 0; //Media Player 的播放模式 0：单媒体的播放模 (默认: 播放列表的播放模
        var videoDisplayMode = 0; //MediaPlayer 对象对应的视频窗口的显示模式. 1: 全屏显示2: 按宽度显示，3: 按高度显

        if (-1 != navigator.userAgent.toLowerCase().indexOf('fhbw4.4')) { //FiberHome的盒子特殊处，居然需要除以2....
            iLeft = Math.floor(iLeft / 2);
            iTop = Math.floor(iTop / 2);
            iWidth = Math.floor(iWidth / 2);
            iHeight = Math.floor(iHeight / 2);
        } else if (-1 != navigator.userAgent.toLowerCase().indexOf('fhbw2.0')) { //的盒子

        } else if (-1 != navigator.userAgent.toLowerCase().indexOf('图案绘制完成')) { //九洲的盒子
            Log.info('识别出了传说中的UA=>图案绘制完成');
            //iWidth=400;
            //iHeight=300;
        }
        var left = iLeft;
        var top = iTop;
        var width = iWidth;
        var height = iHeight;

        var muteFlag = 0; //0: 设置为有声音(默认) 1:静音
        var useNativeUIFlag = 1; //设置播放器本地UI显示功能 0:允许 1：不允许
        var subtitleFlag = 0; //字幕显示
        var videoAlpha = 0; //视频的透明�
        var cycleFlag = 0;
        var randomFlag = 0;
        var autoDelFlag = 0;

        //初始话mediaplayer对象
        //g_mediaPlayer.initMediaPlayer(g_mediaPlayerInstanceId, playListFlag, videoDisplayMode,
        //	height, width, left, top, muteFlag, useNativeUIFlag, subtitleFlag, videoAlpha, cycleFlag, randomFlag, autoDelFlag);
        //
        //g_mediaPlayer.set
        g_mediaPlayer.setAllowTrickmodeFlag(0); //设置是否允许trick操作�0:允许 1：不允许
        g_mediaPlayer.setVideoDisplayMode(0);
        g_mediaPlayer.setVideoDisplayArea(left, top, width, height);
        g_mediaPlayer.setNativeUIFlag(0); //设置播放器本地UI显示功能 0:允许 1：不允许
        g_mediaPlayer.setAudioTrackUIFlag(1);
        g_mediaPlayer.setMuteUIFlag(1);
        g_mediaPlayer.setAudioVolumeUIFlag(1);
        g_mediaPlayer.setCycleFlag(1); //0:设置为循环播放（默认值）,1：设置为单次播放

        oResult = g_mediaPlayer.refreshVideoDisplay();
        Log.info("initMediaPlayer ...success...");
    } catch (err) {
        Log.error("MediaPlayer初始化错误：" + err);
    }
}
/**
 *销毁播放器
 *
 */
function destroyMediaPlayer() {
    try {
        if (g_mediaPlayer) {
            g_mediaPlayer.stop();
            g_mediaPlayer.releaseMediaPlayer(g_mediaPlayerInstanceId);
        }
    } catch (err) {
        Log.error("MediaPlayer销毁错误：" + err);
    }
}

/**
 *通用获取图片地址
 */
jsrender.views.converters('firstNotEmptyImage', function (val) {
    var strResult = '';

    if (val && val instanceof Array && val.length > 0) {
        for (var i = 0; i <= val.length; i++) {
            if (val[i] && true == val[i].enable) {
                strResult = val[i].fileURL || val[i].fileUrl;
                break;
            }
        }
    }
    //return val[0].fileURL;
    return strResult;

});
/**
 * 推荐位探针
 * @param strPromotionId 推荐位ID
 */
function promotionBIProbe(strPromotionId) {
    try {
        var aParams = [];
        var strPlatformAccount = getCookie("platformAccount");

        aParams.platformAccount = strPlatformAccount;

        //为了BI方便统计，做些变形
        var strBIURL = './NoPage/TopdrawPromotion?id=' + strPromotionId;

        aParams.url = strBIURL;

        var strArgs = '';
        for (var key in aParams) {
            if (strArgs != '') {
                strArgs += '&';
            }
            strArgs += (key + '=' + encodeURIComponent(aParams[key]));
        }
        strArgs += '&random=' + (Math.random()) * (Math.random()) * 1000;
        strArgs = strArgs.substr(0, strArgs.length - 1);
        var BI_PATH = BI_BASE_PATH.substr(0, BI_BASE_PATH.length - 1);
        ajax('GET', BI_PATH, null, strArgs, function (responseText) {
            Log.info("探针 Business::");
            //eval("forward('personalShow.html?cId=44')");
        }, function (responseText) {
            Log.info("探针 Communication::");
        });
        Log.warning(BI_BASE_PATH + strArgs);

    } catch (err) {
        Log.error("BI Probe Request Error..." + err);
    }
}

//获取收藏夹id
function setCookieCollection(fn){

    var favListId=getCookie('vFavListId');
    if(favListId==null||favListId==undefined||favListId==''){

        var strParametersType='view=json&token='+g_strToken;
        ajax(
            'GET',
            TOPDRAW_API_SERVER + 'User/GetDefaultCollection',
            null,
            strParametersType,
            function(resultData){
                var rsp=JSON.parse(resultData);
                if (rsp.businessCode == "success") { //第一次请求；
                    var favSongList = rsp.resultSet[0].id;
                    setCookie('vFavListId',favSongList); //存储收藏列表到cookie
                } else if (rsp.businessCode == "failure" && null != rsp.resultSet) {
                    var favSongList1 = rsp.resultSet[0].id;
                    setCookie('vFavListId',favSongList1); //存储收藏列表到cookie
                }
                if(typeof fn=="string"){
                    eval(fn);
                }else if(typeof fn=="function"){
                    fn();
                }
            },
            function(){

            }
        );
    }
}

