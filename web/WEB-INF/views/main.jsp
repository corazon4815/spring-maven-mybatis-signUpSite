<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ page trimDirectiveWhitespaces="true"%>
<html>
<head>
    <title>Title</title>
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.3.1.min.js"></script>
<script>
    $(function(){
        var url="/member/main";

        $.ajax({
            type : "post",
            url : url,
            dataType : "json"
        })
            .done(function(args) {
                $("#listInfo").html("");
                $("#listInfo").append(
                    "<table id='memberTable' class='memberTable' style='text-align: center; width: 1000px;'><tr><td>아이디</td><td>이름</td><td>주소</td><td>가입일</td></tr></table>");
                for (var i = 0; i < args.result.length; i++) {
                    var str = "<tr><td>" + args[i].memberId
                        + "</td>" + "<td>" + args[i].memberPw
                        + "</td>" + "<td>" + args[i].memberAddress
                        + "</td>" + "<td>" + args[i].regDate
                        + "</td></tr>";
                    $("#listInfo table").append(str);
                }
            }).fail(function(e) {
            alert(e.responseText);
        });
    });


</script>
</head>
<body>

메인입니다
회원목록

<div id="listInfo"></div>


</body>
</html>
