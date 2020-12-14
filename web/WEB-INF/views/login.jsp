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
            <div class="modal-body">
                <form method="post">
                    <div class="card border-primary rounded-0">
                        <div class="card-header p-0">
                            <div class="bg-info text-white text-center py-2">
                                <h3><i class="fa fa-envelope"></i> 회원가입</h3>
                            </div>
                        </div>
                        <div class="card-body p-3">

                            <!--Body-->
                            <div class="form-group">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">아이디</div>
                                        <input type="text" class="form-control inputbox" id="memberIdModal" style="width: 260px" required>
                                        <button type="button" name="btn_duplChk" id="btn_duplChk" class="btn btn-secondary" onclick="$memberJoin.event.duplChk();">중복확인</button>
                                    </div>
                                </div>
                                <div class="check_font inputbox" id="id_check" style="font-size: 10px;"></div>
                            </div>
                            <div class="form-group">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">이름</div>
                                    </div>
                                    <input type="text" class="form-control inputbox" id="memberName" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">주소</div>
                                    </div>
                                    <input type="text" class="form-control inputbox" id="memberAddress" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">비밀번호</div>
                                    </div>
                                    <input type="text" class="form-control inputbox" id="memberPwModal" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">비밀번호 확인</div>
                                    </div>
                                    <input type="text" class="form-control inputbox" id="member_pw_chk" required>
                                </div>
                                <div class="check_font inputbox" id="pw_check" style="font-size: 10px;"></div>
                            </div>
                            <div class="form-group">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">생년월일</div>
                                    </div>
                                    <input type="date" class="form-control inputbox" id="memberBirth" required>
                                </div>
                            </div>
                            <div class="text-center">
                                <button type="button" class="btn btn-info btn-block rounded-0 py-2" name="reg_submit" id="reg_submit"
                                        onclick="$memberJoin.request.doRegister();">등록</button>
                                <button type="button" data-dismiss="modal" class="btn btn-info btn-block rounded-0 py-2">닫기</button>
                            </div>
                        </div>

                    </div>
                </form>
            </div><%--모달바디--%>
            <%--<div class="modal-footer">
                <button type="button" class="btn btn-primary" name="reg_submit" id="reg_submit"
                        onclick="$memberJoin.request.doRegister();">등록
                </button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
            </div>--%>
        </div>
    </div>
</div>

</body>
</html>