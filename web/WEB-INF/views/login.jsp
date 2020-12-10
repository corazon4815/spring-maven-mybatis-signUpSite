<%@ taglib prefix="javascript" uri="http://www.springframework.org/tags/form" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="/libs/jquery/jquery.js"></script>
    <script type="text/javascript" src="/js/login/login.js"></script>
    <script type="text/javascript" src="/js/memberjoin/memberjoin.js"></script>
    <script type="text/javascript" src="/libs/bootstrap/js/bootstrap.js"></script>
    <link rel="stylesheet" href="/libs/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="/css/login.css">

</head>
<body>
<form name="loginform" id="loginform" method="post">
    <div>
        <input type="text" name="memberId" id="memberId" placeholder="ID"><br>
        <input type="password" name="memberPw" id="memberPw" placeholder="PASSWARD"><br>
        <input type="button" class="btn btn-primary" id="btn_login" value="로그인">
        <%-- <button onclick="window.open('/view/registerview','회원가입','width=430,height=500,location=no,status=no,scrollbars=yes');">회원가입--%>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#memberModal">회원가입</button>
        <%--onclick="javascript:$loginView.ui.doLogin();--%>
    </div>
</form>

<!-- Modal -->
<div class="modal fade" id="memberModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Modal title</h4>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>

</body>
</html>
