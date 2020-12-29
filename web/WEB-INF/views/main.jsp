<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ page trimDirectiveWhitespaces="true" %>
<html>
<head>
    <title>회원목록</title>
    <%--<link rel="stylesheet" href="/css/main/materialize.css">--%>
    <link rel="stylesheet" href="/libs/bootstrap/4.3.1/css/bootstrap.css">
    <%--<link rel="stylesheet" href="/libs/jquery/ui/jquery-ui.css">--%>
    <link rel="stylesheet" href="/libs/paging/paging.css">
    <link rel="stylesheet" href="/css/memberjoin/calender/tempusdominus-bootstrap-4.min.css">
    <link rel="stylesheet" href="/css/font/all.css">
    <link rel="stylesheet" href="/css/font/Material+Icons.css">
    <link rel="stylesheet" href="/css/main/main.css">
    <link rel="stylesheet" href="/css/memberjoin/calender/tempusdominus-bootstrap-4.min.css">
    <script type="text/javascript" src="/libs/jquery/3.5.1/jquery.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script type="text/javascript" src="/libs/bootstrap/4.3.1/js/bootstrap.js"></script>
    <%--<script type="text/javascript" src="/libs/jquery/ui/jquery-ui.js"></script>
    <script type="text/javascript" src="/libs/paging/jquery.table.hpaging.js"></script>--%>
    <script type="text/javascript" src="/libs/paging/twbsPagination.js"></script>
    <script type="text/javascript" src="/libs/paging/Pagination.js"></script>
    <script type="text/javascript" src="/js/main/main.js"></script>
    <script type="text/javascript" src="/js/common/common.js"></script>
    <script type="text/javascript" src="/js/memberjoin/calender/moment.min.js"></script>
    <script type="text/javascript" src="/js/memberjoin/calender/tempusdominus-bootstrap-4.min.js"></script>


</head>
<script>
    sessionStorage.setItem("userId", "${memberInfo.memberId}");
    /*console.log(sessionStorage.getItem("userId"));*/
</script>
<body>
<jsp:include page="../layers/header.jsp"></jsp:include>
<div class="container">
    <div class="span5">
        <div id="listInfo" style="height: 500px;">
            <table id="tbl" style="border: 2px solid #dee2e6" class="tbl paginated table table-striped table-condensed table-hover">
                <thead class="thead">
                <tr>
                    <th class="noWid">번호</th>
                    <th class="idWid">아이디</th>
                    <th class="nameWid">이름</th>
                    <th class="addWid">주소</th>
                    <th class="regWid">가입일</th>
                </tr>
                </thead>
                <tbody id="myTable">

                </tbody>
            </table>
        </div><br><br>
        <div style="float: left; width: 100%; text-align: center">
            <div style="display: inline-block">
        <ul class="sync-pagination"></ul>
            </div>
    </div>
</div>
</div>


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
                            onclick="$mainView.request.doUpdate();">수정
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