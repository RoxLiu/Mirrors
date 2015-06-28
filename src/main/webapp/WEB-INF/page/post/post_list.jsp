<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="/WEB-INF/tld/c.tld" %>
<%@include file="/WEB-INF/page/layout/scripts.jsp" %>
<%@include file="/WEB-INF/page/layout/taglib.jsp" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<%--
<script type="text/javascript" src="${ctx}/js/page/ganbuRideCheck/ganbu_ride_check.js"/>
--%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Mirrors</title>
    <script language="javascript">
        $(function () {
            $("#firstLink").trigger("click");
        });
    </script>
</head>
<body>
<div id="doc">
    <form method="post" name="defectQueryForm" action="${ctx}/ganbuRideCheck/rideCheckList" onsubmit="return tabSearch(this)">
        <input type="hidden" name="search_EQ_category" value="${param.serach_EQ_category}">
        <%--
        <input type="hidden" name="search_NEQ_state" value="<%=SysCodeConstants.DATA_STATUS.DELETED%>">
        --%>
    </form>
    <div class="r_cntBox" id="rightContent">
        <div class="">
            <c:forEach items="${pager.content}" varStatus="sts" var="item">
                <div class="alt-info">
                        <span>
                                ${item.author}
                        </span>
                    <sapn>
                            ${item.date}
                    </sapn>
                </div>
                <div class="alt-content">
                        ${item.content}
                </div>

            </c:forEach>
            <tags:pagination page="${pager}" paginationSize="5"/>
        </div>
    </div>
</div>
</body>
</html>


