<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>订购编辑页</title>
    <link rel="stylesheet" href="css/orderBuilder.css" type="text/css"/>
    <link rel="stylesheet" type="text/css" href="themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="themes/icon.css">
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/jquery.easyui.min.js"></script>
    <script src="js/jquery.easyui.min.js"></script> 
    
    <style type="text/css">
        .file {
            position: absolute;
            height: 24px;
            filter: alpha(opacity:0);
            opacity: 0;
            width: 0;
        }

        .drag {
            width: 100px;
            height: 50px;
            padding: 10px;
            margin: 5px;
            border: 1px solid #ccc;
            background: #AACCFF;
        }

        .dp {
            opacity: 0.5;
            filter: alpha(opacity=50);
        }

        .over {
            background: #FBEC88;
        }

        .order_promotion {
            position: absolute;
            width: 150px;
            height: 60px;
            background: #0000FF;
        }

        .order_button {
            position: absolute;
        }

        .promotion_check {
            background: gainsboro;
        }
    </style>
    <script language="javascript">
        var g_iPromotionIndex = 0;
        var g_strSelectElementId;
        function getSelect() {
            //触发 文件选择的click事件
            $("#file").trigger("click");
            //alert($("#file").attr("value"))
            //其他code如
        }
        function getFilePath(obj) {
            console.log(obj.value);
            document.getElementById("bg_name").value = obj.value;
            //$("#bg_name").value = obj.value;
            console.log("111111=====" + $("#bg_name").value);
            //alert($("#file").attr("value"));
        }
        function addTreeNode() {
/*             var node = $('#tt').tree('getSelected');
            if (node && node.text == "订购页") {
                var nodes = [{
                    "id"      : 3,
                    "text"    : "包月",
                    "children": [{
                        "id"  : 25,
                        "text": "包月焦点"
                    }]
                }];
                $('#tt').tree('append', {
                    parent: node.target,
                    data  : nodes
                }); */
                var obj = $('#demo_order_promotion').clone();
                // obj.addClass('easyui-draggable');
                obj.attr("id", "order_promotion_" + g_iPromotionIndex);
                g_iPromotionIndex += 1;

                $(".preview").append(obj);
                $(obj).draggable({
                    onDrag: function (e) {
                        g_strSelectElementId = this.id;
                        $('#pos_x').numberspinner('setValue', e.offsetX);
                        $('#pos_y').numberspinner('setValue', e.offsetY);
                        var d = e.data;
                        if (d.left < 0) {
                            d.left = 0
                        }
                        if (d.top < 0) {
                            d.top = 0
                        }
                        if (d.left + $(d.target).outerWidth() > $(d.parent).width()) {
                            d.left = $(d.parent).width() - $(d.target).outerWidth();
                        }
                        if (d.top + $(d.target).outerHeight() > $(d.parent).height()) {
                            d.top = $(d.parent).height() - $(d.target).outerHeight();
                        }

                    }
                });
                $(obj).attr("onClick", "changeStates(this)");
            }

        $(doucment).ready(function(){
        	console.log("the jquery for index.jsp is ready!");
        	$("#setBg").ajaxForm();
        
        	});
        
        function changeStates(obj) {//选中订购页推荐框，那么其他的推荐位选中效果取消，右侧坐标内显示当前推荐位参数
            g_strSelectElementId = obj.id;

            var objList = $('.order_promotion');
            for (var i = 0; i < objList.length; i++) {
                var tempObj = objList[i];
                if (tempObj == obj && !$(tempObj).hasClass('promotion_check')) {
                    $(tempObj).addClass('promotion_check');
                } else {
                    $(tempObj).removeClass('promotion_check');
                }
            }
            $('#pos_x').numberspinner('setValue', obj.offsetLeft);
            $('#pos_y').numberspinner('setValue', obj.offsetTop);
            $('#pos_w').numberspinner('setValue', obj.offsetWidth);
            $('#pos_h').numberspinner('setValue', obj.offsetHeight);

        }
        function spinChange() {
            if (!g_strSelectElementId) {
                return;
            }
            var id = $(this).attr("id");
            switch (id) {
                case "pos_x":
                    $("#" + g_strSelectElementId).css("left", $(this).numberspinner('getValue') + "px");
                    break;
                case "pos_y":
                    $("#" + g_strSelectElementId).css("top", $(this).numberspinner('getValue') + 'px');
                    break;
                case "pos_w":
                    $("#" + g_strSelectElementId).css("width", $(this).numberspinner('getValue') + 'px');
                    break;
                case "pos_h":
                    $("#" + g_strSelectElementId).css("height", $(this).numberspinner('getValue') + 'px');
                    break;
            }
        }
        function commitForm(){
        	$.ajax();
        	
        }
        $(function () {
            $(".easyui-numberspinner").numberspinner({
                onChange: spinChange,
            });
        })

    </script>
</head>
</head>
<body>

<div id="preview_box" class="preview">
    <iframe src="html/subscribe.html" style="width: 100%;height: 100%" >

    </iframe>
</div>
<div id="plugins" class="easyui-accordion plugins_area" data-options="accept:'#demo_order_promotion'">
    <div title="设置背景" style="overflow:auto;padding:10px;">
        <form id="setBg" action="test/fileUpAndSetBg" method="post"  enctype="multipart/form-data">
            <input type="file" id="file" name="file" class="file" onchange="getFilePath(this)"></input>
            <input type="text" id="bg_name" style="width: 200px;height: 24px" disabled="disabled"/>
            
            <a id="select_bg" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="getSelect()">选择</a>
            <a id="submit_bg" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" onclick="commitForm()">确认</a>
        </form>
    </div>
    <div title="添加订购项" style="overflow:auto;padding:10px;height:400px;">
<!--         <div style="width:200px;height:auto;border:1px solid #ccc;">
            <ul id="tt" class="easyui-tree" url="data/tree_data.json"></ul>
        </div> -->
        <a id="add_node" class="easyui-linkbutton" data-options="iconCls:'icon-add'" onclick="addTreeNode()">添加</a>
        <div id="property_area" style="position:absolute;left: 250px;top: 80px;width:300px;height: auto;border: solid 1px #00bbee">
            <p style="padding-left: 35px">
                X <input id="pos_x" type="text" class="easyui-numberspinner" style="width: 70px;height: 30px;" min="-740" max="1280" value="50">
                Y <input id="pos_y" type="text" class="easyui-numberspinner" style="width: 70px;height: 30px;" min="-360" max="720" value="50">
            </p>
            <p style="padding-left: 35px">
                W <input id="pos_w" type="text" class="easyui-numberspinner" style="width: 70px;height: 30px;" min="-740" max="1280" value="50">
                H <input id="pos_h" type="text" class="easyui-numberspinner" style="width: 70px;height: 30px;" min="-360" max="720" value="50">
            </p>
            <div id="demo_order_promotion" class="order_promotion easyui-draggable" style="">
                <div id="demo_order_button" class="order_button" style="width: 50px;height: 30px;border: solid 1px green"></div>
            </div>
        </div>
    </div>

    <div title="设置背景" data-options="iconCls:'icon-ok'" style="overflow:auto;padding:10px;">
        <h3 style="color:#0099FF;">Accordion for jQuery</h3>
    </div>
</div>


</body>
</html>