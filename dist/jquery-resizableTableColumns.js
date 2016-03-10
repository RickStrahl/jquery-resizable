/// <reference path="jquery.js" />
/// <reference path="jquery-resizable.js" />
/*
jquery-resizable-table-columns
Version 0.14 - 1/4/2015
© 2015 Rick Strahl, West Wind Technologies 
www.west-wind.com
Licensed under MIT License
*/
(function($, undefined) {
    $.fn.resizableTableColumns = function(opt) {
        opt = $.extend({
            resizeHeight: false,
            // we use the column as handle and filter
            // by the contained .resizer element
            handleSelector: "",
            onDragStart: function(e, $el, opt) {
                // only drag resizer
                if (!$(e.target).hasClass("resizer"))
                    return false;
                return true;
            }
        }, opt);

        return this.each(function() {
            $(this)
                .css({ position: "relative" })
                .prepend("<div class='resizer'></div>")
                .resizable(opt);
        });
    };
})(jQuery, undefined);