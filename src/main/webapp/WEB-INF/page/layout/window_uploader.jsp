<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%
    String uploadSuccessHandler = request.getParameter("uploadSuccessHandler");
    if (uploadSuccessHandler == null) {
        uploadSuccessHandler = "windowUploadSuccess";
    }
%>
<input id="uploadFile" type="file" name="uploadify"
       uploaderOption="{
		swf:'<%=request.getContextPath()%>/js/jquery/uploadify/uploadify.swf;jsessionid=${pageContext.session.id}',
		uploader:'<%=request.getContextPath()%>${settings.action};jsessionid=${pageContext.session.id}',
		fileObjName:'uploadify',
		buttonImage:'<%=request.getContextPath()%>/theme/images/uploadFile.jpg',
		fileSizeLimit:'${settings.sizeLimit}',
		fileTypeDesc:'${settings.fileDesc}',
		fileTypeExts:'${settings.fileExt}',
		auto:${settings.auto},
		removeCompleted:false,
		multi:true,
		width:90,
		height:30,
		onUploadSuccess:<%=uploadSuccessHandler%>
	}"/>
<input name="upfileName" type="hidden">
<input name="upfilePath" type="hidden">