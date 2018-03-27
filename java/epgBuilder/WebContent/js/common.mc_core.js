/**
 * 常量定义 - 调试参数
 */
if (typeof debug_mode === 'undefined')
	window.debug_mode = true; //调试模式，上线后必须把此参数改为false！
if (typeof enable_animate === 'undefined')
	window.enable_animate = true; //开启动画
if (typeof is_ott === 'undefined')
	window.is_ott = false; //默认不是OTT项目

/**
 * 常量定义 - 遥控器按键定义
 * @type {number}
 */
var KEY_BACK = 0x0008; // 返回/删除
var KEY_ENTER = 0x000D; // 确定
var KEY_PAGE_UP = 0x0021; // 上页
var KEY_PAGE_DOWN = 0x0022; // 下页
var KEY_LEFT = 0x0025; // 左
var KEY_UP = 0x0026; // 上
var KEY_RIGHT = 0x0027; // 右
var KEY_DOWN = 0x0028; // 下
var KEY_0 = 0x0030; // 0
var KEY_1 = 0x0031; // 1
var KEY_2 = 0x0032; // 2
var KEY_3 = 0x0033; // 3
var KEY_4 = 0x0034; // 4
var KEY_5 = 0x0035; // 5
var KEY_6 = 0x0036; // 6 
var KEY_7 = 0x0037; // 7
var KEY_8 = 0x0038; // 8
var KEY_9 = 0x0039; // 9
var KEY_VOL_UP = 0x0103; // Vol+，音量加
var KEY_VOL_DOWN = 0x0104; // Vol-，音量减
var KEY_MUTE = 0x0105; // Mute，静音
var KEY_TRACK = 0x0106; // Audio Track，切换音轨
var KEY_PLAY_PAUSE = 0x0107; // >||，播放，暂停
var KEY_FAST_FORWARD = 0x0108; // >> ，快进
var KEY_FAST_REWIND = 0x0109; // << ，快退
var KEY_IPTV_EVENT = 0x0300; // 虚拟事件按键
var KEY_RED = 0x0113; // 红色键
var KEY_GREEN = 0x0114; // 绿色键
var KEY_YELLOW = 0x0115; // 黄色键
var KEY_BLUE = 0x0116; // 蓝色键
var KEY_DELETE = 0x0118; //删除键中兴盒子
var KEY_PAGE_UP = 0x0021;//向上翻页
var KEY_PAGE_DOWN = 0x0022;//向下翻页

var EVENT_MEDIA_END = 'EVENT_MEDIA_END'; //视频播放结束
var EVENT_MEDIA_ERROR = 'EVENT_MEDIA_ERROR'; //视频播放错误
var EVENT_MENU = 'EVENT_MENU'; //OTT机顶盒菜单键

/**
 * 根据ID获取某个元素
 * @param id
 */
function G(id) {
	return document.getElementById(id);
}
/**
 * 显示一个元素
 * @param id
 */
function S(id) {
	var temp = G(id);
	if (temp)
		temp.style.visibility = 'visible';
}
/**
 * 隐藏一个元素
 * @param id
 */
function H(id) {
	var temp = G(id);
	if (temp)
		temp.style.visibility = 'hidden';
}

/**
 * 返回IPTV门户或者来源地址
 */
function goIptvPortal() {
	window.location.href = Authentication.CTCGetConfig('EPGDomain');
}

/**
 * 命名空间 Epg
 * all: Function,             函数调用
 * ajax: Function,            ajax异步通讯
 * getContextPath: Function,  获取路径
 * getParent: Function        获取父窗体
 */
var Epg = {
	/**
	 * 调用函数
	 * @param fn
	 * @param args
	 * @returns {*}
	 */
	call: function(fn, args) {
		if (typeof fn == "string" && fn !== '') //update 20140508
		{
			return eval("(" + fn + ")");
		} else if (typeof fn == "function") {
			if (!this.isArray(args)) //update 20140526
			{
				//首页，arguments不是标准的数组（是一个伪数组），所以直接arguments.slice(1)在电脑上都会报错
				//其次，标清机顶盒不支持Array.prototype.slice.call(arguments,1)的写法
				var temp = []; //注意，这里千万不要直接：args=[];然后对args操作，因为arguments存放的是args的引用，否则args会无限循环
				for (var i = 1; i < arguments.length; i++)
					temp.push(arguments[i]);
				args = temp;
			}
			return fn.apply(window, args);
		}
	},

	/**
	 * ajax异步通讯
	 *  iPanel3.0,webkit可用
	 * @param config
	 */
	ajax: function(config) {
		var url = config.url;
		var data = config.data;
		var type = (config.type || 'GET').toUpperCase();
		var contentType = config.contentType || 'application/x-www-form-urlencoded';
		var dataType = config.dataType;
		var headers = config.headers || [];
		var fnSuccess = config.success;
		var fnError = config.error;
		var xmlhttp;
		if (window.XMLHttpRequest)
			xmlhttp = new XMLHttpRequest();
		else
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				var rsp = xmlhttp.responseText || xmlhttp.responseXML;
				if (dataType == 'json')
					rsp = eval("(" + rsp + ")");
				if (xmlhttp.status == 200)
					Epg.call(fnSuccess, [xmlhttp, rsp]);
				else
					Epg.call(fnError, [xmlhttp, rsp]);
			}
		};

		xmlhttp.open(type, url, true);
		for (var i = 0; i < headers.length; ++i) {
			xmlhttp.setRequestHeader(headers[i].name, headers[i].value);
		}
		xmlhttp.setRequestHeader('Content-Type', contentType);

		if (typeof data == 'object' && contentType == 'application/x-www-form-urlencoded') {
			var s = '';
			for (attr in data) {
				s += attr + '=' + data[attr] + '&';
			}
			if (s) {
				s = s.substring(0, s.length - 1);
			}
			xmlhttp.send(s);
		} else
			xmlhttp.send(data);
	},

	/**
	 * 获取上下文路径，形如：/health-sd/
	 * @returns {String}
	 */
	getContextPath: function() {
		var contextPath = '/' + location.href.split('/')[3] + '/';
		return contextPath;
	},

	/**
	 * 获取父窗体
	 * @returns {Window}
	 */
	getParent: function() {
		return window == window.parent ? window.top : window.parent;
	}
};

/*****************************************************************************
 * 日志相关
 * @type {{
 * ajax: Function,         ajax异步提交
 * access: Function,       保存访问日志
 * updateLastVodLog: Function, 更新上一次点播日志
 * updateCalorie: Function,更新点播日志中的卡路里
 * saveGameLog: Function,  保存游戏访问日志
 * addOrderLog: Function,  保存订购日志
 * debug: Function         出错日志
 * }}
 */
Epg.Log = {

	/**
	 * ajax异步提交
	 * @param url
	 * @param async
	 */
	ajax: function(url, async) {
		if (debug_mode) // 调试模式立刻返回
		{
			return;
		}

		var xmlHttp = null;
		if (window.XMLHttpRequest)
			xmlHttp = new XMLHttpRequest();
		else if (window.ActiveXObject)
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		if (xmlHttp) {
			xmlHttp.open("GET", url, async);
			xmlHttp.send(null);
			xmlHttp = null;
		} else {
			var img = document.createElement('img');
			img.src = url;
			img.style.visibility = 'hidden'; //图片必须隐藏
			document.body.appendChild(img);
		}
	},
	/**
	 * 保存访问日志，target和targetType这2个字段有一个为空均不记录日志
	 * @param source         来源页面，   必须参数
	 * @param target         当前页面，   必须参数
	 * @param targetType     当前页面类型，必须参数
	 * @param elementCode    当前页面元素编码，只有需要的时候才需要传此值
	 * @param addAccessLog   是否添加访问日志，只有addAccessLog为字符串的'false'才不记录日志，其它情况均记录，
	 * 				          把这个参数放在这里是为了兼容以前的写法，因为后面4个参数是新加的
	 * @param pageProp       当前页面属性
	 * @param pagePropSrc    来源页面属性
	 * @param sourceType     来源页面类型(可废除)
	 * @param elementCodeSrc 来源页面元素编码(可废除)
	 */
	access: function(source, target, targetType, elementCode, addAccessLog, pageProp, pagePropSrc, sourceType, elementCodeSrc) {
		if (target === '' || targetType === '' || addAccessLog === 'false')
			return;
		var url = Epg.getContextPath() + 'mc-log.jsp?method=access&source=' + source + '&target=' + target + '&targetType=' + targetType + '&elementCode=' + elementCode + '&pageProp=' + pageProp + '&pagePropSrc=' + pagePropSrc + '&elementCodeSrc=' + elementCodeSrc + '&sourceType=' + sourceType;
		this.ajax(url, true);
	},
	/** 更新上一次点播日志 */
	updateLastVodLog: function(callback) {
		var url = Epg.getContextPath() + 'mc-log.jsp?method=updateLastVodLog';
		this.ajax(url, true); //必须同步 否则某些页面无法更新点播日志中的卡路里 不能为false 否则中兴B600盒子获取不了cookie
		if (typeof callback === "function")
			setTimeout(callback, 100);
	},
	/**
	 * 更新点播日志中的卡路里
	 * @param prevVodLogKey 点播记录在缓存中的key或在数据库中的主键id
	 * @param totalCalorie 整个视频的卡路里
	 * @param rate 用户观看时长占整个视频时长的百分比
	 * @param callback 调用完接口后执行的回调函数，一般都是跳转到一个新的地址
	 */
	updateCalorie: function(prevVodLogKey, totalCalorie, rate, callback) {
		if (totalCalorie) //如果卡路里不存在就不调用接口了
		{
			totalCalorie = parseInt(totalCalorie);
			totalCalorie = totalCalorie * rate;
			totalCalorie = parseInt(totalCalorie + 0.5); //对于含有小数的卡路里四舍五入处理
			var url = Epg.getContextPath() + 'mc-log.jsp?method=updateCalorie&prevVodLogKey=' + prevVodLogKey + "&calorie=" + totalCalorie;
			this.ajax(url, true); //必须同步 否则某些页面无法更新点播日志中的卡路里 不能为false 否则中兴B600盒子获取不了cookie
		}
		if (typeof callback === "function")
			setTimeout(callback, 100);
	},
	/**
	 * 保存游戏访问日志
	 * @param code为游戏关键字
	 * @param level 当前游戏等级
	 * @param isPassed 是否通过当前关
	 */
	saveGameLog: function(code, level, isPassed) {
		var url = Epg.getContextPath() + 'mc-log.jsp?method=saveGameLog&code=' + code + '&level=' + level + '&isPassed=' + isPassed;
		this.ajax(url, false); //必须同步 否则某些页面无法保存游戏日志
	},

	/**
	 * 保存订购日志
	 * 
	 */
	addOrderLog: function(resultCode, orderType, source, sourceType, code, info) {
		var url = Epg.getContextPath() + 'mc-log.jsp?method=addOrderLog&resultCode=' + resultCode + '&orderType=' + orderType + '&source=' + source + '&sourceType=' + sourceType + '&code=' + code + '&info=' + info;
		this.ajax(url, true);
	},
	/**
	 * 出错日志
	 */
	debug: function(info) {
		var url = Epg.getContextPath() + 'mc-log.jsp?method=debug&info=' + info;
		this.ajax(url, true);
	},
	/**
	 * 显示调试信息
	 * @param msg    信息文本；
	 * @param show 是否显示，默认显示，true显示，false不显示。
	 */
	info: function(msg, isShow) {
		var _div_id = 'mc_debug_info_div';
		var _msg_div = document.getElementById(_div_id);
		var loc = '';

		if (!_msg_div) {
			_msg_div = document.createElement('div');
			_msg_div.id = _div_id;
			_msg_div.setAttribute("style", "position:absolute; top:0px;left:0px; width:100%;height:600px; color:#00FF00; font-size: 12px; z-index: 9999; scrollbar-face-color: #ffffff; scrollbar-highlight-color: #ffffff; scrollbar-shadow-color: #919192; scrollbar-3dlight-color:#ffffff; scrollbar-arrow-color: #919192; scrollbar-track-color: #ffffff; scrollbar-darkshadow-color: #ffffff; border:0px solid #ffffff; background-image: url('./image/000000_1x1a60.png'); word-wrap:break-word;word-break:break-all;display:none;backgroundColor:rgba(0,0,0,0.6)");
			document.body.appendChild(_msg_div);
		}

		if (_msg_div) {
			if (_msg_div.innerHTML.length >= 9000) {
				_msg_div.innerHTML = "";
			}

			isShow = typeof isShow !== 'undefined' ? isShow : true; //默认显示
			if (false == isShow) {
				_msg_div.style.display = "none";
			} else {
				_msg_div.style.display = "block";
			}
			//try {
			//	throw new Error();
			//} catch (e) {
			//	loc= ' '+e.stack.replace(/Error\n/).split(/\n/)[1].replace(/^\s+|\s+$/, "");
			//	if(loc == 'undefined')
			//	loc = '';
			//}

			var n = new Date();
			_msg_div.innerHTML += "<br/>" + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds() + "_" + n.getMilliseconds() + ">  " + msg + loc;
		}
	}
};

/*****************************************************************************
 * 自定义按钮对象
 * @type,
 * _buttonStore: {},
 * around: {},
 * init: Function,  初始化按钮
 * get: Function,   获取按钮
 * move: Function,  移动按钮（焦点）
 * set: Function,   设置初始获得焦点的按钮
 * click: Function, 点击确定按钮
 * update: Function 更新
 */
Epg.Button = Epg.btn = {
	_buttonStore: {}, //存放页面所有按钮对象
	around: {},
	/**
	 * 初始化按钮
	 * @param defaultButtonId 默认按钮ID，可以是string类型，也可以是string数组
	 * @param buttons 按钮数组
	 * @param imagePath 图片路径，如果焦点图或者默认图不是http开头会自动在前面添加imagePath
	 * @param initKeys boolean类型，是否初始化6个默认按键：上、下、左、右、确定、返回
	 * @param eager 是否提前加载焦点图片，boolean类型
	 *
	 * 更多config参数：
	 *  clickKeySound ：点击的按键声音，不传会有默认值，目前仅支持OTT，传false时表示禁用
	 *  moveKeySound  ：移动按钮的按键声音，不传会有默认值，目前仅支持OTT，传false时表示禁用
	 *  animate       ：全局的动画开关
	 *  animateType   ：动画实现方式，可选：'js'、'css3'，默认js实现，
	 *
	 * 配置在按钮上的可选参数：
	 *  disable     ： 如果配置为true，那么将会视作这个按钮不存在，增加此参数可以避免移除DOM或者移除buttons对象的麻烦
	 *  zoom        ： 是否启用按钮聚焦时放大效果，zoom与animate不能同时开启
	 *  zoomScale   ： 按钮聚焦放大的倍数，默认1.2倍
	 *  defaultScale： 按钮聚焦还原时的放大倍数，默认1倍
	 *  animate     ： 是否开启光标移动动画效果，只有prev和current都开启了才会有动画效果，可选值：true、false
	 *  animateGroup： 动画分组，对于设置了分组的按钮，只有属于一个分组里面的按钮之间移动才会有动画效果
	 *  twinkle     ： 是否开启按钮闪烁，可以是true或者false，也可以是闪烁的毫秒数，默认200毫秒
	 *  autoPrefix  ： 如果图片路径不是http开头是否自动添加imagePath，默认true
	 *  focusClass  ： 光标聚焦时添加的样式，会自动添加“btn_focus_”前缀，一般通过这个调整img的border来模拟光标,
	 *                目前支持“yellow”和“blue”2种颜色的光标，注意focusClass和focusImage二者并不冲突
	 *  sliders     ： 开启列表滑动 对象['fast','left or top','reduce or plus']  目前只是使用于高清版本
	 */
	init: function(defaultButtonId, buttons, imagePath, initKeys, eager, sliders) {
		//if(debug_mode) {
		//	for (var i = 0; i < buttons.length; i++) {
		//		console.log("buttons[" + i + "].id=" + buttons[i].id, "index=" + buttons[i].index/*, "focusHandler=" + buttons[i].focusHandler*/);
		//	}
		//}

		var config = defaultButtonId;
		if (arguments.length >= 2) {
			config = {
				defaultButtonId: defaultButtonId,
				buttons: buttons,
				imagePath: imagePath,
				initKeys: initKeys,
				eager: eager,
				sliders: sliders
			};
		}
		config.clickKeySound = config.clickKeySound === undefined ? 'defaultClick' : config.clickKeySound; //设置默认点击的声音
		config.moveKeySound = config.moveKeySound === undefined ? 'defaultMove' : config.moveKeySound; //设置默认移动按钮的声音
		config.animateType = config.animateType === undefined ? 'js' : config.animateType; //动画实现方式
		this._config = config; //保存config备用
		//如果需要初始化默认的6个按键值
		if (config.initKeys) {
			Epg.key.init();
			Epg.key.set({
				KEY_ENTER: 'Epg.Button.click()', //确定键
				KEY_LEFT: 'Epg.Button.move("left")', //左键
				KEY_RIGHT: 'Epg.Button.move("right")', //右键
				KEY_UP: 'Epg.Button.move("up")', //上键
				KEY_DOWN: 'Epg.Button.move("down")', //下键
				KEY_BACK: 'back()' //返回键
			});
		}

		this.previous = null,
			this.around = {},
			this._buttonStore = {};
		this.paramsStore = [];
		this.ObjectStore = [];

		for (var i = 0; i < config.buttons.length; i++) {
			var button = config.buttons[i];
			var _button = G(button.id);

			//修改代码开始
			if (!button) //适配IE7
				continue;

			if (!button.linkImage && _button) //如果没有设置默认按钮，直接把图片的src用作按钮，要求必须写在window.onload里面，否则部分盒子获取不到src
				button.linkImage = _button.src;

			//如果(配置了imagePath && 当前按钮配置了焦点图片 && 当前按钮没有配置autoPrefix=false && 焦点图片不是http开头)
			if (config.imagePath && button.focusImage && button.autoPrefix !== false && button.focusImage.indexOf('http') < 0)
				button.focusImage = config.imagePath + button.focusImage;

			if (config.imagePath && button.linkImage && button.autoPrefix !== false && button.linkImage.indexOf('http') < 0)
				button.linkImage = config.imagePath + button.linkImage;

			if (config.animate === false) //如果全局禁用了动画，给每个按钮都禁用动画
				button.animate = false;

			//增加onclick事件让手机上也能玩
			//改成仅用于开发时使用，因为华为高清盒子上img添加onclick的话机顶盒会生成自己的一套光标
			if (debug_mode && _button) {
				//这种写法会在华为高清上生成2套光标，故不可取
				//_button.setAttribute('onclick', 'Epg.Button.click(undefined, "'+button.id+'")');

				//以下写法在天猫OTT盒子上也会形成2套光标，故也注释掉
				var support_mobile = false; //是否支持手机操作，测试时可以设置为true，上线后必须false
				if (support_mobile) {
					_button.style.cursor = 'pointer';
					_button.addEventListener('click', function(e) {
						Epg.Button.click(undefined, e.target.id);
					});
				}
			}

			this._buttonStore[button.id] = button;
			if ((button.eager || config.eager) && button.focusImage) // 热抓取图片如果需要
				new Image().src = button.focusImage;

			//剧集列表滑动，使用动画必须保证父节点是div 并以_div 结尾
			if (button.slider && enable_animate) {
				var _button = G(button.id + '_div');
				this.ObjectStore.push(_button);
				this.paramsStore.push({
					left: Epg.css(_button, 'left'),
					top: Epg.css(_button, 'top'),
					width: Epg.css(_button, 'width')
				});
			}
		}

		// 设置默认获得焦点的按钮
		if (typeof config.defaultButtonId === 'string')
			this.current = this.get(config.defaultButtonId);
		else if (Epg.isArray(config.defaultButtonId)) {
			for (var i = 0, max = config.defaultButtonId.length; i < max; ++i) {
				var button = this.get(config.defaultButtonId[i]);
				if (button) {
					this.current = button;
					break;
				}
			}
		}

		//判断动画需要的参数是否已加载
		if (Epg.isArray(config.sliders) && button.slider && enable_animate)
			Epg.slider.start(this.ObjectStore, this.paramsStore, config.sliders[0], config.sliders[1], config.sliders[2]);

		this.update();
	},

	/** 获取按钮 */
	get: function(id) {
		if (id === undefined) //id如果不传，默认返回当前按钮
			id = this.current.id;
		if (G(id)) {
			var btn = this._buttonStore[id];
			//如果按钮配置了disable:true，那么视作这个按钮不存在，增加此参数可以避免移除DOM或者移除buttons对象的麻烦，
			if (btn && btn.disable !== true)
				return this._buttonStore[id];
		}
	},

	/**
	 * 移动按钮焦点
	 * @param dir 方向
	 */
	move: function(dir) {
		this._dir = dir; //临时保存当前移动方向
		Epg.playKeySound(this._config.moveKeySound); //播放按键声音

		//如果当前按钮定义了beforeMove方法并且改方法之后行返回false，那么阻止按钮的本次移动
		if (this.current.beforeMove && Epg.call(this.current.beforeMove, [dir, this.current]) === false)
			return;

		var button;
		var nextButtonId = this.current[dir];
		if (typeof nextButtonId == "string") //如果是字符串，强制改为数组，简化代码
			nextButtonId = [nextButtonId];
		if (Epg.isArray(nextButtonId)) {
			for (var i = 0; i < nextButtonId.length; i++) {
				button = this.get(nextButtonId[i]);
				if (button)
					break;
			}
			this.previous = this.current;
			if (button) {
				this.current = button;
				this.update(); //只有按钮存在才更新图片
			}
		}
		//this.update();//只有按钮存在才更新图片
		Epg.call(this.current.moveHandler, [this.previous, this.current, dir]);
	},

	/**
	 * 设置初始获得焦点的按钮
	 * @param buttonId 按钮ID
	 */
	set: function(buttonId) {
		var btn = this.get(buttonId);
		if (!btn) {
			//TODO: 处理设置按钮不存在的情况
			//if (debug_mode) console.log("----您要设置的按钮不存在---- buttonId=" + buttonId );
			return; //如果按钮不存在，不作任何处理
		}

		this.around = {};
		this.previous = this.current;
		this.current = btn;
		this.update();
	},

	/** 
	 * 点击确定按钮
	 * @param interceptor  点击按钮之前触发一个拦截方法
	 * @param btnId        要触发的按钮ID，默认不传就是单击当前光标所在按钮
	 */
	click: function(interceptor, btnId) {
		//如果传了btnId参数，并且它和当前按钮id不一致，那么就设置这个参数为当前按钮
		//这个主要是为了电脑或者手机上能够用鼠标直接单击
		if (btnId && btnId !== this.current.id)
			this.set(btnId);

		Epg.playKeySound(this._config.clickKeySound); //播放按键声音

		var log = this.current.log;
		if (log) // 异步统计按钮点击
			Epg.Log.access(log.source, log.target, log.targetType);

		Epg.call(interceptor, [this.current]); // 在点击按钮前可以执行一个自定义函数，比如统计按钮点击功能
		Epg.call(this.current.action, [this.current]);
	},

	/**
	 *  更新
	 */
	update: function() {
		var prev = this.previous;
		var current = this.current;
		if (prev && G(prev.id)) //如果存在上一个按钮
		{
			var _prev = G(prev.id);
			if (prev.focusClass) //如果配置了focusClass，增加border模拟光标的样式
				Epg.removeClass(_prev, 'btn_focus_' + prev.focusClass);
			if (prev.linkImage)
				_prev.src = prev.linkImage;

			if (prev.twinkle) // 增加闪烁功能
				Epg.twinkle.stop();

			if (enable_animate && prev.zoom) // 增加zoom动画
			{
				var parent = _prev.parentNode;
				var defaultScale = prev.defaultScale || 1; //还原时的比例，默认1
				parent.style.webkitTransition = ''; //大小还原时不需要动画，所以需要立即去掉transition属性
				parent.style.transition = '';
				parent.style.webkitTransform = 'scale(' + defaultScale + ')'; //启用zoom动画必须保证父节点是div
				parent.style.transform = 'scale(' + defaultScale + ')'; //启用zoom动画必须保证父节点是div
				parent.style.zIndex = ''; //光标移开时还原默认的zIndex
			}

			Epg.call(prev.blurHandler, [prev]);
		}
		if (current) //如果存在当前按钮
		{
			var _current = G(current.id);
			if (current.focusClass) //如果配置了focusClass，增加border模拟光标的样式
				Epg.addClass(_current, 'btn_focus_' + current.focusClass);
			if (current.focusImage)
				_current.src = current.focusImage;

			//动画代码开始
			//enable_animate 作为一个全局的开关参数，用来控制是否允许执行动画
			//如果有上一个按钮，并且符合执行动画条件
			if (prev && enable_animate !== false && prev.animate && current.animate && prev.animateGroup === current.animateGroup) {
				var useJquery = false; //是否使用jQuery，jQuery仅用于测试
				if (!useJquery) {
					var pImg = G(prev.id);
					var cImg = G(current.id);
					var p = pImg.parentNode;
					var c = cImg.parentNode;
					Epg.Button._zIndex = c.style.zIndex; //存储zIndex用来下次还原
					c.style.zIndex = 300; //移动的时候保证zIndex在最前面
					if (this._config.animateType === 'js') //如果采用js实现动画
					{
						Epg.animate(c, {
							left: [Epg.css(p, 'left'), Epg.css(c, 'left')],
							top: [Epg.css(p, 'top'), Epg.css(c, 'top')]
						}, 'fast', function() {
							c.style.zIndex = Epg.Button._zIndex; //还原成之前的zIndex
							Epg.Button._zIndex = undefined;
							// 增加闪烁功能
							if (Epg.btn.current.twinkle) Epg.twinkle.start(Epg.btn.current.id, Epg.btn.current.twinkle);
						});
						//将当前图片的宽高度从prev的状态变成current的状态，如果宽高度都一样那么动画不会执行
						Epg.animate(cImg, {
							width: [Epg.css(pImg, 'width'), Epg.css(cImg, 'width')],
							height: [Epg.css(pImg, 'height'), Epg.css(cImg, 'height')]
						}, 'fast', function() {}, 'default2'); //tag一定不能和上面的一样
					} else if (this._config.animateType === 'css3') //否则使用css3实现，还有些问题，有待完善
					{
						var _left = Epg.css(c, 'left'),
							_top = Epg.css(c, 'top'),
							_width = Epg.css(cImg, 'width'),
							_height = Epg.css(cImg, 'height');
						Epg.css(c, 'webkitTransition', '');
						Epg.css(c, 'transition', '');
						Epg.css(c, 'left', Epg.css(p, 'left'));
						Epg.css(c, 'top', Epg.css(p, 'top'));
						Epg.css(cImg, 'width', Epg.css(pImg, 'width'));
						Epg.css(cImg, 'height', Epg.css(pImg, 'height'));
						setTimeout(function() {
							Epg.css(c, 'webkitTransition', 'all 0.2s');
							Epg.css(c, 'transition', 'all 0.2s');
							Epg.css(c, 'left', _left);
							Epg.css(c, 'top', _top);
							Epg.css(c, 'width', _width);
							Epg.css(c, 'height', _height);
						}, 20); //延迟20ms执行
						Epg.one(c, 'webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend', function() {
							c.style.zIndex = Epg.Button._zIndex; //还原成之前的zIndex
							Epg.Button._zIndex = undefined;
							if (Epg.btn.current.twinkle) Epg.twinkle.start(Epg.btn.current.id, Epg.btn.current.twinkle);
						});
					}
				} else //如果使用jQuery动画，仅供测试
				{
					var p = $('#' + prev.id).parent();
					var c = $('#' + current.id).parent();
					var left = c.css('left');
					var top = c.css('top');
					c.css('left', p.css('left')).css('top', p.css('top'))
						.animate({
							left: left,
							top: top
						}, 'fast', function() {
							if (Epg.btn.current.twinkle) //增加闪烁功能
								Epg.twinkle.start(Epg.btn.current.id, Epg.btn.current.twinkle);
						});
				}
			} else {
				if (current.twinkle) // 增加闪烁功能
					Epg.twinkle.start(current.id, current.twinkle);

				if (enable_animate && current.zoom) //增加zoom动画
				{
					var parent = G(current.id).parentNode;
					var zoomScale = current.zoomScale || 1.2; //放大比例，默认1.2倍
					parent.style.zIndex = '300'; //启用zoom动画的按钮必须保证z-index在最前，否则可能会被其它图片遮住
					parent.style.webkitTransition = 'all 0.5s';
					parent.style.transition = 'all 0.5s';
					parent.style.webkitTransform = 'scale(' + zoomScale + ')'; //启用zoom动画必须保证父节点是div
					parent.style.transform = 'scale(' + zoomScale + ')'; //启用zoom动画必须保证父节点是div
				}
			}
			Epg.call(current.focusHandler, [current]);
		}
	}
};

/*****************************************************************************
 * 播放器实例
 * 注：OTT版时浏览器会注入一个叫mp的对象，跟这个并不冲突
 */
var mp;
var mpInstanceId;

/*****************************************************************************
 * 播放器相关代码
 * speed, 正常播放速度
 * state, play-播放,pause-暂停,fastForward-快进,fastRewind-快退
 * muteFlag, 0-有声,1-静音
 * live,
 * defaultTip,
 *
 * init(),  初始化播放器
 * pause,   暂停播放
 * resume,  继续播放，从暂停、快进、快退中恢复
 * playOrPause,
 * fastForward,
 * fastRewind,
 * volUp,
 * volDown,
 * switchAudioChannel,
 * getCurrentAudioChannel,
 * toggleMuteFlag,
 * getMediaStr,
 * fullscreenPlay,
 * smallvodPlay,
 * liveFullscreenPlay,
 * liveSmallvodPlay,
 * playByTime,
 * playBySpecificMp,
 * getCurrentPlayTime,
 * getMediaDuration,
 * parseTimeInfo,
 * getPlayTimeInfo,
 * getPlayTimePercent,
 * getRate,
 * destroy,
 * isEndOrError
 */
Epg.Mp = Epg.mp = (function() {
	return {
		speed: 1, // 正常播放速度
		state: 'play', // play-播放,pause-暂停,fastForward-快进,fastRewind-快退
		muteFlag: 0, // 0-有声,1-静音
		live: false, // 直播
		defaultTip: true, // 是否开启默认的提示文字， add 20140514

		/**
		 * 初始化播放器
		 * @param defaultTip
		 */
		init: function(defaultTip) {
			this.defaultTip = defaultTip; //add 20140514
			if (!is_ott) //OTT版不需要这段代码
			{
				mp = new MediaPlayer();
				var instanceId = mp.getNativePlayerInstanceID();
				var playListFlag = 0;
				var videoDisplayMode = 1; // 0-自定义尺寸,1-全屏(默认),255-不显示在背后播放
				var height = 100;
				var width = 100;
				var left = 50; // 自定义尺寸必须指定
				var top = 50; // 自定义尺寸必须指定
				var muteFlag = 0; // 0-有声(默认),1-静音
				var useNativeUIFlag = 0; // 0-不使用player的本地UI显示功能,1-使用player的本地UI显示功能(默认)
				var subtitleFlag = 0; // 0-不显示字幕(默认),1-显示字幕
				var videoAlpha = 0; // 0-不透明(默认),100-完全透明
				var cycleFlag = 1; // 0-设置为循环播放（默认值）, 1-设置为单次播放 
				var randomFlag = 0;
				var autoDelFlag = 0;
				mp.initMediaPlayer(instanceId, playListFlag, videoDisplayMode, height, width, left, top, muteFlag, useNativeUIFlag, subtitleFlag, videoAlpha, cycleFlag, randomFlag, autoDelFlag);
				mp.setAllowTrickmodeFlag(0); //0-允许 TrickMode 操做 ,1-不允许 TrickMode 操作 (默认值)

				mpInstanceId = instanceId; // added 20160415
			}
			mp.setProgressBarUIFlag(0); //0：不显示自带的进度条，1：显示自带进度条，默认为显示
			mp.setAudioVolumeUIFlag(1); //显示自带的音量UI，我们自定义的声音UI有些机顶盒响应不了
		},

		/**
		 * 暂停播放
		 * @param callback 回调函数
		 */
		pause: function(callback) {
			this.speed = 1;
			this.state = 'pause';
			if(this.defaultTip) Epg.Log.info("暂停");
			//try一下的目的是为了电脑上不报错
			try {
				mp.pause();
			} catch (e) {}
			Epg.call(callback, [this]);
		},

		/**
		 * 继续播放，从暂停、快进、快退中恢复
		 * @param callback
		 */
		resume: function(callback) {
			this.speed = 1;
			this.state = 'play';
			if(this.defaultTip) Epg.Log.info("播放");
			//try一下的目的是为了电脑上不报错
			try {
				mp.resume();
			} catch (e) {}
			Epg.call(callback, [this]);
		},

		/**
		 * 播放或暂停
		 * @param callback
		 */
		playOrPause: function(callback) {
			if (this.state == 'play')
				this.pause();
			else
				this.resume();
			Epg.call(callback, [this.state, this]);
		},

		/**
		 * 快进
		 * @param callback
		 */
		fastForward: function(callback) {
			if (this.speed >= 32 || this.state == 'fastRewind')
				this.resume();
			else {
				this.speed = this.speed * 2;
				this.state = 'fastForward';
				if (this.defaultTip)
					Epg.ykqTip('快进：x' + this.speed);
				mp.fastForward(this.speed);
			}
			Epg.call(callback, [this.state, this.speed, this]);
		},

		/**
		 * 快退
		 * @param callback
		 */
		fastRewind: function(callback) {
			if (this.speed >= 32 || this.state == 'fastForward') {
				this.resume();
			} else {
				this.speed = this.speed * 2;
				this.state = 'fastRewind';
				if (this.defaultTip)
					Epg.ykqTip('快退：x' + this.speed);
				mp.fastRewind(-this.speed);
			}
			Epg.call(callback, [this.state, this.speed, this]);
		},

		/**
		 * 调大声音
		 * @param callback
		 */
		volUp: function(callback) {
			var volume = (+mp.getVolume());
			if (is_ott) {
				var temp = 5 - (volume % 5); //这样做的目的是为了保证以后每次递增时都是5的倍数
				volume = volume + temp; //ott的最大声音不固定，所以无需做最大判断，一般是150
			} else {
				volume += 5;
				volume = volume > 100 ? 100 : volume;
			}
			if (this.defaultTip) {
				//Epg.ykqTip('音量：'+volume);
				Epg.tip('音量：' + volume);
			}
            Epg.ykqTip(volume+'%');
			mp.setVolume(volume);
			Epg.call(callback, [volume, this]);
		},

		/**
		 * 调小声音
		 * @param callback
		 */
		volDown: function(callback) {
			var volume = (+mp.getVolume());
			if (is_ott) {
				var temp = volume % 5;
				temp = temp === 0 ? 5 : temp; //这样做的目的是为了保证以后每次递增时都是5的倍数
				volume = volume - temp;
			} else {
				volume -= 5;
				volume = volume < 5 ? 0 : volume;
			}
			if (this.defaultTip) {
				//Epg.ykqTip('音量：'+volume);
				Epg.tip('音量：' + volume);
			}
            Epg.ykqTip(volume+'%');
			mp.setVolume(volume);
			Epg.call(callback, [volume, this]);
		},

		/**
		 * 切换声道
		 * @param callback
		 */
		switchAudioChannel: function(callback) {
			mp.switchAudioChannel();
            Epg.call(callback, [this.getCurrentAudioChannel(), this]);
		},

		/**
		 * 获取当前声道
		 * @returns {*}
		 */
		getCurrentAudioChannel: function() {
			if (!mp) return 'Stereo';
			return mp.getCurrentAudioChannel() || 'Stereo';
		},

		/**
		 * 开启或关闭声音
		 * @param callback
		 */
		toggleMuteFlag: function(callback) {
			++this.muteFlag;
			if (this.defaultTip)
				Epg.ykqTip(this.muteFlag % 2 == 0 ? '关闭' : '开启' + '静音');
			mp.setMuteFlag(this.muteFlag % 2);
			Epg.call(callback, [this.muteFlag % 2, this]);
		},

		/**
		 * 获取播放串
		 * @param url
		 * @returns {string}
		 */
		getMediaStr: function(url) {
			var json = '';
			json += '[{mediaUrl:"' + url + '",';
			json += 'mediaCode: "jsoncode1",';
			json += 'mediaType:2,';
			json += 'audioType:1,';
			json += 'videoType:1,';
			json += 'streamType:1,';
			json += 'drmType:1,';
			json += 'fingerPrint:0,';
			json += 'copyProtection:1,';
			json += 'allowTrickmode:1,';
			json += 'startTime:0,';
			json += 'endTime:20000.3,';
			json += 'entryID:"jsonentry1"}]';
			return json;
		},

		/** 
		 * 全屏播放<
		 * 针对OTT：
		 * 1、播放MP3：fullscreenPlay('xxx.mp3')
		 * 2、播放传统视频：fullscreenPlay('xxx.mp4')
		 * 3、播放混合音视频：fullscreenPlay('xxx.mp3', 'xxx.mp4')
		 */
		fullscreenPlay: function(url) {
			if (is_ott) {
				if (arguments.length === 2) {
					var audioUrl = arguments[0];
					var videoUrl = arguments[1];
					mp.initMixMediaPlayer(audioUrl, videoUrl);
				} else {
					var type = (url && /\.(mp3|aac)$/g.test(url)) ? 0 : 1; //0表示播放MP3，1表示播放视频，默认也是播放视频
					mp.initMediaPlayer(url, type);
				}
			} else {
				mp.setSingleMedia(this.getMediaStr(url));
				mp.setVideoDisplayMode(1);
				mp.refreshVideoDisplay();
			}
			mp.playFromStart();
        },

		/**
		 * 小视频播放
		 * @param url    媒体资源地址
		 * @param left   播放区域左坐标
		 * @param top    播放区域上坐标
		 * @param width  播放区域宽度
		 * @param height 播放区域高度
		 */
		smallvodPlay: function(url, left, top, width, height) {
			if (is_ott) {
				if (url && /\.mp3$/g.test(url)) //0表示播放MP3，1表示播放视频，不传默认也是播放视频
					mp.initMediaPlayer(url, 0);
				else
					mp.initMediaPlayer(url, left, top, width, height);
			} else {
				mp.setSingleMedia(this.getMediaStr(url));
				mp.setVideoDisplayMode(0);
				mp.setVideoDisplayArea(left, top, width, height);
				mp.refreshVideoDisplay();
			}
			mp.playFromStart();
		},

		/**
		 * 全屏直播
		 * @param channelID 频道ID
		 */
		liveFullscreenPlay: function(channelID) {
			this.live = true;
			mp.joinChannel(channelID);
			mp.setVideoDisplayMode(1);
			mp.refreshVideoDisplay();
			mp.play();
		},

		/**
		 * 小视频直播
		 * @param channelID  频道ID
		 * @param left    播放区域左坐标
		 * @param top     播放区域上坐标
		 * @param width   播放区域宽度
		 * @param height  播放区域高度
		 */
		liveSmallvodPlay: function(channelID, left, top, width, height) {
			this.live = true;
			mp.joinChannel(channelID);
			mp.setVideoDisplayMode(0);
			mp.setVideoDisplayArea(left, top, width, height);
			mp.refreshVideoDisplay();
			mp.play();
		},

		/**
		 * 定点播放，从指定时间开始播放
		 * @param second
		 */
		playByTime: function(second) {
			mp.playByTime(1, second);
		},

		/**
		 * 定点播放2
		 * @param playerType
		 * @param position
		 * @param url
		 */
		playBySpecificMp: function(playerType, position, url) {
			var type = (url && /\.(mp3|aac)$/g.test(url)) ? 0 : 1; //0表示播放MP3，1表示播放视频，不传默认也是播放视频
			mp.playBySpecificMp(playerType, position, url, type);
		},

		/**
		 * 获取当前播放时间
		 * @returns {*}  返回当前播放时间
		 */
		getCurrentPlayTime: function() {
			if (mp) return (parseInt(mp.getCurrentPlayTime()) || 0);
			else return 0;
		},

		/**
		 * 获取总时长，还没加载时一般获取到的是NaN或者0
		 * @returns {*}
		 */
		getMediaDuration: function() {
			if (mp) return (parseInt(mp.getMediaDuration()) || 0); //还没加载时一般获取到的是NaN或者0
			else return 0;
		},

		/**
		 *  将时间转换成MM:SS形式
		 * @param second
		 * @returns {string}
		 */
		parseTimeInfo: function(second) {
			var m = Math.floor(second / 60);
			m = m < 10 ? ('0' + m) : m;
			var s = second % 60;
			s = s < 10 ? ('0' + s) : s;
			return m + ':' + s;
		},

		/**
		 * 返回MM:SS/MM:SS 形式的时间
		 * @returns {string}
		 */
		getPlayTimeInfo: function() {
			return this.parseTimeInfo(this.getCurrentPlayTime()) + '/' + this.parseTimeInfo(this.getMediaDuration());
		},

		/**
		 * X 获取当前播放进度nn%
		 * 不再使用
		 * @returns {*}
		 */
		getPlayTimePercent: function() {
			//这个toFixed将来要删除(创维不支持toFixed方法)，因为暂时没用到这个方法，所以先不管
			var rate = this.getRate();
			if (rate === 0) return '0%';
			return rate.toFixed(2) * 100 + '%';
		},

		/**
		 * 获取播放总进度比例，返回介于0-1之间的小数
		 * @returns {number}
		 */
		getRate: function() {
			var duration = this.getMediaDuration();
			if (duration === 0) return 0; //因为0/0=NaN，所以要避免这种情况
			return this.getCurrentPlayTime() / duration;
		},

		/**
		 * 结束播放，释放资源
		 */
		destroy: function() {
			if (this.live) {
				this.live = false;
				mp.leaveChannel();
			}
			if (mp) {
				mp.stop();
				mp.releaseMediaPlayer(mpInstanceId); // added 20160415
			}

		},

		/**
		 * 是否播放完了或播放出错
		 * @param keyCode
		 * @returns {boolean}
		 */
		isEndOrError: function(keyCode) {
			return keyCode === 'EVENT_MEDIA_END' || keyCode === 'EVENT_MEDIA_ERROR';
		}
	};
})();

/*****************************************************************************
 * 事件处理
 * @param e
 */
var event_handler = function(e) {
	e = e || window.event;
	var keyCode = e.which || e.keyCode;
	if (keyCode === KEY_IPTV_EVENT) {
		eval("oEvent = " + Utility.getEvent());
		Epg.eventHandler(oEvent.type, true);
	} else {
		/*
		var currentFocus = e.target.nodeName.toLowerCase();
		currentFocus = document.activeElement.nodeName.toLowerCase();
		// 阻止浏览器默认的“返回键后退”功能
		if(keyCode === KEY_BACK)
		{
			if(currentFocus !== 'input')
				e.preventDefault();
		}
		if(currentFocus === 'input')
		{
			if(keyCode >= KEY_LEFT && keyCode <= KEY_DOWN)//37<=keyCode<=40
			{
				e.preventDefault();
				G('default_link').focus();
				return false;
			}
		}
		Epg.eventHandler(keyCode);
		*/

		// 阻止浏览器默认的“返回键后退”功能
		////if(keyCode === KEY_BACK) e.preventDefault(); //  deleted  for back-key bug

		Epg.eventHandler(keyCode);
	}

	//if (keyCode == KEY["KEY_3"]){
	//	if (DEBUG_INFO_ELEMENT_ID){
	//            	var elDebugInfo=document.getElementById(DEBUG_INFO_ELEMENT_ID);
	//            	if (elDebugInfo) {
	//                	if (elDebugInfo.style.display=="none"){
	//                    		elDebugInfo.style.display = "block";
	//                	}else{
	//                    		elDebugInfo.style.display = "none";
	//                	}
	//            	}
	//        }
	//}

};

//根据UA判断onkeydown和onkeypress
//IPTV上一些比较烂的盒子只支持onkeypress，onkeydown无法响应上下左右（如华为EC2108）,
//但是电脑上Chrome和IE均只支持onkeydown，火狐则二者都支持，
//但是现在OTT盒子因为基本上都是webkit内核的，故也只有onkeydown能正常响应上下左右，
//所以终级解决方案是：开发时统一onkeydown，上线后，IPTV统一使用onkeypress，OTT统一使用onkeydown
if (is_ott || (debug_mode && /webkit/g.test(navigator.userAgent.toLowerCase()))){
    document.onkeydown = event_handler;
}else {
    document.onkeypress = event_handler;
}

window.epg = Epg; //增加别名.
