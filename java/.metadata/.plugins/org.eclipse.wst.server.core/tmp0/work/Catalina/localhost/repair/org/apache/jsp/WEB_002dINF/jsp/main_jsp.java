/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/8.5.11
 * Generated at: 2018-03-27 09:26:44 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.WEB_002dINF.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import controller.*;
import entity.*;

public final class main_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent,
                 org.apache.jasper.runtime.JspSourceImports {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  private static final java.util.Set<java.lang.String> _jspx_imports_packages;

  private static final java.util.Set<java.lang.String> _jspx_imports_classes;

  static {
    _jspx_imports_packages = new java.util.HashSet<>();
    _jspx_imports_packages.add("javax.servlet");
    _jspx_imports_packages.add("controller");
    _jspx_imports_packages.add("javax.servlet.http");
    _jspx_imports_packages.add("javax.servlet.jsp");
    _jspx_imports_packages.add("entity");
    _jspx_imports_classes = null;
  }

  private volatile javax.el.ExpressionFactory _el_expressionfactory;
  private volatile org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public java.util.Set<java.lang.String> getPackageImports() {
    return _jspx_imports_packages;
  }

  public java.util.Set<java.lang.String> getClassImports() {
    return _jspx_imports_classes;
  }

  public javax.el.ExpressionFactory _jsp_getExpressionFactory() {
    if (_el_expressionfactory == null) {
      synchronized (this) {
        if (_el_expressionfactory == null) {
          _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
        }
      }
    }
    return _el_expressionfactory;
  }

  public org.apache.tomcat.InstanceManager _jsp_getInstanceManager() {
    if (_jsp_instancemanager == null) {
      synchronized (this) {
        if (_jsp_instancemanager == null) {
          _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
        }
      }
    }
    return _jsp_instancemanager;
  }

  public void _jspInit() {
  }

  public void _jspDestroy() {
  }

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response)
      throws java.io.IOException, javax.servlet.ServletException {

    final java.lang.String _jspx_method = request.getMethod();
    if (!"GET".equals(_jspx_method) && !"POST".equals(_jspx_method) && !"HEAD".equals(_jspx_method) && !javax.servlet.DispatcherType.ERROR.equals(request.getDispatcherType())) {
      response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "JSPs only permit GET POST or HEAD");
      return;
    }

    final javax.servlet.jsp.PageContext pageContext;
    javax.servlet.http.HttpSession session = null;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html; charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("\r\n");
      out.write("    \r\n");
      out.write("    \r\n");
      out.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\r\n");
      out.write("<html>\r\n");
      out.write("<head>\r\n");
      out.write("    <title>主界面</title>\r\n");
      out.write("    <link rel=\"stylesheet\" type=\"text/css\" href=\"../themes/default/easyui.css\">\r\n");
      out.write("    <link rel=\"stylesheet\" type=\"text/css\" href=\"../themes/icon.css\">\r\n");
      out.write("    <script type=\"text/javascript\" src=\"../js/jquery.min.js\"></script>\r\n");
      out.write("    <script type=\"text/javascript\" src=\"../js/jquery.easyui.min.js\"></script>\r\n");
      out.write("</head>\r\n");
      out.write("<style>\r\n");
      out.write("    .left_content{\r\n");
      out.write("        position: absolute;\r\n");
      out.write("        left: 0%;\r\n");
      out.write("        top:20%;\r\n");
      out.write("        width: 15%;\r\n");
      out.write("        height: 80%;\r\n");
      out.write("        background: #595959;\r\n");
      out.write("    }\r\n");
      out.write("    body{\r\n");
      out.write("        font-family: \"微软雅黑\"!important;\r\n");
      out.write("        font-size: 14px;\r\n");
      out.write("    }\r\n");
      out.write("    .left_menu{\r\n");
      out.write("        position: absolute;\r\n");
      out.write("        left: 0;\r\n");
      out.write("        top: 15%;\r\n");
      out.write("        width: 100%;\r\n");
      out.write("        height: 80%;\r\n");
      out.write("    }\r\n");
      out.write("    .left_menu_button{\r\n");
      out.write("        position: relative;\r\n");
      out.write("        width: 100%;\r\n");
      out.write("        height: 50px;\r\n");
      out.write("        margin: 2px;\r\n");
      out.write("        text-align: left;\r\n");
      out.write("        color: #c9c9c9 ;\r\n");
      out.write("        line-height: 50px;\r\n");
      out.write("        box-sizing: border-box;\r\n");
      out.write("    }\r\n");
      out.write("    .main_content{\r\n");
      out.write("        position: absolute;\r\n");
      out.write("        left: 15%;\r\n");
      out.write("        top:20%;\r\n");
      out.write("        width: 85%;\r\n");
      out.write("        height: 80%;\r\n");
      out.write("        background: #EEEEEE;\r\n");
      out.write("    }\r\n");
      out.write("    .focus_on{\r\n");
      out.write("        background: #4E4E4E ;\r\n");
      out.write("        /**/\r\n");
      out.write("    }\r\n");
      out.write("    .menu_item_current{\r\n");
      out.write("        color: orange;\r\n");
      out.write("        border-left: solid  2px orange ;\r\n");
      out.write("        text-align: center;\r\n");
      out.write("/*        border-bottom: double  2px orange;\r\n");
      out.write("        border-top: double 2px orange;\r\n");
      out.write("        border-right:double  2px orange;*/\r\n");
      out.write("    }\r\n");
      out.write("</style>\r\n");
      out.write("<script>\r\n");
      out.write("function focusOn(){\r\n");
      out.write("    addClass(this,\"focus_on\");\r\n");
      out.write("}\r\n");
      out.write("function addClass(obj, cls) {\r\n");
      out.write("    if (!this.hasClass(obj, cls)) {\r\n");
      out.write("        obj.className +=(\" \" + cls);\r\n");
      out.write("    }\r\n");
      out.write("}\r\n");
      out.write("function hasClass(obj, cls) {\r\n");
      out.write("\r\n");
      out.write("    return obj.className.match(new RegExp('(\\\\s|^)' + cls + '(\\\\s|$)'));\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write("function removeClass(obj, cls) {\r\n");
      out.write("    if (hasClass(obj, cls)) {\r\n");
      out.write("        var reg = new RegExp('(\\\\s|^)' + cls + '(\\\\s|$)');\r\n");
      out.write("        obj.className = obj.className.replace(reg, ' ').trim();\r\n");
      out.write("    }\r\n");
      out.write("}\r\n");
      out.write("function showVehicle(){\r\n");
      out.write("\tvar userId = ");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${requestScope.user.id}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("\r\n");
      out.write("\t$(\"#main_content\").load(\"../vehicle/index.do?userId=\"+userId);\r\n");
      out.write("\t/* addClass($(\"#vehicle_management\"),\"menu_item_current\"); */\r\n");
      out.write("}\r\n");
      out.write("function showRepairSheet(){\r\n");
      out.write("    var userId = ");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${requestScope.user.id}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("\r\n");
      out.write("        $(\"#main_content\").load(\"../repair/index.do?userId=\"+userId);\r\n");
      out.write("    /* addClass($(\"#vehicle_management\"),\"menu_item_current\"); */\r\n");
      out.write("}\r\n");
      out.write("function showRecord(){\r\n");
      out.write("    var userId = ");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${requestScope.user.id}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("\r\n");
      out.write("        $(\"#main_content\").load(\"../record/index.do?userId=\"+userId);\r\n");
      out.write("    /* addClass($(\"#vehicle_management\"),\"menu_item_current\"); */\r\n");
      out.write("}\r\n");
      out.write("</script>\r\n");
      out.write("<body>\r\n");
      out.write("<div id=\"left_content\" class=\"left_content\">\r\n");
      out.write("\t\r\n");
      out.write("    <div class=\"user_info\">\r\n");
      out.write("    \t<div class=\"user_name\">");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${requestScope.user.name}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null));
      out.write("</div>\r\n");
      out.write("    \t\r\n");
      out.write("    </div>\r\n");
      out.write("    <div id=\"left_menu\" class=\"left_menu\">\r\n");
      out.write("\r\n");
      out.write("        <div id=\"vehicle_management\" class=\"left_menu_button\" onmouseover=\"addClass(this,'focus_on')\" onmouseleave=\"removeClass(this,'focus_on')\" onclick=\"showVehicle()\">车辆管理</div>\r\n");
      out.write("        <div id=\"repair_sheet\" class=\"left_menu_button\" onmouseover=\"addClass(this,'focus_on')\" onmouseleave=\"removeClass(this,'focus_on')\" onclick=\"showRepairSheet()\">提交修理</div>\r\n");
      out.write("        <div id=\"record_search\" class=\"left_menu_button\" onmouseover=\"addClass(this,'focus_on')\" onmouseleave=\"removeClass(this,'focus_on')\"onclick=\"showRecord()\">记录查询</div>\r\n");
      out.write("    </div>\r\n");
      out.write("</div>\r\n");
      out.write("<div id=\"main_content\" class=\"main_content\">\r\n");
      out.write("    这是强哥做的根本不能看的页面，等待修复中\r\n");
      out.write("</div>\r\n");
      out.write("</body>\r\n");
      out.write("</html>");
    } catch (java.lang.Throwable t) {
      if (!(t instanceof javax.servlet.jsp.SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try {
            if (response.isCommitted()) {
              out.flush();
            } else {
              out.clearBuffer();
            }
          } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}