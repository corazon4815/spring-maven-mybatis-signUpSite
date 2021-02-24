(function (W, D) {
    W.$mainView = W.$mainView || {};

    $(document).ready(function () {
        $mainView.ui.doSelectMember(0, 10, 1);
        $mainView.event.setEvent();
       // $mainView.ui.doSearch();
    });

    $mainView.ui = {

        //검색타입
        searchType: "",

        //키워드
        keyword: "",

        //시작번호
        start: 0,

        //시작페이지
        page: 1,

        //한페이지에 보여줄 레코드 수
        cntPerPage: 10,

        //현재 켜있는 모달창의 회원 아이디가 저장
        currentMemberId: "",

        //회원 목록 레코드 총 갯수
        totalCnt: "",

        //페이징 유무
        isPaging: true,

        //검색 페이징 유무
        isSearchPaging: false,

        /**
         * @name doSearch
         * @description 이름, 아이디, 주소를 선택해 검색을 한다.
         */
        doSearch: function () {
            $mainView.ui.isSearchPaging = true;
            $mainView.ui.searchType = $("#searchSelect option:selected").val();
            $mainView.ui.keyword = $("#searchKey").val();
            $mainView.ui.doSelectMember($mainView.ui.start, $mainView.ui.cntPerPage, $mainView.ui.page);
        },

        /**
         * @name doSelectMember
         * @description 회원 목록을 가져온다.
         */
        doSelectMember: function (startIdx, endIdx, page) {
            $mainView.request.doSelect(startIdx, endIdx, function (res) {
                console.log(res);
                const result = res.result;
                const memberList = result.memberList;
                const memLength = memberList.length;
                $mainView.ui.totalCnt = result.totalCnt;

                if (($mainView.ui.isPaging || $mainView.ui.isSearchPaging) && result.totalCnt > 0) {
                    $mainView.ui.paging(result.totalCnt);
                }
                $("#myTable").html("");
                $('.emptySearch').css('display', 'none');
                $(".totalCnt").html("Total : " + result.totalCnt);

                if (!result.totalCnt) {
                    $('.emptySearch').css('display', 'block');
                }else {
                    for (let i = 0; i < memLength; i++) {
                        let myTbody =
                            "<tr class='cursor' onclick=\"javascript:$mainView.ui.showMemberInfoPopup(\'" + memberList[i].memberId + "\')\" data-title=" + memberList[i].memberId + ">" +
                                "<td class='noWid'>" + (i + 1 + (page - 1) * $mainView.ui.cntPerPage) + "</td>" +
                                "<td id='memId_" + i + "' class='idWid'>" + memberList[i].memberId + "</td>" +
                                "<td class='nameWid'>" + memberList[i].memberName + "</td>" +
                                "<td class='addWid'>" + memberList[i].memberAddress + "</td>" +
                                "<td class='regWid'>" + memberList[i].regDate + "</td>" +
                            "</tr>";
                        $("#myTable").append(myTbody);
                    }
                    if (memLength < $mainView.ui.cntPerPage) {
                        for (let i = 0; i < $mainView.ui.cntPerPage - memLength; i++) {
                            let lastPageTbody =
                                "<tr>" +
                                    "<td></td>" +
                                    "<td></td>" +
                                    "<td></td>" +
                                    "<td></td>" +
                                    "<td></td>" +
                                "</tr>";
                            $("#myTable").append(lastPageTbody);
                        }
                    }
                }
            });
        },

        /**
         * @name paging
         * @param totalCnt : 전체 레코드 수
         * @description 페이징을 한다.
         *
         */
        paging: function (totalCnt) {
            let cntPerPage = $mainView.ui.cntPerPage;
            if ($('.pagination').data("twbs-pagination")) {
                $('.pagination').twbsPagination('destroy');
            }
            $('.sync-pagination').twbsPagination({
                //전체 페이지수
                totalPages: (totalCnt % cntPerPage == 0) ? totalCnt / cntPerPage : totalCnt / cntPerPage + 1,
                //하단에 보여줄 페이지번호 수
                visiblePages: 5,
                changeTotalPages: function (totalPages, currentPage) {
                    this.options.totalPages = totalPages;
                    return this.show(currentPage);
                },
                onPageClick: function (evt, page) {
                    let start = cntPerPage * (page - 1);
                    if (!$mainView.ui.isPaging && !$mainView.ui.isSearchPaging) {
                        $mainView.ui.doSelectMember(start, cntPerPage, page);
                    }else {
                        $mainView.ui.isPaging = false;
                        $mainView.ui.isSearchPaging = false;
                    }

                }
            });

        },

        /**
         * @name showMemberInfoPopup
         * @description 회원 목록에서 아이디 클릭시 회원의 상세 정보를 가져온다.
         *              (본인 아이디를 클릭시 수정화면 나오고 수정버튼, 타인의 경우 삭제버튼 활성화)
         */
        showMemberInfoPopup: function (memberId) {
            $mainView.request.showPopup(memberId, function (res) {
                console.log(res);
                if (sessionStorage.getItem("userId") != res.result.memberId) {
                    $("#memberInfo").html("");
                    $("#memberInfo").html($mainView.template.getMemberInfoForm(res,"READ"));
                    $("#del_btn_div").show();
                    $("#update_btn_div").hide();
                }else {
                    $("#memberInfo").html("");
                    $("#memberInfo").html($mainView.template.getMemberInfoForm(res,"MOD"));
                    $("#del_btn_div").hide();
                    $("#update_btn_div").show();

                  /*  $("#modifyBirthDatepicker").on("click", function() {
                          $common.control.datePicker(this);
                      });
                      $common.control.datePicker("#datepicker", "YYY/MM/DD");
                      $common.control.datePicker(".datepicker", "YYYY-MM-DD");
                      $common.control.datePicker("#datepicker");
                      */
                }
                $mainView.ui.currentMemberId = res.result.memberId;
                $("#memberInfoModal").modal("show");

            });
        },

        /**
         * @name doDeleteMember
         * @description 회원 상세정보창에서 삭제 클릭시 회원을 삭제한다.
         **/
        doDeleteMember: function () {
            let delMemberId = $mainView.ui.currentMemberId;
            $mainView.request.doDelete(delMemberId, function (res) {
                $commonFunc.message.alert("알림", "정상적으로 삭제되었습니다.", function () {
                    console.log(res);
                    $mainView.ui.isSearchPaging = true;
                    $mainView.ui.doSelectMember(0, $mainView.ui.cntPerPage, 1);
                    $("#memberInfoModal").modal("hide");
                });
            });
        },

        /**
         * @name doUpdateMember
         * @description 회원 목록에서 본인을 클릭해서 정보를 수정한다.
         */
        doUpdateMember: function () {
            let data = {
                memberAddress: $('#modyfyAddress').val(),
                memberBirth: $('#modyfyBirth').val(),
                memberId: $mainView.ui.currentMemberId
            };
            if (data.memberAddress == "" || data.memberBirth == "") {
                alert("값을 올바르게 입력 해주세요.")
            }else {
                $mainView.request.doUpdate(data, function (res) {
                    if (res.result) {
                            $commonFunc.message.alert("알림", "정상적으로 수정되었습니다.", function () {
                            console.log(res);
                            $mainView.ui.isSearchPaging = true;
                            $mainView.ui.doSelectMember(0, $mainView.ui.cntPerPage, 1);
                            $("#memberInfoModal").modal("hide");
                        });
                    }else {

                    }

                });
            }
        },
    };

    $mainView.request = {
        /**
         * @name doSelect
         * @description 회원 목록을 가져온다.
         */
        doSelect: function (startIdx, endIdx, callback) {
            $.ajax({
                type: "get",
                url: "/member/memberlist",
                data: {
                    "startIdx": startIdx,
                    "endIdx": endIdx,
                    "searchType": $mainView.ui.searchType,
                    "keyword": $mainView.ui.keyword,
                },
                /* data: "startIdx=" + startIdx + "&endIdx=" + endIdx,*/
                dataType: "json",
                contentType: "application/json; charset=utf-8;",
                success: function (res) {
                    if (callback != null && callback instanceof Function) {
                        callback.call(undefined, res);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown){
                    console.log(errorThrown);
                }
            });
        },

        /**
         * @name doDeleteMember
         * @description 회원 상세정보창에서 삭제 클릭시 회원을 삭제한다.
         **/
        doDelete: function (delMemberId, callback) {
            $.ajax({
                type: 'DELETE',
                url: '/member/memberdel?memberId=' + delMemberId,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8;',
                success: function (res) {
                    if (callback != null && callback instanceof Function) {
                        callback.call(undefined, res);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown){
                    console.log(errorThrown);
                }
            });
        },
        /**
         * @name doUpdate
         * @description 회원 목록에서 본인을 클릭해서 정보를 수정한다.
         */
        doUpdate: function (data, callback) {
            $.ajax({
                type: "put",
                url: "/member/updateMember",
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json; charset=utf-8;",
                success: function (res) {
                    if (callback != null && callback instanceof Function) {
                        callback.call(undefined, res);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            })

        },

        /**
         * @name showPopup
         * @description 회원 목록에서 아이디 클릭시 회원의 상세 정보를 가져온다.
         */
        showPopup: function (memberId, callback) {
            $.ajax({
                type: 'get',
                url: '/member/memberInfo',
                data: "memberId=" + memberId,
                dataType: "json",
                contentType: "application/json; charset=utf-8;",
                success: function (res) {
                    if (callback != null && callback instanceof Function) {
                        callback.call(undefined, res);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        }
    };

    $mainView.template = {
        /**
         * @name getMemberInfoForm
         * @param data : 결과 값
         * @param  mode : 모드 READ일때 조회, MOD일때 수정
         * @description 회원을 클릭했을 때의 두가지 템플릿 (조회상태와 수정상태)
         *
         */
        getMemberInfoForm : function(data, mode) {
            let html =
                "<table id='memberInfoTable' class='table table-condensed table-striped table-hover'>" +
                    "<tr>" +
                        "<td>아이디" + "</td>" +
                        "<td>" + data.result.memberId + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td>이름" + "</td>" +
                        "<td>" + data.result.memberName + "</td>" +
                    "</tr>";

            switch(mode) {
                case "READ":
                    html +=
                        "<tr>" +
                            "<td>주소" + "</td>" +
                            "<td>" + data.result.memberAddress + "</td>" +
                        "</tr>" +
                        "<tr>" +
                            "<td>생년월일" + "</td>" +
                            "<td>" + data.result.memberBirth + "</td>" +
                        "</tr>";
                    break;
                case "MOD":
                    html +=
                        "<tr>" +
                            "<td>주소" +"</td>" +
                            "<td><input type='text' id='modyfyAddress' class='form-control' value='"+ data.result.memberAddress +"'></td>" +
                        "</tr>" +
                        "<tr>" +
                            "<td>생년월일" +"</td>" +
                            "<td>" +
                                "<div class='input-group input-group-lg date modifyBirthDatepicker' id='modifyBirthDatepicker' data-target-input='nearest' onclick='$mainView.event.datePicker();'>" +
                                    "<input type='text' class='form-control datetimepicker-input inputbox' style='font-size:16px; height: 36px' value='"+ data.result.memberBirth +"' id='modyfyBirth' data-target='#modifyBirthDatepicker'>" +
                                    "<div class='input-group-append' style='height: 36px;' data-target='#modifyBirthDatepicker' data-toggle='datetimepicker'>" +
                                        "<div class='input-group-text'>" +
                                            "<i class='fa fa-calendar'></i>" +
                                        "</div>" +
                                    "</div>" +
                                "</div>" +
                            "</td>" +
                        "</tr>";
                    break;
                default : break;
            }
            html +=
                    "<tr>" +
                        "<td>가입일" +"</td>" +
                        "<td>" + data.result.regDate + "</td>" +
                    "</tr>" +
                "</table>";
            return html;
        }
    };

    $mainView.event = {
        /**
         * @name datePicker
         * @description datePicker를 실행한다.
         */
        datePicker: function () {
            $('#modifyBirthDatepicker').datetimepicker({ format: 'YYYY-MM-DD'});
        },

        /*circleDrag : function() {
          $("#circle").draggable();
        },*/

        setEvent : function() {
            //sdjdsjsdi
            $('#searchKey').keyup(function () {
               $mainView.ui.doSearch();
            });

             /*$('#searchKey').keydown(function () {
               $mainView.ui.doSearch();
            });*/
        }

    };
}(window, document));