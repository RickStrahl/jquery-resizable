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
            onDragStart: null,
            // hook into stop drag operation (event passed)
            onDragStop: null,
            // hook into each drag operation (event passed)
            onDrag: null
        };
        if (typeof options == "object") opt = $.extend(opt, options);

        
        return this.each(function () {            
            var $el = $(this);
            var $handle = opt.handleSelector ? $(opt.handleSelector) : $el;

            var startWidth, startHeight, startTransition, startX, startY;

            function noop(e) {
                e.stopPropagation();
                e.preventDefault();
            };

            function startDragging(e) {
                startX = e.clientX;
                startY = e.clientY;

                startWidth = parseInt($el.width(), 10);
                startHeight = parseInt($el.height(), 10);

                if (opt.onDragStart) {
                    if (opt.onDragStart(e, $el, opt) === false)
                        return;
                }

                opt.dragFunc = doDrag; 
                $(document).bind('mousemove.rsz', opt.dragFunc);
                $(document).bind('mouseup.rsz', stopDragging);
                $(document).bind('selectstart.rsz', noop); // disable selection

                startTransition = $el.css("transition");                
                $el.css("transition", "none");                
            }

            function doDrag(e) {
                var newWidth = startWidth + e.clientX - startX;                
                if (opt.resizeWidth)
                    $el.width(newWidth);

                if (opt.resizeHeight) $el.height(startHeight + e.clientY - startY);
                if (opt.onDrag)
                    opt.onDrag(e,$el,opt);
            }

            function stopDragging(e) {
                e.stopPropagation();
                e.preventDefault();

                $(document).unbind('mousemove.rsz', opt.dragFunc);
                $(document).unbind('mouseup.rsz', stopDragging);
                $(document).unbind('selectstart.rsz', noop);

                $el.css("transition", startTransition);
                if (opt.onDragStop) opt.onDragStop(e,$el,opt);

                return false;
            }

            // Initialization
            $el.addClass("resizable");
            $handle.bind('mousedown.rsz', startDragging);
        });
    };    
})(jQuery,undefined);