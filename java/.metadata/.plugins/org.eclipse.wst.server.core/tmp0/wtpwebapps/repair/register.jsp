<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
    <title>注册</title>
    <link rel="stylesheet" type="text/css" href="themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="themes/icon.css">
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/jquery.easyui.min.js"></script>
    <style>
        .table_li{
            position: relative;
            float: left;
            left: 65px;
            width: 400px;
            height: 50px;
            line-height: 30px;
            color: #4E4E4E;
            font-family: "Microsoft yahei";
            font-size: 16px;
        }
        .register_form{
            position: absolute;
            left: 10%;
            top: 10%;
            width: 450px;
            height: 600px;
            border: solid 2px grey;
            padding: 10px;
        }
        .register_content{
            position: absolute;
            left: 0;
            top: 80px;
            width: 100%;
            height: auto;
        }
        .title{
            position: absolute;
            left: 0;
            top: 0;
            font-family: "Microsoft yahei" !important;
            text-align: center;
            background: lightgray;
            width: 100%;
            height: 60px;
            line-height: 60px;
            font-size: 20px;
            color: #ffffff;
        }
        .input_li{
            position: absolute;
            left: 110px;
            top: 0;
            width: 200px;
            height: 25px;

        }
        .button_ok{
            position: absolute;
            left: 8px;
            top: 20px;
            width: 120px;
            height: 40px;
        }
        .button_cancel{
            position: absolute;
            left: 180px;
            top: 20px;
            width: 120px;
            height: 40px;
        }
        #repeat_tip{
            display: none;
            left: 325px;
            position: absolute;
            top: 0;
            font-size: 12px;
            color: red;
        }
    </style>
    <script>
        function checkAndSubmit() {
            var flag = true;
            var str = "";
            if($("#name").val() == ""){
                str +=" 姓名";
                flag = false;

            }
            if($("#loginName").val() == ""){
                str +=" 账号 ";
                flag = false;

            }
            if($("#password").val() == ""){
                str +=" 密码";
                flag = false;

            }
            if($("#passwordRepeat").val() == ""){
//                str +=" 密码";
                flag = false;

            }
            if($("#id").val() == ""){
                str +=" 身份证号";
                flag = false;

            }
            if($("#tel").val() == ""){
                str +=" 联系电话";
                flag = false;
            }

            if(!flag){
                alert(str+" 不能为空！");
            }else if($("#password").val() != $("#passwordRepeat").val()){
                alert('两次密码不一致！');
            }else{
                $("#register").submit();
            }
        }
        function cancel(){
            history.go(-1);
        }
        function checkIsRepeat(loginName){
            $.get('user/isRepeat.do?loginName='+loginName,function(responseText){
                if("true" ==responseText){
                    $("#repeat_tip").show();
                    setTimeout(function(){$("#loginName").focus();},3000);
                    
                }
            })
        }
    </script>
</head>
<body style="background: #D1EEEE">

<form id="register"  method="post" action="user/register.do" class="register_form">
    <div class="title">注册用户</div>
    <div class="register_content">
        <div class="table_li">
                <span>账号：<input  id="loginName" class="easyui-validatebox input_li" type="text" name="loginName" value="zhangsan" data-options="required:true,validType:'name'"missingMessage="账号不能为空"
                                 onblur="checkIsRepeat(this.value)" onfocus="$('#repeat_tip').hide();">
                	<div id="repeat_tip" style="display:none;">*账号名重复!</div>
                </span>
        </div>
        <div class="table_li">
            <span>密码：<input  id="password" class="easyui-validatebox input_li" type="password" name="password"data-options="required:true,validType:'name'" missingMessage="密码不能为空" ></span>
        </div>
        <div class="table_li">
            <span>再次输入密码：<input  class="easyui-validatebox input_li" id="passwordRepeat"type="password" name="passwordRepeat" data-options="required:true,validType:'name'" missingMessage="密码相同且不为空" ></span>
        </div>
        <div class="table_li">
            <span>姓名：<input id="name" class="easyui-validatebox input_li" type="text" name="name" value="张三"data-options="required:true,validType:'name'" missingMessage="姓名不能为空"></span>
        </div>
        <div class="table_li">
            <span>年龄：<input  id="age" class="easyui-validatebox input_li"type="text" name="age" value="18" ></span>
        </div>
        <div class="table_li">
            <span>性别:<span class="input_li"><input  id="sex" name="sex" type="radio" value="1" checked="true" >男 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="sex" value="0" >女</span></span>
        </div>
        <div class="table_li">
            <span>身份证号：<input id="id" class="easyui-validatebox input_li" type="text" name="identityID" value=""data-options="required:true,validType:'name'" missingMessage="身份证号不能为空"></span>
        </div>
        <div class="table_li">
            <span>联系电话：<input id="tel" class="easyui-validatebox input_li" type="text" name="tel" value=""data-options="required:true,validType:'name'" missingMessage="电话不能为空"></span>
        </div>
        <div class="table_li">
            <span>联系地址：<input id="address" class="easyui-validatebox input_li" type="text" name="address" value=""></span>
        </div>
        <div class="table_li">
            <input class="button_ok" type="button" id="" name="" value="确认" onclick="checkAndSubmit()">
            <input  class="button_cancel" type="button" name="" value="返回" onclick="cancel()">
        </div>
    </div>






</form>



</body>
</html>