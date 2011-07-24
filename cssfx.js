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

var supported_rules = ["border-radius","box-shadow",	"text-overflow",	"opacity","column-count","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","border-top-left-radius","border-top-right-radius","border-bottom-left-radius","border-bottom-right-radius"];

var prefix = ["-moz-", "-webkit-", "-o-", "-khtml-"];
var regex = /([\s\S]*?)\{([\s\S]*?)\}/gim;
var styleElements = document.getElementsByTagName("style");
var linkElements = document.getElementsByTagName("link");
var cssFiles = [];

for(var x in linkElements){
if(typeof(linkElements[x]) === "object"){
	if(linkElements[x].styleSheet){
		//Internet Explorer sees this, Firefox doesn't
		cssFiles.push(linkElements[x].styleSheet.cssText);
	}
}
}

for(var x in styleElements){
	if(typeof(styleElements[x]) === "object"){
	cssFiles.push(styleElements[x].innerHTML);
	}
}


for(var x in cssFiles){
	var cssFxOutput = document.createElement('style');
	cssFxOutput.setAttribute('type', 'text/css');
	var css = cssFiles[x];
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
	var cssFxRules = rules.join("\n");
	if (cssFxOutput.styleSheet) {
		cssFxOutput.styleSheet.cssText = cssFxRules;
	} else {
		cssFxOutput.innerHTML = cssFxRules;
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
		case "box-shadow":
		case "column-count":
		case "column-gap":
		case "column-rule":
		case "column-rule-style":
		case "column-rule-color":
		case "column-rule-width":
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
		case "border-top-left-radius":
		case "border-top-right-radius":
		case "border-bottom-left-radius":
		case "border-bottom-right-radius":
			var valArray = prop.split("-");
			rule_output.push(prefix[0]+"border-radius-"+valArray[1]+valArray[2]+":"+value);
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
