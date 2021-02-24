    (function (W, D) {
        W.$commonFunc = W.$commonFunc || {};

      /*  $commonFunc.control = {
            datePicker : function(el, options) {
                if (options === undefined || options === null) {
                    options = "YYYY-MM-DD";
                }
                $(el).datetimepicker({
                    format: options
                });
            }
        };*/
        $commonFunc.message = {

        /**
         *
         * @name         : alert
         * @description : 알림 팝업창을 표출한다.
         * @date         : 2019. 03. 06.
         * @author       : 권차욱
         * @history      :
         * @param  title  : 제목
         * @param message : 메시지
         * @param callback : 콜백함수
         */
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
                '<button type="button" id="alertOkBtn"class="btn btn-primary" data-dismiss="modal">확인</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            $(html).on('shown.bs.modal', function (e) {
                $("#alertOkBtn").click(function () {
                    $('#alertPopup').modal("hide");
                    $('#alertPopup').on("hidden.bs.modal", function(e) {
                        $('#alertPopup').modal("dispose");
                        $('#alertPopup').remove();
                    });

                    if (callback != null && callback instanceof Function) {
                        callback.call(undefined);
                    }
                });
            }).modal("show");
        },

        /**
         *
         * @name         : confirm
         * @description : confirm 팝업창을 표출한다.
         * @date         : 2019. 03. 06.
         * @author       : 권차욱
         * @history      :
         * @param  title  : 제목
         * @param message : 메시지
         * @param okCallback : 확인 콜백함수
         * @param cancelCallback :  취소 콜백함수
         */
        confirm: function (title, message, okCallback, cancelCallback) {
            /* let html = "";
             html += "<div>";
             html += "<p style='font-size:14px;text-align:center;'>" + message + "</p>"
             html += "<div class='window_btnset' style='padding:10px;'>";
             html += "<button type='button' class='k-button k-primary' id='confirmOkBtn'>확인</button>";
             html += "<button type='button' class='k-button  k-gray' id='confirmCancelBtn' style='margin-left:5px;'>취소</button>";
 //          html +=       "<button type='button' class='k-button k-primary k-button-icontext' id='confirmOkBtn'><span class='k-icon k-i-check'></span>확인</button>";
 //          html +=       "<button type='button' class='k-button  k-button-icontext' id='confirmCancelBtn' style='margin-left:5px;'><span class='k-icon k-i-cancel'></span>취소</button>";
             html += "</div>";
             html += "</div>";

             var confirm = $(html).kendoWindow({
                 width: 400,
                 title: title,
                 visible: false,
                 modal: true,
                 pinned: false,
                 draggable: false,
                 position: {top: 100},
                 actions: [
                     "Close"
                 ],
                 close: function () {
                     confirm.destroy();
                 }
             }).data("kendoWindow").center().open();

             $("#confirmOkBtn").click(function () {
                 confirm.close();
                 if (okCallback != null && okCallback instanceof Function) {
                     okCallback.call(undefined);
                 }
             });

             $("#confirmCancelBtn").click(function () {
                 confirm.close();
                 if (cancelCallback != null && cancelCallback instanceof Function) {
                     cancelCallback.call(undefined);
                 }
             });*/

            let html =
                '<div class="modal fade" id="confirmPopup" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
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
                '<button type="button" id="confirmOkBtn" class="btn btn-primary">확인</button>' +
                '<button type="button" id="confirmCancelBtn" class="btn btn-secondary">취소</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            $(html).on('shown.bs.modal', function (e) {
                $("#confirmOkBtn").on("click", function() {
                    $('#confirmPopup').modal("hide");
                    $('#confirmPopup').on("hidden.bs.modal", function(e) {
                        $('#confirmPopup').data("dispose");
                        $('#confirmPopup').remove();
                    });
                    if (okCallback != null && okCallback instanceof Function) {
                        okCallback.call(undefined);
                    }
                });

                $("#confirmCancelBtn").click(function () {
                    $('#confirmPopup').modal("hide");
                    $('#confirmPopup').on("hidden.bs.modal", function(e) {
                        $('#confirmPopup').modal("dispose");
                        $('#confirmPopup').remove();
                    });
                    if (cancelCallback != null && cancelCallback instanceof Function) {
                        cancelCallback.call(undefined);
                    }
                });
            }).modal("show");
        }
    };

// (function (W, D) {
//     W.$common = W.$common || {};
//
//     $common.control = {
//         datePicker : function(el, options) {
//             if (options === undefined || options === null) {
//                 options = "YYYY-MM-DD";
//             }
//             $(el).datetimepicker({
//                 format: options
//             });
//         }
//     };
//
// })(window, document);


    })(window, document);