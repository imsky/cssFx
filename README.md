cssFx
------

cssFx is a light (2.5K) easy-to-use JavaScript polyfill that adds forward-compatibility for CSS3 property syntax to browser versions that use vendor-specific syntax. What that means is you can stop adding -moz-border-radius and -webkit-box-shadow to your CSS and just write border-radius and box-shadow, keeping your stylesheets clean and your download size low.

![Comparison](http://imsky.github.com/cssFx/comparison.png)

Usage
------
``` html
<script type="text/javascript" src="cssfx.js"></script>
```

Browser Support
------

  * Firefox 2-3.*
  * Opera 9.*
  * Safari 3.0+
  * Chrome 1-4
  * Internet Explorer 6+

Todo
------

  * <del>opacity</del>
  * column-count, column-gap
  * specific border-radius properties
  * specific box-shadow properties
  * transform
  * border-image
  * <del>user-select</del>
  * flexbox
  * &lt;link&gt; support
  * <del>fix ie7,8 js errors</del>
