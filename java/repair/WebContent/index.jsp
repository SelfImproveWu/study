<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ page import="controller.*" %>
    <%@ page import="entity.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
    <title>登录页</title>
   
    <link rel="stylesheet" type="text/css" href="themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="themes/icon.css">
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/jquery.easyui.min.js"></script>
<style>
    body{
        background: lightgray;
        /*opacity: 0.3;*/
    }
    .login_form{
        position: absolute;
        left: 25%;
        top:15%;
        width: 500px;
        height: 500px;
    }
    .form_li{
        position: relative;
        float: left;
        left: 10%;
        margin-top: 5px;
        width: 400px;
        height: 50px;
        color: white;
        font-size: 25px;
        line-height: 50px;
    }
    .input_li{
        position: absolute;
        left: 80px;
        top:5px;
        height: 30px;
        width: 300px;
    }
    .button_ok{
        position: absolute;
        left: 15px;
        top: 15px;
        width: 128px;
        height: 46px;
        font-size: 24px;
    }
    .button_register{
        position: absolute;
        left: 245px;
        top: 15px;
        width: 128px;
        height: 46px;
        font-size: 24px;
    }
</style>
    <script>
        function login() {
        	console.info("1111");
        	if($("#loginName").val() == ''){
        		alert("账号不能为空");
        		return;
        	}
        	if($("#password").val() == ''){
        		alert("密码不能为空");
        		return;
        	}
            $("#login_form").submit();
        }
        function register() {
            window.location.href="register.jsp"
        }

    </script>
</head>
<!--<img src="image/index_bg.jpg" style="width: 100%;height: 100%;opacity:0.6;">-->
<form id="login_form" class="login_form" action="user/login.do" method="post">
    <div class="form_li">
        账号
        <input class="easyui-validatebox input_li" type="text" id="logoinName" name="loginName" required="true" value="zhangsan" missingMessage="账号不能为空">
    </div>
    <div class="form_li">
        密码
        <input  class="easyui-validatebox input_li" type="password" id="password" name="password" required="true" value="123456" missingMessage="密码不能为空">
    </div>
    <div class="form_li">
        <input href="#" class=" button_ok" type="button" iconCls="icon-ok" value="确认" onclick="login()">
        <input href="#" class=" button_register" type="button" iconCls="icon-add" value="注册" onclick="register()">
    </div>
</form>
<body>

</body>
</html>