<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<html>
<head>
    <title>Title</title>
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.3.1.min.js"></script>
    <script>
        $(document).ready(function(){
        $('#btn_login').click(function() {
            var member_id = $('#member_id').val();
            var member_pw = $('#member_pw').val();
            if (member_id == "") {
                alert("ID를 입력하세요.");
                return false;
            } else if (member_pw == "") {
                alert("비밀번호를 입력하세요.");
                return false;
            } else {
                $.ajax({
                    type: "POST",
                    url: "/member/login",
                    data: "member_id=" + member_id + "&member_pw=" + member_pw,
                    dataType: "json",
                    success: function (data) {/*, textStatus, xhr*/
                        if (data == 0) {
                            alert('아이디와 비밀번호를 확인해주세요.')
                        } else {
                            window.location.href = '/member/main';
                        }
                    },
                    error: function (request, status, error) {
                        alert("code:" + request.status + "\n" + "error:" + error);
                    }
                })
            }});
        });
    </script>
</head>
<body>
<form name="loginform" id="loginform" method="post">
    <div>
        <input type="text" name="member_id" id="member_id" placeholder="member_id"><br>
        <input type="password" name="member_pw" id="member_pw"  placeholder="member_pw"><br>
        <input type="button" id="btn_login" value="로그인">
        <button onclick="window.open('/member/registerform','회원가입','width=430,height=500,location=no,status=no,scrollbars=yes');">회원가입</button>

    </div>
</form>
</body>
</html>
