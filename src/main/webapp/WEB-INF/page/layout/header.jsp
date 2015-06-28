<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="shiro" uri="/WEB-INF/tld/shiro.tld" %>

<table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
        <td id="leftNav">
            <div class="ttl">机务安全管理系统</div>
        </td>
        <td id="rightMain">
            <div class="topBg">
                <span>欢迎您：<shiro:principal property="name"/>【${org}】</span><a href="#">修改密码</a>|<a
                    href="<%=request.getContextPath()%>/login/logout">注销</a>
            </div>
        </td>
    </tr>
</table>