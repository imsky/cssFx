cssFx
-----

cssFx automatically adds vendor-specific prefixes to CSS properties that need them.

Installing
----------

You can install cssFx with Bower: `bower install cssfx`.

Usage
-----

Include a script tag in your source:
 
``` html
<script src="cssfx.js"></script>
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
cssFx is provided under the MIT license.
