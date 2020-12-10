(function(W, D) {
    W.$memberJoin = W.$memberJoin || {};

    /*$(document).ready(function () {
        $memberJoin.event.setEventUI();
        $memberJoin.request.doRegister();
    });
*/
    $memberJoin.event = {
        duplChk: function () {
            $("#btn_duplChk").click(function () {
                var memberId = $('#memberIdModal').val();
                $.ajax({
                    url: '${pageContext.request.contextPath}/member/checkid/?memberId=' + memberId,
                    type: 'get',
                    success: function (result) {
                        if (result=="true") {
                            $("#id_check").text("사용중인 아이디입니다");
                            $("#id_check").css("color", "red");
                            $("#reg_submit").attr("disabled", true);
                        } else {
                            if (memberId == "") {
                                $('#id_check').text('아이디를 입력해주세요');
                                $('#id_check').css('color', 'red');
                                $("#reg_submit").attr("disabled", true);
                            } else {
                                $('#id_check').text('사용 가능한 아이디 입니다.');
                                $("#reg_submit").attr("disabled", false);
                            }
                        }
                    }, error: function () {
                        console.log("실패");
                    }
                });
            });
        }
    }

    $memberJoin.request = {
        doRegister : function() {
            $("#reg_submitk").click(function () {
            var memberId = $('#memberIdModal').val();
            var memberPw = $('#memberPwModal').val();
            var member_pw_chk = $('#member_pw_chk').val();
            var memberName = $('#memberName').val();
            var memberAddress = $('#memberAddress').val();
            var memberBirth = $('#memberBirth').val();
            var form = {
                memberId: $('#memberIdModal').val(),
                memberName: $('#memberName').val(),
                memberAddress: $('#memberAddress').val(),
                memberPw: $('#memberPwModal').val(),
                memberBirth: $('#memberBirth').val()
            };
            if(!memberId) {
                alert("아이디를 입력하세요");
                return false;
            }
            if(!memberName) {
                alert("이름을 입력하세요");
                return false;
            }
            if(!memberAddress) {
                alert("주소를 입력하세요");
                return false;
            }
            if(!memberPw) {
                alert("비밀번호를 입력하세요");
                return false;
            }
            if(!memberBirth) {
                alert("생년월일을 입력하세요");
                return false;
            }
            if (memberPw!=member_pw_chk){
                $('#pw_check').text('비밀번호가 일치하지 않습니다.');
                $('#pw_check').css('color', 'red');
                return false;
            }else {
                $.ajax({
                    url: "/member/register",
                    type: "POST",
                    data: JSON.stringify(form),
                    contentType: "application/json; charset=utf-8;",
                    dataType: "json",
                    success: function (result) {
                        console.log(result.result)
                        alert('회원가입이 완료되었습니다.')
                        $('#memberModal').modal('hide');
                    },
                    error: function (request, status, error) {
                        alert("code:" + request.status + "\n" + "error:" + error);

                    }
                });
            }
        })
    }
    }
}(window, document));