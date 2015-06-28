<%@tag pageEncoding="UTF-8" %>
<%@ attribute name="page" type="org.springframework.data.domain.Page" required="true" %>
<%@ attribute name="paginationSize" type="java.lang.Integer" required="true" %>

<%@ taglib prefix="c" uri="/WEB-INF/tld/c.tld" %>

<%
    int current = page == null ? 0 : page.getNumber() + 1;
    int begin = Math.max(1, current - paginationSize / 2);

    int totalPages = page == null ? 0 : page.getTotalPages();
    int end = Math.min(begin + (paginationSize - 1), totalPages);

    long totalCnt = page == null ? 0 : page.getTotalElements();
    request.setAttribute("current", current);
    request.setAttribute("begin", begin);
    request.setAttribute("end", end);
    request.setAttribute("paginationSize", paginationSize);
    request.setAttribute("totalCnt", totalCnt);
    request.setAttribute("totalPages", totalPages);
%>
<div class="page box">
    <div class="l fl">
        <span>共${totalCnt }条<c:if test="${totalPages > 1}">，每页显示：</c:if></span>
        <c:if test="${totalCnt > pageSize}">
            <select name="pageSize">
                <option value="10" <c:if test="${pageSize == 10}">selected</c:if>>10</option>
                <option value="20" <c:if test="${pageSize == 20}">selected</c:if>>20</option>
            </select>
            条
        </c:if>
    </div>
    <c:if test="${totalPages > 1}">
        <div class="r fr">
            <span>共<%=totalPages %>页</span>第<input name="pageNumber" type="text" class="pageIpt" id="hidPageNumber" value="${current }"/>页
            <input name="" type="button" class="pageBtn" value="确定" btnType="submitForm"/>
        </div>
    </c:if>
    <div class="c fr">
        <%
            if (page != null && page.hasPreviousPage() && page.getTotalPages() > 1) {
        %>
        <a href="?page=1" btnType="submitForm" pageNumber="1">&lt;&lt;</a>
        <a href="?page=${current-1}" btnType="submitForm" pageNumber="${current-1}">&lt;</a>
        <%} %>
        <c:if test="${totalPages > 1}">
            <c:forEach var="i" begin="${begin}" end="${end}">
                <c:choose>
                    <c:when test="${i == current}">
                        <span>${i}</span>
                    </c:when>
                    <c:otherwise>
                        <a href="?page=${i}" btnType="submitForm" pageNumber="${i}">${i}</a>
                    </c:otherwise>
                </c:choose>
            </c:forEach>
        </c:if>
        <% if (page != null && page.hasNextPage()) {%>
        <a href="?page=${current+1}" btnType="submitForm" pageNumber="${current+1}">&gt;</a>
        <a href="?page=${page.totalPages}" btnType="submitForm" pageNumber="${page.totalPages}">&gt;&gt;</a>
        <%} %>
    </div>
</div>

