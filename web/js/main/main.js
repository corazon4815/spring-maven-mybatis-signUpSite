(function (W, D) {
    W.$mainView = W.$mainView || {};

    $(document).ready(function () {
        $mainView.ui.memberList();
        $mainView.event.memberInfo();
        $mainView.event.logout_btn();
        $mainView.event.memberInfodel();
        $mainView.event.datePicker();

    });

    $mainView.ui = {
        /**
         * 현재 켜있는 모달창의 회원 아이디가 저장된다.
         */
        memberId : null,

        /**
         * @name memberList
         * @description 회원 목록을 가져온다.
         */
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
                    for (let i = 0; i < args.result.length; i++) {
                        html +=
                            "<tr>" +
                            "<td id='memId_"+i+"' class='cursor' data-toggle='modal' data-target='#memberInfoModal' data-title=" + args.result[i].memberId + ">" +
                            args.result[i].memberId + "</td>" +
                            "<td>" + args.result[i].memberName + "</td>" +
                            "<td>" + args.result[i].memberAddress + "</td>" +
                            "<td>" + args.result[i].regDate + "</td>" +
                            "</tr>";

                    }
                    $("#tbl").html(html);

                    $mainView.ui.paging();
                }).fail(function (e) {
                alert(e.responseText);
            });

        },

        /**
         * @name paging
         * @description 회원 목록의 페이징처리를 한다.
         */
        paging: function () {
            var reSortColors = function ($table) {
                $('tbody tr:odd td', $table).removeClass('even').removeClass('listtd').addClass('odd');
                $('tbody tr:even td', $table).removeClass('odd').removeClass('listtd').addClass('even');
            };
            $('table.paginated').each(function () {
                var pagesu = 10;  //페이지 번호 갯수
                var currentPage = 0;
                var numPerPage = 10;  //목록의 수
                var $table = $(this);

                //length로 원래 리스트의 전체길이구함
                var numRows = $table.find('tbody tr').length;
                //Math.ceil를 이용하여 반올림
                var numPages = Math.ceil(numRows / numPerPage);
                //리스트가 없으면 종료
                if (numPages == 0) return;
                //pager라는 클래스의 div엘리먼트 작성
                var $pager = $('<td align="center" id="remo" colspan="10"><div class="pager"></div></td>');

                var nowp = currentPage;
                var endp = nowp + 10;

                //페이지를 클릭하면 다시 셋팅
                $table.bind('repaginate', function () {
                    //기본적으로 모두 감춘다, 현재페이지+1 곱하기 현재페이지까지 보여준다

                    $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
                    $("#remo").html("");

                    if (numPages > 1) {     // 한페이지 이상이면
                        if (currentPage < 5 && numPages - currentPage >= 5) {   // 현재 5p 이하이면
                            nowp = 0;     // 1부터
                            endp = pagesu;    // 10까지
                        } else {
                            nowp = currentPage - 5;  // 6넘어가면 2부터 찍고
                            endp = nowp + pagesu;   // 10까지
                            pi = 1;
                        }

                        if (numPages < endp) {   // 10페이지가 안되면
                            endp = numPages;   // 마지막페이지를 갯수 만큼
                            nowp = numPages - pagesu;  // 시작페이지를   갯수 -10
                        }
                        if (nowp < 1) {     // 시작이 음수 or 0 이면
                            nowp = 0;     // 1페이지부터 시작
                        }
                    } else {       // 한페이지 이하이면
                        nowp = 0;      // 한번만 페이징 생성
                        endp = numPages;
                    }
                    // [처음]
                    $('<br /><span class="page-number" cursor: "pointer">[처음]</span>').bind('click', {newPage: page}, function (event) {
                        currentPage = 0;
                        $table.trigger('repaginate');
                        $($(".page-number")[2]).addClass('active').siblings().removeClass('active');
                    }).appendTo($pager).addClass('clickable');
                    // [이전]
                    $('<span class="page-number" cursor: "pointer">&nbsp;&nbsp;&nbsp;[이전]&nbsp;</span>').bind('click', {newPage: page}, function (event) {
                        if (currentPage == 0) return;
                        currentPage = currentPage - 1;
                        $table.trigger('repaginate');
                        $($(".page-number")[(currentPage - nowp) + 2]).addClass('active').siblings().removeClass('active');
                    }).appendTo($pager).addClass('clickable');
                    // [1,2,3,4,5,6,7,8]
                    for (var page = nowp; page < endp; page++) {
                        $('<span class="page-number" cursor: "pointer" style="margin-left: 8px;"></span>').text(page + 1).bind('click', {newPage: page}, function (event) {
                            currentPage = event.data['newPage'];
                            $table.trigger('repaginate');
                            $($(".page-number")[(currentPage - nowp) + 2]).addClass('active').siblings().removeClass('active');
                        }).appendTo($pager).addClass('clickable');
                    }
                    // [다음]
                    $('<span class="page-number" cursor: "pointer">&nbsp;&nbsp;&nbsp;[다음]&nbsp;</span>').bind('click', {newPage: page}, function (event) {
                        if (currentPage == numPages - 1) return;
                        currentPage = currentPage + 1;
                        $table.trigger('repaginate');
                        $($(".page-number")[(currentPage - nowp) + 2]).addClass('active').siblings().removeClass('active');
                    }).appendTo($pager).addClass('clickable');
                    // [끝]
                    $('<span class="page-number" cursor: "pointer">&nbsp;[끝]</span>').bind('click', {newPage: page}, function (event) {
                        currentPage = numPages - 1;
                        $table.trigger('repaginate');
                        $($(".page-number")[endp - nowp + 1]).addClass('active').siblings().removeClass('active');
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

        /**
         * @name logout_btn
         * @description 로그아웃을 한다.
         */
        logout_btn: function () {
            $("#logoutBtn").click(function () {
                location.href = "/view/logout";
            });


        },

        /**
         * @name memberInfo
         * @description 회원 목록에서 아이디 클릭시 회원의 상세 정보를 가져온다.
         *              (본인 아이디를 클릭시 수정화면 나오고 수정버튼, 타인의 경우 삭제버튼 활성화)
         */
        memberInfo: function () {
            $('#memberInfoModal').on('show.bs.modal', function (e) {
                let button = $(e.relatedTarget);
                memberId = button.data('title');

                $.ajax({
                    url: '/member/memberInfo/?memberId=' + memberId,
                    type: 'get',
                    success: function (data) {

                        if (sessionStorage.getItem("userId") != data.result.memberId) {


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
                                "<td>가입일" +
                                "</td>" +
                                "<td>" + data.result.regDate + "</td>" +
                                "</tr>";


                            $("#memberInfo table").append(str);
                            $("#del_btn_div").show();
                            $("#update_btn_div").hide();
                            memberId = data.result.memberId;

                        }else{
                            $("#memberInfo").html("");
                            let html =
                                "<table id='memberInfoTable' class='table table-condensed table-hover'>"
                                + "</<table>";
                            $("#memberInfo").append(html);
                            /*+ data.result.memberAddress +*/

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
                                "<td><input type='text' id='modyfyAddress' value='"+ data.result.memberAddress +"'></td>" +
                                "<tr>" +
                                "<td>생년월일" +
                                "</td>" +
                                "<td>" +
                                "<div className='input-group date' class='input-group date memberDatepickerfunc' id='modifyBirthDatepicker' onclick='$mainView.event.datePicker();' data-target-input='nearest'>" +
                                "&emsp;<input type='text' class='modyfywidth' id='modyfyBirth' data-target='#modifyBirthDatepicker' value='"+ data.result.memberBirth +"'>" +
                                "<div class='input-group-append' data-target='#modifyBirthDatepicker' data-toggle='datetimepicker'>"+
                                "<div class='input-group-text'>날짜선택</div></div></div>"+
                                "</td>" +
                                "<tr>" +
                                "<td>가입일" +
                                "</td>" +
                                "<td>" + data.result.regDate + "</td>" +
                                "</tr>";
                            $("#memberInfo table").append(str);
                            $("#del_btn_div").hide();
                            $("#update_btn_div").show();
                            memberId = data.result.memberId;
                        }

                    }, error: function (data) {
                        console.log("실패");
                        console.log(data.memberId);

                    }
                });//ajax


            });


        },
        /**
         * @name memberInfodel
         * @description 회원 상세정보창에서 삭제 클릭시 회원을 삭제한다.
         */
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
                        } else {
                            return;
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
        },
        datePicker: function () {
            $('.memberDatepickerfunc').datetimepicker({format: 'YYYY-MM-DD'});

        }
    }

    $mainView.request = {
        doUpdate: function () {
            let memberAddress = $('#modyfyAddress').val();
            let memberBirth = $('#modyfyBirth').val();
            let param ={"memberAddress" : memberAddress, "memberBirth" : memberBirth}
            if(memberAddress==""| memberBirth=="") {
                alert("값을 올바르게 입력 해주세요.")
            }else{
                $.ajax({
                    type: "post",
                    data: JSON.stringify(param),
                    url:"member/updateMember/",
                    dataType: "text",
                    contentType:"application/json; charset=UTF-8",
                success:function (data) {
                    console.log(data);
                        alert("변경이 완료되었습니다.")
                },
                    error:function(data){
                        console.log(data);
                    }
                })

            }
        }
    }
}(window, document));