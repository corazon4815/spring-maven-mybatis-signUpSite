<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="/libs/jquery/jquery.js"></script>
    <script type="text/javascript" src="/js/login/login.js"></script>
</head>
<body>
<form name="loginform" id="loginform" method="post">
    <div>
        <input type="text" name="memberId" id="memberId" placeholder="ID"><br>
        <input type="password" name="memberPw" id="memberPw"  placeholder="PASSWARD"><br>
        <input type="button" id="btn_login" value="로그인">
        <button onclick="window.open('/member/registerform','회원가입','width=430,height=500,location=no,status=no,scrollbars=yes');">회원가입</button>
        <%--onclick="javascript:$loginView.ui.doLogin();--%>
    </div>
</form>
</body>
</html>
