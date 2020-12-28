<%@ taglib prefix="javascript" uri="http://www.springframework.org/tags/form" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page isELIgnored="false"%>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>헤더</title>
  <%--  <script type="text/javascript" src="/libs/jquery/3.5.1/jquery.js"></script>
    <script type="text/javascript" src="/libs/bootstrap/4.3.1/js/bootstrap.js"></script>--%>

</head>
<body>

<div class="header_container">
    <div class="headerlogouta">
        <a class="logouta" href="/view/logout">LOGOUT</a>
    </div>
    <div class="header">
        <h2 class="headertext">MEMBERS</h2>
        <h4 class="headerid">${memberInfo.memberName}님 반갑습니다.</h4>
    </div>

    <div class="row">
        <div class="span12">
            <div class="head" >
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span6"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
 </div>
</body>
</html>
