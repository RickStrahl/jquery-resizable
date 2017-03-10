/// <reference path="jquery.js" />
/// <reference path="jquery-resizable.js" />
/*
jquery-resizable-table-columns
Version 0.17 - 1/4/2015
© 2015-2016 Rick Strahl, West Wind Technologies 
www.west-wind.com
Licensed under MIT License
*/
(function(factory, undefined) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof module === 'object' && typeof module.exports === 'object') {
		// CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Global jQuery
		factory(jQuery);
	}
}(function($, undefined) {
    $.fn.resizableTableColumns = function(opt) {
        opt = $.extend({
            resizeHeight: false,
            handleSelector: "> .resizer",
        }, opt);

        return this.each(function() {
            $(this)
                .css({ position: "relative" })
                .prepend("<div class='resizer'></div>")
                .resizable(opt);
        });
    };
}));
