(function(W, D) {
    W.$mainView = W.$mainView || {};

    $mainView.event = {
        memberInfo: function (str) {
            $("#memberInfoModal").modal('show');
                let memberId = str;
            $.ajax({
                url: '/member/memberInfo/?memberId=' + memberId,
                type: 'get',
                // data: "memberId=" + memberId,
                dataType: "json",

                success: function (data) {

                    $("#memberInfo").html("");
                    let html =
                        "<table id='memberInfoTable' class='table table-striped table-condensed'>";
                        $("#memberInfo table").append(html);

                            let str =
                            "<tr>" +
                            "<td>아이디" +
                            "</td>" +
                            "<td" + data.memberId + "</td>" +
                            "<tr>" +
                            "<td>이름" +
                            "</td>" +
                            "<td>" + data.memberName + "</td>" +
                            "<tr>" +
                            "<td>주소" +
                            "</td>" +
                            "<td>" + data.memberAddress + "</td>" +
                            "<tr>" +
                            "<td>생년월일" +
                            "</td>" +
                            "<td>" + data.memberBirth + "</td>" +
                            "<tr>" +
                            "<td>입사일" +
                            "</td>" +
                            "<td>" + data.regDate + "</td>" +
                            "</tr>";
                        $("#memberInfo table").append(str);

                },error :function () {
                        console.log("실패");

        }
        });//ajax
}//memberInfo
    };

}(window, document));