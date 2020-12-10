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
    <link rel="stylesheet" href="/css/memberJoin.css">


</head>
<body>
<div id="login">
    <h3 class="text-center text-white pt-5">Login form</h3>
    <div class="container">
        <div id="login-row" class="row justify-content-center align-items-center">
            <div id="login-column" class="col-md-6">
                <div id="login-box" class="col-md-12">
                    <form id="login-form" class="form" action="" method="post">
                        <h3 class="text-center text-info">Login</h3>
                        <div class="form-group">
                            <label for="memberId" class="text-info">Username:</label><br>
                            <input type="text" name="memberId" id="memberId" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="memberPw" class="text-info">Password:</label><br>
                            <input type="password" name="memberPw" id="memberPw" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="button" name="submit" id="btn_login" class="btn btn-info btn-md" value="로그인">
                        </div>
                        <div id="register-link" class="text-right">
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#memberModal">회원가입</button>
                            <%--<a href="#" class="text-info">Register here</a>--%>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="memberModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="text-center text-info" id="myModalLabel">Sign Up</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

            </div>
            <div class="modal-body">
                <div class="span6" style="text-align: left;">
                    <div class="area">
                        <form class="form-horizontal">

                            <div class="control-group">
                                <label class="control-label" for="memberIdModal">아이디</label>
                                <div class="controls">
                                    <input id="memberIdModal" class="memberjoinwidth" type="text">&nbsp;&nbsp;&nbsp;
                                    <button type="button" name="btn_duplChk" id="btn_duplChk" class="btn btn-secondary" onclick="$memberJoin.event.duplChk();">중복확인</button>
                                </div>
                                 <div class="check_font" id="id_check" style="font-size: 10px;"></div>
                            </div>

                            <div class="control-group">
                                <label class="control-label" for="memberName">이름</label>

                                <div class="controls">
                                    <input id="memberName" class="memberjoinwidth" type="text">
                                </div>
                            </div>

                            <div class="control-group">
                                <label class="control-label" for="memberAddress">주소</label>

                                <div class="controls">
                                    <input id="memberAddress" class="memberjoinwidth"
                                           type="text">
                                </div>
                            </div>

                            <div class="control-group">
                                <label class="control-label" for=
                                        "memberPwModal">비밀번호</label>

                                <div class="controls">
                                    <input id="memberPwModal" class="memberjoinwidth" type="text">
                                </div>
                            </div>

                            <div class="control-group">
                                <label class="control-label" for=
                                        "member_pw_chk">비밀번호 확인</label>

                                <div class="controls">
                                    <input id="member_pw_chk" class="memberjoinwidth" type="text">
                                </div>
                                <br>
                                <div class="check_font" id="pw_check" style="font-size: 10px;"></div>
                            </div>

                            <div class="control-group">
                                <label class="control-label" for=
                                        "memberBirth">생년월일</label>

                                <div class="controls">
                                    <input id="memberBirth" class="memberjoinwidth" type="date">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
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
