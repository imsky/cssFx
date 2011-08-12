(function(){
//ded's domready
!function(a,b){function m(a){l=1;while(a=c.shift())a()}var c=[],d,e,f=!1,g=b.documentElement,h=g.doScroll,i="DOMContentLoaded",j="addEventListener",k="onreadystatechange",l=/^loade|c/.test(b.readyState);b[j]&&b[j](i,e=function(){b.removeEventListener(i,e,f),m()},f),h&&b.attachEvent(k,d=function(){/^c/.test(b.readyState)&&(b.detachEvent(k,d),m())}),a.domReady=h?function(a){self!=top?l?a():c.push(a):function(){try{g.doScroll("left")}catch(b){return setTimeout(function(){domReady(a)},50)}a()}()}:function(a){l?a():c.push(a)}}(this,document)

//Hunlock's SJAX, shortened
function getFile(a){if(AJAX=(window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP"))){AJAX.open("GET",a,false);AJAX.send(null);return AJAX.responseText}else{return false}};

function str_trim(str) {	//Steven Levithan's trim with added replacement of newlines
return str.replace(/\n/gm, '').replace(/^\s\s*/, '').replace(/\s\s*$/, '');}

function strip_css_comments(str){var regex = /\/\*([\s\S]*?)\*\//gim;return str.replace(regex, "");}

domReady(function () {
var supported_rules = ["border-radius", "box-shadow", "text-overflow", "opacity", "column-count", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "border-top-left-radius", "border-top-right-radius", "border-bottom-left-radius", "border-bottom-right-radius", "transform"];
var prefix = ["-moz-", "-webkit-", "-o-", "-ms-"];
var css_regex = /([\s\S]*?)\{([\s\S]*?)\}/gim;
var style_els = document.getElementsByTagName("style");
var link_els = document.getElementsByTagName("link");
var css_files = [];
//Processing external stylesheets
for (var x in link_els) {
	if (typeof (link_els[x]) === "object") {
		if (link_els[x].styleSheet) {
			//Internet Explorer sees this, Firefox doesn't
			css_files.push(link_els[x].styleSheet.cssText);
		} else {
			//We're doing it live
			css_files.push(getFile(link_els[x].href));
		}
	}
}
//Processing in-page stylesheets
for (var x in style_els) {
	if (typeof (style_els[x]) === "object") {
		css_files.push(style_els[x].innerHTML);
	}
}
for (var x in css_files) {
	var css_fx_output = document.createElement('style');
	css_fx_output.setAttribute('type', 'text/css');
	var css = css_files[x];
	var rules = [];
	for (var y = 0, match_count = css.match(css_regex).length; y < match_count; y++) {
		var has_supported_rules = false;
		var match = css_regex.exec(css);
		if (match !== null) {
			var selector = str_trim(strip_css_comments(match[1]));
			var rule = str_trim(strip_css_comments(match[2])).replace(/\s{2,}|\t/gm, " ");
			for (var z in supported_rules) {
				if (rule.indexOf(supported_rules[z]) != -1) {
					has_supported_rules = true;
					break;
				}
			}
		}
		if (has_supported_rules) {
			rules.push(cssFxProcessElement(selector, rule));
		}
	}
	var css_fx_rules = rules.join("\n");
	if (css_fx_output.styleSheet) {
		css_fx_output.styleSheet.cssText = css_fx_rules;
	} else {
		css_fx_output.innerHTML = css_fx_rules;
	}
	document.getElementsByTagName("head")[0].appendChild(css_fx_output);
}

function cssFxProcessElement(e, rule) {
	var css_array = rule.split(";"),
		rules = [];
	for (var r in css_array) {
		var rule = css_array[r].split(":");
		rule[0] = str_trim(rule[0]);
		var rule_output = [];
		var def_rule = rule.join(":");
		switch (rule[0]) {
		case "border-radius":
		case "box-shadow":
		case "column-count":
		case "column-gap":
		case "column-rule":
		case "column-rule-style":
		case "column-rule-color":
		case "column-rule-width":
			rule_output.push(prefix[0] + def_rule);
			rule_output.push(prefix[1] + def_rule);
			break;
		case "text-overflow":
			if (value === "ellipsis") {
				rule_output.push(prefix[2] + def_rule);
			}
			break;
		case "user-select":
			rule_output.push(prefix[0] + def_rule);
			rule_output.push(prefix[1] + def_rule);
			rule_output.push(prefix[2] + def_rule);
			break;
		case "opacity":
			rule_output.push("filter: alpha(opacity=" + parseInt(parseFloat(rule[1]) * 100) + ")");
			rule_output.push(prefix[0] + def_rule);
			break;
		case "border-top-left-radius":
		case "border-top-right-radius":
		case "border-bottom-left-radius":
		case "border-bottom-right-radius":
			var v = rule[0].split("-");
			rule_output.push(prefix[0] + "border-radius-" + v[1] + v[2] + ":" + rule[1]);
			rule_output.push(prefix[1] + def_rule);
			break;
		case "transform":
			rule_output.push(prefix[0] + def_rule);
			rule_output.push(prefix[1] + def_rule);
			rule_output.push(prefix[2] + def_rule);
			rule_output.push(prefix[3] + def_rule);
			break;
		}
		if (1 in rule_output) {
			rules.push(rule_output.join(";"));
		}
	}
	return e + "{" + rules.join(";") + "}";
}
})})();
