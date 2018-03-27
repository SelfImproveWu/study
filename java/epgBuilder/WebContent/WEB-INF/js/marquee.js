//var g_intervalMarquee=null;

function marqueeLeft(strInterval,strContainerId,strTextId1,strTextId2,iSpacing,iInterval){ 
	eval('if ('+strInterval+'){window.clearInterval('+strInterval+');}');
	//Log.info(document.getElementById(strContainerId).scrollLeft);
	document.getElementById(strTextId2).style.visibility='visible';
	eval( strInterval+'=setInterval(marqueeMove(strContainerId,strTextId1,iSpacing),iInterval);'); 
} 

function marqueeMove(strContainerId,strTextId1,iSpacing){
	return function (){ _marqueeMove(strContainerId,strTextId1,iSpacing); }
}

function _marqueeMove(strContainerId,strTextId1,iSpacing){
	if(document.getElementById(strContainerId).scrollLeft-document.getElementById(strTextId1).offsetWidth>=iSpacing) {
		document.getElementById(strContainerId).scrollLeft=0;//+=document.getElementById('marquee_container').offsetWidth; 
	}else{ 
		document.getElementById(strContainerId).scrollLeft++; 
	} 
	//document.getElementById('my_marquee_info').innerHTML='div.scrollLeft:'+document.getElementById('marquee_container').scrollLeft;	
}

function marqueeStop(strInterval,strContainerId,strTextId2){
	
	eval ('if ('+strInterval+'){window.clearInterval('+strInterval+');}');
	
	if(null!=document.getElementById(strContainerId)) {
		document.getElementById(strContainerId).scrollLeft=0;
	}
	
	if(null!=document.getElementById(strTextId2)) {
		document.getElementById(strTextId2).style.visibility='hidden';
	}
	
	
}

			