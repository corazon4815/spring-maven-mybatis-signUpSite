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
            <div class="modal-body" style="width: 500px; text-align:center;">
                <label for="memberIdModal">아이디</label><br>
                <tab1>
                <input type="text" id="memberIdModal" name="memberId" required> &nbsp;
                <button name="btn_duplChk" id="btn_duplChk" onclick="$memberJoin.event.duplChk();">중복확인</button><br></tab1>
                <div class="check_font" id="id_check"></div>

                <label for="memberName">이름</label><br>
                <input type="text" id="memberName" name="memberName" required><br>

                <label for="memberAddress">주소</label><br>
                <input type="text" id="memberAddress" name="memberAddress" required><br>

                <label for="memberPwModal">비밀번호</label><br>
                <input type="text" id="memberPwModal" name="memberPw" required><br>
                <label for="member_pw_chk">비밀번호 확인</label><br>
                <input type="text" id="member_pw_chk" name="member_pw_chk" required><br>
                <div class="check_font" id="pw_check"></div>
                <br>

                <label for="memberBirth">생년월일</label><br>
                <input type="date" id="memberBirth" name="memberBirth" required><br>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" name="reg_submit" id="reg_submit"
                        onclick="$memberJoin.request.doRegister();">등록
                </button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
            </div>
        </div>
    </div>
</div>

</body>
</html>
