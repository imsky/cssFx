module.exports = {
rgb2hex: function rgb2hex(a, b, c) {
		//140bytes
		return ((256 + a << 8 | b) << 8 | c).toString(16).slice(1)
	},
inArray: function inArray(a, b) {
		for (var d = 0, c = b.length; d < c; d++) if (b[d] == a) return !0;
		return !1
	},
forEach: function forEach(b, c) {
		for (var d = b.length, a = 0; a < d; a++) c.call(this, b[a])
	},
str_combo: function str_combo(text, mode) {
		//If mode is defined, the function works as strip_css_comments + str_trim, otherwise as str_trim
		return text.replace(mode != null ? /\/\*([\s\S]*?)\*\//gim : "", "").replace(/\n/gm, "").replace(/^\s*|\s*$/g,"").replace(/\s{2,}|\t/gm, " ");
	},
contentLoaded: 	function contentLoaded(e){var t=window,n="addEventListener",r="complete",i="readystatechange",s=!1,o=s,u=!0,a=t.document,f=a.documentElement,l=a[n]?n:"attachEvent",c=a[n]?"removeEventListener":"detachEvent",h=a[n]?"":"on",p=function(n){if(n.type==i&&a.readyState!=r)return;(n.type=="load"?t:a)[c](h+n.type,p,s),!o&&(o=!0)&&e.call(t,n.type||n)},d=function(){try{f.doScroll("left")}catch(e){setTimeout(d,50);return}p("poll")};if(a.readyState==r)e.call(t,"lazy");else{if(a.createEventObject&&f.doScroll){try{u=!t.frameElement}catch(v){}u&&d()}a[l](h+"DOMContentLoaded",p,s),a[l](h+i,p,s),t[l](h+"load",p,s)}},
ajax: function ajax(url, callback) {
		//adapted from microAjax.js
		//140medley.js xhr object
		var xhr = function (a) {
				for (a = 0; a < 4; a++) try {
					return a ? new ActiveXObject([, "Msxml2", "Msxml3", "Microsoft"][a] + ".XMLHTTP") : new XMLHttpRequest
				} catch (b) {}
			}
		if (r = xhr()) {
			r.onreadystatechange = function () {
				r.readyState == 4 && callback(r.responseText);
			};
			r.open("GET", url, true);
			r.send(null);
		}
	}
};