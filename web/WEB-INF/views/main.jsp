<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ page trimDirectiveWhitespaces="true" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="/libs/jquery/jquery.js"></script>
    <script type="text/javascript" src="/libs/bootstrap/js/bootstrap.js"></script>
    <script type="text/javascript" src="/js/main/main.js"></script>
    <link rel="stylesheet" href="/libs/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="/css/main/main.css">

</head>
<script>
    sessionStorage.setItem("userId", "${memberId}");
    console.log(sessionStorage.getItem("userId"));
</script>
<body>
메인입니다
회원목록
<div class="container">
    <div class="span5">
        <div id="listInfo">
            <table id='tbl' class='tbl paginated table table-striped table-condensed'></table>


        </div>
        <br>
    </div>
</div>

<button id="logoutBtn" type="button">로그아웃</button>

<!-- Modal -->
<div class="modal fade" id="memberInfoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="text-center text-info" id="myModalLabel">Member Info</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>

            </div>
            <div class="modal-body">


                        <div id="memberInfo"></div>



            </div>
            <%--modalbody end--%>
            <div class="modal-footer">
                <div id="update_btn_div">
                    <button type="button" class="btn btn-primary" name="reg_submit" id="update_btn"
                            onclick="$memberJoin.request.doUpdate();">수정
                    </button>
                </div>
                <div id="del_btn_div">
                    <button type="button" class="btn btn-primary" name="member_del_btn" id="member_del_btn">삭제
                    </button>
                </div>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>


            </div>
        </div>
    </div>
</div>


</body>
</html>