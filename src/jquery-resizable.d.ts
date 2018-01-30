// Some documentation text taken from: https://www.npmjs.com/package/jquery-resizable-dom

/// <reference types="jquery"/>

declare namespace JQueryResizeable {
    interface ResizeableOptions {
        /**
         * A jQuery selector or DOM element that acts as a selector. This can be a string, a DOM object or an existing jQuery selector.
         * If no selector is passed the element itself becomes resizable. Usually this results in undesirable behavior but you can limit the
         * drag start location using the onDragStart handler.
         * If the selector is prepended by a ">" the element is searched inside the resized component.
         * default: null (but "> .resizer" in case of resizableTableColumns).
         */
        handleSelector: JQuery.Selector | Element | JQuery;
        /**
         * Determines whether the width is resizable.
         * default: true
         */
        resizeWidth?: boolean,
        /**
         * Determines whether the height is resizable.
         * default: true (but false in case of resizableTableColumns).
         */
        resizeHeight?: boolean,
        /**
         * The side that the width resizing is relative to.
         * default: "right"
         */
        resizeWidthFrom?: "right"|"left",
        /**
         * The side that the height resizing is relative to.
         * default: "bottom"
         */
        resizeHeightFrom?: "bottom"|"top",
        /**
         * Hook method fired just before you start dragging. You can return an explicit false value to abort the drag operation.
         * Gets passed the event, the selected jQuery element and the options object.
         * default: null
         */
        onDragStart?: (e: JQuery.Event, element: JQuery, options: JQueryResizeable.ResizeableOptions) => boolean,
        /**
         * Hook event fired when the drag operation completes and the mouse is released.
         * Receives event, jquery selected element and the options object.
         * default: null
         */
        onDragEnd?: (e: JQuery.Event, element: JQuery, options: JQueryResizeable.ResizeableOptions) => void,
        /**
         * Hook method fired whenever the mouse cursor moves.
         * Receives jQuery event, jquery selected element, newWidth, newHeight and the options object.
         * Optionally return an explicit value of false to indicate you don't want to set the newWidth, newHeight values
         * after onDrag completes.
         * default: null
         */
        onDrag?: (e: JQuery.Event, element: JQuery, newWidth: number, newHeight: number, options: JQueryResizeable.ResizeableOptions) => boolean,
        /**
         * Sets touch-action: none on the handle element to prevent browser interference to initiating touch drag operations especially
         * on Internet Explorer, Edge and Windows 10 browsers.
         * default: true
         */
        touchActionNone?: boolean,
        /**
         * Optionally presets the internal instance id, which is automatically created as a random (starting "rsz_") if not given.
         * default: null
         */
        instanceId?: string
    }
}

interface JQuery {
    /**
     * Initializes or destroys the resizeable feature.
     *
     * @param options Either an object passing the options for initialization, or "destroy" as a command.
     */
    resizable(options?: JQueryResizeable.ResizeableOptions | "destroy"): void;
    /**
     * Initializes the resizeable feature on a table. Note that it is important to add certain css settings for the ".resizer" class (see comment in this .d.ts file).
     *
     * @param options An object passing the options for initialization.
     */
    /* The css code needed is this:
     *   .resizer {
     *     position: absolute;
     *     top: 0;
     *     right: -8px;
     *     bottom: 0;
     *     left: auto;
     *     width: 16px;
     *     cursor: col-resize;
     *   }
     *
     */
    resizableTableColumns(options?: JQueryResizeable.ResizeableOptions): void;
}