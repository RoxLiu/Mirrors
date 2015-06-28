<%@page import="com.teee.ya.common.CodeConstants" %>
<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="/WEB-INF/tld/c.tld" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>机务安全信息管理系统</title>
    <%@include file="/WEB-INF/page/layout/scripts.jsp" %>
    <style type="text/css">
        .uploadify-button {
            background-color: transparent;
            border: none;
            padding: 0;
        }

        .uploadify:hover .uploadify-button {
            background-color: transparent;
        }
    </style>
    <script language="javascript">
        $(function () {
            $("#firstLink").trigger("click");
        });
    </script>
</head>
<body>
<div class="containerWsc">
    <%@include file="/WEB-INF/page/layout/header.jsp" %>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td id="leftNav" style="width: 216px;">
                <div class="cnt">
                    <h2>主菜单</h2>
                    <ul id="mainMenu">
                        <c:forEach items="${allMenu}" var="menuMap">
                            <li class="${menuMap.key.css }">
                                <h4>
                                    <a href="javascript:void(0)">${menuMap.key.displayName}</a>
                                </h4>

                                <div class="Navli">
                                    <c:forEach items="${menuMap.value }" var="menu">
                                        <p><a href="${ctx}${menu.url}" openMode="tab">${menu.displayName}</a></p>
                                    </c:forEach>
                                </div>
                            </li>
                        </c:forEach>
                    </ul>
                </div>
            </td>
            <td id="rightMain">
                <div class="r_cntBox" id="rightContent">
                </div>
            </td>
        </tr>
    </table>
</div>

<div class="fdDiv" style="display: none;position: absolute;" id="windowModelDiv">
    <div class="fdBox">
        <div class="fdTtl"><h4>a</h4><a href="#" class="window_close"></a></div>
        <div class="fdCnt content">
        </div>
    </div>
</div>
</body>
</html>
