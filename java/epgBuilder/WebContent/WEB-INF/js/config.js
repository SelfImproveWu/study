//系统相关配置
var CIRCUMSTANCE='production'; //取值为 simulate|production
var VERSION = 2075;  //客户端版本
var GOD_MODE=1;
var BI_BASE_PATH="http://172.0.12.159/1.gif?";

//读取cookies  Config 专用防止引起依赖问题
function getCookie4Config(strName){ 
    var arr,reg=new RegExp("(^| )"+strName+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg)){
        return decodeURIComponent(arr[2]); 
	}else{
        return null;
	}
} 
var g_strToken="09bd251d40aa4df79049a0fedb43f31d";//设置默认g_strToken 调试时可以从数据库获取
var OPERATOR_PLATFORM= (getCookie4Config("operatorPlatform"))?getCookie4Config("operatorPlatform"):"zte" ;//取值为 zte|huawei



//业务相关配置

//首页视频区域播放列表
var INDEX_PLAY_LIST_SIZE=3;
var CONCERT_COVER_PLAY_LIST_SIZE=6;
var CONCERT_LIST_PLAY_LIST_SIZE=5;


var CONCERT_APPID="tdc56a865b09f3f2a9";

//var TOPDRAW_EPG_SERVER=('production'==CIRCUMSTANCE)?"http://172.25.45.88:8080/":"http://139.196.37.202:8080/sparrow.concert/";
//var TOPDRAW_EPG_SERVER=('production'==CIRCUMSTANCE)?"http://172.0.12.163/sparrow.concert/":"http://139.196.37.202:8080/sparrow.concert/";
var TOPDRAW_EPG_SERVER=('production'==CIRCUMSTANCE)?"http://172.0.12.159:8081/sparrow.silkworm/":"http://139.196.37.202:8080/sparrow.silkworm/";
var TOPDRAW_API_SERVER=('production'==CIRCUMSTANCE)?"http://172.0.12.159:8081/sparrow.concert/":"http://139.196.37.202:8080/sparrow.concert/";
//var IMAGE_BASE_PATH="http://139.196.37.202:8080/sparrow.resource/"; "http://172.25.45.88:8080/sparrow.resource/"
var IMAGE_BASE_PATH=('production'==CIRCUMSTANCE)?"http://172.0.12.163/sparrow.resource/":"http://139.196.37.202:8080/sparrow.resource/"; 

var OPERATION_PATH_FEATURE=TOPDRAW_EPG_SERVER /*+("huawei"==OPERATOR_PLATFORM)?"/en/":"/frame1320/"*/;

