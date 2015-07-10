<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="/WEB-INF/tld/c.tld" %>
<%@include file="/WEB-INF/page/layout/scripts.jsp" %>
<%@include file="/WEB-INF/page/layout/taglib.jsp" %>
<script type="text/javascript" src="${ctx}/js/page/post/post_list.js"></script>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Mirrors</title>
</head>
<body>
<div id="doc">
    <div class="bd">
        <div class="atl-main">
            <tags:pagination page="${pager}" paginationSize="15" url="${ctx}/author/post/${author}"/>
            <c:forEach items="${pager.content}" varStatus="sts" var="item">
                <div class="atl-item">
                    <div class="alt-info" username="${item.author}" type="${item.type}" onmouseover="show_menu(this)" onmouseout="hide_menu(this)">
                        <span class="floornum">${sts.index+1}楼</span>
                        <span>
                            <c:if test="${item.type == 1}">
                                <span style="color: red; "> 楼主：</span>
                            </c:if>
                            ${item.author}
                        </span>

                        <sapn>
                                ${item.date}
                        </sapn>

                        <a style="display: none;" class="tyf_link" tyf_type="1" href="javascript:void(0)" url="${ctx}/post/block" onclick="handle_menu_event(this)">拉黑</a>
                        <a style="display: none;" class="tyf_link" tyf_type="2" href="javascript:void(0)" url="${ctx}/post/unblock" onclick="handle_menu_event(this)">洗白</a>
                        <a style="display: none;" class="tyf_link" tyf_type="3" href="javascript:void(0)" url="${ctx}/post/highlight" onclick="handle_menu_event(this)">关注</a>
                        <a style="display: none;" class="tyf_link" tyf_type="4" href="javascript:void(0)" url="${ctx}/post/unhighlight" onclick="handle_menu_event(this)">取关</a>
                        <a style="display: none;" class="tyf_link" tyf_type="5" href="javascript:void(0)" url="${ctx}/author/post" onclick="handle_menu_event(this)">只看此人</a>
                    </div>

                    <c:if test="${item.type == 1 || item.type == 3}">
                        <div class="alt-content" style="background-color: rgb(204, 232, 207);">
                                ${item.content}
                        </div>
                    </c:if>
                    <c:if test="${item.type == 2}">
                        <div class="alt-content">
                                ${item.content}
                        </div>
                    </c:if>
                </div>
            </c:forEach>
            <tags:pagination page="${pager}" paginationSize="15" url="${ctx}/author/post/${author}"/>
        </div>
    </div>
</div>
</body>
</html>