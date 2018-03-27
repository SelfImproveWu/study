var BI_BASE_PATH="http://172.0.12.159/1.gif?";

function getCookie4BI(strName){
	//获取Cookie信息
	var arr,reg=new RegExp("(^| )"+strName+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg)){
        return decodeURIComponent(arr[2]); 
	}else{ 
        return null; 
	}

}




(function () {
    var params = {};
    
	//获得地址
	if(document) { params.url = document.URL || ''; } 
	
	//获取QueryString
	var searchURL=window.location.search;
	if(searchURL.indexOf("?")!=-1){ 
		var searchURL = searchURL.substr(1); 
		segments = searchURL.split("&"); 
		//var k=new Array(segments.length);
		//var v=new Array(segments.length);
		var k="";
		var v=""
		for(i=0;i<segments.length;i++){ 
			var aSegment=segments[i].split("=");
			k=aSegment[0]
			v=decodeURIComponent(aSegment[1]); 
			params[k]=v;
		} 
	}	
	
	var strPlatformAccount=getCookie4BI("platformAccount");
	//Log.info("1:"+strPlatformAccount);
	
	if (strPlatformAccount){
		params.platformAccount=strPlatformAccount;
	}else{
		params.platformAccount='';
	}
	//Log.info("2:"+params.platformAccount);
    //拼接参数串
    var args = ''; 
    for(var i in params) {
        if(args != '') {
            args += '&';
        }   
        args += i + '=' + encodeURIComponent(params[i]);
    }   
	//Log.info("3:"+args);
    //通过Image对象请求后端脚本
    var img = new Image(1, 1); 
    img.src = BI_BASE_PATH + args;
    img.style.display='none';

})();



