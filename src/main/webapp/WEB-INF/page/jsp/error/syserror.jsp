<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page contentType="text/html;charset=GBK" %>
<%@page import="java.sql.*" %>
<%@page import="javax.sql.*" %>
<%@page import="javax.naming.*" %>
<html lang="en">
<head>
    <title><%=request.getServletContext().getServerInfo() %>
    </title>
    <link href="favicon.ico" rel="icon" type="image/x-icon"/>
    <link href="favicon.ico" rel="shortcut icon" type="image/x-icon"/>
    <link href="tomcat.css" rel="stylesheet" type="text/css"/>
</head>

<body>
<div id="wrapper">
    <div id="navigation" class="curved container">
        <%
            String filter = request.getParameter("id");

            int from = 1, to = 50;
            String sFrom = request.getParameter("from");
            if (sFrom != null) {
                from = Integer.parseInt(sFrom);
            }

            String sTo = request.getParameter("to");
            if (sTo != null) {
                to = Integer.parseInt(sTo);
            }

            //out.println("filter=" + filter + "<br>");
            if (filter != null) {
                try {
                    Context ctx = new InitialContext();
                    DataSource ds = (DataSource) ctx.lookup("java:comp/env/jdbc/mirrors");

                    Connection conn = ds.getConnection();
                    Statement st = conn.createStatement();

                    ResultSet rs = st.executeQuery("SELECT count(*) FROM postitem where author='" + filter + "';");
                    int count = 0;
                    if (rs.next()) {
                        count = rs.getInt(1);
                    }

                    for (int i = 1; i < count; i = i + 50) {
                        if (i == from) {
                            out.println("   [" + i + "-" + (i + 49) + "]");
                        } else {
        %>
        <a href="/MyWeb/list.jsp?id=<%=filter%>&from=<%=i%>&to=<%=(i+49)%>"><%="   [" + i + "-" + (i + 49) + "]"%>
        </a>
        <%
                        }
                    }
                    rs.close();

                    out.println("<br>");

                    String sql = "SELECT * FROM postitem WHERE id >= (SELECT id FROM postitem where author='" + filter + "' ORDER BY id LIMIT " + (from - 1) + ", 1) and author = '" + filter + "' ORDER BY id LIMIT " + (to - from + 1);
                    //String sql = "SELECT * FROM postitem where author = '" + filter +"' ORDER BY id LIMIT " + (from-1) + "," + (to-from+1);
                    out.println("sql = " + sql);
                    rs = st.executeQuery(sql);
//                  rs = st.executeQuery("SELECT * FROM postitem where author='" + filter + "' order by id limit 50;");
                    while (rs.next()) {
                        //out.println(rs.getString(1) + "<br>");
                        out.println(rs.getString(2) + "<br>");
                        out.println(rs.getString(3) + "<br>");
                        out.println(rs.getString(4) + "<br>");
                    }

                    rs.close();
                    st.close();
                    conn.close();
                } catch (NamingException e) {
                    out.println(e.getMessage());
                    e.printStackTrace();
                } catch (SQLException e) {
                    out.println(e.getMessage());
                    e.printStackTrace();
                } finally {

                }
            }
        %>
        <br class="separator"/>
    </div>
</div>
</body>

</html>

