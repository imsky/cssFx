cssFx
------

cssFx is a light (3.1K) easy-to-use JavaScript utility that automatically adds vendor versions of CSS3 rules like border-radius and box-shadow.

Usage
------
 * Include a script tag in your source:

``` html
<script type="text/javascript" src="cssfx.js"></script>
```

 * Give any external stylesheets you want processed the "cssfx" class:

 ``` html
 <link rel="stylesheet" href="cssfx.css" class="cssfx">
 ```

Browsers Supported
------

  * Firefox 2-3.*
  * Internet Explorer 6+
  * Chrome 1+
  * Safari 3+
  * Opera 9.*

Properties Supported
------
border-radius, box-shadow, text-overflow, opacity, border-top-left-radius, border-top-right-radius, border-bottom-left-radius, border-bottom-right-radius, transform, column-count, column-gap, column-rule, column-rule-color, column-rule-style, column-rule-width, box-flex, box-orient,box-ordinal-group, box-flex-group, box-align, box-direction, box-pack,box-lines, background-size, transition, background-clip, linear-gradient, display:inline-block

Todo
------

  * media query support
  * specific box-shadow properties
  * border-image
  * don't push empty style tags to DOM
