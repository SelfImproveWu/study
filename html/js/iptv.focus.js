//此文件依赖iptv.utility.js

window.focus();

//变量部分
var g_aFocusTargets=[];

//默认的移出屏幕外面的部分 默认如此 可在具体页面中赋值覆盖此定义=> 这些主要针对一些屏幕上滚动的不可见元素
var g_iFocusLeftLimit=0;
var g_iFocusRightLimit=1280;
var g_iFocusTopLimit=0;
var g_iFocusBottomLimit=720;

var g_iFocusFrameWidth=9; //焦点默认边框宽度
var g_iFocusFrameHeight=9; //焦点默认边框高度

var g_strFocusElementId = g_strFocusElementId || ""; //此变量需要赋值为初始值，定义在页面

var g_iMaxOffsetOfCenter = 360; //暂时未用
//var g_iBlockHeight = 360; //上下移动的Block

var g_iLeftBlockIndex = 0;
//for (var i=0;i<aFocusTargets.length;i++){
//	console.log(aFocusTargets[i].id);	
//}
var g_fnOnBeforeFocusChange = null; //都是一个参数
var g_fnOnAfterFocusChange = null;

var g_bIsUTBox=(-1!=navigator.userAgent.indexOf("QingYu") || -1!=navigator.userAgent.indexOf("JETU"));
var g_bIsHuawei6108=(-1!=navigator.appName.indexOf('Ranger'));
var g_bIsZteB700v2u=(-1!=navigator.userAgent.indexOf('B700-V2A'));
var g_bIsFengHuoHG650=(-1!=navigator.appName.indexOf('Fhbw2.0'));
var g_bIsSkyworthE5100=(-1!=navigator.userAgent.indexOf('DS4900'));
var g_bIsSkyworthE900=(-1!=navigator.userAgent.indexOf('SkyworthBrowser'));
var g_bIsZTEB860Box= (-1!=navigator.userAgent.indexOf('7B367'));
var g_bIsZTEB700Box= (-1!=navigator.userAgent.indexOf('B700'));
var g_bIsHuaweiEC6108V9=(-1!=navigator.appName.indexOf('HWBrowser'));
var g_fScaleFactor = (g_bIsUTBox || g_bIsZTEB700Box ) ? 1.0:1.05;


var g_strFocusHTML= //"<table  class='focus_table smooth_animation_1000' style='background-color:#fff000;'><tr><td id='focus1' class='focus1'></td><td id='focus2' class='focus2'>hhh</td><td id='focus3' class='focus3'></td></tr></table>"
					//注意下面的focus5 td里一定要留一个&nbsp; ，有些Stupid浏览器不会出现渲染异常
					"<table id='focus_table' class='focus_table smooth_animation_1000' border='0' cellspacing='0' cellpadding='0'>"
						+"<tr><td id='focus1' class='focus1'></td><td id='focus2' class='focus2'></td><td id='focus3' class='focus3'></td></tr>"
						+"<tr><td id='focus4' class='focus4'></td><td id='focus5' class='focus5'>&nbsp; </td><td id='focus6' class='focus6'></td></tr>" 
						+"<tr><td id='focus7' class='focus7'></td><td id='focus8' class='focus8'></td><td id='focus9' class='focus9'></td></tr>"
					+"</table>";
var g_strFocusHTMLb= //"<table  class='focus_table smooth_animation_1000' style='background-color:#fff000;'><tr><td id='focus1' class='focus1'></td><td id='focus2' class='focus2'>hhh</td><td id='focus3' class='focus3'></td></tr></table>"
					//注意下面的focus5 td里一定要留一个&nbsp; ，有些Stupid浏览器不会出现渲染异常
					"<table id='focus_table' class='focus_table smooth_animation_1000' border='0' cellspacing='0' cellpadding='0'>"
						+"<tr><td id='focus1' class='focus1b'></td><td id='focus2' class='focus2b'></td><td id='focus3' class='focus3b'></td></tr>"
						+"<tr><td id='focus4' class='focus4b'></td><td id='focus5' class='focus5b'>&nbsp; </td><td id='focus6' class='focus6b'></td></tr>" 
						+"<tr><td id='focus7' class='focus7b'></td><td id='focus8' class='focus8b'></td><td id='focus9' class='focus9b'></td></tr>"
					+"</table>";
					
var g_strStupidFocusHTML="<div id='stupid_focus_container'><div style='position:relative;top:0px;left:0px;background-color:#ff0000;width:100%;height:100%;'>aaaaa</div></div>";
				/*
					"<table id='stupid_focus_table' class='focus_table smooth_animation_1000' border='0' cellspacing='0' cellpadding='0'>"
						+"<tr><td id='stupid_focus1' class='stupid_focus1'></td><td id='stupid_focus2' class='stupid_focus2'></td><td id='stupid_focus3' class='stupid_focus3'></td></tr>"
						+"<tr><td id='stupid_focus4' class='stupid_focus4'></td><td id='stupid_focus5' class='stupid_focus5'></td><td id='stupid_focus6' class='stupid_focus6'></td></tr>"
						+"<tr><td id='stupid_focus7' class='stupid_focus7'></td><td id='stupid_focus8' class='stupid_focus8'></td><td id='stupid_focus9' class='stupid_focus9'></td></tr>"
					+"</table>";
				*/

var g_intervalFocusBreath=null;

var g_iFocusStatus = 0;// 0-page 其他在页面中定义 比如1-搜索键盘  2-确认区域 

var g_strUTBoxPrevClass="";  //用于UT盒子的历史 css class名;

function collectFocusElement(){
	//收集焦点区域
	g_aFocusTargets=[];		
	var elTargets=document.getElementsByClassName("focusable");
	for (var i=0;i<elTargets.length;i++){
		//if(doesElementDisplay(elTargets[i])){
			var index=parseInt(elTargets[i].getAttribute('focusstatus'));
			if(!g_aFocusTargets[index]){g_aFocusTargets[index]=[]; }
			g_aFocusTargets[index].push(elTargets[i]);	
		//}
		
		
		//UT破盒子的特殊处理  //此方案已放弃 请勿留恋
		/*
		Log.warning('This is a UTBox');
		var elA4UT=document.getElementById(elTargets[i].id+"_utlink");
		
		
		if (g_bIsUTBox){
			if (elA4UT){
				//removeElement(elA4UT);
			}
			elTargets[i].innerHTML='<a id="'+elTargets[i].id+'_utlink" class="ut_link" href="javascript:void(0);" onfocus="onUTBoxLinkFocus(this);" onblur="onUTBoxLinkBlur(this);">a</a>'+elTargets[i].innerHTML;
		}*/
	}
}

function initFocus(strFocusTargetId,onBeforeFocusChange,onAfterFocusChange/*,onPageKeyDown,onPageKeyUp*/) {
    try{
		Log.info("Focus:"+strFocusTargetId);
		g_strFocusElementId = strFocusTargetId;
        var elFocusTarget = document.getElementById(strFocusTargetId);
//		Log.info("strFocusTargetId"+strFocusTargetId+"elFocusTarget"+elFocusTarget);
		//专门针对UT老盒子的处理 Start
		
		if (g_bIsUTBox){
			
			
			g_fnOnBeforeFocusChange = onBeforeFocusChange;
			g_fnOnAfterFocusChange = onAfterFocusChange;


            //初始化没有LeaveFocus 之前也没有进入的元素
			if (!elFocusTarget) { 
				//cosole.log("Init Focus... Failed!");
				Log.error("Init Focus... Failed!");
				return;
			}
			
			if (g_fnOnBeforeFocusChange){
				g_fnOnBeforeFocusChange(null,document.getElementById(g_strFocusElementId)  ,null);
			}

            //黄边框方案
			addClass(elFocusTarget,'ut_focus');
			Log.info(elFocusTarget.className);
			
			if (g_fnOnAfterFocusChange){
				g_fnOnAfterFocusChange(null,document.getElementById(g_strFocusElementId)  ,null);
			}
			
			/*
			var elStupidFocusContainer=document.getElementById('stupid_focus_container');
			
			
	
			if (!elStupidFocusContainer) {
				
				elFocusTarget.innerHTML=g_strStupidFocusHTML+elFocusTarget.innerHTML;
			}

			
			
			
			
			//elStupidFocusContainer.style.left=-g_iFocusFrameWidth+'px';
			//elStupidFocusContainer.style.top=-g_iFocusFrameHeight+'px';
			
			//Log.info("init...["+g_strFocusElementId+"]:"+elStupidFocusContainer.style.left+","+elStupidFocusContainer.style.top
			//		+","+elStupidFocusContainer.style.width+","+elStupidFocusContainer.style.height);
			
			//Log.info(elFocusTarget.innerHTML+":"+elFocusContainer.innerHTML.substring(50,20));
			showFocus();*/
			
			

			return;
			
		}
		//专门针对UT老盒子的处理 End 
		
		
				
		
		//往页面中插入焦点模块
        var elFocusContainer=document.getElementById('focus_container');

        if (!elFocusContainer) {
            elFocusContainer=document.createElement('div');

            elFocusContainer.setAttribute('id','focus_container');
            if (!g_bIsZTEB860Box){
            	elFocusContainer.innerHTML= g_strFocusHTML;
			}else{
				elFocusContainer.innerHTML= g_strFocusHTMLb; //针对某些有边线的奇葩盒子比如 ZTE B860
			}
				
            document.body.appendChild(elFocusContainer);
        }

		//移到 iptv.utility.js initPageKey里去了
        //g_fnOnPageKeyDown = onPageKeyDown;
		//g_fnOnPageKeyUp = onPageKeyUp;
        

        
		
		g_fnOnBeforeFocusChange = onBeforeFocusChange;
		g_fnOnAfterFocusChange = onAfterFocusChange;
		
        if (!elFocusTarget) { 
            //cosole.log("Init Focus... Failed!");
            Log.error("Init Focus... Failed!");
            return;
        }
		
        //初始化没有LeaveFocus 之前也没有进入的元素
        if (g_fnOnBeforeFocusChange){
            g_fnOnBeforeFocusChange(null,document.getElementById(g_strFocusElementId)  ,null);
        }
        
       
        
        //准备目标焦点数据存放到临时变量以防动画导致数值异常
        var destFocusLeft=pageX(elFocusTarget)-g_iFocusFrameWidth+"px";  //Log.info(destFocusLeft);
        var destFocusTop= pageY(elFocusTarget)-g_iFocusFrameHeight+"px"; //Log.info(destFocusTop);

        var destFocusWidth="";
        var destFocusHeight = "";

        if (elFocusTarget.offsetWidth && elFocusTarget.offsetHeight) {
            destFocusWidth = elFocusTarget.offsetWidth + 2*g_iFocusFrameWidth + 'px'; //Log.info(destFocusWidth);
            destFocusHeight = elFocusTarget.offsetHeight + 2*g_iFocusFrameHeight + 'px'; //Log.info(destFocusHeight);
        } else { 
            destFocusWidth = parseInt(elFocusTarget.style.width) + 2*g_iFocusFrameWidth + 'px'; //Log.info(destFocusWidth);
            destFocusHeight = parseInt(elFocusTarget.style.height) + 2*g_iFocusFrameHeight + 'px'; //Log.info(destFocusHeight);
        }
		
        
        

        document.getElementById("focus_container").style.left = destFocusLeft;
	    document.getElementById("focus_container").style.top = destFocusTop;
		document.getElementById("focus_container").style.width = destFocusWidth;
		document.getElementById("focus_container").style.height = destFocusHeight;

		//最后再设置动画 防止进入是飞入的 电信不喜欢
		
		showFocus();
		
		window.setTimeout(function(){
			if (!g_bIsZTEB700Box){ //这个机顶盒无法用动画效果 太卡了
				elFocusContainer.setAttribute('class','smooth_animation_300');
			}
		},500);
			
		if (g_fnOnAfterFocusChange){
			g_fnOnAfterFocusChange(null,document.getElementById(g_strFocusElementId)  ,null);
		}
		
	    //document.getElementById("focus_container").style.visibility = "visible";
    } catch (err) {
        Log.error(JSON.stringify(err)+ " in initFocus");
    }
}

	
function scaleElement(target,factorX,factorY){
    var elTarget = document.getElementById(target);
    if (elTarget && factorX && factorY) {
   		elTarget.style.transitionDuration = '300ms';
        elTarget.style.webkitTransitionDuration = '300ms';
        elTarget.style.transform = "scale(" + factorX+","+factorY + ")";
        elTarget.style.webkitTransform = "scale(" + factorX+","+factorY + ")";
    }
}


 
function pageX(el){
	return el.offsetParent?el.offsetLeft+pageX(el.offsetParent):el.offsetLeft;
}
  
//top
function pageY(el){
	return el.offsetParent?el.offsetTop+pageY(el.offsetParent):el.offsetTop;
}

//真的有必要为UT的盒子做个方案吗?
function findFocusTargetStupidly(oAdjacency,iStatus, strDirection){
	var elFocusNow=document.getElementById(g_strFocusElementId);
	//0上 1右 2下 3左 
	var elFocusTarget=null;
	switch(strDirection){
		case "up":
			elFocusTarget=document.getElementById(oAdjacency[iStatus][g_strFocusElementId][0]);
			break;
		case "right":
			elFocusTarget=document.getElementById(oAdjacency[iStatus][g_strFocusElementId][1]);
			break;
		case "down":
			elFocusTarget=document.getElementById(oAdjacency[iStatus][g_strFocusElementId][2]);
			break;
		case "left":
			elFocusTarget=document.getElementById(oAdjacency[iStatus][g_strFocusElementId][3]);
			break;
		default:
			Log.error("No Target Element Found: unavailable direction");
			elFocusTarget=null;
			break;
		
	}
	return elFocusTarget;	
	//var elFocusTarget=aAdjacency[g_strFocusElementId];
}


function flyFocusStupidly(elFocusTarget,strDirection,oScrollParameter){
	
		
	
	//Log.info("1:"+g_strFocusElementId);
	var elFocusNow= document.getElementById(g_strFocusElementId)
	
	
	
	
	if (g_fnOnBeforeFocusChange){
        g_fnOnBeforeFocusChange(elFocusNow,elFocusTarget,strDirection);
    }  

	//简单方案
	//改变过去
	//if (elFocusNow){elFocusNow.style.backgroundColor="#1C5AA2";}
	//if (elFocusNow){elFocusNow.style.border="2px none #000fff";}
	if (elFocusNow){removeClass(elFocusNow,'ut_focus');}
	
	
	//改变未来
	//elFocusTarget.style.backgroundColor="#00ff55";	
	//elFocusTarget.style.border="2px solid #fff000";
	if (elFocusTarget){addClass(elFocusTarget,'ut_focus');}
	/*
	//复杂方案
	//去除原来的焦点
	var elStupidFocusContainer=document.getElementById('stupid_focus_container');
	if (elStupidFocusContainer) {removeElement(elStupidFocusContainer);}
	
	//添加现有的焦点
	
	elFocusTarget.innerHTML=g_strStupidFocusHTML+elFocusTarget.innerHTML;
	
	showFocus();
	*/
	//elStupidFocusContainer.style.left= -g_iFocusFrameWidth +'px';
	//elStupidFocusContainer.style.top = -g_iFocusFrameHeight+'px';
	
	//Log.info("fly...["+elFocusTarget.id+"]:"+elFocusContainer.style.left+","+elFocusContainer.style.top+","	+elFocusContainer.style.width+","+elFocusContainer.style.height);
	
	//Log.info(getCurrentCSS(elFocusTarget,'width')+':'+getCurrentCSS(elFocusTarget,'height'));
	
	if (g_fnOnAfterFocusChange){
        g_fnOnAfterFocusChange(elFocusNow,elFocusTarget,strDirection);
    }
	
	g_strFocusElementId=elFocusTarget.id;
}


function findFocusTarget(aInFocusTargets,iStatus,strDirection){
	
	//专门针对UT老盒子的处理 Start
	if (g_bIsUTBox){
		return findFocusTargetStupidly(g_aAdjacency,iStatus,strDirection);
	}
	//专门针对UT老盒子的处理 End 
	var aFocusTargets=aInFocusTargets[iStatus];
	//Log.info("findFocusTarget:"+ g_strFocusElementId);
	var elFocusNow=document.getElementById(g_strFocusElementId);
    //Log.info(elFocusNow?elFocusNow.id:"null");

    var fCurrentLeft=parseFloat(pageX(elFocusNow));
    var fCurrentTop=parseFloat(pageY(elFocusNow));
    var fCurrentWidth=parseFloat(elFocusNow.offsetWidth);  //clientWidth
    var fCurrentHeight=parseFloat(elFocusNow.offsetHeight); //clientWidth
    
    
    var elFocusTarget=null;
    var fDirectionWeight=5.0;
    var fEvaluationRecord=99999;
    //决定要搞哪一个
    if (strDirection=="up" || strDirection=="down" || strDirection=="left" || strDirection=="right" ){
		for (var i=0;i<aFocusTargets.length;i++){
			/*
			var fTargetLeft=parseFloat(aFocusTargets[i].style.left.replace(/px/g, ""));
			var fTargetTop=parseFloat(aFocusTargets[i].style.top.replace(/px/g, ""));
			var fTargetWidth=parseFloat(aFocusTargets[i].style.width.replace(/px/g, ""));
			var fTargetHeight=parseFloat(aFocusTargets[i].style.height.replace(/px/g, ""));
			*/
		    if (aFocusTargets[i].id == g_strFocusElementId || !doesElementDisplay(aFocusTargets[i])) continue;

			var fTargetLeft=parseFloat(pageX(aFocusTargets[i]));
			var fTargetTop=parseFloat(pageY(aFocusTargets[i]));
			var fTargetWidth=parseFloat(aFocusTargets[i].offsetWidth);//clientWidth
			var fTargetHeight=parseFloat(aFocusTargets[i].offsetHeight);//clientHeight
				
				
			//权重计算 	 移动方向上距离*3+和移动方向垂直的方向中心距离差 的和最小为最近控件
			var fDistanceOfEdge=0.0; //移动方向边缘的距离
			var fOffsetOfCenter=0.0; //垂直移动方向两块区域中心的距离
			var fOverlapWidth=0.0;  //在移动方向上重叠的距离 负数为不重叠
			var fSmallEdgeWidth=0.0; //短的那个边缘的宽度
			
			if (fTargetLeft<g_iFocusRightLimit && fTargetTop< g_iFocusBottomLimit){ //如果目标在限制区域内
				
				
				
				switch(strDirection){
					case "up":
						fDistanceOfEdge=fCurrentTop-fTargetTop-fTargetHeight;
						fOffsetOfCenter=Math.abs(fTargetLeft+fTargetWidth/2-fCurrentLeft-fCurrentWidth/2);
						fOverlapWidth=((fCurrentLeft+fCurrentWidth-fTargetLeft-fTargetWidth>=0)?fTargetLeft+fTargetWidth:fCurrentLeft+fCurrentWidth)
							-((fCurrentLeft-fTargetLeft>=0)?fCurrentLeft:fTargetLeft);
						fSmallEdgeWidth=(fCurrentWidth<fTargetWidth)?fCurrentWidth:fTargetWidth;
						break;
					case "down":
						fDistanceOfEdge=fTargetTop-fCurrentTop-fCurrentHeight;
						fOffsetOfCenter=Math.abs(fTargetLeft+fTargetWidth/2-fCurrentLeft-fCurrentWidth/2);
						fOverlapWidth=((fCurrentLeft+fCurrentWidth-fTargetLeft-fTargetWidth>=0)?fTargetLeft+fTargetWidth:fCurrentLeft+fCurrentWidth)
							-((fCurrentLeft-fTargetLeft>=0)?fCurrentLeft:fTargetLeft);
						fSmallEdgeWidth=(fCurrentWidth<fTargetWidth)?fCurrentWidth:fTargetWidth;
						break;
					case "left":
						fDistanceOfEdge=fCurrentLeft-fTargetLeft-fTargetWidth;
						fOffsetOfCenter= Math.abs(fTargetTop+fTargetHeight/2-fCurrentTop-fCurrentHeight/2);
						fOverlapWidth=((fCurrentTop+fCurrentHeight-fTargetTop-fTargetHeight>=0)?fTargetTop+fTargetHeight:fCurrentTop+fCurrentHeight)
							-((fCurrentTop-fTargetTop>=0)?fCurrentTop:fTargetTop);
						fSmallEdgeWidth=(fCurrentHeight<fTargetHeight)?fCurrentHeight:fTargetHeight;
						break;
					case "right":
						fDistanceOfEdge=fTargetLeft-fCurrentLeft-fCurrentWidth;
						fOffsetOfCenter=Math.abs(fTargetTop+fTargetHeight/2-fCurrentTop-fCurrentHeight/2);
						fOverlapWidth=((fCurrentTop+fCurrentHeight-fTargetTop-fTargetHeight>=0)?fTargetTop+fTargetHeight:fCurrentTop+fCurrentHeight)
							-((fCurrentTop-fTargetTop>=0)?fCurrentTop:fTargetTop);
						fSmallEdgeWidth=(fCurrentHeight<fTargetHeight)?fCurrentHeight:fTargetHeight;
						break;
				}
				if (fDistanceOfEdge>=0  /*&& fOffsetOfCenter<g_iBlockWidth*/){ //目标位置要在我前进的一侧(移动方向不能重叠),并且不能太偏离中心
					
					//估值=距离目标的邻边垂直距离*方向权重+重心所在轴偏移量
					var fEvaluation=-100*(fOverlapWidth/fSmallEdgeWidth) + fDistanceOfEdge;
						if (CIRCUMSTANCE && 'simulate'==CIRCUMSTANCE){
							//console.log(aFocusTargets[i].id+"==>  "+fEvaluation+"  =-20*("+fSmallEdgeWidth+"/"+fOverlapWidth+")"+"+"+fDistanceOfEdge);
						}
					    //+fOffsetOfCenter*fDirectionWeight;
						if(fEvaluationRecord>fEvaluation){
							fEvaluationRecord=fEvaluation;
							//elFormerTarget=elFocusTarget;
							elFocusTarget=aFocusTargets[i];
						}
				}
			}
			//elFocusTarget=FindNearestFocusTarget(strDirection,fFocusLeft,fFocusTop,fFocusWidth,fFocusHeight,fLeft,fTop,fWidth,fHeight);
		}
			
		//Log.warning("["+(elFormerTarget?elFormerTarget.id:"null")+","+(elFocusTarget?elFocusTarget.id:"null")+"]");    
			
		if (null==elFocusTarget){ //找不到目标 不移动，一般到了边界
			Log.error("No Target Element Found: elFocusTarget = null");
			return null;
		}
	}else{
		Log.error("No Target Element Found: unavailable direction");
		return null
	}
	return elFocusTarget;	
}


function findFocusTarget4A(strFocusElementId,aFocusTargets,strDirection){
	
	
	//Log.info("findFocusTarget:"+ g_strFocusElementId);
	var elFocusNow=document.getElementById(strFocusElementId);
    //Log.info(elFocusNow?elFocusNow.id:"null");

    var fCurrentLeft=parseFloat(pageX(elFocusNow));
    var fCurrentTop=parseFloat(pageY(elFocusNow));
    var fCurrentWidth=parseFloat(elFocusNow.offsetWidth);  //clientWidth
    var fCurrentHeight=parseFloat(elFocusNow.offsetHeight); //clientWidth
    
    
    var elFocusTarget=null;
    var fDirectionWeight=5.0;
    var fEvaluationRecord=99999;
    //决定要搞哪一个
    if (strDirection=="up" || strDirection=="down" || strDirection=="left" || strDirection=="right" ){
		for (var i=0;i<aFocusTargets.length;i++){
			/*
			var fTargetLeft=parseFloat(aFocusTargets[i].style.left.replace(/px/g, ""));
			var fTargetTop=parseFloat(aFocusTargets[i].style.top.replace(/px/g, ""));
			var fTargetWidth=parseFloat(aFocusTargets[i].style.width.replace(/px/g, ""));
			var fTargetHeight=parseFloat(aFocusTargets[i].style.height.replace(/px/g, ""));
			*/
		    if (aFocusTargets[i].id == strFocusElementId || !doesElementDisplay(aFocusTargets[i])) continue;

			var fTargetLeft=parseFloat(pageX(aFocusTargets[i]));
			var fTargetTop=parseFloat(pageY(aFocusTargets[i]));
			var fTargetWidth=parseFloat(aFocusTargets[i].offsetWidth);//clientWidth
			var fTargetHeight=parseFloat(aFocusTargets[i].offsetHeight);//clientHeight
				
				
			//权重计算 	 移动方向上距离*3+和移动方向垂直的方向中心距离差 的和最小为最近控件
			var fDistanceOfEdge=0.0; //移动方向边缘的距离
			var fOffsetOfCenter=0.0; //垂直移动方向两块区域中心的距离
			var fOverlapWidth=0.0;  //在移动方向上重叠的距离 复数为不重叠
			var fSmallEdgeWidth=0.0; //短的那个边缘的宽度
			
			if (fTargetLeft<g_iFocusRightLimit && fTargetTop< g_iFocusBottomLimit){ //如果目标在限制区域内
				
				
				
				switch(strDirection){
					case "up":
						fDistanceOfEdge=fCurrentTop-fTargetTop-fTargetHeight;
						fOffsetOfCenter=Math.abs(fTargetLeft+fTargetWidth/2-fCurrentLeft-fCurrentWidth/2);
						fOverlapWidth=((fCurrentLeft+fCurrentWidth-fTargetLeft-fTargetWidth>=0)?fTargetLeft+fTargetWidth:fCurrentLeft+fCurrentWidth)
							-((fCurrentLeft-fTargetLeft>=0)?fCurrentLeft:fTargetLeft);
						fSmallEdgeWidth=(fCurrentWidth<fTargetWidth)?fCurrentWidth:fTargetWidth;
						break;
					case "down":
						fDistanceOfEdge=fTargetTop-fCurrentTop-fCurrentHeight;
						fOffsetOfCenter=Math.abs(fTargetLeft+fTargetWidth/2-fCurrentLeft-fCurrentWidth/2);
						fOverlapWidth=((fCurrentLeft+fCurrentWidth-fTargetLeft-fTargetWidth>=0)?fTargetLeft+fTargetWidth:fCurrentLeft+fCurrentWidth)
							-((fCurrentLeft-fTargetLeft>=0)?fCurrentLeft:fTargetLeft);
						fSmallEdgeWidth=(fCurrentWidth<fTargetWidth)?fCurrentWidth:fTargetWidth;
						break;
					case "left":
						fDistanceOfEdge=fCurrentLeft-fTargetLeft-fTargetWidth;
						fOffsetOfCenter= Math.abs(fTargetTop+fTargetHeight/2-fCurrentTop-fCurrentHeight/2);
						fOverlapWidth=((fCurrentTop+fCurrentHeight-fTargetTop-fTargetHeight>=0)?fTargetTop+fTargetHeight:fCurrentTop+fCurrentHeight)
							-((fCurrentTop-fTargetTop>=0)?fCurrentTop:fTargetTop);
						fSmallEdgeWidth=(fCurrentHeight<fTargetHeight)?fCurrentHeight:fTargetHeight;
						break;
					case "right":
						fDistanceOfEdge=fTargetLeft-fCurrentLeft-fCurrentWidth;
						fOffsetOfCenter=Math.abs(fTargetTop+fTargetHeight/2-fCurrentTop-fCurrentHeight/2);
						fOverlapWidth=((fCurrentTop+fCurrentHeight-fTargetTop-fTargetHeight>=0)?fTargetTop+fTargetHeight:fCurrentTop+fCurrentHeight)
							-((fCurrentTop-fTargetTop>=0)?fCurrentTop:fTargetTop);
						fSmallEdgeWidth=(fCurrentHeight<fTargetHeight)?fCurrentHeight:fTargetHeight;
						break;
				}
				if (fDistanceOfEdge>=0  /*&& fOffsetOfCenter<g_iBlockWidth*/){ //目标位置要在我前进的一侧(移动方向不能重叠),并且不能太偏离中心
					
					//估值=距离目标的邻边垂直距离*方向权重+重心所在轴偏移量
					var fEvaluation=-100*(fOverlapWidth/fSmallEdgeWidth) + fDistanceOfEdge;
						if (CIRCUMSTANCE && 'simulate'==CIRCUMSTANCE){
							//console.log(aFocusTargets[i].id+"==>  "+fEvaluation+"  =-20*("+fSmallEdgeWidth+"/"+fOverlapWidth+")"+"+"+fDistanceOfEdge);
						}
					    //+fOffsetOfCenter*fDirectionWeight;
						if(fEvaluationRecord>fEvaluation){
							fEvaluationRecord=fEvaluation;
							//elFormerTarget=elFocusTarget;
							elFocusTarget=aFocusTargets[i];
						}
				}
			}
			//elFocusTarget=FindNearestFocusTarget(strDirection,fFocusLeft,fFocusTop,fFocusWidth,fFocusHeight,fLeft,fTop,fWidth,fHeight);
		}
			
		//console.log("["+(elFormerTarget?elFormerTarget.id:"null")+","+(elFocusTarget?elFocusTarget.id:"null")+"]");    
			
		if (null==elFocusTarget){ //找不到目标 不移动，一般到了边界
			//Log.warning("No Target Element Found: elFocusTarget = null");
			return null;
		}
	}else{
		Log.error("No Target Element Found: unavailable direction");
		return null
	}
	return elFocusTarget;	
}




function flyFocus(elFocusTarget,strDirection,fScaleFactor,oScrollParameter){
	
	if (null==elFocusTarget){return;}
	
	//专门针对UT老盒子的处理 Start
	if (g_bIsUTBox){
		return flyFocusStupidly(elFocusTarget,strDirection,oScrollParameter);
	}
	//专门针对UT老盒子的处理 End 
	
	
	
	if (strDirection=="up" || strDirection=="down" || strDirection=="left" || strDirection=="right" ){
		
		var elFocusNow=document.getElementById(g_strFocusElementId);
		
		//滚屏相关参数 elScroll,iScrollStep 如果都有效开始处理滚屏
		//oScrollParameter.element   需要滚动的元素 Object[Element]
		//oScrollParameter.step      滚动的距离 Integer
		//oScrollParameter.relation  滚动是否和焦点元素有关?  Integer [0|1]
		//oScrollParameter.direction 滚动方向  ['left'|'right'|'up'|'down']
		
		
		var iXScrollStep=0;
		var iYScrollStep=0;
        if (null!=oScrollParameter && null!=oScrollParameter.element 
			&& null!=oScrollParameter.step && null!=oScrollParameter.relation ){  //满足此条件才考虑界面滚动
			//默认反向
			if (null==oScrollParameter.direction){
				switch (strDirection){ 
					case "up":   oScrollParameter.direction="down";break;
					case "down": oScrollParameter.direction="up";break;
					case "left": oScrollParameter.direction="right";break;
					case "right":oScrollParameter.direction="left";break;
				}
			}
			switch(oScrollParameter.direction){
				case "up":
					iYScrollStep=-oScrollParameter.step;
					break;
				case "down":
					iYScrollStep=oScrollParameter.step;
					break;
				case "left":
					iXScrollStep=-oScrollParameter.step;
					break;
				case "right":
					iXScrollStep=oScrollParameter.step;
					break;
					
			}
			
		}		
		
		//准备好了所有数据 这里开始一起行动
        if (g_fnOnBeforeFocusChange){
            g_fnOnBeforeFocusChange(elFocusNow,elFocusTarget,strDirection);
        }  

		//按比例将焦点目标的区域进行缩放 得注意浮点数的问题
		if (fScaleFactor != 1) { //缩放
	        scaleElement(elFocusTarget.id, fScaleFactor, fScaleFactor);
			
	    }

		
		
		
		var iScaledTargetWidth=parseInt(elFocusTarget.offsetWidth*fScaleFactor);//简单取整
		var iScaledTargetHeight=parseInt(elFocusTarget.offsetHeight*fScaleFactor);//简单取整
		
		var iScaledTargetLeft=parseInt(pageX(elFocusTarget)+elFocusTarget.offsetWidth *(1-fScaleFactor)/2); //简单取整
		var iScaledTargetTop =parseInt(pageY(elFocusTarget)+elFocusTarget.offsetHeight*(1-fScaleFactor)/2); //简单取整
		
		//准备目标焦点数据(移动,缩放,相对)存放到临时变量以防动画同步异常导致数值异常
        //var destFocusLeft=pageX(elFocusTarget)-8-9+iXScrollStep +"px";
        //var destFocusTop =pageY(elFocusTarget)-8-6+iYScrollStep +"px";
        //var destFocusWidth =(elFocusTarget.offsetWidth+2)*fScaleFactor+"px";
        //var destFocusHeight=(elFocusTarget.offsetHeight+2)*fScaleFactor+"px";
		
		//由于浮点数变成坐标必须取整所以不可避免会形成误差，其中的+1 -1为了保证边框不留空隙
		//Target会比边框稍大
		var destFocusLeft=iScaledTargetLeft -g_iFocusFrameWidth  +1  + iXScrollStep +"px";
        var destFocusTop =iScaledTargetTop  -g_iFocusFrameHeight +1  + iYScrollStep +"px";
		var destFocusWidth =(iScaledTargetWidth-1)+2*g_iFocusFrameWidth+"px";
        var destFocusHeight=(iScaledTargetHeight-1)+2*g_iFocusFrameHeight+"px";
        
        
		
		//只要改掉相对Left Top 就可
		//此处需很小心处理和上下代码的关系
		if (null!=oScrollParameter && null!=oScrollParameter.element 
			&& null!=oScrollParameter.step && null!=oScrollParameter.relation ){  //满足此条件才考虑界面滚动
		
			var destScrollElementLeft=oScrollParameter.element.offsetLeft + iXScrollStep + "px";
			var destScrollElementTop =oScrollParameter.element.offsetTop + iYScrollStep + "px";
			
			
			oScrollParameter.element.style.left = destScrollElementLeft;
			oScrollParameter.element.style.top  = destScrollElementTop;
		}
			
		
		
		
        //计算完成以下开始完成所有动作
        elFocusNow?elFocusNow.style.zIndex=0:'';
		elFocusTarget.style.zIndex=20;
		
		var elFocusContainer=document.getElementById("focus_container");
        //document.getElementById('view_port').style.left = destViewPortLeft;
        elFocusContainer.style.left = destFocusLeft;
		elFocusContainer.style.top = destFocusTop;
	    //document.getElementById("focus5").style.width = destFocusWidth;
	    //document.getElementById("focus5").style.height = destFocusHeight;
	    elFocusContainer.style.width = destFocusWidth;
		elFocusContainer.style.height = destFocusHeight;

		
        if (g_fnOnAfterFocusChange){
            g_fnOnAfterFocusChange(elFocusNow,elFocusTarget,strDirection);
        }
		
		//总要先将前面那个复原
	    scaleElement(g_strFocusElementId, 1, 1);		
		g_strFocusElementId=elFocusTarget.id;
		
        return 1;    	
	
	}else{
		Log.error("No Target Element Found: unavailable direction");
		return 0;
	}
}



/*
* 强制指定一个焦点位置,跳过去，没有调用OnBefore OnAfter
*/
function jumpFocus(elFocusTarget,fScaleFactor,oScrollParameter){ 
	if (null==elFocusTarget){ //找不到目标 不移动，一般到了边界
		Log.error("No Target Element Found: elFocusTarget = null");
		return 0;
	}
	/*
	if (!elTarget has focusable class){
		return 0;
	}*/
	var elFocusNow= document.getElementById(g_strFocusElementId);
	if(g_bIsUTBox){
		
		//黄边框方案
		//Log.info("111");
		
		//if (elFocusNow){elFocusNow.style.backgroundColor="#1C5AA2";}
		//if (elFocusNow){elFocusNow.style.border="2px none #000fff";}
		if (elFocusNow){ removeClass(elFocusNow,'ut_focus');}
		
		
		//改变未来
		//elFocusTarget.style.backgroundColor="#00ff55";	
		//elFocusTarget.style.border="2px solid #fff000";
		if (elFocusTarget){addClass(elFocusTarget,'ut_focus');}
		
		g_strFocusElementId=elFocusTarget.id;
		return;
	}
	
	var iXScrollStep=0;
	var iYScrollStep=0;
	if (null!=oScrollParameter && null!=oScrollParameter.element 
		&& null!=oScrollParameter.step && null!=oScrollParameter.relation ){  //满足此条件才考虑界面滚动
		//默认反向
		if (null==oScrollParameter.direction){
			switch (strDirection){ 
				case "up":oScrollParameter.direction="down";break;
				case "down":oScrollParameter.direction="up";break;
				case "left":oScrollParameter.direction="right";break;
				case "right":oScrollParameter.direction="left";break;
			}
		}
		switch(oScrollParameter.direction){
			case "up":
				iYScrollStep=-oScrollParameter.step;
				break;
			case "down":
				iYScrollStep=oScrollParameter.step;
				break;
			case "left":
				iXScrollStep=-oScrollParameter.step;
				break;
			case "right":
				iXScrollStep=oScrollParameter.step;
				break;
				
		}
		
	}		
	//准备好了所有数据 设置的不激发这俩事件
	/*
	if (g_fnOnAfterFocusChange){
		g_fnOnAfterFocusChange(elFocusNow,elFocusTarget,strDirection);
	}
	if (g_fnOnBeforeFocusChange){
		g_fnOnBeforeFocusChange(elFocusNow,elFocusTarget,strDirection);
	} */ 

	//准备目标焦点数据(移动,缩放,相对)存放到临时变量以防动画同步异常导致数值异常
	/*var destFocusLeft=pageX(elFocusTarget)-8*fScaleFactor+iXScrollStep +"px";
	var destFocusTop =pageY(elFocusTarget)-8*fScaleFactor+iYScrollStep +"px";*/
	var destFocusLeft=parseInt(pageX(elFocusTarget)+elFocusTarget.offsetWidth *(1-fScaleFactor)/2)-g_iFocusFrameWidth  +1+iXScrollStep +"px";/*与flyFocus同步，正确找到焦点框的位置*/
	var destFocusTop =parseInt(pageY(elFocusTarget)+elFocusTarget.offsetHeight*(1-fScaleFactor)/2)-g_iFocusFrameWidth  +1+iYScrollStep +"px";
	var destFocusWidth =(elFocusTarget.offsetWidth)*fScaleFactor+2*g_iFocusFrameWidth+"px";
	var destFocusHeight=(elFocusTarget.offsetHeight)*fScaleFactor+2*g_iFocusFrameHeight+"px";
	
	
	
	//只要改掉相对Left Top 就可
	//此处需很小心处理和上下代码的关系
	if (null!=oScrollParameter && null!=oScrollParameter.element 
		&& null!=oScrollParameter.step && null!=oScrollParameter.relation ){  //满足此条件才考虑界面滚动
	
		var destScrollElementLeft=oScrollParameter.element.offsetLeft + iXScrollStep + "px";
		var destScrollElementTop =oScrollParameter.element.offsetTop + iYScrollStep + "px";
		
		
		oScrollParameter.element.style.left = destScrollElementLeft;
		oScrollParameter.element.style.top  = destScrollElementTop;
	}
	
	
	
	//document.getElementById('view_port').style.left = destViewPortLeft;
	var elFocusContainer=document.getElementById("focus_container");
	
	elFocusContainer.style.left = destFocusLeft;
	elFocusContainer.style.top = destFocusTop;
	elFocusContainer.style.width =destFocusWidth;
	elFocusContainer.style.height = destFocusHeight;
	//document.getElementById("focus5").style.width = destFocusWidth;
	//document.getElementById("focus5").style.height = destFocusHeight;
	
	showFocus();
	//document.getElementById("focus_container").style.visibility = "visible";
	
	
	//if (elFormerTarget){
	//    scaleFocus(elFormerTarget.id,1,1);
	//}
//	if (g_fnOnAfterFocusChange){
//		g_fnOnAfterFocusChange(elFocusNow,elFocusTarget,"");
//	}
	if (fScaleFactor != 1) { //缩放
		scaleElement(g_strFocusElementId, 1, 1);
		scaleElement(elFocusTarget.id, fScaleFactor, fScaleFactor);
	}	
	g_strFocusElementId=elFocusTarget.id;
	  
	return 1;  

}

function onUTBoxLinkFocus(elIn){
	/*
	var elFocusNow=document.getElementById(g_strFocusElementId);
	var elFocusTarget=elIn;
	
	if (g_fnOnAfterFocusChange){
		g_fnOnAfterFocusChange(elFocusNow,elFocusTarget,strDirection);
	}
	if (g_fnOnBeforeFocusChange){
		g_fnOnBeforeFocusChange(elFocusNow,elFocusTarget,strDirection);
	}*/
	Log.info("UT:Focus "+elIn.id);
	//g_strFocusElementId=elIn.id;
	
	flyFocusStupidly(document.getElementById(elIn.id.replace(/_utlink/,'')),null,null);
	  
}

function onUTBoxLinkBlur(elIn){
	/*g_strFocusElementId
	
	if (g_fnOnAfterFocusChange){
		g_fnOnAfterFocusChange(elFocusNow,elFocusTarget,strDirection);
	}
	if (g_fnOnBeforeFocusChange){
		g_fnOnBeforeFocusChange(elFocusNow,elFocusTarget,strDirection);
	}*/
	Log.info("UT:Blur "+elIn.id);
}





//焦点呼吸
function focusBreath(){
	var elFocusTable=document.getElementById(/*'focus_table'*/(g_bIsUTBox?'stupid_':'')+'focus_container');
	var fOpacity=parseFloat(elFocusTable.style.opacity);
	if (fOpacity>=1.0){
		elFocusTable.style.opacity=0.4;
	}else{
		elFocusTable.style.opacity=1.0;
	}
}

//隐藏焦点
function hideFocus(){
	var strFocusContainerId=(g_bIsUTBox?'stupid_':'')+'focus_container';
	var elFocusContainer=document.getElementById(strFocusContainerId);
	if (elFocusContainer) {
		elFocusContainer.style.display="none";
		elFocusContainer.style.visibility="hidden";
		if (g_intervalFocusBreath){ window.clearInterval(g_intervalFocusBreath);}
		
		
	}
}
//显示焦点
function showFocus(){
	var strFocusContainerId=(g_bIsUTBox?'stupid_':'')+'focus_container';
	var elFocusContainer=document.getElementById(strFocusContainerId);
	if (elFocusContainer ) { 
		elFocusContainer.style.display="block";
		elFocusContainer.style.visibility="visible";
		if(!g_bIsUTBox){ //UT里根本就不需要呼吸
			if (g_intervalFocusBreath){ window.clearInterval(g_intervalFocusBreath);}
			g_intervalFocusBreath=window.setInterval(focusBreath,1000);
		}
		
	}
}





//此函数专门用于给UT这种垃圾盒子 画地图，记得画完要注释掉 函数的调用
function createAdjacency(){
	Log.info('go to creatAdjacency5');
	try{


	g_aAdjacency=[];		
	var elTargets=document.getElementsByClassName("focusable");
	var aFocusTargets=[];		

	for (var i=0;i<elTargets.length;i++){
		var iStatus=parseInt(elTargets[i].getAttribute('focusstatus'));
		if(!aFocusTargets[iStatus]){aFocusTargets[iStatus]=[]; }
		aFocusTargets[iStatus].push(elTargets[i]);
	}
	
	for (var iStatus2 in aFocusTargets) {
		for (var i=0;i<aFocusTargets[iStatus2].length;i++){  //同一个状态层次
			var elFocusTarget=null;
			
			if (!g_aAdjacency[iStatus2]){ g_aAdjacency[iStatus2]={}; }
			if (!g_aAdjacency[iStatus2][aFocusTargets[iStatus2][i].id]){
				g_aAdjacency[iStatus2][aFocusTargets[iStatus2][i].id]=[];
			}
			
			//0-上 1-右 2-下 3-左
			elFocusTarget=findFocusTarget4A(aFocusTargets[iStatus2][i].id,aFocusTargets[iStatus2],"up");
			g_aAdjacency[iStatus2][aFocusTargets[iStatus2][i].id][0]=(elFocusTarget)?(elFocusTarget.id):"";
			
			elFocusTarget=findFocusTarget4A(aFocusTargets[iStatus2][i].id,aFocusTargets[iStatus2],"right");
			g_aAdjacency[iStatus2][aFocusTargets[iStatus2][i].id][1]=(elFocusTarget)?(elFocusTarget.id):"";
			
			elFocusTarget=findFocusTarget4A(aFocusTargets[iStatus2][i].id,aFocusTargets[iStatus2],"down");
			g_aAdjacency[iStatus2][aFocusTargets[iStatus2][i].id][2]=(elFocusTarget)?(elFocusTarget.id):"";
			
			elFocusTarget=findFocusTarget4A(aFocusTargets[iStatus2][i].id,aFocusTargets[iStatus2],"left");
			g_aAdjacency[iStatus2][aFocusTargets[iStatus2][i].id][3]=(elFocusTarget)?(elFocusTarget.id):"";
									
		}
	
	}
	console.info(JSON.stringify(g_aAdjacency));
	
		//ajax('GET','http://172.0.12.159:8081/Promotion/ListByItem?',null,'aaa='+JSON.stringify(g_aAdjacency),function(){},function(){});
	  //location.href="http://172.0.12.159:8081/Promotion/ListByItem?aaa="+JSON.stringify(g_aAdjacency);
	}catch(err){
		Log.info('444');
		Log.warning(err);
	}
	
}