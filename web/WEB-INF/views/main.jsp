<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ page trimDirectiveWhitespaces="true" %>
<html>
<head>
    <title>회원목록</title>
    <link rel="stylesheet" href="/libs/bootstrap/4.3.1/css/bootstrap.css">
    <link rel="stylesheet" href="/css/memberjoin/calender/tempusdominus-bootstrap-4.min.css">
    <link rel="stylesheet" href="/css/font/all.css">
    <%--<link rel="stylesheet" href="/libs/paging/Pagination.css">--%>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paginationjs/2.1.4/pagination.css"/>
    <link rel="stylesheet" href="/css/main/main.css">
    <link rel="stylesheet" href="/css/memberjoin/calender/tempusdominus-bootstrap-4.min.css">
    <script type="text/javascript" src="/libs/jquery/3.5.1/jquery.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/paginationjs/2.1.4/pagination.min.js"></script>
    <script type="text/javascript" src="/libs/bootstrap/4.3.1/js/bootstrap.js"></script>
    <script type="text/javascript" src="/js/memberjoin/calender/moment.min.js"></script>
    <script type="text/javascript" src="/js/memberjoin/calender/tempusdominus-bootstrap-4.min.js"></script>

   <%-- <script type="text/javascript" src="/libs/paging/Pagination.js"></script>--%>
    <script type="text/javascript" src="/js/main/main.js"></script>
    <script type="text/javascript" src="/js/common/common.js"></script>



<%--    <link rel="stylesheet" href="/css/memberjoin/calender/font-awesome.css">--%>
    <%--<link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css" />--%>

</head>
<script>
    sessionStorage.setItem("userId", "${memberInfo.memberId}");
    /*console.log(sessionStorage.getItem("userId"));*/
</script>
<body>
<jsp:include page="../layers/header.jsp"></jsp:include>
<div class="container">
    <div class="span5">

        <div id="listInfo">
            <table id='tbl' class='tbl paginated table table-striped table-condensed table-hover'></table>


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

<div class="modal fade" id="alertModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="text-center text-info">알림</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <span>안녕하세요.</span>
            </div>
            <%--modalbody end--%>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
            </div>
        </div>
    </div>
</div>

<section>
    <div id="data-container"></div>
    <div id="pagination"></div>
</section>



</body>
</html>