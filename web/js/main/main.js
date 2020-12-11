(function(W, D) {
    W.$mainView = W.$mainView || {};

    $(document).ready(function () {
        $mainView.ui.memberList();
        $mainView.event.memberInfo();
        $mainView.event.logout_btn();

    });


    $mainView.ui = {
        memberList: function () {
            let url = "/member/memberlist";
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
                        "</table>";
                    $("#listInfo").html(html);


                    /*  onclick='$mainView.event.memberInfo("+args.result[i].memberId +");'*/
                    for (var i = 0; i < args.result.length; i++) {
                        var str =
                            "<tr>" +
                            "<td id='memId' style='cursor:hand' data-toggle='modal' data-target='#memberInfoModal' data-title=" + args.result[i].memberId + ">" +
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

        }
    }

    $mainView.event = {
        logout_btn: function () {
                $("#logoutBtn").click(function () {
                    location.href = "/view/logout";
                });


            },

        memberInfo : function () {
            $('#memberInfoModal').on('show.bs.modal', function (e) {
                let button = $(e.relatedTarget);
                let memberId = button.data('title');

                $.ajax({
                    url: '/member/memberInfo/?memberId=' + memberId,
                    type: 'get',
                    success: function (data) {
                        $("#memberInfo").html("");

                        let html =
                            "<table id='memberInfoTable' class='table table-striped table-condensed'>"
                            + "</<table>";
                        $("#memberInfo").append(html);

                        let str =
                            "<tr>" +
                            "<td>아이디" +
                            "</td>" +
                            "<td>" + data.result.memberId + "</td>" +
                            "<tr>" +
                            "<td>이름" +
                            "</td>" +
                            "<td>" + data.result.memberName + "</td>" +
                            "<tr>" +
                            "<td>주소" +
                            "</td>" +
                            "<td>" + data.result.memberAddress + "</td>" +
                            "<tr>" +
                            "<td>생년월일" +
                            "</td>" +
                            "<td>" + data.result.memberBirth + "</td>" +
                            "<tr>" +
                            "<td>입사일" +
                            "</td>" +
                            "<td>" + data.result.regDate + "</td>" +
                            "</tr>";


                        $("#memberInfo table").append(str);

                        if (sessionStorage.getItem("userId") == data.result.memberId) {
                            $("#del_btn_div").hide();
                            $("#update_btn_div").show();

                        }else{
                            $("#del_btn_div").show();
                            $("#update_btn_div").hide();
                        }
                    }, error: function (data) {
                        console.log("실패");
                        console.log(data.memberId);

                    }
                });//ajax


            });

            }
        }


}(window, document));