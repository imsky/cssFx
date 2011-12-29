/*
 * cssFx.js - Vendor prefix polyfill for CSS3 properties - v0.9
 * http://github.com/imsky/cssFx
 * (C) 2011 Ivan Malopinsky - http://imsky.co
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var cssFx = cssFx || {};
(function (fx) {
//ded's domready
!function(a,b){function m(a){l=1;while(a=c.shift())a()}var c=[],d,e,f=!1,g=b.documentElement,h=g.doScroll,i="DOMContentLoaded",j="addEventListener",k="onreadystatechange",l=/^loade|c/.test(b.readyState);b[j]&&b[j](i,e=function(){b.removeEventListener(i,e,f),m()},f),h&&b.attachEvent(k,d=function(){/^c/.test(b.readyState)&&(b.detachEvent(k,d),m())}),a.domReady=h?function(a){self!=top?l?a():c.push(a):function(){try{g.doScroll("left")}catch(b){return setTimeout(function(){domReady(a)},50)}a()}()}:function(a){l?a():c.push(a)}}(this,document)

function sjax(a){if(AJAX=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")){AJAX.open("GET",a,false);AJAX.send(null);return AJAX.responseText}else return false}

function str_trim(a){return a.replace(/\n/gm,"").replace(/^\s\s*/,"").replace(/\s\s*$/,"").replace(/\s{2,}|\t/gm, " ")}

function strip_css_comments(a){return a.replace(/\/\*([\s\S]*?)\*\//gim,"")}

function rgb2hex(a,b,c){return((256+a<<8|b)<<8|c).toString(16).slice(1)}

if(!Array.indexOf)Array.prototype.indexOf=function(c,b){for(var a=b||0;a<this.length;a++)if(this[a]==c)return a;return-1};

function eachA(b,c){for(var d=b.length,a=0;a<d;a++)c.call(this,b[a])};

//cssFx-specific data

var prefix = ["-moz-", "-webkit-", "-o-", "-ms-"];

var prefixes01 = ["background-origin", "background-size", "border-image", "border-image-outset", "border-image-repeat", "border-image-source", "border-image-width", "border-radius", "box-shadow", "column-count", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-width"];
var prefixes013 = ["box-flex","box-orient","box-align","box-ordinal-group","box-flex-group","box-pack","box-direction","box-lines","box-sizing","animation-duration","animation-name","animation-delay","animation-direction","animation-iteration-count","animation-play-state","animation-timing-function","animation-fill-mode"];
var prefixes0123 = ["transform","transform-origin","transition","transition-property","transition-duration","transition-timing-function","transition-delay","user-select"];

var prefixesMisc = ["background-clip","border-bottom-left-radius", "border-bottom-right-radius", "border-top-left-radius", "border-top-right-radius"];

var prefixed_rules = prefixesMisc.concat(prefixes0123).concat(prefixes01).concat(prefixes013);

var supported_rules = ["display", "opacity", "text-overflow", "background-image", "background"].concat(prefixed_rules);

fx.processCSS = function (css_files) {
	var css_fx_output = [];
	var css_regex = /([\s\S]*?)\{([\s\S]*?)\}/gim;
	var import_regex = /\@import\s+(?:url\([\'\"]|[\'\"])([\w\s\-\_\.\:\/\;\:]+)/gim;
	var keyframes_regex = /@keyframes([\s\S]*?){\s*from\s*{([\s\S]*?)}\s*to\s*{([\s\S]*?)}\s*}/gim;
	for (var x in css_files) {
		var css = css_files[x];
		if (typeof css === "string") {
			css = str_trim(strip_css_comments(css));
			var rules = [];

			var imports = import_regex.test(css) && css.match(import_regex);
			var keyframes = keyframes_regex.test(css) && css.match(keyframes_regex);

			import_regex.lastIndex = 0;

			keyframes_regex.lastIndex = 0;

			//Pre-processing

			if (imports.length > 0) {
				for (var y = 0; y < imports.length; y++) {
					css_files.push(fx.fetchCSS([import_regex.exec(css.match(import_regex)[y])[1]], true));
				}
			}

			if(keyframes.length > 0){
				for(var y = 0; y < keyframes.length; y++){
					css = css.replace(keyframes[y],"");
					var nextMatch = keyframes_regex.exec(keyframes[y]);
					eachA([0,1,3],function(_r){
						var new_decs_from = [], new_decs_to = [];
						eachA(nextMatch[2].split(";"), function(_j){
							var j = str_trim(_j), d = fx.processDec(j);
							j.length > 0 && new_decs_from.push(d?d:j)
							});
						eachA(nextMatch[3].split(";"), function(_j){
							var j = str_trim(_j), d = fx.processDec(j);
							j.length > 0 && new_decs_to.push(d?d:j)
							});
						rules.push("@"+prefix[_r]+"keyframes "+str_trim(nextMatch[1])+" { from {"+new_decs_from.join(";")+"} to {"+new_decs_to.join(";")+"} }");
					});
					keyframes_regex.lastIndex = 0;
				}
			}

			var matches = css_regex.test(css) && css.match(css_regex);
			css_regex.lastIndex = 0;

			for (var x = 0, l = matches.length; x < l; x++){
				var nextMatch = css_regex.exec(matches[x]);
				if (nextMatch !== null) {
					var selector = str_trim(strip_css_comments(nextMatch[1]));
					var rule = str_trim(strip_css_comments(nextMatch[2]));
					for (var z in supported_rules) {
						if (rule.indexOf(supported_rules[z]) !== -1) {

							if (new_dec = fx.processDec(rule)) {
								rules.push(selector + "{"+new_dec+"}");
							}
							break;
						}
					}
				}
				css_regex.lastIndex = 0;
			}
			if (rules.length > 0) {
				css_fx_output.push(rules.join("\n"));
			}
		}
	}
	return css_fx_output;
}
fx.insertCSS = function (output) {
	for (var x in output) {
		if (typeof output[x] === "string") {
			var css_fx_output = document.createElement('style');
			css_fx_output.setAttribute('type', 'text/css');
			if (css_fx_output.styleSheet) {
				//Internet Explorer
				css_fx_output.styleSheet.cssText = output[x];
			} else {
				//Everyone else
				css_fx_output.textContent = output[x];
			}
			document.getElementsByTagName("head")[0].appendChild(css_fx_output);
		}
	}
}

fx.processDec = function (rule) {
	var css_array = rule.split(";"),
		rules = [];
	for (var r in css_array) {
		if (typeof css_array[r] === "string" && css_array[r].indexOf(":") !== -1) {
			var rule = css_array[r].split(":");
			if (rule.length != 2) {
				return false;
			}
			rule[0] = str_trim(rule[0]);
			rule[1] = str_trim(rule[1]);
			var new_rules = [];
			var clean_rule = rule.join(":");

			if (prefixes01.indexOf(rule[0]) !== -1) {
				new_rules.push(prefix[0] + clean_rule);
				new_rules.push(prefix[1] + clean_rule);
			} else if (prefixes013.indexOf(rule[0]) !== -1) {
				//-moz, -webkit, -ms
				new_rules.push(prefix[0] + clean_rule);
				new_rules.push(prefix[1] + clean_rule);
				if (rule[0] === "box-align") {
					new_rules.push(prefix[3] + rule[0] + ":middle");
				} else {
					new_rules.push(prefix[3] + clean_rule);
				}
			} else if (prefixes0123.indexOf(rule[0]) !== -1) {
				//-moz, -webkit, -o, -ms
				//This includes all transition rules
				eachA([0, 1, 2, 3], function (_r) {
					if (rule[0] == "transition") {
						var trans_prop = rule[1].split(" ")[0];
						if (prefixed_rules.indexOf(trans_prop) !== -1) {
							new_rules.push(prefix[_r] + clean_rule.replace(trans_prop, prefix[_r] + trans_prop));
						}
						else{
							new_rules.push(prefix[_r] + clean_rule);
						}

					} else if (rule[0] == "transition-property") {
						if (_r == 0) {
							//Only Firefox supports this at the moment
							var trans_props = rule[1].split(",");
							var replaced_props = [];
							eachA(trans_props, function (p) {
								var prop = str_trim(p);
								if (prefixed_rules.indexOf(prop) !== -1) {
									replaced_props.push(prefix[_r] + prop);
								}
							});
							new_rules.push(prefix[_r] + rule[0] + ":" + replaced_props.join(","))
						}
					} else {
						new_rules.push(prefix[_r] + clean_rule)
					}
				});
			} else {
				switch (rule[0]) {
				case "border-top-left-radius":
				case "border-top-right-radius":
				case "border-bottom-left-radius":
				case "border-bottom-right-radius":
					var v = rule[0].split("-");
					new_rules.push(prefix[0] + "border-radius-" + v[1] + v[2] + ":" + rule[1]);
					new_rules.push(prefix[1] + clean_rule);
					break;
				case "display":
					if (rule[1] === "box") {
						eachA([0, 1, 3], function (_r) {
							new_rules.push("display:" + prefix[_r] + rule[1])
						});
					} else if (rule[1] === "inline-block") {
						new_rules.push("display:" + prefix[0] + "inline-stack");
						new_rules.push("zoom:1;*display:inline");
					}
					break;
				case "text-overflow":
					if (rule[1] === "ellipsis") {
						new_rules.push(prefix[2] + clean_rule);
					}
					break;
				case "opacity":
					var opacity = parseInt(parseFloat(rule[1]) * 100);
					new_rules.push(prefix[3] + "filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=" + opacity + ")");
					new_rules.push("filter: alpha(opacity=" + opacity + ")");
					new_rules.push(prefix[0] + clean_rule);
					new_rules.push(prefix[1] + clean_rule);
					break;
				case "background-clip":
					if (rule[1] === "padding-box") {
						new_rules.push(prefix[1] + clean_rule);
						new_rules.push(prefix[0] + rule[0] + ":padding");
					}
					break;
				case "background-image":
				case "background-color":
				case "background":
					var lg = "linear-gradient";

					if (rule[1].indexOf(lg) !== -1) {
						var attributes = rule[1].substr(lg.length);
						if (rule[0] === "background-image") {
							attributes = rule[1].substr(lg.length).match(/\((.*)\)/)[0];
						}
						var prop = lg + attributes;
						eachA([0, 1, 2, 3], function (_r) {
							new_rules.push(rule[0] + ":" + prefix[_r] + prop);
						});
					} else if (rule[1].indexOf("rgba") !== -1) {
						//Color array
						var cA = rule[1].match(/rgba\((.*?)\)/)[1].split(",");
						var hex = Math.floor(+(str_trim(cA[3])) * 255).toString(16) + rgb2hex(+str_trim(cA[0]), +str_trim(cA[1]), +str_trim(cA[2]));
						new_rules.push("filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#" + hex + ",endColorstr=#" + hex + ");zoom:1");
					}
					break;
				}
			}
			if (new_rules.length > 0) {
				rules.push(new_rules.join(";"));
			}
		}
	}
	return (rules.length > 0 ? rules.join(";") : false);
}
fx.fetchCSS = function (files, single) {
	var css_files = [];
	for (var x in files) {
		typeof (files[x]) === "string" && css_files.push(sjax(files[x]));
	}
	return single == null ? css_files : css_files[0];	//undefined coerces to null
}
domReady(function () {
	var style_els = document.getElementsByTagName("style");
	var link_els = document.getElementsByTagName("link");
	var link_hrefs = [];
	//Processing external stylesheets
	for (var x in link_els) {
		if (typeof (link_els[x]) === "object" && link_els[x].className === "cssfx") {
			link_hrefs.push(link_els[x].href);
		}
	}
	var css_files = fx.fetchCSS(link_hrefs);
	//Processing in-page stylesheets
	for (var x in style_els) {
		if (typeof (style_els[x]) === "object") {
			css_files.push(style_els[x].innerHTML);
		}
	}
	fx.insertCSS(fx.processCSS(css_files));
})
})(cssFx);
