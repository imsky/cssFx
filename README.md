cssFx
------

cssFx is a light (2.8K) easy-to-use JavaScript polyfill that adds forward-compatibility for CSS3 property syntax to browser versions that use vendor-specific syntax. What that means is you can stop adding -moz-border-radius and -webkit-box-shadow to your CSS and just write border-radius and box-shadow, keeping your stylesheets clean and your download size low.

![Comparison](http://imsky.github.com/cssFx/showcase.png)

Usage
------
``` html
<script type="text/javascript" src="cssfx.js"></script>
```

Browser Support
------

  * Firefox 2-3.*
  * Internet Explorer 6+
  * Chrome 1+
  * Safari 3+
  * Opera 9.*

Todo
------

  * specific box-shadow properties
  * transform
  * border-image
  * flexbox
  * don't push empty style tags to DOM
  * <del>opacity</del>
  * <del>column-count, column-gap</del>
  * <del>specific border-radius properties</del>
  * <del>user-select</del>
  * <del>&lt;link&gt; support</del>
  * <del>fix ie7,8 js errors</del>
