[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fimsky%2FcssFx.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fimsky%2FcssFx?ref=badge_shield)

cssFx
-----

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fimsky%2FcssFx.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fimsky%2FcssFx?ref=badge_shield)

cssFx adds vendor-specific prefixes to your stylesheets.

How it works
------------

When the document has finished loading, internal (`<style>`) and external (`<link>`) stylesheets are processed, fetching any `@import` stylesheets as well. It's recommended to bundle stylesheets into one file to minimize request overhead. Once processing is done, a new `<style>` tag is appended to the `<head>` with processed properties. Properties for all vendors (Mozilla, Webkit, Opera, Microsoft) are included by default.

Installing
----------

[Download cssFx](https://github.com/imsky/cssFx/zipball/master) or install it with Bower: `bower install cssfx`.

Usage
-----

Include cssFx in your `<head>` tag: `<script src="cssfx.js"></script>`

Make sure any external stylesheets you want processed have the `cssfx` class.

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
* cssFx only adds prefixes. It does not polyfill functionality unavailable in the browser.

License
-------

cssFx is provided under the MIT license.

Credits
-------

cssFx is a project by [Ivan Malopinsky](http://imsky.co).


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fimsky%2FcssFx.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fimsky%2FcssFx?ref=badge_large)