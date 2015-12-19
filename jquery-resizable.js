(function($, undefined) {    
    if ($.fn.resizable)
        return;

    $.fn.resizable = function fnResizable(options) {
        var opt = {
            // optional selector for handle that starts dragging
            handleSelector: null,
            // resize the width
            resizeWidth: true,
            // resize the height
            resizeHeight: true,
            // hook into start drag operation (event passed)
            onStartDragging: null,
            // hook into stop drag operation (event passed)
            onStopDragging: null,
            // hook into each drag operation (event passed)
            onDrag: null
        };
        if (typeof options == "object") opt = $.extend(opt, options);

        return this.each(function() {
            var $el = $(this);
            var el = $el.get(0);
            var $handle = $(opt.handleSelector);

            var startWidth, startHeight, startTransition;

            function nf(e) {
                e.stopPropagation();
                e.preventDefault();
            };

            function startDragging(e) {
                startX = e.clientX;
                startY = e.clientY;

                startWidth = parseInt($el.width(), 10);
                startHeight = parseInt($el.height(), 10);

                console.log("start: width: " + startWidth + " x: " + startX);

                opt.dragFunc = doDrag;
                $(document).bind('mousemove.rsz', opt.dragFunc);
                $(document).bind('mouseup.rsz', stopDragging);
                $(document).bind('selectstart.rsz', nf);

                startTransition = $el.css("transition");
                console.log(startTransition);
                $el.css("transition", "none");
                console.log($el.css("transition"));

                if (opt.onStartDragging) opt.onStartDragging(e);
            }

            function doDrag(e) {
                var newWidth = startWidth + e.clientX - startX;
                console.log("before width: " + $el.width() + "   start width: " + startWidth + " new x:" + e.clientX + " start x:" + startX + "  new width: " + newWidth);
                if (opt.resizeWidth)
                    $el.width(newWidth);

                if (opt.resizeHeight) $el.height(startHeight + e.clientY - startY);
                if (opt.onDrag)
                    opt.onDrag(e);

                console.log("after width: " + $el.width());
            }

            function stopDragging(e) {
                e.stopPropagation();
                e.preventDefault();

                $(document).unbind('mousemove.rsz', opt.dragFunc);
                $(document).unbind('mouseup.rsz', stopDragging);
                $(document).unbind('selectstart.rsz', nf);

                $el.css("transition", startTransition);
                if (opt.onStopDragging) opt.onStopDragging(e);

                return false;
            }

            // Initialization
            $el.addClass("resizable");
            $handle.bind('mousedown.rsz', startDragging);
        });
    };    
})(jQuery,undefined);