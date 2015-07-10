<%@tag pageEncoding="UTF-8" %>
<%@ attribute name="page" type="org.springframework.data.domain.Page" required="true" %>
<%@ attribute name="paginationSize" type="java.lang.Integer" required="true" %>
<%@ attribute name="url" type="java.lang.String" required="true" %>

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
    <div class="c fl">
        <%
            if (page != null && page.hasPreviousPage() && page.getTotalPages() > 1) {
        %>
        <a href="${url}/1">&lt;&lt;</a>
        <a href="${url}/${current-1}">&lt;</a>
        <%} %>
        <c:if test="${totalPages > 1}">
            <c:forEach var="i" begin="${begin}" end="${end}">
                <c:choose>
                    <c:when test="${i == current}">
                        <span>${i}</span>
                    </c:when>
                    <c:otherwise>
                        <a href="${url}/${i}">${i}</a>
                    </c:otherwise>
                </c:choose>
            </c:forEach>
        </c:if>
        <% if (page != null && page.hasNextPage()) {%>
        <a href="${url}/${current+1}">&gt;</a>
        <a href="${url}/${page.totalPages}">&gt;&gt;</a>
        <%} %>
    </div>
    <c:if test="${totalPages > 1}">
        <div class="r fr">
            <span>共<%=totalPages %>页</span>第<input name="pagetxt" type="text" class="pageIpt" value="${current}"/>页
            <input name="pagebtn" type="button" value="确定" url ="${url}" onclick="goto_page(this)"/>
        </div>
    </c:if>
</div>

<script type="text/javascript">
  function goto_page(btn) {
      var $txt = $(btn).prev();
      window.location = $(btn).attr("url") + "/" + $txt.val();
  }
</script>

