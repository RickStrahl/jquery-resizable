# jquery-resizable 
#### A small jQuery plug-in to make HTML DOM elements resizable 

This small jQuery plug-in allows you to make DOM elements resizable using a sizing handle. It works with Mouse and Touch events so you can resize elements on mobile devices. 

Resizables are useful if you want to add resizing features to your HTML layouts for things like like resizable dialogs, splitter panes or elements that can be resized by a user in a layout.

### Samples on CodePen
* [Simple Resizable Box](http://codepen.io/rstrahl/pen/bEVBdE)
* [Resizable Split Panels](http://codepen.io/rstrahl/pen/eJZQej)

### Installation
You can install this component from Bower:

```
$ bower install jquery-resizable
```

or from NPM - note the divergant name due to an existing package with the same name:

```
npm install jquery-resizable-dom
```

### Usage
```javascript
$(selector).resizable(options);
```

To use this plug-in add a script reference to jQuery and the resizable plug-in. Then use a jQuery selector to select the element to resize and provide an additional `.handleSelector` to select the sizing handle which initiates the resize operation.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="scripts/jquery-resizable.min.js"></script>
<script>
$("#box").resizable({ 
    handleSelector: ".splitter",
    resizeHeight: false
});   
</script>
```

### Options
The options parameter can be a map of any of these properties (default values are shown):

```javascript
var opt = {
    // optional selector for handle that starts dragging
    handleSelector: null,
    // resize the width
    resizeWidth: true,
    // resize the height
    resizeHeight: true,
    // hook into start drag operation (event,$el,opt passed - return false to abort drag)
    onDragStart: null,
    // hook into stop drag operation (event,$el,opt passed)
    onDragEnd: null,
    // hook into each drag operation (event,$el,opt passed)
    onDrag: null
};
```

**handleSelector**  
A jQuery selector or DOM element that acts as a selector. This can be a string, a DOM object or an existing jQuery selector.

If no selector is passed the element itself becomes resizable. Usually this results in undesirable behavior but you can  limit the drag start location using the `onDragStart` handler.

**resizeWidth, resizeHeight**  
These two boolean values determine whether the width or height are resizable. Both are true by default so disable which ever dimension you don't want to resize.

**onDragStart**  
Hook method fired just before you start dragging. You can return an explicit `false` value to abort the drag operation. Gets passed the event, the selected jQuery element and the options object.

```javascript
$(".box").resizable({
    onDragStart: function (e, $el, opt) {
        $el.css("cursor", "nwse-resize");
    },
    onDragStop: function (e, $el, opt) {
        $el.css("cursor", "");
    }
});
```

**onDrag**  
Hook method fired when ever the mouse cursor moves. Receives event, jquery selected element and the options object.

**onDragEnd**  
Hook event fired when the drag operation completes and the mouse is released. Receives event, jquery selected element and the options object.


### License 
Licensed under the MIT License. There's no charge to use, integrate or modify the code for this project. You are free to use it in personal, commercial, government and any other type of application.

All source code is copyright &copy; Rick Strahl, West Wind Technologies, regardless of changes made to them. Any source code modifications must leave the original copyright code headers intact.

### Warranty Disclaimer: No Warranty!

IN NO EVENT SHALL THE AUTHOR, OR ANY OTHER PARTY WHO MAY MODIFY AND/OR REDISTRIBUTE THIS PROGRAM AND DOCUMENTATION, BE LIABLE FOR ANY COMMERCIAL, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE PROGRAM INCLUDING, BUT NOT LIMITED TO, LOSS OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR LOSSES SUSTAINED BY THIRD PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS, EVEN IF YOU OR OTHER PARTIES HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

## Change Log



#### Version 0.11
* **initial release **