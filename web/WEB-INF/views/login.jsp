<%@ taglib prefix="javascript" uri="http://www.springframework.org/tags/form" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<html>
<head>
    <title>로그인</title>
    <link rel="stylesheet" href="/libs/bootstrap/4.3.1/css/bootstrap.css">
    <link rel="stylesheet" href="/css/memberjoin/calender/tempusdominus-bootstrap-4.min.css">
    <link rel="stylesheet" href="/css/font/all.css">
    <link rel="stylesheet" href="/css/login/login.css">
    <link rel="stylesheet" href="/css/memberjoin/memberjoin.css">
    <script type="text/javascript" src="/libs/jquery/3.5.1/jquery.js"></script>
    <script type="text/javascript" src="/libs/bootstrap/4.3.1/js/bootstrap.js"></script>
    <script type="text/javascript" src="/js/memberjoin/calender/moment.min.js"></script>
    <script type="text/javascript" src="/js/memberjoin/calender/tempusdominus-bootstrap-4.min.js"></script>
    <script type="text/javascript" src="/js/common/common.js"></script>
    <script type="text/javascript" src="/js/login/login.js"></script>
    <script type="text/javascript" src="/js/memberjoin/memberjoin.js"></script>



</head>
<script type="text/javascript">
    $(function () {
        $('#datetimepickerlogin').datetimepicker({ format: 'YYYY-MM-DD'});
    });
</script>
<body>
<div id="login">
    <div style="margin-top: 150px "></div>
    <div class="container">
        <div id="login-row" class="row justify-content-center align-items-center">
            <div id="login-column" class="col-md-6">
                <div id="login-box" class="col-md-12">
                    <form id="login-form" class="form" action="" method="post">
                        <h2 class="text-center textgreen">LOGIN</h2>
                        <div class="form-group">
                            <label for="memberId" class="textgreen">Username:</label><br>
                            <input type="text" name="memberId" id="memberId" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="memberPw" class="textgreen">Password:</label><br>
                            <input type="password" name="memberPw" id="memberPw" class="form-control btn_login">
                        </div>
                        <div>
                            <button type="button" class="btn btn-primary" id="join_btn" data-toggle="modal"
                                    data-target="#memberModal">회원가입
                            </button>
                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                            <input type="button" id="btn_login" class="btn btn-info btn-md" onclick="$loginView.event.btn_login();" value="로그인">
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
                                <h3>회원가입</h3>
                            </div>
                        </div>
                        <div class="card-body p-3">

                            <!--Body-->
                            <div class="form-group">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text inputWidth ">아이디</div>
                                        <input type="text" class="form-control idInputbox inputbox" id="memberIdModal" required>
                                        <button type="button" name="btn_duplChk" id="btn_duplChk"
                                                class="btn btn-secondary" onclick="$memberJoin.event.duplChk();">중복확인
                                        </button>
                                    </div>
                                </div>
                                <div class="check_font inputbox error-next-box" id="id_check" style="font-size: 10px;"></div>
                            </div>
                            <div class="form-group">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text inputWidth" style="width: 130px;">이름</div>
                                    </div>
                                    <input type="text" class="form-control inputbox" id="memberName" required>
                                </div>
                                <div class="check_font inputbox error-next-box" id="name_check" style="font-size: 10px;"></div>
                            </div>
                            <div class="form-group">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text inputWidth">주소</div>
                                    </div>
                                    <input type="text" class="form-control inputbox" id="memberAddress" required>
                                </div>
                                <div class="check_font inputbox error-next-box" id="address_check" style="font-size: 10px;"></div>
                            </div>
                            <div class="form-group">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text inputWidth">비밀번호</div>
                                    </div>
                                    <input type="text" class="form-control inputbox error-next-box" id="memberPwModal" required>
                                </div>
                                <div class="check_font inputbox error-next-box" id="pre_pw_check" style="font-size: 10px;"></div>
                            </div>
                            <div class="form-group">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text inputWidth">비밀번호 확인</div>
                                    </div>
                                    <input type="text" class="form-control inputbox" id="member_pw_chk" required>
                                </div>
                                <div class="check_font inputbox error-next-box" id="pw_check" style="font-size: 10px;"></div>
                            </div>
                            <div class="form-group">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text inputWidth">생년월일</div>
                                    </div>
                                    <div class="input-group input-group-lg date" id="datetimepickerlogin" data-target-input="nearest">
                                        <input type="text" class="form-control datetimepicker-input inputbox" id="memberBirth" data-target="#datetimepickerlogin"/>
                                        <div class="input-group-append" data-target="#datetimepickerlogin" data-toggle="datetimepicker">
                                            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="check_font inputbox error-next-box" id="birth_check" style="font-size: 10px;"></div>

                            </div>

                            <div class="text-center">
                                <button type="button" class="btn btn-info btn-block rounded-0 py-2" name="reg_submit"
                                        id="reg_submit"
                                        onclick="$memberJoin.request.doRegister();">등록
                                </button>
                                <button type="button" data-dismiss="modal"
                                        class="btn btn-info btn-block rounded-0 py-2">닫기
                                </button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
            <%--모달바디--%>
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