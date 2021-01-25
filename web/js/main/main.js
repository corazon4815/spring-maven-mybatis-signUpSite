(function (W, D) {
    W.$mainView = W.$mainView || {};

    $(document).ready(function () {

        $mainView.ui.memberList(0, 10, 1);
        $mainView.ui.doSearch();
        $mainView.event.setEventUI();


    });

    /**
     * 페이지번호
     */
    let page = 1;
    /**
     * 시작번호
     */
    let start = 0;
    /**
     * 한페이지에 보여줄 레코드 수
     */
    let cntPerPage = 10;

    let searchType ="";

    let keyword = "";

    $mainView.ui = {
        /**
         * 현재 켜있는 모달창의 회원 아이디가 저장
         */
        currentMemberId : "",
        /**
         * 회원 목록 레코드 총 갯수
         */
        totalCnt : null,

        isPaging : true,

        doSearch: function () {
            $('#searchBtn').click(function () {
                searchType = $("#searchSelect option:selected").val();
                keyword = $("#searchKey").val();
                console.log("list"+searchType)
                $mainView.ui.memberList(start,cntPerPage,1,searchType,keyword);
            })
        },


     /*   listSearch : function () {
            searchType = $("#searchSelect option:selected").val();
            keyword = $("#searchKey").val();
            console.log("list"+searchType)
            $mainView.ui.memberList(start,cntPerPage,1,searchType,keyword);
        },*/

        /**
         * @name memberList
         * @description 회원 목록을 가져온다.
         */
        memberList: function (startIdx, endIdx, page) {
            if(!startIdx){
                startIdx = 0;
            }
            if(!endIdx){
                endIdx = 10;
            }
            if(!page){
                page = 1;
            }
            // let searchType = $("#searchSelect option:selected").val();
            // let keyword = $("#searchKey").val();
            searchType = $("#searchSelect option:selected").val();
            keyword = $("#searchKey").val();

            /*console.log(searchType,keyword);*/
            console.log("member"+keyword);
            console.log("startIdx= "+startIdx+" endIdx= "+endIdx);
            $.ajax({
                type: "get",
                url: "/member/memberlist",
                data : {
                    "startIdx"   : startIdx,
                    "endIdx"     : endIdx,
                    "searchType" : searchType,
                    "keyword"    : keyword,
                },
                /* data: "startIdx=" + startIdx + "&endIdx=" + endIdx,*/
                dataType: "json",
                contentType: "application/json; charset=utf-8;"
            })
                .done(function (args) {

                    const result = args.result;
                    console.log(result);
                    $mainView.ui.totalCnt = result.totalCnt;

                    if($mainView.ui.isPaging == true) {
                        $mainView.ui.paging($mainView.ui.totalCnt);
                    }

                    $("#myTable").html("");

                    for (let i = 0; i < result.memberList.length; i++) {
                        let myTbody =
                            "<tr class='cursor' onclick=\"javascript:$mainView.ui.showMemberInfoPopup(\'" + result.memberList[i].memberId + "\')\"; data-title=" + result.memberList[i].memberId + ">" +
                            "<td class='noWid'>"+(i+1+(page-1)*10)+"</td>" +
                            "<td id='memId_"+i+"' class='idWid'>" +
                            result.memberList[i].memberId + "</td>" +
                            "<td class='nameWid'>" + result.memberList[i].memberName + "</td>" +
                            "<td class='addWid'>" + result.memberList[i].memberAddress + "</td>" +
                            "<td class='regWid'>" + result.memberList[i].regDate + "</td>" +
                            "</tr>";
                        $("#myTable").append(myTbody);

                    }
                    /* if(callback != undefined && callback instanceof Function) {
                         callback.call(undefined, args.result.totalCnt);
                         콜백함수는 undefined이나 null로 자릿수를 채워야함
                     }*/
                }).fail(function (e) {
                    console.log(e);
                /*alert(e.responseText);*/
            });
        },


        /**
         * @name paging
         * @param totalCnt : 전체 레코드 수
         * @description 페이징을 한다.
         *
         */
        paging: function (totalCnt) {
            $('.sync-pagination').twbsPagination({
                totalPages: totalCnt / 10 + 1,
                visiblePages : 10,
                onPageClick: function (evt, page) {
                    let start = 10 * (page - 1);
                    if($mainView.ui.isPaging == false) {
                        $mainView.ui.memberList(start, cntPerPage,page,searchType,keyword);
                    }else{
                        $mainView.ui.isPaging= false;
                    }

                }
            });

        },

        /**
         * @name showMemberInfoPopup
         * @description 회원 목록에서 아이디 클릭시 회원의 상세 정보를 가져온다.
         *              (본인 아이디를 클릭시 수정화면 나오고 수정버튼, 타인의 경우 삭제버튼 활성화)
         */
        showMemberInfoPopup : function(memberId) {
            $.ajax({
                type: 'get',
                url: '/member/memberInfo',
                data: "memberId=" + memberId,
                dataType: "json",
                contentType: "application/json; charset=utf-8;",
                success: function (data) {
                    //console.log(sessionStorage.getItem("userId"));
                    //console.log( data.result.memberId);
                    if (sessionStorage.getItem("userId") != data.result.memberId) {
                        $("#memberInfo").html("");
                        $("#memberInfo").html($mainView.template.getMemberInfoForm(data, "READ"));
                        $("#del_btn_div").show();
                        $("#update_btn_div").hide();
                    } else {
                        $("#memberInfo").html("");
                        $("#memberInfo").html($mainView.template.getMemberInfoForm(data, "MOD"));
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
                    $mainView.ui.currentMemberId = data.result.memberId;
                    $("#memberInfoModal").modal("show");

                }, error: function (data) {
                    console.log("실패");
                    console.log($mainView.ui.currentMemberId);
                }
            });
        }

    };

    $mainView.template = {
        /**
         * @name getMemberInfoForm
         * @param data, mode (READ일때 조회, MOD일때 수정)
         * @description 회원을 클릭했을 때의 두가지 템플릿 (조회상태와 수정상태)
         *
         */
        getMemberInfoForm : function(data, mode) {
            /*onclick='$mainView.event.datePicker();'*/
          /*  $(function () {
                $('#datetimepickerlogin').datetimepicker({ format: 'YYYY-MM-DD'});
            });*/
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
                            "<td class='verticalM'>주소" +"</td>" +
                            "<td><input type='text' id='modyfyAddress' class='form-control' value='"+ data.result.memberAddress +"'></td>" +
                        "</tr>" +
                        "<tr>" +
                            "<td class='verticalM'>생년월일" +"</td>" +
                            "<td>" +
                                 "<div class='input-group input-group-lg date' id='modifyBirthDatepicker' data-target-input='nearest' onclick='$mainView.event.datePicker();'>" +
                                     "<input type='text' class='form-control datetimepicker-input inputbox verticalM' style='font-size:16px; height: 36px' value='"+ data.result.memberBirth +"' id='modyfyBirth' data-target='#modifyBirthDatepicker'>" +
                                        "<div class='input-group-append' style='height: 36px;' data-target='#modifyBirthDatepicker' data-toggle='datetimepicker'>" +
                                            "<div class='input-group-text'>" +
                                               "<i class='fa fa-calendar'></i></div>" +
                                        "</div>" +
                                "</div>" +
                            "</td>" +
                        "</tr>";
                    break;
                default:
                    break;
            }
            html +=
                    "<tr>" +
                        "<td>가입일" +"</td>" +
                        "<td>" + data.result.regDate + "</td>" +
                    "</tr>" +
                "</<table>";
            return html;
        }
    };

    $mainView.event = {
        setEventUI: function () {
            /**
             * @name memberInfodel
             * @description 회원 상세정보창에서 삭제 클릭시 회원을 삭제한다.
             */
            $('#member_del_btn').click(function () {
                    let delMemberId = $mainView.ui.currentMemberId;
                    $commonFunc.message.confirm("알림", "회원정보를 삭제하시겠습니까?", function() {
                            $.ajax({
                                type: 'DELETE',
                                url: '/member/memberdel?memberId=' + delMemberId,
                                dataType: 'json',
                                contentType: 'application/json; charset=utf-8;',
                                success: function (data) {/*, textStatus, xhr*/
                                    $commonFunc.message.alert("알림", "정상적으로 삭제하였습니다.", function() {
                                        window.location.href = '/view/mainview';
                                    });
                                },
                                error: function (data, request, status, error) {
                                    $commonFunc.message.alert("알림", data.result);
                                }
                            });
                    });
                });
        },
        datePicker: function () {
            $('#modifyBirthDatepicker').datetimepicker({ format: 'YYYY-MM-DD'});
        }

    };

    $mainView.request = {

        /**
         * @name doUpdate
         * @description 회원 목록에서 본인을 클릭해서 정보를 수정한다.
         */
        doUpdate: function () {
            let memberAddress = $('#modyfyAddress').val();
            let memberBirth = $('#modyfyBirth').val();
            let memberId = $mainView.ui.currentMemberId;

            if(memberAddress==""| memberBirth=="") {
                alert("값을 올바르게 입력 해주세요.")
            }else{
                $.ajax({
                    type: "put",
                    url:"/member/updateMember",
                    data: JSON.stringify({
                        //"memberId=" + memberId + "&memberBirth=" + memberBirth + "&memberAddress=" + memberAddress
                        "memberId" : memberId,
                        "memberBirth" : memberBirth,
                        "memberAddress" : memberAddress
                    }),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8;",
                    success:function (data) {
                        $commonFunc.message.alert("알림", "정상적으로 수정되었습니다.", function() {
                            window.location.href = '/view/mainview';
                        });
                },
                    error:function(data){
                        console.log(data.result);
                    }
                })
            }
        }
    };

  /*  $mainView.message = {
        alert: function (title, message, callback) {
            let html =
                '<div class="modal fade" id="alertPopup" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
                '<div class="modal-dialog modal-dialog-centered" role="document">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<h5 class="modal-title" id="exampleModalLongTitle">' + title + '</h5>' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '</div>' +
                '<div class="modal-body">' +
                message +
                '</div>' +
                '<div class="modal-footer">' +
                '<button type="button" id="alertOkBtn" class="btn btn-primary" data-dismiss="modal">확인</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            let alert = $(html).modal("show");
        }
    }*/
}(window, document));