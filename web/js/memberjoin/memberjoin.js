(function(W, D) {
    W.$memberJoin = W.$memberJoin || {};

    $memberJoin.ui = {
        /**
         * 아이디 중복확인 버튼 클릭 상태를 저장
         */
        isMemberChecked: "",

        /**
         * @name doDuplChkMember
         * @description 회원가입의 아이디 중복확인 버튼 클릭시 실행한다.
         */
        doDuplChkMember : function () {
            let memberId = $('#memberIdModal').val();
            $memberJoin.request.doDuplChk(memberId, function (res) {
                console.log(res);
                $memberJoin.ui.isMemberChecked = 'N';
                if(memberId == ""){
                    $("#id_check").text("아이디를 입력해주세요.");
                    $("#id_check").css("color", "black");
                    $("#reg_submit").attr("disabled", false);
                }else if(res.result == false) {
                    $("#id_check").text("사용중인 아이디입니다");
                    $("#id_check").css("color", "red");
                    $("#reg_submit").attr("disabled", true);
                }else {
                    $('#id_check').text('사용 가능한 아이디 입니다.');
                    $("#id_check").css("color", "black");
                    $("#reg_submit").attr("disabled", false);
                    $memberJoin.ui.isMemberChecked = 'Y';
                }
            });
        },
        doRegisterMember : function () {
            let memberPw = $('#memberPwModal').val();
            let member_pw_chk = $('#member_pw_chk').val();
            let memberName = $('#memberName').val();
            let memberAddress = $('#memberAddress').val();
            let memberBirth = $('#memberBirth').val();
            let datatimeRegexp = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;

            let data = {
                memberId: $('#memberIdModal').val(),
                memberName: $('#memberName').val(),
                memberAddress: $('#memberAddress').val(),
                memberPw: $('#memberPwModal').val(),
                memberBirth: $('#memberBirth').val()
            };

            if(memberName === "") {
                $('#name_check').text("필수입력 사항입니다.");
                $('#name_check').css("color", "red");
                return false;
            }else{
                $('#name_check').text("");
            }
            if(memberAddress === "") {
                $('#address_check').text("필수입력 사항입니다.");
                $('#address_check').css("color", "red");
                return false;
            }else{
                $('#address_check').text("");
            }
            if(memberPw === "") {
                $('#pre_pw_check').text("필수입력 사항입니다.");
                $('#pre_pw_check').css("color", "red");
                return false;
            }else{
                $('#pre_pw_check').text("");
            }
            if (memberPw !== member_pw_chk) {
                $('#pw_check').text('비밀번호가 일치하지 않습니다.');
                $('#pw_check').css('color', 'red');
                return false;
            }else{
                $('#pw_check').text("");
            }
            if(memberBirth === "") {
                $('#birth_check').text("필수입력 사항입니다.");
                $('#birth_check').css("color", "red");
                return false;
            }else{
                $('#birth_check').text("");
            }
            if ( !datatimeRegexp.test(memberBirth) ) {
                $("#birth_check").text("날짜는 yyyy-mm-dd 형식으로 입력해주세요.");
                $("#birth_check").css("color", "red");
                return false;
            }else{
                $('#birth_check').text("");
            }
            if ($memberJoin.ui.isMemberChecked!='Y') {
                $('#id_check').text('아이디 중복체크를 해주세요.');
                $("#id_check").css("color", "red");
                return false;
            }else {
                $memberJoin.request.doRegister(data, function (res) {
                    console.log(res)
                    $('.inputbox').val('');
                    $('.inputbox').text('');
                    $commonFunc.message.alert("알림","회원가입이 완료되었습니다.")
                    $memberJoin.ui.isMemberChecked = 'N';
                    $('#memberModal').modal('hide');

                });
            }
        }
    };

    $memberJoin.request = {
        /**
         * @name doDuplChk
         * @description 회원가입의 아이디 중복확인 버튼 클릭시 실행한다.
         */
        doDuplChk : function(memberId ,callback) {
            $.ajax({
                type: 'get',
                url: '/member/checkid',
                data: {
                   "memberId" : memberId
                },
                dataType: "json",
                contentType: "application/json; charset=utf-8;",
                success: function (res) {
                    if (callback != null && callback instanceof Function) {
                        callback.call(undefined, res);
                    }
                }
                , error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        },
        /**
         * @name doRegister
         * @description 회원가입창의 등록버튼 클릭시 실행한다.
         * @returns {boolean}
         */
        doRegister : function(data, callback) {
            $.ajax({
                type: "POST",
                url: "/member/register",
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json; charset=utf-8;",
                success: function (res) {
                    if (callback != null && callback instanceof Function) {
                        callback.call(undefined, res);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                }
            });
        }
    },

    $memberJoin.event = {
        /**
         * @name datePicker
         * @description datePicker를 실행한다.
         */
        datePicker: function () {
            $('#datetimepickerlogin').datetimepicker({format: 'YYYY-MM-DD'});
        }
    };
})(window, document);