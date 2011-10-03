cssFx
------

cssFx is a standalone polyfill that inserts the vendor-specific CSS3 properties necessary for old and new browsers. This saves you tons of time, maintenance, and bandwidth!

Usage
------
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

Properties Supported
------
Border radius, box shadow, flex box, gradients, multiple columns, transforms, transitions, opacity, inline-block, ellipsis, and more.

Todo
------

  * parsing transition values for prefixes
  * <del>line-break</del>
  * hyphens, hyphenate-character
  * background-composite, <del>background-origin</del>, background-position
  * rgba
  * @import support
  * media query support
  * specific box-shadow properties
  * <del>border-image</del>
  * <del>don't push empty style tags to DOM</del>
  * <del>specific transform properties</del>
  * <del>specific transition properties</del>
