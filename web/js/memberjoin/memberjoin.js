(function(W, D) {
    W.$memberJoin = W.$memberJoin || {};
    let isMemberChecked;

    $memberJoin.event = {
        duplChk: function () {
            /* $("#btn_duplChk").click(function () {*/
            let memberId = $('#memberIdModal').val();
            $.ajax({
                url: '/member/checkid/?memberId=' + memberId,
                data: memberId,
                type: 'get',
                success: function (data) {
                    isMemberChecked = 'N';
                    if(memberId == ""){
                        $("#id_check").text("아이디를 입력해주세요.");
                        $("#reg_submit").attr("disabled", false);
                    }else if (data.result==false) {
                        $("#id_check").text("사용중인 아이디입니다");
                        $("#id_check").css("color", "red");
                        $("#reg_submit").attr("disabled", true);}
                    else {
                            $('#id_check').text('사용 가능한 아이디 입니다.');
                            $("#reg_submit").attr("disabled", false);
                            isMemberChecked = 'Y';
                        }
                    }


                , error: function () {
                    console.log("실패");
                }
            });
        }
    }

    $memberJoin.request = {
        doRegister : function() {
            /*$("#reg_submitk").click(function () {*/
            let memberId = $('#memberIdModal').val();
            let id_check = $('#id_check').val();
            let memberPw = $('#memberPwModal').val();
            let member_pw_chk = $('#member_pw_chk').val();
            let memberName = $('#memberName').val();
            let memberAddress = $('#memberAddress').val();
            let memberBirth = $('#memberBirth').val();
            let form = {
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
            if (isMemberChecked!='Y'){
                alert("아이디 중복체크를 해주시기 바랍니다.");
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
                        $('.inputbox').val('');
                        $('.inputbox').text('');
                        alert('회원가입이 완료되었습니다.')
                        isMemberChecked = 'N';
                        $('#memberModal').modal('hide');
                    },
                    error: function (request, status, error) {
                        alert("code:" + request.status + "\n" + "error:" + error);
                    }
                });
            }
            /*});*/
        }
    }
}(window, document));