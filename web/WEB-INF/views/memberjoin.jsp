
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="EUC-KR">
    <title>회원가입</title>
    <script src="http://code.jquery.com/jquery-latest.js"></script>
    <script>
        //아이디 유효성 검사(1 = 중복 / 0 != 중복)
        $(function() {
            $("#mem_id").blur(function() {

                var mem_id = $('#member_id').val();
                $.ajax({
                    url : '${pageContext.request.contextPath}/idCheck.do?mem_id='+ mem_id,
                    type : 'get',
                    success : function(data) {

                        if (data >= 1) {
                            // 1 : 아이디가 중복되는 문구
                            $("#id_check").text("사용중인 아이디입니다 :p");
                            $("#id_check").css("color", "red");
                            $("#reg_submit").attr("disabled", true);
                        }  else {

                            if(mem_id == ""){

                                $('#id_check').text('아이디를 입력해주세요 :)');
                                $('#id_check').css('color', 'red');
                                $("#reg_submit").attr("disabled", true);

                            } else {

                                $('#id_check').text("");
                                $("#reg_submit").attr("disabled", false);
                            }

                        }
                    }, error : function() {
                        console.log("실패");
                    }
                });
            });
        });
    </script>
</head>
<body>
<form action="memberjoinBtn.do" method="post">
    <div class="form-group">
        <label for="member_id">아이디</label><br>
        <input type="text" class="form-control" id="member_id" name="member_id" required>
        <div class="check_font" id="id_check"></div><br>

        <label for="member_name">이름</label><br>
        <input type="text" class="form-control" id="member_name" name="member_name" required><br>

        <label for="member_address">주소</label><br>
        <input type="text" class="form-control" id="member_address" name="member_address" required><br>

        <label for="member_pw">비밀번호</label><br>
        <input type="text" class="form-control" id="member_pw" name="member_pw" required><br>
        <label for="member_pw_chk">비밀번호 확인</label><br>
        <input type="text" class="form-control" id="member_pw_chk" name="member_pw_chk" required><br>

        <label for="member_birth">생년월일</label><br>
        <input type="text" class="form-control" id="member_birth" name="member_birth" required><br>
    </div>
    <input type="submit"
           name="submit" id="reg_submit" value="등   록" >
</form>
</body>
</html>