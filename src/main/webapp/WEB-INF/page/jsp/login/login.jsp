<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>

<script language="javascript">
    if (window.opener) {
        try {
            //If this window's parent has been refreshed, "window.opener.location"
            //will throw an error, so we should catch it and close this window.
            window.opener.location = self.location;
        } catch (ex) {
            window.close();
        }
        window.close();
    } else if (top != self) {
        top.location.replace(location.href);
    }
    function handleEnter(field, event) {
        var keyCode = event.keyCode ? event.keyCode : event.which ? event.which
                : event.charCode;
        if (keyCode == 13) {
            login();
        }
    }
</script>
<head>
    <title>myssh2 Login</title>
    <style type="text/css">
        <!--
        body {
            margin-left: 0px;
            margin-top: 0px;
            margin-right: 0px;
            margin-bottom: 0px;
            background-color: #1D3647;
        }

        -->
    </style>
    <meta http-equiv="Expires" CONTENT="0">
    <link href="${pageContext.request.contextPath}/images/skin.css"
          rel="stylesheet" type="text/css">

</head>
<body>
<form name="loginForm"
      action="${pageContext.request.contextPath}/login.action"
      method="post">
    <table width="100%" height="166" border="0" cellpadding="0"
           cellspacing="0">
        <tr>
            <td height="42" valign="top">
                <table width="100%" height="42"
                       border="0" cellpadding="0" cellspacing="0" class="login_top_bg">
                    <tr>
                        <td width="1%" height="21">&nbsp;</td>
                        <td height="42">&nbsp;</td>
                        <td width="17%">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td valign="top">
                <table width="100%" height="532" border="0"
                       cellpadding="0" cellspacing="0" class="login_bg">
                    <tr>
                        <td width="49%" align="right">
                            <table width="91%"
                                   height="532" border="0" cellpadding="0" cellspacing="0"
                                   class="login_bg2">
                                <tr>
                                    <td height="138" valign="top">
                                        <table width="89%"
                                               height="427" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td height="149">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td height="198" align="right" valign="top">
                                                    <table
                                                            width="100%" border="0" cellpadding="0" cellspacing="0">

                                                        <td width="1%">&nbsp;</td>
                                                        <td width="50%" valign="bottom">
                                                            <table width="100%"
                                                                   height="59" border="0" align="center" cellpadding="0"
                                                                   cellspacing="0">
                                                                <tr>
                                                                    <td width="4%">&nbsp;</td>
                                                                    <td width="96%" height="38"><span
                                                                            class="login_txt_bt"></span></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>&nbsp;</td>
                                                                    <td height="21">
                                                                        <table cellSpacing="0"
                                                                               cellPadding="0" width="100%" border="0"
                                                                               id="table211" height="328">
                                                                            <tr>
                                                                                <td height="164" colspan="2"
                                                                                    align="middle">
                                                                                    <table cellSpacing="0"
                                                                                           cellPadding="0"
                                                                                           width="100%" border="0"
                                                                                           height="143"
                                                                                           id="table212">
                                                                                        <tr>
                                                                                            <td width="13%" height="38"
                                                                                                class="top_hui_text"><span
                                                                                                    class="login_txt">Login Id&nbsp;&nbsp; </span>
                                                                                            </td>
                                                                                            <td height="38" colspan="2"
                                                                                                class="top_hui_text">
                                                                                                <input type="text"
                                                                                                       onkeypress="handleEnter(this,event);"
                                                                                                       name="loginId"
                                                                                                       value=""
                                                                                                       style="width: 200px;"/>

                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td width="13%" height="35"
                                                                                                class="top_hui_text"><span
                                                                                                    class="login_txt">password &nbsp;&nbsp;
																								</span></td>
                                                                                            <td height="35" colspan="2"
                                                                                                class="top_hui_text">
                                                                                                <input type="password"
                                                                                                       onkeypress="handleEnter(this,event);"
                                                                                                       name="loginPwd"
                                                                                                       value=""
                                                                                                       style="width: 200px;"/>

                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td height="35">&nbsp;</td>
                                                                                            <td width="20%" height="35">
                                                                                                <input
                                                                                                        name="Submit"
                                                                                                        onclick="login();"
                                                                                                        type="button"
                                                                                                        class="black_button"
                                                                                                        value="Login">
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                    <br>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td colspan="2"><font size="2"
                                                                                                      color="red">

                                                                                    <c:if test="${loginCode == 101}">
                                                                                        Input wrong username and password!
                                                                                    </c:if>
                                                                                </font></td>
                                                                                <td width="57" align="right"
                                                                                    valign="bottom">&nbsp;</td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>

                                        </table>
</form>
<script type="text/javascript">
    function login() {
        this.document.loginForm
                .submit();
    }
</script>
</body>
