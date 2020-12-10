(function(W, D) {
    W.$mainView = W.$mainView || {};

    $(document).ready(function () {
        $mainView.event.memberInfo();
    });

    $memberJoin.event = {
        memberInfo: function (e) {

                $.ajax({
                    type: "post",
                    url: '/member/memberInfo/?memberId=' + e,
                    dataType: "json",
                    success: function (data) {/*, textStatus, xhr*/
                        if (data.result) {
                            $("#memberIdModal").text(data.result.memberId);

                        }
                    }
                    ,
                    error: function (request, status, error) {
                        alert("code:" + request.status + "\n" + "error:" + error);
                    }
                });



        }

    }
});