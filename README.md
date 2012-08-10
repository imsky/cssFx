cssFx
-----

cssFx automatically adds vendor-specific prefixes (-moz, -webkit, -ms, and -o) to CSS3 properties that need them. It's tiny (5K) and has no external dependencies. 

Properties Supported
--------------------
Border radius, box shadow, flex box, RGBA, linear gradients, multiple columns, border image, transforms, transitions, opacity, inline-block, ellipsis, and more.

Usage
-----
 * Include a script tag in your source:
 
 ``` html
 <script src="cssfx.min.js"></script>
 ```
 
 * Give any external stylesheets you want processed the "cssfx" class:

 ``` html
 <link rel="stylesheet" href="cssfx.css" class="cssfx">
 ```

Browsers Supported
------------------

  * Firefox 3+
  * Chrome 1+
  * Internet Explorer 6+
  * Safari 3+
  * Opera 9+

Important Considerations
------------------------

* IE and other browsers remove either unknown properties or properties with unknown values. To guarantee that all properties are parsed, link your stylesheet externally.
* To prevent FOUC (flash of unstyled content), place cssfx.js immediately under the stylesheet tags.
* cssFx adds the prefixes necessary to enable CSS3 functionality in supporting browsers, it doesn't simulate it (e.g. border-radius in IE6).

License
-------
cssFx is provided under the BSD license. Commercial and personal use is permitted.

Roadmap
-------

  * AMD compatibility (0.9.8)
  * Debug view (0.9.9)
  * Media queries, API documentation (1.0)