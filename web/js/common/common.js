(function (W, D) {
    W.$common = W.$common || {};

    $common.control = {
        datePicker : function(el, options) {
            if (options === undefined || options === null) {
                options = "YYYY-MM-DD";
            }
            $(el).datetimepicker({
                format: options
            });
        }
    };

})(window, document);