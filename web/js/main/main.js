(function (W, D) {
    W.$mainView = W.$mainView || {};

    $(document).ready(function () {
        $mainView.ui.memberList();
        $mainView.event.setEventUI();
    });

    $mainView.ui = {
        /**
         * 현재 켜있는 모달창의 회원 아이디가 저장된다.
         */
        currentMemberId : "",

        /**
         * @name memberList
         * @description 회원 목록을 가져온다.
         */
        memberList: function () {
            $.ajax({
                type: "get",
                url: "/member/memberlist",
                dataType: "json",
                contentType: "application/json; charset=utf-8;"
            })
                .done(function (args) {
                    let html =
                        "<thead  class='theadlist' ><tr>" +
                        "<td class='notd'>번호" +
                        "</td>" +
                        "<td class='idtd'>아이디" +
                        "</td>" +
                        "<td class='nametd'>이름" +
                        "</td>" +
                        "<td class='addresstd'>주소" +
                        "</td>" +
                        "<td class='regdatetd'>가입일" +
                        "</td>" +
                        "</tr></thead>";

                    /*$("#listInfo").html(html);*/
                    /*  onclick='$mainView.event.memberInfo("+args.result[i].memberId +");'*/
                    for (let i = 0; i < args.result.length; i++) {
                        html +=
                            "<tr class='cursor' data-toggle='modal' data-target='#memberInfoModal' data-title=" + args.result[i].memberId + ">" +
                            "<td class='notd'>"+(i+1)+"</td>" +
                            "<td id='memId_"+i+"' class='idtd'>" +
                            args.result[i].memberId + "</td>" +
                            "<td class='nametd'>" + args.result[i].memberName + "</td>" +
                            "<td class='addresstd'>" + args.result[i].memberAddress + "</td>" +
                            "<td class='regdatetd'>" + args.result[i].regDate + "</td>" +
                            "</tr>";
                    }
                    $("#tbl").html(html);
                    /*$mainView.ui.paging();*/
                }).fail(function (e) {
                alert(e.responseText);
            });
        }

      /*  paging: function () {
            $('#listInfo').jqPagination({
                    dataSource:
                        $mainView.ui.memberList(),
                    callback: function (data, pagination) {
                        var dataHtml = '<table>';

                        $.each(data, function (index, item) {
                            dataHtml += '<td>' + item.name + '</td>';
                        });

                        dataHtml += '</table>';

                        $("#listInfo").html(dataHtml);
                    }
                })

        }*/
    };

    $mainView.template = {
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
                            "<td><input type='text' id='modyfyAddress' value='"+ data.result.memberAddress +"'></td>" +
                        "</tr>" +
                        "<tr>" +
                            "<td>생년월일" +"</td>" +
                            "<td>" +
                                "<div className='input-group date' class='input-group date memberDatepickerfunc' id='modifyBirthDatepicker' onclick='$common.control.datePicker(this);' data-target-input='nearest'>" +
                                    "<input type='text' class='modyfywidth' id='modyfyBirth' data-target='#modifyBirthDatepicker' value='"+ data.result.memberBirth +"'>" +
                                    "<div class='input-group-append' data-target='#modifyBirthDatepicker' data-toggle='datetimepicker'>"+
                                        "<div class='input-group-text'>날짜선택</div>" +
                                    "</div>" +
                                "</div>"+
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
             * @name memberInfo
             * @description 회원 목록에서 아이디 클릭시 회원의 상세 정보를 가져온다.
             *              (본인 아이디를 클릭시 수정화면 나오고 수정버튼, 타인의 경우 삭제버튼 활성화)
             */
            $('#memberInfoModal').on('show.bs.modal', function (e) {
                let button = $(e.relatedTarget);
                memberId = button.data('title');

                $.ajax({
                    type: 'get',
                    url: '/member/memberInfo',
                    data: "memberId=" + memberId,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8;",
                    success: function (data) {
                        console.log(sessionStorage.getItem("userId"));
                        console.log( data.result.memberId);
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

                    }, error: function (data) {
                        console.log("실패");
                        console.log($mainView.ui.currentMemberId);
                    }
                });

                /*$('#alertModal').on('show.bs.modal', function (e) {
                    console.log("alert show");
                });*/
            /*    $commonFunc.message.alert("알림","틀렸어요")*/
                /*$('#alertModal').modal("show");*/

            });

            /**
             * @name memberInfodel
             * @description 회원 상세정보창에서 삭제 클릭시 회원을 삭제한다.
             */
            $('#member_del_btn').click(function () {
                    let delMemberId = $mainView.ui.currentMemberId;
                    console.log(delMemberId);

                    $.ajax({
                        type: 'DELETE',
                        url: '/member/memberdel?memberId=' + delMemberId,
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8;',
                        success: function (data) {/*, textStatus, xhr*/
                            $commonFunc.message.confirm("알림","회원정보를 삭제하시겠습니까 ?");

                            // $("#confirmOkBtn").click(function () {
                            //     $('#confirmPopup').modal("hide");
                            //     $('#confirmPopup').on("hidden.bs.modal", function(e) {
                            //         $('#confirmPopup').modal("dispose");
                            //         window.location.href = '/view/mainview';
                            //     });
                            //     if (okCallback != null && okCallback instanceof Function) {
                            //         okCallback.call(undefined);
                            //     }
                            // });
                            // $("#confirmCancelBtn").click(function () {
                            //     $('#confirmPopup').modal("hide");
                            //     $('#confirmPopup').on("hidden.bs.modal", function(e) {
                            //         $('#confirmPopup').modal("dispose");
                            //     });
                            //     if (cancelCallback != null && cancelCallback instanceof Function) {
                            //         cancelCallback.call(undefined);
                            //     }
                            // });


                        /*    $('#memberInfoModal').modal('hide');
                                window.location.href = '/view/mainview';*/

                        },
                        error: function (data, request, status, error) {
                            alert(data.result);
                        }
                    });
                });
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
                    console.log(data.result);
                    alert("회원 정보가 수정되었습니다.")
                    $('#memberInfoModal').modal('hide');
                    window.location.href = '/view/mainview';
                },
                    error:function(data){
                        console.log(data.result);
                    }
                })
            }
        }
    };

    $mainView.message = {
        alert: function (title, message, callback) {
            /*let html = "";
            html += "<div>";
            html += "<p style='font-size:14px;text-align:center;'>" + message + "</p>"
            html += "<div class='window_btnset' style='padding:10px;'>";
            html += "<button type='button' class='k-button  k-primary' id='alertOkBtn'>확인</button>";
//          html +=       "<button type='button' class='k-button  k-button-icontext' id='alertOkBtn'><span class='k-icon k-i-check'></span>확인</button>";
            html += "</div>";
            html += "</div>";

            var alert = $(html).kendoWindow({
                width: 400,
                title: title,
                visible: false,
                modal: true,
                pinned: false,
                position: {top: 100},
                draggable: false,
                actions: [
                    "Close"
                ],
                close: function () {
                    alert.destroy();
                }
            }).data("kendoWindow").center().open();

            $("#alertOkBtn").click(function () {
                alert.close();
                if (callback != null && callback instanceof Function) {
                    callback.call(undefined);
                }
            });*/
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
    }
}(window, document));