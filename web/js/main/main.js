(function(W, D) {
    W.$mainView = W.$mainView || {};

    $(document).ready(function () {
        $mainView.ui.memberList();
        $mainView.event.memberInfo();
        $mainView.event.logout_btn();
        $mainView.event.memberInfodel();

    });

    let memberId;


    $mainView.ui = {
        memberList: function () {
            let url = "/member/memberlist";
            $.ajax({
                type: "get",
                url: url,
                dataType: "json"
            })
                .done(function (args) {
                    let html =
                        "<thead class='theadlist'><tr>" +
                        "<td>아이디" +
                        "</td>" +
                        "<td>이름" +
                        "</td>" +
                        "<td>주소" +
                        "</td>" +
                        "<td>가입일" +
                        "</td>" +
                        "</tr></thead>";

                    /*$("#listInfo").html(html);*/


                    /*  onclick='$mainView.event.memberInfo("+args.result[i].memberId +");'*/
                    for (var i = 0; i < args.result.length; i++) {
                        html +=
                            "<tr>" +
                            "<td id='memId' style='cursor:hand' data-toggle='modal' data-target='#memberInfoModal' data-title=" + args.result[i].memberId + ">" +
                            args.result[i].memberId + "</td>" +
                            "<td>" + args.result[i].memberName + "</td>" +
                            "<td>" + args.result[i].memberAddress + "</td>" +
                            "<td>" + args.result[i].regDate + "</td>" +
                            "</tr>";
                        // $("#listInfo table").append(str);

                    }
                    $("#tbl").html(html);

                    $mainView.ui.paging();
                }).fail(function (e) {
                alert(e.responseText);
            });

        },

        paging: function () {
            var reSortColors = function($table) {
                $('tbody tr:odd td', $table).removeClass('even').removeClass('listtd').addClass('odd');
                $('tbody tr:even td', $table).removeClass('odd').removeClass('listtd').addClass('even');
            };
            $('table.paginated').each(function() {
                var pagesu = 10;  //페이지 번호 갯수
                var currentPage = 0;
                var numPerPage = 10;  //목록의 수
                var $table = $(this);

                //length로 원래 리스트의 전체길이구함
                var numRows = $table.find('tbody tr').length;
                //Math.ceil를 이용하여 반올림
                var numPages = Math.ceil(numRows / numPerPage);
                //리스트가 없으면 종료
                if (numPages==0) return;
                //pager라는 클래스의 div엘리먼트 작성
                var $pager = $('<td align="center" id="remo" colspan="10"><div class="pager"></div></td>');

                var nowp = currentPage;
                var endp = nowp+10;

                //페이지를 클릭하면 다시 셋팅
                $table.bind('repaginate', function() {
                    //기본적으로 모두 감춘다, 현재페이지+1 곱하기 현재페이지까지 보여준다

                    $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
                    $("#remo").html("");

                    if (numPages > 1) {     // 한페이지 이상이면
                        if (currentPage < 5 && numPages-currentPage >= 5) {   // 현재 5p 이하이면
                            nowp = 0;     // 1부터
                            endp = pagesu;    // 10까지
                        }else{
                            nowp = currentPage -5;  // 6넘어가면 2부터 찍고
                            endp = nowp+pagesu;   // 10까지
                            pi = 1;
                        }

                        if (numPages < endp) {   // 10페이지가 안되면
                            endp = numPages;   // 마지막페이지를 갯수 만큼
                            nowp = numPages-pagesu;  // 시작페이지를   갯수 -10
                        }
                        if (nowp < 1) {     // 시작이 음수 or 0 이면
                            nowp = 0;     // 1페이지부터 시작
                        }
                    }else{       // 한페이지 이하이면
                        nowp = 0;      // 한번만 페이징 생성
                        endp = numPages;
                    }
                    // [처음]
                    $('<br /><span class="page-number" cursor: "pointer">[처음]</span>').bind('click', {newPage: page},function(event) {
                        currentPage = 0;
                        $table.trigger('repaginate');
                        $($(".page-number")[2]).addClass('active').siblings().removeClass('active');
                    }).appendTo($pager).addClass('clickable');
                    // [이전]
                    $('<span class="page-number" cursor: "pointer">&nbsp;&nbsp;&nbsp;[이전]&nbsp;</span>').bind('click', {newPage: page},function(event) {
                        if(currentPage == 0) return;
                        currentPage = currentPage-1;
                        $table.trigger('repaginate');
                        $($(".page-number")[(currentPage-nowp)+2]).addClass('active').siblings().removeClass('active');
                    }).appendTo($pager).addClass('clickable');
                    // [1,2,3,4,5,6,7,8]
                    for (var page = nowp ; page < endp; page++) {
                        $('<span class="page-number" cursor: "pointer" style="margin-left: 8px;"></span>').text(page + 1).bind('click', {newPage: page}, function(event) {
                            currentPage = event.data['newPage'];
                            $table.trigger('repaginate');
                            $($(".page-number")[(currentPage-nowp)+2]).addClass('active').siblings().removeClass('active');
                        }).appendTo($pager).addClass('clickable');
                    }
                    // [다음]
                    $('<span class="page-number" cursor: "pointer">&nbsp;&nbsp;&nbsp;[다음]&nbsp;</span>').bind('click', {newPage: page},function(event) {
                        if(currentPage == numPages-1) return;
                        currentPage = currentPage+1;
                        $table.trigger('repaginate');
                        $($(".page-number")[(currentPage-nowp)+2]).addClass('active').siblings().removeClass('active');
                    }).appendTo($pager).addClass('clickable');
                    // [끝]
                    $('<span class="page-number" cursor: "pointer">&nbsp;[끝]</span>').bind('click', {newPage: page},function(event) {
                        currentPage = numPages-1;
                        $table.trigger('repaginate');
                        $($(".page-number")[endp-nowp+1]).addClass('active').siblings().removeClass('active');
                    }).appendTo($pager).addClass('clickable');

                    $($(".page-number")[2]).addClass('active');
                    reSortColors($table);
                });
                $pager.insertAfter($table).find('span.page-number:first').next().next().addClass('active');
                $pager.appendTo($table);
                $table.trigger('repaginate');
            });
        }

    }

    $mainView.event = {
        logout_btn: function () {
            $("#logoutBtn").click(function () {
                location.href = "/view/logout";
            });


        },

        memberInfo: function () {
            $('#memberInfoModal').on('show.bs.modal', function (e) {
                let button = $(e.relatedTarget);
                memberId = button.data('title');

                $.ajax({
                    url: '/member/memberInfo/?memberId=' + memberId,
                    type: 'get',
                    success: function (data) {
                        $("#memberInfo").html("");

                        let html =
                            "<table id='memberInfoTable' class='table table-condensed table-hover'>"
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

                        } else {
                            $("#del_btn_div").show();
                            $("#update_btn_div").hide();
                            memberId = data.result.memberId;
                        }

                    }, error: function (data) {
                        console.log("실패");
                        console.log(data.memberId);

                    }
                });//ajax


            });


        },
        memberInfodel: function () {
            $('#member_del_btn').click(function () {
                let delMemberId = memberId;
                console.log(delMemberId);
                    $.ajax({
                        method: "DELETE",
                        url: '/member/memberdel/?memberId=' + delMemberId,
                        dataType: "json",
                        success: function (data) {/*, textStatus, xhr*/
                            if (confirm("회원정보를 삭제하시겠습니까 ?") == true) {
                                $('#memberInfoModal').modal('hide');
                                window.location.href = '/view/mainview';
                            }else{
                                return ;
                            }

                           /* if (data.result) {
                                $('#memberInfoModal').modal('hide');
                                window.location.href = '/view/mainview';
                            }*/
                        }
                        ,
                        error: function (data, request, status, error) {
                            alert(data.result);
                            /*alert("code:" + request.status + "\n" + "error:" + error);*/
                        }
                    });

            });
        }
    }
}(window, document));