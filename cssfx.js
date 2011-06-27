(function(){
//ded's domready
!function(a,b){function m(a){l=1;while(a=c.shift())a()}var c=[],d,e,f=!1,g=b.documentElement,h=g.doScroll,i="DOMContentLoaded",j="addEventListener",k="onreadystatechange",l=/^loade|c/.test(b.readyState);b[j]&&b[j](i,e=function(){b.removeEventListener(i,e,f),m()},f),h&&b.attachEvent(k,d=function(){/^c/.test(b.readyState)&&(b.detachEvent(k,d),m())}),a.domReady=h?function(a){self!=top?l?a():c.push(a):function(){try{g.doScroll("left")}catch(b){return setTimeout(function(){domReady(a)},50)}a()}()}:function(a){l?a():c.push(a)}}(this,document)

domReady(function () {
function str_trim(str) {
	//Steven Levithan's trim with added replacement of newlines
	return str.replace(/\n/gm, '').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function strip_css_comments(str) {
	var regex = /\/\*([\s\S]*?)\*\//gim;
	return str.replace(regex, "");
}

var supported_rules = ["border-radius", "box-shadow", "text-overflow", "user-select", "opacity", "column-count", "column-gap"];
var prefix = ["-moz-", "-webkit-", "-o-", "-khtml-"];
var regex = /([\s\S]*?)\{([\s\S]*?)\}/gim;
var styleElements = document.getElementsByTagName("style");

for (var x = 0, xlen = styleElements.length; x < xlen; x++) {
	var cssFxOutput = document.createElement('style');
	cssFxOutput.setAttribute('type', 'text/css');
	var css = styleElements[x].innerHTML;
	var rules = [];
	var rules = [];
	for (var y = 0, match_count = css.match(regex).length; y < match_count; y++) {
		var has_supported_rules = false;
		var match = regex.exec(css);
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
	var newCSS = rules.join("\n");
	if (cssFxOutput.styleSheet) {
		cssFxOutput.styleSheet.cssText = newCSS;
	} else {
		cssFxOutput.innerHTML = rules.join("\n");
	}
	document.getElementsByTagName("head")[0].appendChild(cssFxOutput);
}

function cssFxProcessElement(e, rule) {
	var css_array = rule.split(";"),
		rules = [];
	for (var r in css_array) {
		var property_array = css_array[r].split(":");
		var rule_output = [];
		var push_rule = true;
		var prop = str_trim(property_array[0]);
		var value = property_array[1];
		switch (prop) {
		case "border-radius":
			rule_output.push(prefix[0] + prop + ":" + value);
			rule_output.push(prefix[1] + prop + ":" + value);
			break;
		case "box-shadow":
			rule_output.push(prefix[0] + prop + ":" + value);
			rule_output.push(prefix[1] + prop + ":" + value);
			break;
		case "text-overflow":
			if (value === "ellipsis") {
				rule_output.push(prefix[2] + prop + ":" + value);
			}
			break;
		case "user-select":
			rule_output.push(prefix[0] + prop + ":" + value);
			rule_output.push(prefix[1] + prop + ":" + value);
			rule_output.push(prefix[2] + prop + ":" + value);
			rule_output.push(prefix[3] + prop + ":" + value);
			break;
		case "opacity":
			var ieValue = parseInt(parseFloat(value) * 100);
			rule_output.push("filter: alpha(opacity=" + ieValue + ")");
			rule_output.push(prefix[0] + prop + ":" + value);
			break;
		case "column-count":
			rule_output.push(prefix[0] + prop + ":" + value);
			rule_output.push(prefix[1] + prop + ":" + value);
			break;
		case "column-gap":
			rule_output.push(prefix[0] + prop + ":" + value);
			rule_output.push(prefix[1] + prop + ":" + value);
			break;
		default:
			push_rule = false;
			break;
		}
		if (push_rule) {
			rules.push(rule_output.join(";"));
		}
	}
	return e + "{" + rules.join(";") + "}";
}

})})();
