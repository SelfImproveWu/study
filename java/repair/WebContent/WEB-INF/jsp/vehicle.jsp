<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
    <title>我的车辆</title>
    <link rel="stylesheet" type="text/css" href="../themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="../themes/icon.css">
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <script type="text/javascript" src="../js/jquery.easyui.min.js"></script>
    <style>
        .button_add {
            position: absolute;
            left: 50px;
            top: 0px;
            width: 150px;
            height: 50px;
            border-radius: 25px;
            background: bisque;
            color: white;
            font-family: "Microsoft yahei";
            font-size: 20px;
            text-align: center;
            line-height: 50px;
        }

        .list_content {
            position: absolute;
            left: 0px;
            top: 80px;
            width: 100%;
            height: 650px;
            color: white;
            background: lightblue;
            font-family: "Microsoft yahei";
            font-size: 20px;
            text-align: center;
            line-height: 50px;
            border: grey 2px solid;
        }

        .add_vehicle {
            position: absolute;
            left: 80px;
            top: 100px;
            width: 450px;
            height: 300px;
            padding: 5px;
            /* border: solid 2px red;*/
        }

        .form_tr {
            position: relative;
            left: 10px;
            width: 300px;
            height: 50px;
            margin-top: 10px;
            margin-bottom: 10px;
            font-family: "Microsoft yahei";
            font-size: 20px;
            line-height: 50px;
        }

        .form_input {
            position: absolute;
            left: 115px;
            width: 250px;
            height: 45px;
        }

        .button_submit {
            position: absolute;
            left: 10px;
            top: 20px;
            width: 128px;
            height: 40px;
            border-radius: 10px;
            background: lightblue;
            font-size: 20px;
        }

        .button_cancel {
            position: absolute;
            left: 232px;
            top: 20px;;
            width: 128px;
            height: 40px;
            border-radius: 10px;
            background: grey;
            font-size: 20px;
        }

        .vehicle_model {
            position: relative;
            float: left;
            margin: 20px;
            width: 300px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            font-size: 25px;
        }

        .vehicle_mark {
            position: absolute;
            left: 0;
            width: 150px;
            height: 50px;
            background: chocolate;
        }

        .vehicle_edit {
            position: absolute;
            left: 150px;
            width: 75px;
            height: 50px;
            background: lightblue;
        }

        .vehicle_delete {
            position: absolute;
            left: 225px;
            width: 75px;
            height: 50px;
        }

        .border_yellow {
            border: solid 2px yellow;
        }

    </style>
    <script>
    var aVehicleList = [];
        function hasClass(obj, cls) {
            //Log.info(obj.className);
            //Log.info('ut_focus_style fdkdkd'.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))+'aaa');

            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        }

        function addClass(obj, cls) {
            if (!this.hasClass(obj, cls)) {
                obj.className += (" " + cls);
            }
        }

        function removeClass(obj, cls) {
            if (hasClass(obj, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                obj.className = obj.className.replace(reg, ' ').trim();
            }
        }
        function checkAndSubmit() {
            var message = "";
            var flag = true;
            if ($("#name").val() == "") {
                message = "车辆名称 "
                flag = false;
            }
            if ($("#mark").val() == "") {
                message += "车牌号 ";
                flag = false;
            }
            if ($("#chassisNo").val() == "") {
                message += "底盘号 "
                flag = false;
            }
            if (!flag) {
                alert(message + "不能为空！");
            } else {
                $.ajax({
                    //几个参数需要注意一下
                    type    : "POST",//方法类型
                    dataType: "text",//预期服务器返回的数据类型
                    url     : "${pageContext.request.contextPath}/vehicle/addVehicle.do",//保重是绝对地址，相对地址容易紊乱
                    data    : $('#add_vehicle').serialize(),
                    success : function (result) {

                        alert("添加成功！");
                        $("#add_window").window("close");
                        $("#add_window").attr("closed", "true");
                        //$("#add_vehicle").reset();
                        $("#button").attr("value", "添加车辆");
                        getVehicleList();

                    },
                    error   : function () {
                        alert("异常！");
                    }
                });
            }
        }
        function closeWindow() {
            $("#add_window").window("close");
            $("#add_window").attr("closed", "true");
            //$("#add_vehicle").reset();
            $("#button").attr("value", "添加车辆");

        }
        function addVehicle() {
            $("#add_window").window("open");
            $("#button").attr("value", "取消");
            //$("#button").attr("onclick",cancel);
        }
        function openOrClose() {
            if ($("#add_window").attr('closed') == "true") {
                $("#add_window").window("open");
                $("#add_window").attr("closed", "false");
                $("#button").attr("value", "取消添加");


            } else {
                $("#add_window").window("close");
                $("#add_window").attr("closed", "true");
                //("#add_vehicle").form.reset();
                $("#button").attr("value", "添加车辆");
            }
        }
        $(document).ready(getVehicleList());
        function getVehicleList() {
            $("#list_content").html("");//清空列表内容，重新加载
            $.ajax({
                //几个参数需要注意一下
                type    : "GET",//方法类型
                dataType: "json",//预期服务器返回的数据类型
                url     : "${pageContext.request.contextPath}/vehicle/listByUserId.do?userId=" +${userId},//保重是绝对地址，相对地址容易紊乱
                data    : null,
                success : function (result) {
                    aVehicleList = result;
                    for (var i = 0; i < result.length; i++) {
                        var elTemp = $("#vehicle_model").clone();
                        console.info(elTemp.children("#vehicle_mark"));
                        elTemp.children("#vehicle_mark").text(result[i].mark);
                        elTemp.children("#vehicle_mark").attr('id', "vehicle_mark_" + i);
                        elTemp.children("#vehicle_edit").attr('id', "vehicle_edit_" + i);
                        elTemp.children("#vehicle_delete").attr("onClick","deleteVehicle("+result[i].id+")");
                        elTemp.children("#vehicle_delete").attr('id', "vehicle_delete_" + i);
                        elTemp.attr('id', "vehicle_model_" + i);
                        elTemp.show();
                        $("#list_content").append(elTemp);
                    }
                    console.info("result--" + result);

                },
                error   : function () {
                    alert("异常！");
                }
            });
        }
        function editVehicle(obj){
            var index = parseInt(obj.id.replace(/vehicle_edit_/,""));
            $("#edit_window").window("open");
            $("#edit_name").val(aVehicleList[index].name);
            $("#edit_typeName").val(aVehicleList[index].vehicleType_name);
            $("#edit_mark").val(aVehicleList[index].mark);
            $("#edit_chassisNo").val(aVehicleList[index].chassisNo);
            $("#edit_ic_name").val(aVehicleList[index].insuranceCompany_name);
            $("#vehicle_id").val(aVehicleList[index].id);

        }
    function checkAndUpdate() {
        var message = "";
        var flag = true;
        if ($("#edit_name").val() == "") {
            message = "车辆名称 "
            flag = false;
        }
        if ($("#edit_mark").val() == "") {
            message += "车牌号 ";
            flag = false;
        }
        if ($("#edit_chassisNo").val() == "") {
            message += "底盘号 "
            flag = false;
        }
        if (!flag) {
            alert(message + "不能为空！");
        } else {
            $.ajax({
                //几个参数需要注意一下
                type    : "POST",//方法类型
                dataType: "text",//预期服务器返回的数据类型
                url     : "${pageContext.request.contextPath}/vehicle/update.do",//保重是绝对地址，相对地址容易紊乱
                data    : $('#edit_vehicle').serialize(),
                success : function (result) {
                    if(result =="success"){
                        alert("修改成功！");
                        $("#edit_window").window("close");
                        $("#edit_window").attr("closed", "true");
                        getVehicleList();
                    }
                },
                error   : function () {
                    alert("异常！");
                }
            });
        }
    }
    function closeUpdateWindow(){
        $("#edit_window").window("close")
        $("#edit_window").attr("closed", "true");
    }
    function deleteVehicle(id){
      
        $.ajax({
            //几个参数需要注意一下
            type    : "POST",//方法类型
            dataType: "text",//预期服务器返回的数据类型
            url     : "${pageContext.request.contextPath}/vehicle/delete.do?vehicleId="+id,//保重是绝对地址，相对地址容易紊乱
            data    : null,
            success : function (result) {

                if(result=="success"){
                    alert("删除成功！");
                    getVehicleList();
                    //$("#add_vehicle").reset();
                }

            },
            error   : function () {
                alert("异常！");
            }
        });
    }
    </script>
</head>

<body>
<input id="button" type="button" class="button_add" onclick="openOrClose()" value="添加车辆">
</input>
<div id="add_window" class="easyui-window" title="添加车辆" closed="true" closable="false" collapsible="false"
     minimizable="false" maximizable="false" style="width: 600px;height: 500px">
    <form id="add_vehicle" class="add_vehicle"  action="##" method="post">
        <input type="hidden" name="userId" value="${userId}">

        <div class="form_tr">车辆名称
            <input id="name" class="easyui-validatebox form_input" name="name" data-options="required:true,validType:'name'" missingMessage="名称不能为空">
        </div>
        <div class="form_tr">车辆型号
            <input id="typeName" class="easyui-validatebox form_input" name="vehicleTyepName">
        </div>
        <div class="form_tr">车牌号
            <input id="mark" class="easyui-validatebox form_input" name="mark" data-options="required:true,validType:'name'" missingMessage="车牌号不能为空">
        </div>
        <div class="form_tr">底盘号
            <input id="chassisNo" class="easyui-validatebox form_input" name="chassis" data-options="required:true,validType:'name'" missingMessage="底盘号不能为空">
        </div>
        <div class="form_tr">保险公司
            <input id="ic_name" class="easyui-validatebox form_input" name="insuranceCompanyName">
        </div>
        <div class="form_tr">
            <input id="button_submit" class="button_submit" type="button" onclick="checkAndSubmit()" value="提交">
            <input id="cancel" class="button_cancel" type="button" onclick="closeWindow()" value="取消">
        </div>
    </form>
</div>
<div id="list_content" class="list_content">

</div>
<div id="edit_window" class="easyui-window" title="修改车辆信息" closed="true" closable="false" collapsible="false"
     minimizable="false" maximizable="false" style="width: 600px;height: 500px">
    <form id="edit_vehicle" class="add_vehicle" action="##" method="post">
        <input type="hidden" name="userId" value="${userId}">
        <input id="vehicle_id" type="hidden" name="id" value="">
        <div class="form_tr">车辆名称
            <input id="edit_name" class="easyui-validatebox form_input" name="name" data-options="required:true,validType:'name'" missingMessage="名称不能为空">
        </div>
        <div class="form_tr">车辆型号
            <input id="edit_typeName" class="easyui-validatebox form_input" name="vehicleTypeName">
        </div>
        <div class="form_tr">车牌号
            <input id="edit_mark" class="easyui-validatebox form_input" name="mark" data-options="required:true,validType:'name'" missingMessage="车牌号不能为空">
        </div>
        <div class="form_tr">底盘号
            <input id="edit_chassisNo" class="easyui-validatebox form_input" name="chassis" data-options="required:true,validType:'name'" missingMessage="底盘号不能为空">
        </div>
        <div class="form_tr">保险公司
            <input id="edit_ic_name" class="easyui-validatebox form_input" name="insuranceCompanyName">
        </div>
        <div class="form_tr">
            <input id="edit_button_submit" class="button_submit" type="button" onclick="checkAndUpdate()" value="提交">
            <input id="edit_cancel" class="button_cancel" type="button" onclick="closeUpdateWindow()" value="取消">
        </div>
    </form>
</div>
<div id="vehicle_model" class="vehicle_model" style="display: none">
    <div id="vehicle_mark" class="vehicle_mark">苏C123456</div>
    <div id="vehicle_edit"class="vehicle_edit" onmouseover="addClass(this,'border_yellow')" onmouseleave="removeClass(this,'border_yellow')" onClick="editVehicle(this)">修改</div>
    <div id="vehicle_delete" class="vehicle_delete" onmouseover="addClass(this,'border_yellow')" onmouseleave="removeClass(this,'border_yellow')"onClick="deleteVehicle(this)">删除</div>
</div>
<div id="add_content" class="add_content"></div>
<div class="vehicle_button" onclick="showMenu()">
    <div class="button_edit" onclick="editVehicle()"></div>
    <div class="button_remove" onclick="removeVehicle()"></div>
</div>
</body>
</html>