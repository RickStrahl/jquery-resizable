# jquery-resizable 
#### A small jQuery plug-in to make HTML DOM elements resizable 

This small, self-contained jQuery plug-in allows you to make DOM elements resizable using a sizing handle. It works with Mouse and Touch events so you can resize elements on mobile devices. 

Resizables are useful if you want to add resizing features to your HTML layouts for things like like resizable dialogs, splitter panes or elements that can be resized by a user in a layout.


### Samples on CodePen
* [Simple Resizable Box](http://codepen.io/rstrahl/pen/bEVBdE)
* [Resizable Split Panels](http://codepen.io/rstrahl/pen/eJZQej)
* [Table Column Resizing](http://codepen.io/rstrahl/pen/xZErXz)

There's a more info on the how's and why's in this blog post:

* [A small jquery-resizable Plug-in](http://weblog.west-wind.com/posts/2015/Dec/21/A-small-jQuery-Resizable-Plugin)

### Installation
You can install jquery-resizable from NPM. Please note that the name is `jquery-resizable-dom` due to another component name conflict.

```
npm install jquery-resizable-dom
```

### Usage

**Global Scope:**
```javascript
$(selector).resizable(options);
```

> #### Naming Conflict Version: `.resizableSafe()`
> If you're using jQuery-resizable with another component that uses the same name - like jquery ui - you can use `.resizableSafe()` instead of `.resizable()` with the same syntax. This allows side by side operation with conflicting libraries.
> ```javascript
> $(selector).resizableSafe(options);
> ```
> If you need this feature, just replace any references to `.resizable()` to `.resizableSafe()`.


> #### Module Loading
> jquery-resizable supports **commonJs** and **AMD** module loading for the jQuery dependency. Since this is a plug-in there are no exports but resizable is just an extension method on the `jQuery.fn` extension object.

To use this plug-in add a script reference to jQuery and the resizable plug-in. Then use a jQuery selector to select the element to resize and provide an additional `.handleSelector` to select the sizing handle which initiates the resize operation.

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" type="text/javascript"></script>
<script src="../src/jquery-resizable.js"></script>
<script src="../src/jquery-resizableTableColumns.js"></script>
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
    // the side that the width resizing is relative to
    resizeWidthFrom: 'right',
    // the side that the height resizing is relative to
    resizeHeightFrom: 'bottom',            
    // hook into start drag operation (event,$el,opt passed - return false to abort drag)    
    onDragStart: null,
    // hook into stop drag operation (event,$el,opt passed)
    onDragEnd: null,
    // hook into each drag operation (event,$el,opt passed)
    onDrag: null
    // disable touch-action on the $handle
    // prevents browser level actions like forward back gestures
    touchActionNone: true
};
```

**handleSelector**  
A jQuery selector or DOM element that acts as a selector. This can be a string, a DOM object or an existing jQuery selector.

If no selector is passed the element itself becomes resizable. Usually this results in undesirable behavior but you can  limit the drag start location using the `onDragStart` handler.

If the selector is prepended by a `>` the element is searched inside the resized component.

```html
<!-- first instance -->
<div class="box">
  <div class="handle">
  </div>
</div>

<!-- second instance -->
<div class="box">
  <div class="handle">
  </div>
</div>

<script>
$(".box").resizable({
  handleSelector: "> .handle"
});
</script>
```

**resizeWidth, resizeHeight**  
These two boolean values determine whether the width or height are resizable. Both are true by default so disable which ever dimension you don't want to resize.

**resizeWidthFrom,resizeHeightFrom**
Determines which direction the reszing is done from. By default the directions are "right" and "bottom" but they could be "left" and "top". Useful for RTL locales where drag operations are naturally opposite to LTR.

**onDragStart**  
Hook method fired just before you start dragging. You can return an explicit `false` value to abort the drag operation. Gets passed the event, the selected jQuery element and the options object.

```javascript
$(".box").resizable({
    onDragStart: function (e, $el, opt) {
        $el.css("cursor", "nwse-resize");
    },
    onDragEnd: function (e, $el, opt) {
        $el.css("cursor", "");
    }
});
```

**onDrag**  
Hook method fired whenever the mouse cursor moves. 

Receives jQuery event, jquery selected element, newWidth, newHeight and the options object.  Optionally return an explicit value of `false` to indicate you don't want to set the newWidth, newHeight values after `ondrag` completes.

```javascript
 onDrag: function (e, $el, newWidth, newHeight, opt) {
     // limit box size
     if (newWidth > 300)
        newWidth = 300;
     if (newHeight > 200)
        newHeight = 200;        
 
     $el.width(newWidth);
     $el.height(newHeight);

     // explicitly return **false** if you don't want 
     // auto-height computation to occur
     return false;
});
```

**onDragEnd**  
Hook event fired when the drag operation completes and the mouse is released. Receives event, jquery selected element and the options object.

**touchActionNone**  
Sets touch-action: none on the handle element to prevent browser interference to initiating touch drag operations especially on Internet Explorer, Edge and Windows 10 browsers.


### Commands

**destroy**

Should the need arise, you can remove a `resizable` instance with:

```javascript
  $el.resizable('destroy');
```


## jquery-resizableTableColumns Plugin

### Usage
```javascript
$(selector).resizableTableColumns(options);
```

The options are the same as for the **.resizable** plug-in. The only parameter you likely will override though is **.resizeHeight** which is defaulted to false.

To use this plug-in add a script reference to jQuery and the resizable and resizableTableColumns plug-in. Then use a jQuery selector to select columns and headers you want to resize. You also need to provide the CSS for the **.resizer** class shown below.

```html
<style>
    /*
        this is important!
        make sure you define this here
        or in jQuery codef
    */
    .resizer {
        position: absolute;
        top: 0;
        right: -8px;
        bottom: 0;
        left: auto;
        width: 16px;    
        cursor: col-resize;       
    }
</style>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" type="text/javascript"></script>
<script src="../src/jquery-resizable.js"></script>
<script src="../src/jquery-resizableTableColumns.js"></script>
<script>
    $("td,th").resizableTableColumns();
    //$("td:first-child,td:nth-child(2),td:nth-child(3)").resizableTableColumns();
</script>
```
For more info on this plug-in please see the [jQuery-resizable and Table Column Resizing Blog post](http://weblog.west-wind.com/posts/2016/Jan/04/jQueryresizable-and-Table-Column-Resizing) that describes this plug-in in more detail.


### License 
Licensed under the MIT License. There's no charge to use, integrate or modify the code for this project. You are free to use it in personal, commercial, government and any other type of application.

All source code is copyright &copy; Rick Strahl, West Wind Technologies, regardless of changes made to them. Any source code modifications must leave the original copyright code headers intact.

### Warranty Disclaimer: No Warranty!

IN NO EVENT SHALL THE AUTHOR, OR ANY OTHER PARTY WHO MAY MODIFY AND/OR REDISTRIBUTE THIS PROGRAM AND DOCUMENTATION, BE LIABLE FOR ANY COMMERCIAL, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE PROGRAM INCLUDING, BUT NOT LIMITED TO, LOSS OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR LOSSES SUSTAINED BY THIRD PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS, EVEN IF YOU OR OTHER PARTIES HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

## Change Log

#### Version 0.35

* **Add `.resizableSafe() to allow side by side w/ jquery.ui**  
Added `.resizableSafe` overload to allow loading resizable in scenarios where another jquery component call `.resizable()` is in use. Most commonly this might be jquery UI. This is useful for other components that might depend on this particular component as a dependency and if they do they should use `.resizableSafe()`. Syntax is otherwise identical.

#### Version 0.32

* **Fix iFrame Drag Jitter**  
Added logic to remove iFrame pointer events on drag start and restore on drag end which removes issue with extreme drag on any resized panel that contains an iframe.

#### Version 0.28

* **Small Bug Fixes**  
Remove console.log commands. Clean up code and add additional source comments.

* **Typescript definition added**  
Added typescript definition.

#### Version 0.25
* **Destroy Option to release resizables**   
Added support removing resizables using `$(el).resizable('destroy')`.

* **Fix Touch Sizing Code**  
Fix up end drag detection both for mouse and touch dragging operations for more reliable end-drag detection. Fixes issue where the drag cursor previously would loose connection to the drag handle and continue to drag after releasing.

* **Support for jQuery 3.x**  
Fixed a few issues related to running under jQuery 3.x. Switched to `.on()` and `.off()` handlers for all event handlers.

#### Version 0.20

* **Module Loader Support for jQuery**  
jquery-sizable can now use commonJs and AMD to load the jQuery dependency. Thanks Thiago Delgado Pinto for adding.

#### Version 0.18
* **onDrag Behavior Updated to support opting out of move operation**  
Added additional logic to onDrag processing so that when `false` is returned the auto-resizing of the container is not applied. This allows you to take over the width calculation yourself for things like limiting resize size. <small>(changes by ohcibi)</small>

#### Version 0.17
* **Allow automated child selectors using `>` syntax in handle selector**  
You can now specify `>` to select child elements inside of the container. Added to simplify referencing contained elements generically without having to explicitly specify the resized container. 

#### Version 0.15
* **Add *resizeWidthFrom* and *resizeHeightFrom* Options**  
These options are useful in RTL environments where drag resizing operations are performed from the left edge of components. You can specify the source edge for resizing operations.

#### Version 0.14
* **Add jquery-resizableTableColumns Plugin**  
Added a small wrapper plugin that allows resizing of table columns and headers.

#### Version 0.13
* **Fix Touch Support in IE and Edge**  
Added touch-action:none logic to the drag handle to avoid drag initiation issues in IE and Edge which won't fire touchStart events when the document has touch gestures enabled.

#### Version 0.11
* **initial release **
