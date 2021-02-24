(function(W, D) {
    W.$loginView = W.$loginView || {};

    $(document).ready(function () {
        $loginView.event.enterLogin();
    });

    $loginView.ui = {
       /**
        * @name doLoginMember
        * @description 로그인을 한다.
        */
        /*  $('#btn_login').click(function () {*/
        doLoginMember : function() {
            let memberId = $('#memberId').val();
            let memberPw = $('#memberPw').val();
            if (memberId == "") {
                $commonFunc.message.alert("알림", "ID를 입력하세요.")
                return false;
            };
            if (memberPw == "") {
                $commonFunc.message.alert("알림","비밀번호를 입력하세요.")
                return false;
            };

            $loginView.request.doLogin(memberId, memberPw, function (res) {
                if (res.result) {
                    window.location.href = '/view/mainview';
                }else{
                    $commonFunc.message.alert("알림","아이디와 비밀번호를 확인해주세요.")
                }
            });
        }
    };

    $loginView.request = {
         /**
         * @name doLoginMember
         * @description 로그인을 한다.
         */
        doLogin: function (memberId, memberPw, callback) {
            $.ajax({
                type: "post",
                url: "/member/login",
                data: "memberId=" + memberId + "&memberPw=" + memberPw,
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    callback.call(undefined, res);
                    },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        }
    };

    $loginView.event = {
        /**
         * @name enter_login
         * @description 엔터키로 로그인을 한다.
         */
            enterLogin : function() {
               $(".btn_login").keydown(function(key) {
                   if (key.keyCode == 13) {
                       $loginView.ui.doLoginMember();
                   }
               });
           }
    };
}(window, document));
