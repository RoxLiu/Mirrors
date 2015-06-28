<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="/WEB-INF/tld/c.tld" %>
<div class="page box">
    <div class="l fl">
        <span>每页显示：</span><select name="">
        <option>20</option>
    </select>
    </div>
    <div class="r fr">
        <span>共10页</span>第<input name="" type="text" class="pageIpt"/>页<input
            name="" type="button" class="pageBtn" value="确定"/>
    </div>
    <div class="c fr">
        <a href="#">上一页</a><span>1</span><a href="#">2</a><a href="#">3</a><span>...</span><a
            href="#">10</a><a href="#">上一页</a>
    </div>
</div>