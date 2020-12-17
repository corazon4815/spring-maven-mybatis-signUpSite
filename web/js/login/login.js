(function(W, D) {
    W.$loginView = W.$loginView || {};

    $(document).ready(function () {
        $loginView.event.setEventUI();
       // $memberJoin.event.datePicker();
    });

    /*$loginView.ui = {*/
        /*doLogin : function() {
            if (this.validate()) {
                //ajax 호출
            }
        },

        validate : function() {
            var member_id = $('#member_id').val();
            var member_pw = $('#member_pw').val();
            if (member_id == "") {
                alert("ID를 입력하세요.");
                return false;
            } else if (member_pw == "") {
                alert("비밀번호를 입력하세요.");
                return false;
            }
            return true;
        }*/
    /*};*/

    $loginView.event = {
        /**
         * @name setEventUI
         * @description 로그인 버튼 클릭 이벤트
         */
        setEventUI: function () {
            $('#btn_login').click(function () {
                let memberId = $('#memberId').val();
                let memberPw = $('#memberPw').val();
                if (memberId == "") {
                    alert("ID를 입력하세요.");
                    return false;
                } else if (memberPw == "") {
                    alert("비밀번호를 입력하세요.");
                    return false;
                } else {
                    $.ajax({
                        type: "post",
                        url: "/member/login",
                        data: "memberId=" + memberId + "&memberPw=" + memberPw,
                        dataType: "json",
                        success: function (data) {/*, textStatus, xhr*/
                            if (data.result) {
                                window.location.href = '/view/mainview';
                            }else{
                            alert("아이디와 비밀번호를 확인해주세요.")}
                        }
                        ,
                        error: function (request, status, error) {
                            alert("code:" + request.status + "\n" + "error:" + error);
                        }
                    });
                }
            });
        }
    };


}(window, document));
