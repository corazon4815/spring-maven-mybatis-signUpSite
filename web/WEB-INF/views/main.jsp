<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ page trimDirectiveWhitespaces="true" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="/libs/jquery/jquery.js"></script>
    <script type="text/javascript" src="/libs/bootstrap/js/bootstrap.js"></script>
    <%--<script type="text/javascript" src="/js/main/main.js"></script>--%>
    <link rel="stylesheet" href="/libs/bootstrap/css/bootstrap.css">

    <script>
        $(document).ready(function () {
            var url = "/member/memberlist";

            $.ajax({
                type: "get",
                url: url,
                dataType: "json"
            })
                .done(function (args) {
                    $("#listInfo").html("");

                    let html =
                        "<table id='memberTable' class='table table-striped table-condensed'>" +
                        "<tr>" +
                        "<td>아이디" +
                        "</td>" +
                        "<td>이름" +
                        "</td>" +
                        "<td>주소" +
                        "</td>" +
                        "<td>가입일" +
                        "</td>" +
                        "</tr>" +
                        "</<table>";
                    $("#listInfo").append(html);
                  /*  onclick='$mainView.event.memberInfo("+args.result[i].memberId +");'*/
                    for (var i = 0; i < args.result.length; i++) {
                        var str =
                            "<tr>" +
                            "<td id='memId' style='cursor:hand' data-toggle='modal' data-target='#memberInfoModal' data-title="+args.result[i].memberId +">" +
                            args.result[i].memberId + "</td>" +
                            "<td>" + args.result[i].memberName + "</td>" +
                            "<td>" + args.result[i].memberAddress + "</td>" +
                            "<td>" + args.result[i].regDate + "</td>" +
                            "</tr>";
                        $("#listInfo table").append(str);
                    }
                }).fail(function (e) {
                alert(e.responseText);
            });

            $("#logoutBtn").on("click", function () {
                location.href = "/view/logout";
            });


            $('#memberInfoModal').on('show.bs.modal', function (e) {
                var button = $(e.relatedTarget)
                var titleTxt = button.data('title')
                var modal = $(this)
                modal.find('.modal-title').text('Title : ' + titleTxt)

                let memberId = $(e.relatedTarget).data('test');

            });



        });

    </script>
</head>
<body>

 메인입니다
회원목록
<div class="container">
    <div class="span5">
        <div id="listInfo"></div>
        <br>
    </div>
</div>

<button id="logoutBtn" type="button">로그아웃</button>

<!-- Modal -->
<div class="modal fade" id="memberInfoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="text-center text-info" id="myModalLabel">Member Info</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

            </div>
            <div class="modal-body">
                <h4 class="modal-title" id="myModalLabelTest">Modal title</h4>


                <div class="container">
                    <div class="span5">
                        <div id="memberInfo"></div>
                        <br>
                    </div>
                </div>
            </div> <%--modalbody end--%>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" name="reg_submit" id="reg_submit"
                        onclick="$memberJoin.request.doRegister();">수정
                </button>

                <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
            </div>
        </div>
    </div>
</div>



</body>
</html>
