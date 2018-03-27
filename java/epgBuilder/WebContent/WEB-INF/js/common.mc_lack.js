;
(function(Epg) {
	/**
	 * 通用的tip方法，局部方法，仅供tip和ykqTip内部调用
	 */
	function tip(info, second, id, timerName) {
		if (info === undefined || info === '') //info为空时不产生任何效果
			return;
		second = second || 3;
		id = id || id;
		if (!G(id)) {
			var dom = document.createElement('div');
			dom.id = id;
			document.body.appendChild(dom);
		}
		G(id).innerHTML = info;
		S(id);
		if (second > 0) {
			if (Epg[timerName]) //如果上次执行过setTimeout，那么强行停止
				clearTimeout(Epg[timerName]);
			Epg[timerName] = setTimeout('H("' + id + '")', second * 1000); //修改tip时间
		}
	}
	//覆盖以前标清时用图片实现的tip
	Epg.tip = function(info, second) {
		tip(info, second, 'default_tip_css', '_tip_timer');
	};
	Epg.ykqTip = function(info, second) {
		tip(info, second, 'default_ykq_tip_css', '_ykq_tip_timer');
	};
})(Epg);

/**
 * 依赖jQuery
 */
Epg.list = {
	_items: [], //存放所有的列表数据
	_id: '', //整个大的List的容器id
	_btn_id: '',
	_item_height: 0, //每一个小项的高度
	_idx: 0, //第一个item的索引
	_num: 0, //界面上同时显示的最多个数
	_max_btn_id: -1, //最大的按钮ID，例如界面上有3个item，那么最大是2，有9个是8，有20个还是8
	_ajax_p: 0, //ajax请求的页数
	_no_page_tip: '未找到数据！',
	/**
	 * 初始化列表结构以及初始化第一页的数据
	 * @param btns 页面定义的buttons数组
	 * @param fn 列表项目点击确定的事件
	 * @param beforeMove 列表item的beforeMove方法，注意先执行用户自定义的，然后再执行这里封装好的
	 * @param ajax请求数据的url，注意必须是'&p='结尾，因为要传递页码
	 */
	init: function(btns, fn, beforeMove, ajax_url, id, num) {
		id = id || 'common_list_content'; //容器ID
		num = num || 9; //最多显示的个数
		var btn_id = 'common_list_btn_'; //按钮ID前缀
		var item_height = 56; //每一个子项目的高度
		var padding = 5;
		this._id = id;
		this._btn_id = btn_id;
		this._num = num;
		this._item_height = item_height;
		this._fn = fn;
		this._beforeMove = beforeMove;
		this._ajax_url = ajax_url;

		spacer = spacer || 'xxx.gif'; //防止没有在com_head.jsp中设置spacer变量

		var html = '';
		for (var i = 0; i < num; i++) {
			html += '<div class="common_list_btn_div" style="top:' + (0 + i * item_height) + 'px;margin-top:' + padding + 'px;height:' + (item_height - padding * 2) + 'px;">' +
				'<img id="' + btn_id + i + '" src="' + spacer + '" class="common_list_btn_f"/>' +
				'</div>';
			btns.push({
				id: btn_id + i,
				idx: i,
				action: 'Epg.list.btnAction()',
				animate: false,
				animateGroup: 100,
				beforeMove: Epg.list.beforeMoveBtn,
				focusClass: 'common_list_blue',
				up: btn_id + (i - 1),
				down: btn_id + (i + 1)
			});
		}
		html += '<div id="' + id + '_page_info" class="common_list_page_info" style="top:' + (num * item_height) + 'px;height:' + item_height + 'px;line-height:' + item_height + 'px;"></div>';
		html += '<div id="' + id + '_no_page_tip" class="common_list_no_page_tip" style="top:' + (num / 2 * item_height) + 'px;height:' + item_height + 'px;line-height:' + item_height + 'px;">' + this._no_page_tip + '</div>';
		html += '<div class="common_list_item_content"><div id="' + id + '_scroll" class="common_list_scroll"></div></div>';
		html += '<div id="common_list_loading" class="common_list_loading"><i class="fa fa-refresh fa-spin" style="line-height:' + (num * item_height) + 'px;"></i></div>';
		$('#' + id).append(html).css('height', item_height * num + 'px');
		this.ajax();
	},
	/**
	 * 给列表批量添加数据
	 * @param items 后台返回的dataList
	 * @param fieldName 界面显示数据读取的字段名
	 */
	addItems: function(items, fieldName) {
		fieldName = fieldName || 'name';
		var html = '';
		var id = this._id;
		var item_height = this._item_height;
		for (var i = 0; i < items.length; i++) {
			this._items.push(items[i]);
			var len = this._items.length - 1;
			var yidian = items[i].added; //是否已点
			html += '<div id="' + this._id + '_item_' + len + '" class="common_list_item css3_substring ' + (yidian ? 'yidian' : '') + '" style="top:' + (0 + len * item_height) + 'px;height:' + item_height + 'px;line-height:' + item_height + 'px;">' +
				('<i class="fa fa-check common_list_yidian"></i><span>' + (len + 1) + '</span>') + '&nbsp;&nbsp;&nbsp;&nbsp;' + (this._show_player ? (items[i]['player'] + ' - ') : '') + items[i][fieldName] +
				'</div>';
		}
		this._max_btn_id = this._items.length > this._num ? this._num : this._items.length;
		this._max_btn_id--;
		$('#' + id + '_scroll').append(html);
	},
	/**
	 * 将某个item的状态变为已点
	 * @param idx item的索引
	 */
	addItemYidian: function(idx) {
		Epg.addClass(G(Epg.list._id + '_item_' + idx), 'yidian');
		this._items[idx].added = true;
	},
	/***
	 * item直接调用的beforeMove方法
	 * @param dir
	 * @param current
	 * @returns
	 */
	beforeMoveBtn: function(dir, current) {
		var list = Epg.list;
		if (list._beforeMove) //先执行用户自定义的beforeMove方法
		{
			var flag = list._beforeMove(dir, current);
			if (flag === false)
				return flag;
		}
		if (dir === 'up') {
			if ((list._idx + current.idx) == 0)
				return false;
			if (current.idx === 0) //如果光标到了最下面
			{
				list._idx--;
				G(list._id + '_scroll').style.marginTop = '-' + list._idx * list._item_height + 'px';
				return false;
			}
		} else if (dir === 'down') {
			if ((list._idx + current.idx + 1) >= list._items.length) {
				if (list._row_count && list._row_count <= list._items.length) {
					Epg.tip('已经是最后一首啦！');
					return false; //如果数据库没有数据了，不必再去请求
				}
				list.ajax();
				return false;
			}
			if (current.idx === (list._num - 1)) //如果光标到了最下面
			{
				list._idx++;
				G(list._id + '_scroll').style.marginTop = '-' + list._idx * list._item_height + 'px';
				return false;
			}
		}
	},
	/**
	 * 请求数据的ajax方法，每次调用页码都会自动+1，无需任何参数，因为参数都已经存起来了
	 */
	ajax: function() {
		if (!this._ajax_url)
			return;
		Show('common_list_loading'); //显示loading动画
		var errorInfo = '获取数据失败，请稍后再试！';
		$.ajax({
			url: Epg.list._ajax_url + (++Epg.list._ajax_p),
			success: function(data) {
				if (!data || data.code !== 0) {
					Epg.tip(errorInfo);
					Hide('common_list_loading');
					return;
				}
				var dataList = data.pb.dataList;
				Epg.list._row_count = data.pb.rowCount; //总数据个数
				if (Epg.list._row_count > 0) {
					H(Epg.list._id + '_no_page_tip');
					G(Epg.list._id + '_page_info').innerHTML = '共 ' + Epg.list._row_count + ' 条数据';
					Epg.list.addItems(dataList);
					if (Epg.list._ajax_p > 1)
						Epg.btn.move('down');
				} else {
					S(Epg.list._id + '_no_page_tip');
					G(Epg.list._id + '_page_info').innerHTML = '';
					if (/^common_list_btn_.*$/g.test(Epg.btn.current.id) && G('back'))
						Epg.btn.set('back'); //如果当前按钮是列表按钮，并且有返回按钮，把光标移动到返回上面去
				}

				Hide('common_list_loading');
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				Epg.tip(errorInfo);
				Hide('common_list_loading');
			}
		});
	},
	/**
	 * item直接调用的方法
	 */
	btnAction: function() {
		var idx = Epg.list._idx + Epg.btn.current.idx;
		this._fn(Epg.list._items[idx], idx);
	},
	/**
	 * 重新初始化列表，按钮对象等不清除，只是清除item数据而已
	 * @param ajax_url 新的ajax地址
	 */
	reinit: function(ajax_url) {
		this._ajax_url = ajax_url;
		this._ajax_p = 0; //ajax请求的页数
		this._items = [];
		this._idx = 0;
		this._max_btn_id = -1;
		this._row_count = 0;
		var id = this._id;
		H(id + '_no_page_tip');
		G(id + '_page_info').innerHTML = '';
		$('#' + id + '_scroll').empty().css('marginTop', '0px');
		this.ajax();
	}
};

/**
 * 聚焦时醒目提示功能
 * @param id 图片img的id
 * @param 
 */
Epg.remind = (function() {
	var instantiated;
	var __left = 0,
		__top = 0,
		__width = 0,
		__height = 0,
		__zIndex = 0;

	function init() {
		/*这里定义单例代码*/
		return {
			focus: function(id, size) {

				var __thisImgId = id;
				var __thisImg = document.getElementById(__thisImgId);
				/*这里根据img的id来获取外围的父节点(一般为DIV)*/
				var __parent = __thisImg.parentNode;

				/*先根据图片的ID获取width 与 top 与 z-index;*/
				__width = __thisImg.width;
				__height = __thisImg.height;
				__zIndex = __thisImg.style.zIndex;

				var __overflow = __parent.style.overflow;
				if (__overflow === '' || __overflow.length == 0) { //判断DIV的overflow属性,如果没有的话,加上overflow=hidden;
					__parent.style.overflow = "hidden";
				}

				/*根据拿到到的父节点div来获取left 与 top*/
				__left = __parent.style.left;
				__top = __parent.style.top;
				__left = __left.replace('px', '');
				__top = __top.replace('px', '');

				/* 修改div的 left,top,width,height (width与height是为了保险起见,)*/
				__parent.style.zIndex = 1000;
				__parent.style.left = parseInt(__left) - size + 'px';
				__parent.style.top = parseInt(__top) - size + 'px';
				__parent.style.width = parseInt(__width) + 2 * size + 'px';
				__parent.style.height = parseInt(__height) + 2 * size + 'px';

				/* 修改img的 width,height*/
				__thisImg.width = parseInt(__width) + 2 * size;
				__thisImg.height = parseInt(__height) + 2 * size;

			},
			blur: function(id) {
				var __thisImgId = id;
				var __thisImg = document.getElementById(__thisImgId);
				/*这里根据img的id来获取外围的父节点(一般为DIV)*/
				var __parent = __thisImg.parentNode;

				__parent.style.zIndex = __zIndex;
				__parent.style.left = __left + 'px';
				__parent.style.top = __top + 'px';
				__parent.style.width = __width + 'px';
				__parent.style.height = __height + 'px';

				__thisImg.width = __width;
				__thisImg.height = __height;
			}
		};
	}
	return {
		getInstance: function() {
			if (!instantiated) {
				instantiated = init();
			}
			return instantiated;
		}
	};
})();

/**
 * 非播放列表的外的歌曲列表
 * 依赖jQuery
 */
Epg.songlist = {
	__songlist: null,
	__songlistSize: 0,
	__current: 0,
	__pageCount: 0,
	__contentDivLeft: 0,
	__contentDivTop: 0,
	__rowSpace: 0, //每行的间隔

	init: function(id, songlist, playerNames, songlistSize, current, pageCount, contentDivLeft, contentDivTop, rowSpace, items, animate, basePath, imagePath, comImagePath, favOrDelete, contentClass, addClassIndex) {
		id = id || 'mainContent'; //容器ID
		playerNames = playerNames || null;
		this.__songlistSize = songlistSize || 0; //最多显示的个数
		//if(this.__songlistSize == 0) 
		//	return;
		this.__current = current || 1;
		this.__pageCount = pageCount || 1;
		this.__contentDivLeft = contentDivLeft || 425;
		this.__contentDivTop = contentDivTop || 153;
		this.__rowSpace = rowSpace || 54;
		items = items || null;
		animate = animate || 'false';
		favOrDelete = favOrDelete || 'fav';
		contentClass = contentClass || '';
		addClassIndex = parseInt(addClassIndex) || 0;

		spacer = spacer || 'xxx.gif'; //防止没有在com_head.jsp中设置spacer变量

		G(id).innerHTML = "";
		var __songlistHTML = "";
		for (var __i = 0, max = this.__songlistSize; __i < max; ++__i) {

			//判断本次循环是否加上删除的效果样式
			var __ifAddContentClass = (contentClass == 'upSong' && __i >= addClassIndex);

			__songlistHTML += '<div id ="content_' + __i + '" ' + (__ifAddContentClass ? 'class="upSong"' : '') + ' style="position: absolute;left:' + this.__contentDivLeft + 'px;top:' + (__ifAddContentClass ? (this.__contentDivTop + __i * this.__rowSpace + 54) : (this.__contentDivTop + __i * this.__rowSpace)) + 'px;width:775px;height:54px;font-size:24px;color:#fff;z-index:2; ';
			if ('false' != animate) {
				__songlistHTML += 'opacity:0;">';
			} else {
				__songlistHTML += '">';
			}
			__songlistHTML += '<div style="position: absolute;left:0;top:5px;z-index: 0;"><img id="song_' + __i + '" src="' + spacer + '" width="715" height="41"/></div>';
			__songlistHTML += '<div id="right_btn_logo_' + __i + '" style="position: absolute;left:720px;top:21px;z-index:3;visibility: hidden;"><img src="' + comImagePath + 'right_logo.png" width="8" height="12"/></div>';
			__songlistHTML += '<div id="song_div_' + __i + '" class="song_div">';
			__songlistHTML += '<div style="width:30px;height:33px;">' + (__i + 1) + '</div>';

			var setup = Epg.cookie.get('user_setup', '11111'); //获取设置
			if (setup.substring(4, 5) === '1') //如果是K歌版
			{
				//123代表可以切换原伴唱，4表示不可切换，5表示MP3
				var flag = items[__i].code.substring(5, 6) === '4'; //true表示不能切伴唱
				__songlistHTML += '<div style="width:30px;height:26px;"><img src="' + comImagePath + (flag ? 'version_shang' : 'version_chang') + '.png"/></div>';
			}
			__songlistHTML += '<div style="margin-top:10px;height:33px;">' + items[__i].name + '</div>';
			if (setup.substring(4, 5) === '0') //如果是欣赏版
			{
				if (items[__i].code.substring(6, 7) === '9') //9表示高清，0表示标清
				{
					__songlistHTML += '<div style="width:30px;height:26px;"><img src="' + comImagePath + 'version_hd.png"/></div>';
				}
			}

			__songlistHTML += '</div>';
			if (items[__i].added == 'true') {
				__songlistHTML += '<div><img class="song_left_btn_added" id="song_left_btn_' + __i + '" src="' + comImagePath + 'song_choosed.png" width="30" height="30"/></div>';
			} else {
				__songlistHTML += '<div><img class="song_left_btn" id="song_left_btn_' + __i + '" src="' + comImagePath + 'song_choosed.png" width="30" height="30"/></div>';
			}
			__songlistHTML += '<div class="song_right_btn">';
			__songlistHTML += '<img id="song_right_btn_' + __i + '" width="1" height="1" src="' + spacer + '"/>';
			__songlistHTML += '<div id="song_fav_div_' + __i + '" style="top:3px;margin:0;width:60px;height:41px;background:#e1224f;visibility: hidden;">';
			if ('delete' != favOrDelete) {
				if (items[__i].collected == 'true') {
					__songlistHTML += '<p style="margin:7px 10px 0;" id="song_fav_text_' + __i + '">取消</p>';
				} else {
					__songlistHTML += '<p style="margin:7px 10px 0;" id="song_fav_text_' + __i + '">收藏</p>';
				}
			} else {
				__songlistHTML += '<p style="margin:7px 10px 0;" id="song_fav_text_' + __i + '">删除</p>';
			}
			__songlistHTML += '</div>';
			__songlistHTML += '<div id="song_player_div_' + __i + '" style=" margin-top:10px;height:33px;right:5px;">' + playerNames[__i] + '</div>';
			if (items[__i].collected == 'true') {
				__songlistHTML += '<div style="right:5px;top:-5px;"><img id="song_fav_' + __i + '" src="' + comImagePath + 'song_faved.png" width="24" height="24"/></div>';
			} else {
				__songlistHTML += '<div style="right:5px;top:-5px;"><img id="song_fav_' + __i + '" src="' + comImagePath + 'spacer.gif" width="24" height="24"/></div>';
			}
			__songlistHTML += '</div>';
			__songlistHTML += '</div>';
			__songlistHTML += '<div id ="contentLine_' + __i + '" style="position: absolute;left:425px;top:' + (153 + __i * 54) + 'px;width:715px;height:54px;font-size:24px;color:#fff; visibility:hidden;">';
			__songlistHTML += '</div>';
		}
		if (this.__current > 1) {
			__songlistHTML += '<div id="page_prev_div" style="position:absolute; left:817px; top:50px;  ">';
			__songlistHTML += '<img id="page_prev" src="' + spacer + '" width="30" height="19" alt=""/>';
			__songlistHTML += '</div>';
		}
		if (this.__current > 0) {
			__songlistHTML += '<div id="page_next_div" style="position:absolute; left:' + (330 + this.__contentDivLeft) + 'px; top:' + (480 + this.__contentDivTop) + 'px; ';
			if (!window.if_first_showSonglist) {
				__songlistHTML += 'visibility:hidden;">';
				window.if_first_showSonglist = true;
			} else {
				__songlistHTML += '">';
			}
			__songlistHTML += '<img id="page_next" src="' + comImagePath + 'page_down_icon.png" width="30" height="19" alt=""/>';
			__songlistHTML += '</div>';
		}
		__songlistHTML += '<div id="pnEnd" style="position:absolute; left:' + (650 + this.__contentDivLeft) + 'px; top:' + (-40 + this.__contentDivTop) + 'px;">' + this.__current + '/' + this.__pageCount + '</div>';

		G(id).innerHTML = __songlistHTML;
	}

};

// var _index=button.index;
// var StrRef = encodeURIComponent(window.location.href);//获取当前页面返回地址
//4.22播放事件

//鉴权打开
function epgEnth(StrRef) {
    var token = getCookie(MC_TOKEN);
    Epg.ajax({
        //url: TOPDRAW_API_SERVER + 'Platform/Auth/v2?view=json&token='+token+'&productId=02300291',
        url: TOPDRAW_API_SERVER + 'Platform/Auth/v2?view=json&token='+token+'&serviceId=SS20160527131605&contentId=&productId=02300291',
        type: 'get',
        dataType: 'json',
        success: function(xhr, rsp) {
            if (rsp.businessCode == 'success') {

            } else {
                window.location.href = "subscribe.html?referURL=" + StrRef;
            }
        },
        error: function(xhr, rsp) {
            window.location.href = "subscribe.html?referURL=" + StrRef;
        }
    });
}

//小屏幕播放
function mcSmallPlay(id, name, artist, mediacode, StrRef) {
	// 插入当前高亮选中歌曲信息到播放列表最前面
	///var aSong = {"pid":id,"cid":"mc01","name":name,"artist":artist,"mediacode":mediacode};
	// 从cookie读取播放列表,保存播放列表到cookie
    var strPlayList = getCookie(MC_PLAY_LIST_KEY);
    if (strPlayList != 'undefined' && strPlayList != null && strPlayList != '') {
        moveFirstSong();
    }
	insertASong2PlayList(id, "mc01", name, artist, mediacode);
	// 跳转到全屏播放页面
}
var g_success=0;
function fedBack() {
    var rURL = window.location.href;

    if (-1 !=rURL.indexOf('&businessCode=')) {
        var businessCode = getQueryStringByName("businessCode");
        if (businessCode == 'success') {
			if(navigator.userAgent.indexOf('图案绘制完成') !=-1){
				if(g_success==0){
					Epg.tip('订购成功');
					g_success==1;
				}
			}else{
				Epg.tip('订购成功');
			}
		};
        if (businessCode == 'failure') Epg.tip('订购失败');
        rURL = encodeURIComponent(rURL.substring(0, rURL.indexOf('&businessCode=')));
    }else{
        rURL = encodeURIComponent(window.location.href);
    }
    return rURL;
}
