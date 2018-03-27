<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ page import="controller.*"%>
    <%@ page import="entity.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>主界面</title>
    <link rel="stylesheet" type="text/css" href="../themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="../themes/icon.css">
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <script type="text/javascript" src="../js/jquery.easyui.min.js"></script>
</head>
<style>
    .left_content{
        position: absolute;
        left: 0%;
        top:20%;
        width: 15%;
        height: 80%;
        background: #595959;
    }
    body{
        font-family: "微软雅黑"!important;
        font-size: 14px;
    }
    .left_menu{
        position: absolute;
        left: 0;
        top: 15%;
        width: 100%;
        height: 80%;
    }
    .left_menu_button{
        position: relative;
        width: 100%;
        height: 50px;
        margin: 2px;
        text-align: left;
        color: #c9c9c9 ;
        line-height: 50px;
        box-sizing: border-box;
    }
    .main_content{
        position: absolute;
        left: 15%;
        top:20%;
        width: 85%;
        height: 80%;
        background: #EEEEEE;
    }
    .focus_on{
        background: #4E4E4E ;
        /**/
    }
    .menu_item_current{
        color: orange;
        border-left: solid  2px orange ;
        text-align: center;
/*        border-bottom: double  2px orange;
        border-top: double 2px orange;
        border-right:double  2px orange;*/
    }
</style>
<script>
function focusOn(){
    addClass(this,"focus_on");
}
function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) {
        obj.className +=(" " + cls);
    }
}
function hasClass(obj, cls) {

    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ').trim();
    }
}
function showVehicle(){
	var userId = ${requestScope.user.id}
	$("#main_content").load("../vehicle/index.do?userId="+userId);
	/* addClass($("#vehicle_management"),"menu_item_current"); */
}
function showRepairSheet(){
    var userId = ${requestScope.user.id}
        $("#main_content").load("../repair/index.do?userId="+userId);
    /* addClass($("#vehicle_management"),"menu_item_current"); */
}
function showRecord(){
    var userId = ${requestScope.user.id}
        $("#main_content").load("../record/index.do?userId="+userId);
    /* addClass($("#vehicle_management"),"menu_item_current"); */
}
</script>
<body>
<div id="left_content" class="left_content">
	
    <div class="user_info">
    	<div class="user_name">${requestScope.user.name}</div>
    	
    </div>
    <div id="left_menu" class="left_menu">

        <div id="vehicle_management" class="left_menu_button" onmouseover="addClass(this,'focus_on')" onmouseleave="removeClass(this,'focus_on')" onclick="showVehicle()">车辆管理</div>
        <div id="repair_sheet" class="left_menu_button" onmouseover="addClass(this,'focus_on')" onmouseleave="removeClass(this,'focus_on')" onclick="showRepairSheet()">提交修理</div>
        <div id="record_search" class="left_menu_button" onmouseover="addClass(this,'focus_on')" onmouseleave="removeClass(this,'focus_on')"onclick="showRecord()">记录查询</div>
    </div>
</div>
<div id="main_content" class="main_content">
    这是强哥做的根本不能看的页面，等待修复中
</div>
</body>
</html>