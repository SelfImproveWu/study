//此文件需要依赖iptv.utility

var TOPDRAW_CONCERT_PLAYLIST_KEY = "ConcertPlayList";
var MC_PLAY_LIST_KEY = "MCPlayList";
var MC_HIS_LIST_KEY = "MCHistoryList";
var MC_FAV_LIST_KEY = "MCFavoritePlayList";
var MC_PLAY_MIEDIE = "MCPlaylistMideo";
var MC_PLAY_TIME = "MCPlayTime";
var MC_PARTNER_PATH = "MCPartnerPath";
var MC_TOKEN = "MCToken";
var MC_DIANGETAI="MCDiangetai";
var MC_FIRST_USER="MCFirstUser";
var MC_COUNT="MCSingerPage";
var MC_PIN_YIN = "MCPinyin";
var MC_SONG_PAGE= "MCSongPage";
var MC_SINGER_PAGE= "MCSingPage";
//在先播放列表格结构大致如下，保存于Cookie
/*
var arrPlayListSample=[
	{"pId":"1100221","cId":"10233","name":"歌曲名1","artist":"演唱者1","mediacode" :"30000001000000010000000003536657"},
	{"pId":"1100222","cId":"10234","name":"歌曲名2","artist":"演唱者2","mediacode" :"30000001000000010000000003536657" },
	{"pId":"1100223","cId":"10235","name":"歌曲名3","artist":"演唱者3","mediacode" :"30000001000000010000000003536657" },
	{"pId":"1100224","cId":"10236","name":"歌曲名4","artist":"演唱者4","mediacode" :"30000001000000010000000003536657" },
	{"pId":"1100225","cId":"10237","name":"歌曲名5","artist":"演唱者5","mediacode" :"30000001000000010000000003536657" },
	{"pId":"1100226","cId":"10238","name":"歌曲名6","artist":"演唱者6","mediacode" :"30000001000000010000000003536657" },
	{"pId":"1100227","cId":"10239","name":"歌曲名7","artist":"演唱者7","mediacode" :"30000001000000010000000003536657" },
	{"pId":"1100228","cId":"10240","name":"歌曲名8","artist":"演唱者8","mediacode" :"30000001000000010000000003536657" },
	{"pId":"1100229","cId":"10241","name":"歌曲名9","artist":"演唱者9","mediacode" :"30000001000000010000000003536657" },
];*/

/**
 * 添加歌曲到播放列表
 * @param pId  歌曲pId 产品代码
 * @param cId  歌曲cId 渠道代码
 * @param strName 歌曲名称
 * @param strArtist  歌手名
 * @param mediacode mediacode
 * @returns {number}
 */

function addASong5PlayList(pId, cId, strName, strArtist, mediacode){
    try {
        if(pId==null||pId=='undefined'||pId==''||pId==0){
            return
        }else {
            if (mediacode == '' || mediacode == 'undefined' || mediacode == null) {mediacode = MC_MEDIA_CODE;};
            if (strName == '' || strName == 'undefined' || strName == null) {strName = '未知'};
            if (strArtist == '' || strArtist == 'undefined' || strArtist == null) {strName = '未知'};
            var arrPlayList = [];
            var strPlayList = getCookie(MC_PLAY_LIST_KEY);
            var iIndexInList = -1;
            if (strPlayList != 'undefined' && strPlayList != null && strPlayList != '') {
                arrPlayList = JSON.parse(strPlayList);

                for (var i = 0; i < arrPlayList.length; i++) {
                    if (arrPlayList[i].pId == pId) {
                        arrPlayList[i].pId = pId;
                        arrPlayList[i].cId = cId;
                        arrPlayList[i].name = strName;
                        arrPlayList[i].artist = strArtist;
                        arrPlayList[i].mediacode = mediacode;
                        iIndexInList = i;
                        break;
                    }
                }
            }
            if (iIndexInList == -1) { //没找到
                var oSong = {
                    "pId": pId,
                    "cId": cId,
                    "name": strName,
                    "artist": strArtist,
                    "mediacode": mediacode
                };
                arrPlayList.push(oSong);
            }
            strPlayList = JSON.stringify(arrPlayList);
            setCookie(MC_PLAY_LIST_KEY, strPlayList);
        }
    } catch (err) {
        return -1;
    }
}


function EpgTip(info,time,id,timer){//内容  id   显示时间
    if(!info)return;
    time = time||3;

    if(!id){
        var dom=document.createElement('div');
        dom.id='tip_css';
        id='tip_css';
        document.body.appendChild(dom)
    }
    document.getElementById(id).innerHTML=info;
    document.getElementById(id).setAttribute('style','position: absolute;  left: 340px;  top: 280px;  width: 600px;  height: 70px;line-height: 70px;  background: rgba(0, 0, 0, 0.71);  border-radius: 10px;  text-align: center;font-size: 36px;  color: yellow;  border: solid 2px yellow;  margin: auto;  z-index: 333;  overflow: hidden;')   ;
    document.getElementById(id).style.display='block';
    if (timer)clearTimeout(timer);//如果上次执行过setTimeout，那么强行停止
    timer = setTimeout(function(){
        document.getElementById(id).style.display='none';
    }, time * 1000); //修改tip时间

}

function addASong2PlayList(songId, index) {
    var urlData='view=json&token='+g_strToken+'&songIds='+songId;
    ajax(
        'GET',
        TOPDRAW_API_SERVER + 'User/AddPlaylistItem',
        null,
        urlData,
        function(resultData){
            //Epg.Tip('添加成功')

        },
        function(){
            //EpgTip('请求数据失败，请稍后再试！');
        }
    );
}

//小屏幕添加歌曲






/**
 * 插入歌曲到播放列表最前面 unshift()
 * @param pId  歌曲pId 产品代码
 * @param cId  歌曲cId 渠道代码
 * @param strName 歌曲名称
 * @param strArtist  歌手名
 * @param mediacode mediacode
 * @returns {number}
 */
function moveFirstSong() {
    var strPlayList = getCookie(MC_PLAY_LIST_KEY);
    var arrPlayList;
    if (strPlayList != 'undefined' && strPlayList != null && strPlayList != '') {
        arrPlayList = JSON.parse(strPlayList);
    }
    arrPlayList.splice(0, 1);
    var strList = JSON.stringify(arrPlayList);
    setCookie(MC_PLAY_LIST_KEY, strList);
}

g_strToken=getCookie('apiToken');
/**
 * 添加到播放列表头，并跳转播放 *
 * @param songId 歌曲ID
 * return： 跳转地址：vPlayerFullScreen.html
 */
function insertASong2PlayList(songId) {//添加播放
    var urlData='view=json&token='+g_strToken+'&songIds='+songId;
    ajax(
        'GET',
        TOPDRAW_API_SERVER + 'User/AddPlaylistItem',
        null,
        urlData,
        function(resultData){
            var dataURL='view=json&songId='+songId+'&index=0&token='+g_strToken;
            ajax(
                'GET',
                TOPDRAW_API_SERVER + 'User/TopPlaylistItem',
                null,
                dataURL,
                function (responseText) {
                    try{
                        var oJsonObject = JSON.parse(responseText);
                        if("success" == oJsonObject.businessCode){
                            forward('vPlayerFullScreen.html');
                        }else{
                            Log.error("move song to top failure---"+oJsonObject.resultSet);
                        }

                    }catch (err){
                        Log.error("move song to top error!!"+err);
                    }
                },
                function(responseText){
                    Log.error("concert.js insertASong2PlayList  TopPlaylistItem errr");
                    Log.error(responseText);
                }
            )
        },
        function(responseText){
            Log.error("communication error !!! try again later   !!"+responseText);
            //EpgTip('请求数据失败，请稍后再试！');
        }
    );
}

function getPlayList(){
    var data=[];
    // Epg.ajax({
    //     url: TOPDRAW_API_SERVER + 'User/ListPlaylistItemWithSong?view=json&token='+g_strToken+'&start=0&limit=1',
    //     type: 'get',
    //     dataType: 'json',
    //     success: function(xhr, rsp) {
    //         data = rsp.resultSet;
    //     },
    //     error: function(xhr, rsp) {}
    // });
    ajax(
        'GET',
        TOPDRAW_API_SERVER + 'User/ListPlaylistItemWithSong?view=json&token='+g_strToken+'&start=0&limit=1',
        null,
        null,
        function(responseText) {
            var rsp = JSON.parse(responseText);
            data = rsp.resultSet;
        },
        function(xhr, rsp) {

        }
    );
}
//已点歌曲播放
function removeFistSong(songId){
    var dataURL='view=json&token='+g_strToken+'&start=0&limit=10';
    ajax(
        'GET',
        TOPDRAW_API_SERVER + 'User/ListPlaylistItem',
        null,
        dataURL,
        function(responseText) {//删除第一首歌
            var rsp = JSON.parse(responseText);
            var data = rsp.resultSet[0].song.id;
            ajax(
                'GET',
                TOPDRAW_API_SERVER + 'User/RemovePlaylistItem?view=json&token='+g_strToken+'&songIds=&'+data,
                null,
                null,
                function(responseText) {//吧要播放的歌曲放到服务器上
                    var rsp = JSON.parse(responseText);
                    ajax(
                        'GET',
                        TOPDRAW_API_SERVER + 'User/AddPlaylistItem?view=json&token='+g_strToken+'&songIds=&'+songId,
                        null,
                        null,
                        function(xhr, rsp) {

                        },
                        function(xhr, rsp) {

                        }
                    );


                },
                function(xhr, rsp) {

                }
            );

        },
        function(){

        }
    )



}


/**
 * 删除播放列表中指定pId歌曲
 * @param pId   歌曲的pId
 * @returns {boolean}
 */
function removeASongFromPlayList(pId) {
	var strPlayList = getCookie(MC_PLAY_LIST_KEY);
	var arrPlayList = JSON.parse(strPlayList);

	if (1 >= arrPlayList.length) {
		return false;
	}

	var bIsFound = false;
	for (var i = 0; i < arrPlayList.length; i++) {
		if (arrPlayList[i].pId == pId) {
			arrPlayList.splice(i, 1);
			bIsFound = true;
			break;
		}
	}
	if (bIsFound) {
		strPlayList = JSON.stringify(arrPlayList);
		setCookie(MC_PLAY_LIST_KEY, strPlayList);
		return true;
	} else {
		return false;
	}
}

/**
 * 从播放列表中获取指定pId歌曲信息
 * @param pId  歌曲pId
 * @returns {*}
 */

function getASongFromPlayList(pId) {
	var strPlayList = getCookie(MC_PLAY_LIST_KEY);
	var arrPlayList = JSON.parse(strPlayList);
	var oResultSong = {};

	for (var i = 0; i < arrPlayList.length; i++) {
		if (arrPlayList[i].pId == pId) { //复制一份粗来
			oResultSong.index = i;
			oResultSong.pId = pId;
			oResultSong.cId = arrPlayList[i].cId;
			oResultSong.name = arrPlayList[i].name;
			oResultSong.artist = arrPlayList[i].artist;
			oResultSong.mediacode = arrPlayList[i].mediacode;
			return oResultSong;
		}
	}
	return null;
}

/**
 * 从播放列表中获取下一首歌曲
 * @param pId
 * @returns {{}}
 */
function getNextSongFromPlayList(pId) { //除了输入进来的意外随便播放一首
	var strPlayList = getCookie(MC_PLAY_LIST_KEY);
	var arrPlayList = JSON.parse(strPlayList);
	var oResultSong = {};
	var iCurrentIndex = -1;
	var iNextIndex = 0;
	for (var i = 0; i < arrPlayList.length; i++) {
		if (arrPlayList[i].pId == pId) { //复制一份粗来
			iCurrentIndex = i;
			break;
		}
	}

	if (-1 < iCurrentIndex && iCurrentIndex < arrPlayList.length - 1) { //找到了并且不是最后一个
		iNextIndex = iCurrentIndex + 1;
	} //如果是没找到，或者是最后一个则什么都不干 返回第一个

	oResultSong.index = iNextIndex;
	oResultSong.pId = arrPlayList[iNextIndex].pId;
	oResultSong.cId = arrPlayList[iNextIndex].cId;
	oResultSong.name = arrPlayList[iNextIndex].name;
	oResultSong.artist = arrPlayList[iNextIndex].artist;
	oResultSong.mediacode = arrPlayList[iNextIndex].mediacode;

	return oResultSong;
}

/**
 * 从播放列表中随机获取歌曲
 * @param pId 不被选择的歌曲pId
 * @returns {{}}
 */
function getARandomSongFromPlayList(pId) { //除了输入进来的以外随便播放一首
	var strPlayList = getCookie(MC_PLAY_LIST_KEY);
	var arrPlayList = JSON.parse(strPlayList);
	var oResultSong = {};

	var iExcludedIndex = -1;

	for (var i = 0; i < arrPlayList.length; i++) {
		if (arrPlayList[i].pId == pId) { //复制一份粗来
			iExcludedIndex = i;
			break;
		}
	}

	var iRandomIndex = -1;

	if (iExcludedIndex = -1) { //不在播放列表内
		iRandomIndex = Math.floor(Math.random() * (arrPlayList.length + 1)); //这里减1是为了排除当前播放的那个视频
	} else {
		iRandomIndex = Math.floor(Math.random() * (arrPlayList.length)); //这里减1是为了排除当前播放的那个视频

		if (iRandomIndex >= iExcludedIndex) {
			iRandomIndex++;
		}
	}

	oResultSong.index = iRandomIndex;
	oResultSong.pId = arrPlayList[iRandomIndex].pId;
	oResultSong.cId = arrPlayList[iRandomIndex].cId;
	oResultSong.name = arrPlayList[iRandomIndex].name;
	oResultSong.artist = arrPlayList[iRandomIndex].artist;
	oResultSong.mediacode = arrPlayList[iRandomIndex].mediacode;

	return oResultSong;
}

/**
 * 清理播放列表
 */
function clearPlayList() {
	setCookie(MC_PLAY_LIST_KEY, "[]");
    location.reload();
}
/**
 * 清理播放列表只留下当前播放的歌曲
 */
function clearAll() {
    var strPlayList2 = getCookie(MC_PLAY_LIST_KEY);
    var arrPlayList;
    if (strPlayList2 == '' || strPlayList2 == 'undefined' || strPlayList2 == null) {
        return;
    } else {
        arrPlayList = JSON.parse(strPlayList2);
        arrPlayList.splice(1,arrPlayList.length-1);
        var strplays=JSON.stringify(arrPlayList);
        setCookie(MC_PLAY_LIST_KEY, strplays);
        //location.reload();

    }
}

//===============收藏 Favorite =====================
/**
 * 20170920 准备不再使用 @tiger
 * @param pId
 * @param index
 */
function addASong2FavList(pId,index) {

	//如果有收藏列表，直接存储数据
	var DefaultListId = getCookie('favListId');
    if(!DefaultListId){setCookieCollection();}
   // Epg.Log.info(TOPDRAW_API_SERVER + 'User/AddSong2Collection?view=json&token='+g_strToken+'&songId=' + pId + '&collectionId=' + DefaultListId);
    ajax(
        'POST',
    	TOPDRAW_API_SERVER + 'User/AddSong2Collection?view=json&token='+g_strToken+'&songId=' + pId + '&collectionId=' + DefaultListId,
        null,
    	null,
    	function(responseText) {
            var rsp = JSON.parse(responseText);
    		if (rsp.businessCode == "success") {
    				EpgTip('收藏成功');
    				if(isNaN(index)){//非数字，说明是按钮，直接把按钮背景图换了
                        if(G(index).src){
                            G(index).src = 'image/images/faved_b.png'
                        }else{
                            G(index).style.background = 'url("image/images/faved_b.png") no-repeat'
                        }
                    }else{
                        if(document.getElementById('fav_'+index).src){
                            document.getElementById('fav_'+index).src = 'image/images/faved.png'
                        }else{
                            document.getElementById('fav_'+index).style.background = 'url("image/images/faved.png")'
                        }
                    }

    		} else if (rsp.businessCode == "failure") {
               ajax(
                   'POST',
                   TOPDRAW_API_SERVER + 'User/RemoveSongFromCollection?view=json&token='+g_strToken+'&songId=' + pId + '&collectionId=' + DefaultListId,
                   null,
                   null,
                   function(responseText) {
                       var rsp = JSON.parse(responseText);
                           EpgTip('取消收藏');
                       if(document.getElementById('fav_'+index).src){
                           document.getElementById('fav_'+index).src = 'image/images/fav.png'
                       }else{
                           document.getElementById('fav_'+index).style.background = 'url("image/images/fav.png")'
                       }

                   }
               )


    		}

    	},
    	function(xhr, rsp) {

    	}
    );
}


//删除列表

function deleteSongOne(songId){
    // Epg.ajax({
    //     url:TOPDRAW_API_SERVER + 'User/RemovePlaylistItem?view=json&songIds='+songId+'&token='+g_strToken,
    //     type:'post',
    //     dataType:'json',
    //     success:function (xhr,rsp) {
    //         if(rsp.businessCode == 'success'){
    //
    //         }
    //     }
    // })
    ajax(
        'POST',
        TOPDRAW_API_SERVER + 'User/RemovePlaylistItem?view=json&songIds='+songId+'&token='+g_strToken,
        null,
        null,
        function (responseText) {
            var rsp = JSON.parse(responseText);
            if(rsp.businessCode == 'success'){
                EpgTip('删除成功')
            }
        }
    )
}


function deleteHistoryOne(songId){
    ajax(
        'POST',
        TOPDRAW_API_SERVER + 'User/RemoveBookmark?view=json&songIds='+songId+'&token='+g_strToken,
        null,
        null,
        function (responseText) {
            var rsp = JSON.parse(responseText);
            Epg.Tip('删除成功')
        }
    )
}

//获取收藏夹id
function setCookieCollection(){
    var favListId='';
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
                    setCookie('favListId',favSongList); //存储收藏列表到cookie
                } else if (rsp.businessCode == "failure" && null != rsp.resultSet) {
                    var favSongList1 = rsp.resultSet[0].id;
                    setCookie('favListId',favSongList1); //存储收藏列表到cookie
                }
            },
            function(){

            }
        );
    }
}

function addASong2HisList(pId) { //添加历史
    if(pId==null||pId=='undefined'||pId==''||pId==0){

    }else{
        ajax(
            'POST',
            TOPDRAW_API_SERVER + 'User/AddBookmark?view=json&token='+g_strToken+'&songId=' + pId,
            null,
            null,
            function(xhr, rsp) {
            },
            function(xhr, rsp) {
            }
        );
    }


}

/*==================miedo=====code====获取============*/

function getParthPartner() {
	var strjson = getCookie(MC_PARTNER_PATH);
	var arrjson = JSON.parse(strjson);
	return arrjson;
}

var serverpath = '';
var partner = '';



function initEpgServerInfo() {
	var arrInfo = getParthPartner();
	if (typeof arrInfo != 'undefined' && arrInfo != '' && arrInfo != null) {
		serverpath = arrInfo.path;
		partner = arrInfo.partner;
	} else {
	}

}


function initEpgServerInfoNext() {
    var newToken = getQueryStringByName('token');
    var oldToken = getCookie(MC_TOKEN);
    if (oldToken != newToken || newToken =='null' || newToken == undefined || newToken =='') {

            serverpath = getQueryStringByName('serverPath');
            partner = getQueryStringByName('partner');
            setParthPartner(serverpath, partner, window.location.href);
            var ossUserId1 = getQueryStringByName('ossUserId');
            var getToken = getQueryStringByName('token');
            setCookie(MC_TOKEN,getToken);
            setCookie('platformAccount',ossUserId1)

    } else {

    }

}


/*==================存放parth===========*/
function setParthPartner(path, partner, homeurl) {
	try {
		if (path.length > 0 && partner.length > 0) {
			var serverInfo = {
				"path": path,
				"partner": partner,
				"homeurl": homeurl
			};
			var strJsonserverInfo = JSON.stringify(serverInfo);
			setCookie(MC_PARTNER_PATH, strJsonserverInfo);
			return true;
		} else {
			return false;
		}
	} catch (err) {

		return false;
	}
}

function setPlayTime(time) {
	time = time > 0 ? time : 0;
	try {
		var serverInfo = {
			"time": time
		};
		var strJsonserverInfo = JSON.stringify(serverInfo);
		setCookie(MC_PLAY_TIME, strJsonserverInfo);
		return;
	} catch (err) {
		return false;
	}
}

function getPlayTime() {

	var strjson = getCookie(MC_PLAY_TIME);
	var arrjson;
	if (strjson != null && strjson != '' && strjson != 'undefined') {
		arrjson = JSON.parse(strjson);

	} else {
	}
	return arrjson;
}

function getFullPlayLastTime() {
	var JsonTime = getPlayTime();
	var t = 0;
	if (JsonTime == '' || JsonTime == 'undefined' || JsonTime == null) {
		t = 0;
	} else {
		t = JsonTime.time;
		//setPlayTime(0);// 清零
	}

	return t;
}

/**
 * 获取收藏夹ID
 * @param defaultId
 * @returns {boolean}
 */
function setDefaultList(defaultId) {
	try {
		var temp = {
			"defaultId": defaultId
		};
		var strtemp = JSON.stringify(temp);
		setCookie(MC_FAV_LIST_KEY, strtemp);
		return true;
	} catch (err) {}
	return false;
}

/**
 遍历数组。选出已经添加的歌曲
 */
function dataListEach(data){
    var songIds = '&songIds=';
    for(var i=0;i<data.length;i++){
        songIds += data[i].id+',';
    }
    songIds = songIds.substring(0,songIds.length-1);
    // Epg.ajax({
    //     url: TOPDRAW_API_SERVER + 'User/ListPlaylistItem?view=json&token='+g_strToken+songIds+'&start=0&limit=10',
    //     type: 'get',
    //     dataType: 'json',
    //     success: function(xhr, rsp) {
    //         for(var i=0;i<data.length;i++){
    //             for(var j=0;j<rsp.resultSet.length;j++){
    //                 if(data[i].id == rsp.resultSet[j].song_id){
    //                     document.getElementById('addImage'+i).style.backgroundPosition='-645px -434px';
    //                 }
    //             }
    //         }
    //     },
    //     error: function(xhr, rsp) {}
    // });

    ajax(
        'GET',
        TOPDRAW_API_SERVER + 'User/ListPlaylistItem?view=json&token='+g_strToken+songIds+'&start=0&limit=10',
        null,
        null,
        function(responseText) {
            var rsp = JSON.parse(responseText);
            for(var i=0;i<data.length;i++){
                for(var j=0;j<rsp.resultSet.length;j++){
                    if(data[i].id == rsp.resultSet[j].song_id){
                        document.getElementById('addImage'+i).style.backgroundPosition='-645px -434px';
                    }
                }
            }
        },
        function(xhr, rsp) {

        }
    );
}

function favListEach(dataList){
    for(var i=0;i<dataList.length;i++){
        if(dataList[i].collection){
            G('favImage'+i).style.backgroundPosition='-573px -434px'
        }
    }
}


function addAsongHrefSreen(songId, index) {

    var urlData='view=json&token='+g_strToken+'&songIds='+songId;
    ajax(//拼音搜索
        'GET',
        TOPDRAW_API_SERVER + 'User/AddPlaylistItem',
        null,
        urlData,
        function(resultData){
            if(resultData.businessCode=='success'){
                window.parent.EpgTip('添加成功')
            }else{
                window.parent.EpgTip('已经添加');
            }
        },
        function(){}
    );
}

//全屏添加歌曲

function addAsongAllSreen(songId, index) {

    var urlData='view=json&token='+g_strToken+'&songIds='+songId;
    ajax(//拼音搜索
        'GET',
        TOPDRAW_API_SERVER + 'User/AddPlaylistItem',
        null,
        urlData,
        function(resultData){
            if(resultData.businessCode=='success'){
                EpgTip('添加成功')
            }else{
                EpgTip('已经添加');
            }
        },
        function(){}
    );
}



function addAsong2Fav(songId){

}

function initPlayTJ() {//当播放列表空了，我们推荐播放列表进去
    var urlData = 'view=json&token=' + g_strToken + '&tag=KHPList&start=0&limit=10';
    //alert(TOPDRAW_API_SERVER + 'Song/ListByTag?'+urlData);
    ajax(//获取播放列表
        'GET',
        TOPDRAW_API_SERVER + 'Song/ListByTag',
        null,
        urlData,
        function (rsp) {
            var dataList1 = JSON.parse(rsp);
            var dataList = dataList1.resultSet;
            var ids;
            var data5='';
            for (var i = 0; i < dataList.length; i++) {
                data5 += dataList[i].id + ',';
            }
            ids = data5.substring(0,data5.length-1);
            addASong2PlayList(ids);
        },
        function () {}
    );
}

var g_strBeforePopElId="";
var g_fBeforeScaleFactor=1.0;
var g_bPanelShowing=false;
var g_bIsPlayDataLocked=true;
var g_fnCallback=null;
function popCustomPanel(strBeforePopElId, fn, fBeforeScaleFactor, bTest){
    g_fBeforeScaleFactor=fBeforeScaleFactor ? fBeforeScaleFactor : g_fBeforeScaleFactor;
    var strPanelCode=getQueryStringByName("pannel");
    if(!strPanelCode||strPanelCode==""){
        return true;
    }
    var date=new Date();
    var day=date.getDate();
    var strPanelPop=getCookie('bPanelPoped');
    if(!bTest){
        if (strPanelPop && strPanelPop==SELF_APPID+day+strPanelCode){
            return true;
        }
        if(parseInt(getCookie("isAuthenticated"))==1){
            return true;
        }
    }
    if(fn){
        g_fnCallback=fn;
    }
    g_strBeforePopElId=strBeforePopElId;
    var elDialogPanel=document.getElementById("custom_pannel");
    if(!elDialogPanel){
        elDialogPanel=document.createElement("div");
        elDialogPanel.setAttribute('id','custom_pannel');
        elDialogPanel.style.position="absolute";
        elDialogPanel.style.left="0";
        elDialogPanel.style.top="0";
        elDialogPanel.style.width="1280px";
        elDialogPanel.style.height="720px";
        elDialogPanel.style.zIndex="99";
        var elBtnClose=document.createElement("div");
        elBtnClose.setAttribute('id','close_btn');
        document.body.appendChild(elDialogPanel);
        elDialogPanel.appendChild(elBtnClose);
    }else{
        document.getElementById("custom_pannel").style.display="block";
        document.getElementById("custom_pannel").style.visibility="visible";
    }
    var strDialogBtnTemplateHtml='<div class="{{:~linkClass}}" focusstatus="{{:~focusstatus}}" id="{{:~elId}}" tvlink="{{:~tvlink}}" style="position:absolute;width:{{:width}}px;height:{{:height}}px;left:{{:left}}px;top:{{:top}}px;background-image:url({{:~imageBasePath}}{{firstNotEmptyImage:image}})"></div>';
    jsrender.templates({ btnTemplate:strDialogBtnTemplateHtml});
    var oPanelBgRequestParameters={
        "view":"json",
        "dictionaryCode":"CUSTOM_DIALOG."+strPanelCode,
        "start":0,
        "limit":10,
        "sortField":"id",
        "sortDirection":"asc",
        "token":g_strToken
    }
    ajax('GET', TOPDRAW_API_SERVER+'Dictionary/ListItemByDictionary' , null, oPanelBgRequestParameters,
        function(responseText){
            try{
                var oJSONResult = JSON.parse(responseText);
                if(oJSONResult.businessCode == "success"){
                    var iStatus=g_aAdjacency.length;
                    g_iFocusStatus=iStatus;
                    for(var i=0;i<oJSONResult.resultSet.length;i++){
                        var val=oJSONResult.resultSet[i].images;
                        var strSrc="";
                        if (val && val!='' && val!='null') {
                            if (val.list && val.list instanceof Array && val.list.length>0
                                &&val.map.normal && val.map.normal instanceof Array && val.map.normal.length>0
                            ) {
                                if(val.list[val.map.normal[0]].fileUrl){
                                    strSrc=IMAGE_BASE_PATH+val.list[val.map.normal[0]].fileUrl;
                                }
                            }
                        }
                        if(oJSONResult.resultSet[i].key=="pannelBg"){
                            elDialogPanel.style.backgroundImage="url("+strSrc+")";
                        }else if(oJSONResult.resultSet[i].key=="closeBtn"){
                            var oBtn={};
                            var aPosition=oJSONResult.resultSet[i].value.split(";")
                            for(var j=0;j< aPosition.length;j++ ){
                                var aParts=aPosition[j].split("=");
                                oBtn[aParts[0]]=aParts[1];
                            }
                            var strId = "close_cell";
                            var strTvlink = "closePanel();";
                            var strBtn="close_btn";
                            document.getElementById(strBtn).innerHTML =jsrender.render.btnTemplate([oBtn], {elId: strId, linkClass: "focusable",tvlink:strTvlink , focusstatus:iStatus});
                            var elBtn=document.getElementById(strId);
                            elBtn.style.backgroundImage="url("+strSrc+"?v="+Math.random()*10000+")";
                            elBtn.innerHTML="<img src='"+strSrc+"?v="+Math.random()*10000+"'/>";
                            if(!g_bIsUTBox){
                                collectFocusElement();
                            }else{
                                //这一块由于少儿天地用的老的焦点方案，地图没法画，暂时先支持少儿弹框上线好了
                                if(!g_aAdjacency[iStatus]){
                                 g_aAdjacency[iStatus]={};
                                 }
                                 g_aAdjacency[iStatus][strId]={};
                                 g_aAdjacency[iStatus][strId].left=parseInt(oBtn.left);
                                 g_aAdjacency[iStatus][strId].top=parseInt(oBtn.top);
                                 g_aAdjacency[iStatus][strId].width=parseInt(oBtn.width);
                                 g_aAdjacency[iStatus][strId].height=parseInt(oBtn.height);
                            }
                        }
                    }
                    if(g_bIsUTBox){
                        for(key in g_aAdjacency[iStatus]){
                            var elTarget = document.getElementById(key);
                            break;
                        }
                    }else{
                        var elTarget=g_aFocusTargets[g_iFocusStatus][0]
                    }

                    if(elTarget){
                        jumpFocus( elTarget, g_fScaleFactor, null);
                    }else{
                        hideFocus();
                        g_strFocusElementId="";
                    }
                    g_bPanelShowing=true;
                    setCookie("bPanelPoped",SELF_APPID+day+strPanelCode);
                    if(g_bIsSkyworthE900||g_bIsUTBox){
                        try {
                            if (g_mediaPlayer) {
                                g_mediaPlayer.setVideoDisplayArea( 0, 0, 1, 1 );
                            }
                        } catch (err) {
                            Log.error("MediaPlayer缩小错误：" + err);
                        }
                    }
                    Log.info("Business Success : get Panel Bg success");
                }else{
                    Log.error("Business Error : Get Panel Bg failed:::"+oJSONResult.description);
                }
            }catch(err){
                Log.error("Business Exception : Get Panel Bg error"+err+','+responseText);
            }
        },function(responseText){
            Log.error("Communication Error : Get Panel Bg Error:::"+responseText+"!!");
        }
    );
}
function closePanel(){
    document.getElementById("custom_pannel").style.display="none";
    document.getElementById("custom_pannel").style.visibility="hidden";
    g_iFocusStatus=0;
    jumpFocus(document.getElementById(g_strBeforePopElId),g_fBeforeScaleFactor,null);
    g_bPanelShowing=false;
    g_bIsPlayDataLocked=false;
    g_strBeforePopElId="";
    if(g_fnCallback){
        g_fnCallback();
    }


}
