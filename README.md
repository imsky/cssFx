cssFx
------

cssFx is a standalone polyfill that inserts the vendor-specific CSS3 properties necessary for old and new browsers. This saves you tons of time, maintenance, and bandwidth!

Properties Supported
------
Border radius, box shadow, flex box, RGBA, gradients, multiple columns, border image, transforms, transitions, opacity, inline-block, ellipsis, and more.

Usage
------
 * See cssfx_demo.html for demo.
  
 * Include a script tag in your source:

``` html
<script src="cssfx.min.js"></script>
```

 * Give any external stylesheets you want processed the "cssfx" class:

 ``` html
 <link rel="stylesheet" href="cssfx.css" class="cssfx">
 ```

Browsers Supported
------

  * Firefox 3+
  * Chrome 1+
  * Internet Explorer 6+
  * Safari 3+
  * Opera 9+

Important Considerations
------

* IE and other browsers variously remove either unknown properties or properties with unknown values. To guarantee that all properties are parsed, link your stylesheet externally.
* To prevent FOUC (flash of unstyled content), place cssfx.js immediately under the stylesheet tags

License
------
cssFx is provided under the BSD license. Commercial and personal use is permitted.

Roadmap
------

  * <del>@keyframe support (0.9.3)</del>
  * convert sjax to ajax for external stylesheets (0.9.4)
  * @keyframe intermediate keyframe support (0.9.5)
  * media query support (0.9.6)
