(function(W, D) {
    W.$loginView = W.$loginView || {};

    $(document).ready(function () {
        $loginView.event.setEventUI();
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
        setEventUI: function () {
            $('#btn_login').click(function () {
                var memberId = $('#memberId').val();
                var memberPw = $('#memberPw').val();
                if (memberId == "") {
                    alert("ID를 입력하세요.");
                    return false;
                } else if (memberPw == "") {
                    alert("비밀번호를 입력하세요.");
                    return false;
                } else {
                    $.ajax({
                        type: "POST",
                        url: "/member/login",
                        data: "memberId=" + memberId + "&memberPw=" + memberPw,
                        dataType: "json",
                        success: function (data) {/*, textStatus, xhr*/
                            console.log(data)
                        },
                        error: function (request, status, error) {
                            alert("code:" + request.status + "\n" + "error:" + error);
                        }
                    })
                }
            });
        }
    }


}(window, document));
