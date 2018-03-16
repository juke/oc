handleWindowResize = undefined;
/*
//   ___   ___       ___  ___ ___ ___ ___ _____ 
//  / _ \ / __|     / __|/ __| _ \_ _| _ \_   _|
// | (_) | (__   _  \__ \ (__|   /| ||  _/ | |  
//  \___/ \___| (_) |___/\___|_|_\___|_|   |_|  
//  --------------------------------------------
//   .JS v1.00                      Made by Fwup
//  --------------------------------------------
//
//  Special thanks - zeratul, Xaekai, needim
//
//  --------------------------------------------
//
//  TODO
// 
//  - Clean up 
//  - Fix /shout bug (or just remove this feature lol)
// 
//  --------------------------------------------
*/

//--------- FONTS ---------
$.getScript('https://use.fontawesome.com/b6c5a3a808.js');

//--------- EXTERNAL SCRIPTS ---------
$.getScript('https://juke.github.io/oc/noty.js');
$.getScript('https://juke.github.io/oc/external_playlist.js');
$.getScript('https://juke.github.io/oc/playlist_messages.js');

//--------- EXTERNAL CSS ---------
$('head').append("<link rel='stylesheet' href='https://juke.github.io/oc/noty.css' />"); 
$('head').append("<link rel='stylesheet' href='https://juke.github.io/oc/style.css' />"); 
$('head').append('<link id="favicon" rel="shortcut icon" type="image/png" sizes="64x64" href="https://kek.gg/i/5JTQft.png">');

//--------- FUNCTIONS ---------
(function($) {
    $.fn.clickToggle = function(func1, func2) {
        var funcs = [func1, func2];
        this.data('toggleclicked', 0);
        this.click(function() {
            var data = $(this).data();
            var tc = data.toggleclicked;
            $.proxy(funcs[tc], this)();
            data.toggleclicked = (tc + 1) % 2;
        });
        return this;
    };
}(jQuery));

var delay = (function(){
  var timer = 0;
  return function(callback, ms){
  clearTimeout (timer);
  timer = setTimeout(callback, ms);
 };
})();



//--------- nanoScrollerJS ---------

/*! nanoScrollerJS - v0.8.7 - (c) 2015 James Florentino; Licensed MIT */

	!function(a){return"function"==typeof define&&define.amd?define(["jquery"],function(b){return a(b,window,document)}):"object"==typeof exports?module.exports=a(require("jquery"),window,document):a(jQuery,window,document)}(function(a,b,c){"use strict";var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H;z={paneClass:"nano-pane",sliderClass:"nano-slider",contentClass:"nano-content",enabledClass:"has-scrollbar",flashedClass:"flashed",activeClass:"active",iOSNativeScrolling:!1,preventPageScrolling:!1,disableResize:!1,alwaysVisible:!1,flashDelay:1500,sliderMinHeight:20,sliderMaxHeight:null,documentContext:null,windowContext:null},u="scrollbar",t="scroll",l="mousedown",m="mouseenter",n="mousemove",p="mousewheel",o="mouseup",s="resize",h="drag",i="enter",w="up",r="panedown",f="DOMMouseScroll",g="down",x="wheel",j="keydown",k="keyup",v="touchmove",d="Microsoft Internet Explorer"===b.navigator.appName&&/msie 7./i.test(b.navigator.appVersion)&&b.ActiveXObject,e=null,D=b.requestAnimationFrame,y=b.cancelAnimationFrame,F=c.createElement("div").style,H=function(){var a,b,c,d,e,f;for(d=["t","webkitT","MozT","msT","OT"],a=e=0,f=d.length;f>e;a=++e)if(c=d[a],b=d[a]+"ransform",b in F)return d[a].substr(0,d[a].length-1);return!1}(),G=function(a){return H===!1?!1:""===H?a:H+a.charAt(0).toUpperCase()+a.substr(1)},E=G("transform"),B=E!==!1,A=function(){var a,b,d;return a=c.createElement("div"),b=a.style,b.position="absolute",b.width="100px",b.height="100px",b.overflow=t,b.top="-9999px",c.body.appendChild(a),d=a.offsetWidth-a.clientWidth,c.body.removeChild(a),d},C=function(){var a,c,d;return c=b.navigator.userAgent,(a=/(?=.+Mac OS X)(?=.+Firefox)/.test(c))?(d=/Firefox\/\d{2}\./.exec(c),d&&(d=d[0].replace(/\D+/g,"")),a&&+d>23):!1},q=function(){function j(d,f){this.el=d,this.options=f,e||(e=A()),this.$el=a(this.el),this.doc=a(this.options.documentContext||c),this.win=a(this.options.windowContext||b),this.body=this.doc.find("body"),this.$content=this.$el.children("."+this.options.contentClass),this.$content.attr("tabindex",this.options.tabIndex||0),this.content=this.$content[0],this.previousPosition=0,this.options.iOSNativeScrolling&&null!=this.el.style.WebkitOverflowScrolling?this.nativeScrolling():this.generate(),this.createEvents(),this.addEvents(),this.reset()}return j.prototype.preventScrolling=function(a,b){if(this.isActive)if(a.type===f)(b===g&&a.originalEvent.detail>0||b===w&&a.originalEvent.detail<0)&&a.preventDefault();else if(a.type===p){if(!a.originalEvent||!a.originalEvent.wheelDelta)return;(b===g&&a.originalEvent.wheelDelta<0||b===w&&a.originalEvent.wheelDelta>0)&&a.preventDefault()}},j.prototype.nativeScrolling=function(){this.$content.css({WebkitOverflowScrolling:"touch"}),this.iOSNativeScrolling=!0,this.isActive=!0},j.prototype.updateScrollValues=function(){var a,b;a=this.content,this.maxScrollTop=a.scrollHeight-a.clientHeight,this.prevScrollTop=this.contentScrollTop||0,this.contentScrollTop=a.scrollTop,b=this.contentScrollTop>this.previousPosition?"down":this.contentScrollTop<this.previousPosition?"up":"same",this.previousPosition=this.contentScrollTop,"same"!==b&&this.$el.trigger("update",{position:this.contentScrollTop,maximum:this.maxScrollTop,direction:b}),this.iOSNativeScrolling||(this.maxSliderTop=this.paneHeight-this.sliderHeight,this.sliderTop=0===this.maxScrollTop?0:this.contentScrollTop*this.maxSliderTop/this.maxScrollTop)},j.prototype.setOnScrollStyles=function(){var a;B?(a={},a[E]="translate(0, "+this.sliderTop+"px)"):a={top:this.sliderTop},D?(y&&this.scrollRAF&&y(this.scrollRAF),this.scrollRAF=D(function(b){return function(){return b.scrollRAF=null,b.slider.css(a)}}(this))):this.slider.css(a)},j.prototype.createEvents=function(){this.events={down:function(a){return function(b){return a.isBeingDragged=!0,a.offsetY=b.pageY-a.slider.offset().top,a.slider.is(b.target)||(a.offsetY=0),a.pane.addClass(a.options.activeClass),a.doc.bind(n,a.events[h]).bind(o,a.events[w]),a.body.bind(m,a.events[i]),!1}}(this),drag:function(a){return function(b){return a.sliderY=b.pageY-a.$el.offset().top-a.paneTop-(a.offsetY||.5*a.sliderHeight),a.scroll(),a.contentScrollTop>=a.maxScrollTop&&a.prevScrollTop!==a.maxScrollTop?a.$el.trigger("scrollend"):0===a.contentScrollTop&&0!==a.prevScrollTop&&a.$el.trigger("scrolltop"),!1}}(this),up:function(a){return function(b){return a.isBeingDragged=!1,a.pane.removeClass(a.options.activeClass),a.doc.unbind(n,a.events[h]).unbind(o,a.events[w]),a.body.unbind(m,a.events[i]),!1}}(this),resize:function(a){return function(b){a.reset()}}(this),panedown:function(a){return function(b){return a.sliderY=(b.offsetY||b.originalEvent.layerY)-.5*a.sliderHeight,a.scroll(),a.events.down(b),!1}}(this),scroll:function(a){return function(b){a.updateScrollValues(),a.isBeingDragged||(a.iOSNativeScrolling||(a.sliderY=a.sliderTop,a.setOnScrollStyles()),null!=b&&(a.contentScrollTop>=a.maxScrollTop?(a.options.preventPageScrolling&&a.preventScrolling(b,g),a.prevScrollTop!==a.maxScrollTop&&a.$el.trigger("scrollend")):0===a.contentScrollTop&&(a.options.preventPageScrolling&&a.preventScrolling(b,w),0!==a.prevScrollTop&&a.$el.trigger("scrolltop"))))}}(this),wheel:function(a){return function(b){var c;if(null!=b)return c=b.delta||b.wheelDelta||b.originalEvent&&b.originalEvent.wheelDelta||-b.detail||b.originalEvent&&-b.originalEvent.detail,c&&(a.sliderY+=-c/3),a.scroll(),!1}}(this),enter:function(a){return function(b){var c;if(a.isBeingDragged)return 1!==(b.buttons||b.which)?(c=a.events)[w].apply(c,arguments):void 0}}(this)}},j.prototype.addEvents=function(){var a;this.removeEvents(),a=this.events,this.options.disableResize||this.win.bind(s,a[s]),this.iOSNativeScrolling||(this.slider.bind(l,a[g]),this.pane.bind(l,a[r]).bind(""+p+" "+f,a[x])),this.$content.bind(""+t+" "+p+" "+f+" "+v,a[t])},j.prototype.removeEvents=function(){var a;a=this.events,this.win.unbind(s,a[s]),this.iOSNativeScrolling||(this.slider.unbind(),this.pane.unbind()),this.$content.unbind(""+t+" "+p+" "+f+" "+v,a[t])},j.prototype.generate=function(){var a,c,d,f,g,h,i;return f=this.options,h=f.paneClass,i=f.sliderClass,a=f.contentClass,(g=this.$el.children("."+h)).length||g.children("."+i).length||this.$el.append('<div class="'+h+'"><div class="'+i+'" /></div>'),this.pane=this.$el.children("."+h),this.slider=this.pane.find("."+i),0===e&&C()?(d=b.getComputedStyle(this.content,null).getPropertyValue("padding-right").replace(/[^0-9.]+/g,""),c={right:-14,paddingRight:+d+14}):e&&(c={right:-e},this.$el.addClass(f.enabledClass)),null!=c&&this.$content.css(c),this},j.prototype.restore=function(){this.stopped=!1,this.iOSNativeScrolling||this.pane.show(),this.addEvents()},j.prototype.reset=function(){var a,b,c,f,g,h,i,j,k,l,m,n;return this.iOSNativeScrolling?void(this.contentHeight=this.content.scrollHeight):(this.$el.find("."+this.options.paneClass).length||this.generate().stop(),this.stopped&&this.restore(),a=this.content,f=a.style,g=f.overflowY,d&&this.$content.css({height:this.$content.height()}),b=a.scrollHeight+e,l=parseInt(this.$el.css("max-height"),10),l>0&&(this.$el.height(""),this.$el.height(a.scrollHeight>l?l:a.scrollHeight)),i=this.pane.outerHeight(!1),k=parseInt(this.pane.css("top"),10),h=parseInt(this.pane.css("bottom"),10),j=i+k+h,n=Math.round(j/b*i),n<this.options.sliderMinHeight?n=this.options.sliderMinHeight:null!=this.options.sliderMaxHeight&&n>this.options.sliderMaxHeight&&(n=this.options.sliderMaxHeight),g===t&&f.overflowX!==t&&(n+=e),this.maxSliderTop=j-n,this.contentHeight=b,this.paneHeight=i,this.paneOuterHeight=j,this.sliderHeight=n,this.paneTop=k,this.slider.height(n),this.events.scroll(),this.pane.show(),this.isActive=!0,a.scrollHeight===a.clientHeight||this.pane.outerHeight(!0)>=a.scrollHeight&&g!==t?(this.pane.hide(),this.isActive=!1):this.el.clientHeight===a.scrollHeight&&g===t?this.slider.hide():this.slider.show(),this.pane.css({opacity:this.options.alwaysVisible?1:"",visibility:this.options.alwaysVisible?"visible":""}),c=this.$content.css("position"),("static"===c||"relative"===c)&&(m=parseInt(this.$content.css("right"),10),m&&this.$content.css({right:"",marginRight:m})),this)},j.prototype.scroll=function(){return this.isActive?(this.sliderY=Math.max(0,this.sliderY),this.sliderY=Math.min(this.maxSliderTop,this.sliderY),this.$content.scrollTop(this.maxScrollTop*this.sliderY/this.maxSliderTop),this.iOSNativeScrolling||(this.updateScrollValues(),this.setOnScrollStyles()),this):void 0},j.prototype.scrollBottom=function(a){return this.isActive?(this.$content.scrollTop(this.contentHeight-this.$content.height()-a).trigger(p),this.stop().restore(),this):void 0},j.prototype.scrollTop=function(a){return this.isActive?(this.$content.scrollTop(+a).trigger(p),this.stop().restore(),this):void 0},j.prototype.scrollTo=function(a){return this.isActive?(this.scrollTop(this.$el.find(a).get(0).offsetTop),this):void 0},j.prototype.stop=function(){return y&&this.scrollRAF&&(y(this.scrollRAF),this.scrollRAF=null),this.stopped=!0,this.removeEvents(),this.iOSNativeScrolling||this.pane.hide(),this},j.prototype.destroy=function(){return this.stopped||this.stop(),!this.iOSNativeScrolling&&this.pane.length&&this.pane.remove(),d&&this.$content.height(""),this.$content.removeAttr("tabindex"),this.$el.hasClass(this.options.enabledClass)&&(this.$el.removeClass(this.options.enabledClass),this.$content.css({right:""})),this},j.prototype.flash=function(){return!this.iOSNativeScrolling&&this.isActive?(this.reset(),this.pane.addClass(this.options.flashedClass),setTimeout(function(a){return function(){a.pane.removeClass(a.options.flashedClass)}}(this),this.options.flashDelay),this):void 0},j}(),a.fn.nanoScroller=function(b){return this.each(function(){var c,d;if((d=this.nanoscroller)||(c=a.extend({},z,b),this.nanoscroller=d=new q(this,c)),b&&"object"==typeof b){if(a.extend(d.options,b),null!=b.scrollBottom)return d.scrollBottom(b.scrollBottom);if(null!=b.scrollTop)return d.scrollTop(b.scrollTop);if(b.scrollTo)return d.scrollTo(b.scrollTo);if("bottom"===b.scroll)return d.scrollBottom(0);if("top"===b.scroll)return d.scrollTop(0);if(b.scroll&&b.scroll instanceof a)return d.scrollTo(b.scroll);if(b.stop)return d.stop();if(b.destroy)return d.destroy();if(b.flash)return d.flash()}return d.reset()})},a.fn.nanoScroller.Constructor=q});
	//# sourceMappingURL=jquery.nanoscroller.min.js.map

//--------- ResizeSensor ---------	
	/**
	 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
	 * directory of this distribution and at
	 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
	 */
	!function(){this.ResizeSensor=function(e,t){function s(){this.q=[],this.add=function(e){this.q.push(e)};var e,t;this.call=function(){for(e=0,t=this.q.length;t>e;e++)this.q[e].call()}}function i(e,t){return e.currentStyle?e.currentStyle[t]:window.getComputedStyle?window.getComputedStyle(e,null).getPropertyValue(t):e.style[t]}function o(e,t){if(e.resizedAttached){if(e.resizedAttached)return void e.resizedAttached.add(t)}else e.resizedAttached=new s,e.resizedAttached.add(t);e.resizeSensor=document.createElement("div"),e.resizeSensor.className="resize-sensor";var o="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: scroll; z-index: -1; visibility: hidden;",n="position: absolute; left: 0; top: 0;";e.resizeSensor.style.cssText=o,e.resizeSensor.innerHTML='<div class="resize-sensor-expand" style="'+o+'"><div style="'+n+'"></div></div><div class="resize-sensor-shrink" style="'+o+'"><div style="'+n+' width: 200%; height: 200%"></div></div>',e.appendChild(e.resizeSensor),{fixed:1,absolute:1}[i(e,"position")]||(e.style.position="relative");var r,l,d=e.resizeSensor.childNodes[0],c=d.childNodes[0],h=e.resizeSensor.childNodes[1],a=(h.childNodes[0],function(){c.style.width=d.offsetWidth+10+"px",c.style.height=d.offsetHeight+10+"px",d.scrollLeft=d.scrollWidth,d.scrollTop=d.scrollHeight,h.scrollLeft=h.scrollWidth,h.scrollTop=h.scrollHeight,r=e.offsetWidth,l=e.offsetHeight});a();var f=function(){e.resizedAttached&&e.resizedAttached.call()},u=function(e,t,s){e.attachEvent?e.attachEvent("on"+t,s):e.addEventListener(t,s)},z=function(){(e.offsetWidth!=r||e.offsetHeight!=l)&&f(),a()};u(d,"scroll",z),u(h,"scroll",z)}var n=Object.prototype.toString.call(e),r="[object Array]"===n||"[object NodeList]"===n||"[object HTMLCollection]"===n||"undefined"!=typeof jQuery&&e instanceof jQuery||"undefined"!=typeof Elements&&e instanceof Elements;if(r)for(var l=0,d=e.length;d>l;l++)o(e[l],t);else o(e,t);this.detach=function(){if(r)for(var t=0,s=e.length;s>t;t++)ResizeSensor.detach(e[t]);else ResizeSensor.detach(e)}},this.ResizeSensor.detach=function(e){e.resizeSensor&&(e.removeChild(e.resizeSensor),delete e.resizeSensor,delete e.resizedAttached)}}();

//--------- POSITIONING ADJUSTMENTS ---------
$("body").addClass("fluid");
$(".container").removeClass("container").addClass("container-fluid");
$("footer .container-fluid").removeClass("container-fluid").addClass("container");
$("#userlisttoggle").removeClass("pull-left").addClass("pull-right");
$("#userlisttoggle").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
$("#videowrap").detach().insertBefore($("#chatwrap"));
$("#rightcontrols").detach().insertBefore($("#leftcontrols"));
$("#rightpane").detach().insertBefore($("#leftpane"));
$("#leftcontrols").addClass("col-lg-2 col-md-2");
$("#currenttitle").insertAfter("#plcontrol");
$("#currenttitle").addClass("btn-group");
$("#currenttitle").after( "<div class='noticef'></div>");
$('#addfromurl .checkbox label').contents().filter(function(){return this.nodeType === 3;}).replaceWith("<span>TEMP</span>");
$("#userlist").css("float", "right");
$( ".plcontrol-collapse" ).wrapInner( "<div class='plcontrol-inner'></div>");
$("#videowrap").removeClass("col-lg-7 col-md-7");
$("#chatwrap").removeClass("col-lg-5 col-md-5");
$("#videowrap").addClass("col-lg-12 col-md-12");
$("#chatwrap").addClass("col-lg-2 col-md-2");
$("#footer").addClass("col-lg-10 col-md-10");
$("#mainpage").prepend($("#chatwrap"));
$("#main").append($("#videowrap"));

$("#footer").appendTo(".container-fluid");


$("#rightcontrols").removeClass("col-lg-7 col-md-7");
$("#leftcontrols").removeClass("col-lg-5 col-md-5");
$("#rightcontrols").addClass("col-lg-12 col-md-12");
$("#leftcontrols").addClass("col-lg-2 col-md-2");
$("#rightpane").removeClass("col-lg-7 col-md-7");
$("#leftpane").removeClass("col-lg-5 col-md-5");
$("#rightpane").addClass("col-lg-6 col-md-6");
$("#leftpane").addClass("col-lg-2 col-md-2");

//Add scrollbars
$("#maincontain .nano-content").append($("#mainpage > .container"));
$("#mainpage").append("<div class='nano' id='maincontain'></div>");
$("#maincontain").append("<div class='nano-content'></div>");
$("#maincontain .nano-content").append($("#mainpage > .container-fluid"));
$("#maincontain .nano-content").append($("#mainpage > .container"));
$("#messagebuffer").addClass("nano-content");
$("#messagebuffer").after("<div class='nano'></div>");
$("#chatwrap .nano").append($("#messagebuffer"));
$("#maincontain").addClass("col-lg-10 col-md-10");
$('.nano').nanoScroller();
$(".plcontrol-inner").addClass("clearfix");

$( "<div id='infopane'></div>" ).insertAfter( $( "#rightpane" ) );
$("#infopane").addClass("col-lg-6 col-md-6");

$("#infopane").append( $( "<div class='vertical-spacer'></div>" ) );
$("#infopane").append( $( "<div class='row' id='infopane-inner'></div>" ) );

//MOTD
$("#motdrow").appendTo("#infopane-inner");
$("#motdrow").removeClass("row");
$("#motdrow").addClass("col-lg-6 col-md-6 nopadding");
$("#motdrow .col-lg-12, #motdrow .col-md-12").addClass("nopadding");

//Poll
$("#pollwrap").insertAfter("#motdrow");
$("#pollwrap").removeClass("col-lg-12 col-md-12");
$("#pollwrap").removeClass("col-lg-12 col-md-12");
$("#pollwrap").addClass("col-lg-6 col-md-6 nopadding");

$("#library .btn-group").removeClass("pull-left");
$("#emotelistbtn").detach().insertAfter("#chatline");
$("#newpollbtn").detach().insertBefore("#emotelistbtn");

//Add info below Media URL section
$("#addfromurl .plcontrol-inner").append("<div class='types'>Sources: <a href='https://youtube.com/' target='_blank'>YouTube</a>, <a href='https://twitch.tv/' target='_blank'>Twitch</a>, <a href='https://vimeo.com/' target='_blank'>Vimeo</a>, <a href='https://dailymotion.com/' target='_blank'>Dailymotion</a>, <a href='https://streamable.com/' target='_blank'>Streamable</a>, <a href='https://vid.me/' target='_blank'>Vidme</a>, <a href='https://soundcloud.com/' target='_blank'>Soundcloud</a>, Google Drive videos, raw video/audio files</div>");

//Twitch Button
$("#usercount").after( "<a id=\"togglechat\" href=\"#\"><i class=\"fa fa-twitch\"></i></a>" );

//--------- TWITCH CHAT POP-OUT ---------
var twitchTitle;
var heightBody = $(window).outerHeight()-67;
var heightval2;

//Generate Twitch Chat
function twitchGen() {
	//Find current channel
	var start_pos = $("#currenttitle").text().indexOf(': ') + 1;
	var end_pos = $("#currenttitle").text().indexOf(' -',start_pos);
	var text_to_get = $("#currenttitle").text().substring(start_pos,end_pos);
	
	if(text_to_get == " Twitch.tv"){console.log('yes');
		twitchTitle = $("#currenttitle").text().split("- ").pop();
	} else { 
		twitchTitle = 'fwup';
	}
	//Add TC
	$('#chatwrap #chatheader').before('<div id="twitchchat"><div class="twhan"><span>Twitch.tv - <strong>'+twitchTitle+'</strong></span> <div class="reTw"><i class="fa fa-refresh"></i></div> <div class="closeTw"><i class="fa fa-close"></i></div></div><iframe src="https://twitch.tv/'+twitchTitle+'/chat?popout=" frameborder="0" scrolling="no" width="320" id="emchat" class="threes"></iframe></div>');
	//Adjust height to same as chat
	$('#twitchchat').css('height', '400px');
	$('#chatwrap .nano').css('height', "calc(100% - 521px)");
	$("#chatwrap .nano")[0].nanoscroller.reset();
	//Make TC resizeable
	$("#twitchchat").resizable({
	handles: "s", iframeFix: true, minHeight: 300, maxHeight: heightBody, 
	    resize: function(e, ui) 
        {
			$('iframe').css('pointer-events','none');
            var parent = ui.element.parent();
            var remainingSpace = parent.height() - ui.element.outerHeight(),
                divTwo = $('#chatwrap .nano'),
                divTwoWidth = (remainingSpace - (divTwo.outerHeight() - divTwo.height()))/parent.height()*100+"%";
                divTwo.css('height', "calc("+divTwoWidth+" - 121px)");
        },
		stop: function(event, ui) {
			$('iframe').css('pointer-events','auto');
			$("#chatwrap .nano")[0].nanoscroller.reset();
			var parent = ui.element.parent();
            ui.element.css(
            {
                height: ui.element.height()/parent.height()*100+"%",
            })
		  }
		  
		});
	//Close TC
	$(".closeTw" ).click(function() {
		$("#togglechat" ).click();
	});
	//Refresh TC
	$(".reTw" ).click(function() {

		var heightval = $("#twitchchat").css('height');
		$("#twitchchat").remove();
		twitchGen();

		$('#twitchchat').css('height',heightval);
		
	});
	$("#chatwrap .nano")[0].nanoscroller.reset();
}
	  
//Toggle TC
$("#togglechat").clickToggle(
	function() { twitchGen(); $("#chatwrap .nano")[0].nanoscroller.reset(); },
	function() { $("#twitchchat").remove(); $('#chatwrap .nano').css('height', "calc(100% - 86px)"); $("#chatwrap .nano")[0].nanoscroller.reset();  }
);

//--------- GENERAL JS ---------

//Add buttons next to chat
$("#newpollbtn").html("<i class=\"material-icons\">poll</i>");
$("#emotelistbtn").html("<i class=\"material-icons\">insert_emoticon</i>");

if(hasPermission("pollctl")) {
	if(USEROPTS.chatbtn) {
		$("#chatline").css("padding-right", "110px");
	} else {
		$("#chatline").css("padding-right", "60px");
	}
} else { 
	if(USEROPTS.chatbtn) {
		$("#chatline").css("padding-right", "85px");
	} else {
		$("#chatline").css("padding-right", "35px"); 
	}
}

//Return to top button
$(".container-fluid").before("<div id='return-to-top'><i class='material-icons'>arrow_drop_up</i></div>");

$('#return-to-top').click(function() {      // When arrow is clicked
    body.stop().animate({scrollTop: 0}, 200);
});

//Scrolling detection
var scrolledDown = 0;

//Dim bottom bar when scrolled up
	$("#maincontain").on("update", function(event, vals){ 
		if(vals.position === 0){
			scrolledDown = 0;
		$('#rightcontrols .btn-group').stop(true,true).animate({opacity: 0.4}, 400);
		$('#return-to-top').stop(true,true).animate({opacity: 0}, 0);
		$('#return-to-top').hide();
		} else {
			scrolledDown = 1;
		$('#rightcontrols .btn-group').stop(true,true).animate({opacity: 1}, 400);	
		$('#return-to-top').show();
		$('#return-to-top').stop(true,true).animate({opacity: 1}, 0);
		
		}
		 if(vals.position > 200) {
			  $( "#footer" ).slideUp(400);
			$('#footer').show();
		       
		 } else { 
			   $( "#footer" ).slideDown(400);
			 $('#footer').hide();
		       
		 }
    });

//Dim when hovering over navbar and footer
$('.navbar').hover(function() {
	$('.navbar').stop(true,true).animate({opacity: 1}, 400);
}, function() {
	$('.navbar').stop(true,true).animate({opacity: 0.6}, 400);
});

$('#footer').hover(function() {
	$('#footer').stop(true,true).animate({opacity: 1}, 200);
}, function() {
	$('#footer').stop(true,true).animate({opacity: 0.8}, 200);
});


$('#rightcontrols').hover(function() {
	$('#rightcontrols .btn-group').stop(true,true).animate({opacity: 1}, 400);
}, 
function() {
	if(scrolledDown === 0){
		$('#rightcontrols .btn-group').stop(true,true).animate({opacity: 0.4}, 400);
	} else { 
		$('#rightcontrols .btn-group').stop(true,true).animate({opacity: 1}, 400);
	}
});

$.w = $(window);
var body = $('#maincontain .nano-content');

//Scroll down when poll button/notification is pressed (changeme)
$("#newpollbtn").click(function() {
	body.stop().animate({scrollTop: $("#maincontain")[0].scrollHeight}, "slow"); 
	$("#maincontain")[0].nanoscroller.reset();
});
$(".poll-notify").click(function() {
	body.stop().animate({scrollTop: $("#maincontain")[0].scrollHeight}, "slow");
	$("#maincontain")[0].nanoscroller.reset();
});

//Go to section when button is pressed (needs adjusting, there are better ways of doing this)
$("#showsearch").click(function() {
	$("#showsearch").toggleClass('bottom');
	var isOut2 = $("#showsearch").hasClass('bottom');
	body.stop().animate({scrollTop: isOut2 ? $("#maincontain").height() : $("#maincontain").height() - $("#searchcontrol").height()}, "slow");
	$("#maincontain")[0].nanoscroller.reset();
	if($( "#showmediaurl, #showcustomembed, #showplaylistmanager, #showrecent" ).hasClass('bottom')) {
		$( "#showmediaurl, #showcustomembed, #showplaylistmanager, #showrecent" ).removeClass('bottom');
	}
});
$( "#showsearch" ).click(function() {
	$("#showsearch").toggleClass('bottom');
	var isOut2 = $("#showsearch").hasClass('bottom');
	body.stop().animate({scrollTop: isOut2 ? $("#maincontain").height() : $("#maincontain").height() - $("#searchcontrol").height()}, "slow");
	$("#maincontain")[0].nanoscroller.reset();
	if($( "#showmediaurl, #showcustomembed, #showplaylistmanager, #showrecent" ).hasClass('bottom')) {
		$( "#showmediaurl, #showcustomembed, #showplaylistmanager, #showrecent" ).removeClass('bottom');
	}
});
var tol;
$( "#showmediaurl" ).click(function() {
	if(tol == false){
		$("#showmediaurl").toggleClass('bottom');
		var isOut2 = $("#showmediaurl").hasClass('bottom');
		body.stop().animate({scrollTop: isOut2 ? $("#maincontain").height() : $("#maincontain").height() - $("#addfromurl").height() }, "slow");
		$("#maincontain")[0].nanoscroller.reset();
		if($( "#showsearch, #showcustomembed, #showplaylistmanager, #showrecent" ).hasClass('bottom')) {
			$( "#showsearch, #showcustomembed, #showplaylistmanager, #showrecent" ).removeClass('bottom');
		}
	}
	tol = false;
});
$( "#showcustomembed" ).click(function() {
	$( "#showcustomembed" ).toggleClass('bottom');
	var isOut2 = $( "#showcustomembed" ).hasClass('bottom');
	body.stop().animate({scrollTop: isOut2 ? $("#maincontain").height() : $("#maincontain").height() - $("#customembed").height()}, "slow");
	
	$("#maincontain")[0].nanoscroller.reset();
    if($( "#showsearch, #showmediaurl, #showplaylistmanager, #showrecent" ).hasClass('bottom')) {
		$( "#showsearch, #showmediaurl, #showplaylistmanager, #showrecent" ).removeClass('bottom');
	}
});
$( "#showplaylistmanager" ).click(function() { 
	$( "#showplaylistmanager" ).toggleClass('bottom');
	var isOut2 = $( "#showplaylistmanager" ).hasClass('bottom');
	body.stop().animate({scrollTop: isOut2 ? $("#maincontain").height() : $("#maincontain").height() - $("#playlistmanager").height()}, "slow");
	$("#maincontain")[0].nanoscroller.reset();
	if($( "#showsearch, #showmediaurl, #showcustomembed, #showrecent" ).hasClass('bottom')) {
		$( "#showsearch, #showmediaurl, #showcustomembed, #showrecent" ).removeClass('bottom');
	}
});

//Retain scrollbar + height when adjusting window size
/*function mediaResize() {
	$("#mainpage > .nano").nanoScroller();
	$('#videowrap .embed-responsive').css('height',($(window).outerHeight()-85)+'px');
}

$(window).resize(function() {
	mediaResize();
});

new ResizeSensor($("#maincontain .container-fluid"),function() {
	mediaResize();
});
*/
//update scrollbar when chat changes + group up chat messages
var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		$("#chatwrap .nano").nanoScroller();
		var tes = mutation['addedNodes'];
		/*var shoutClass = mutation['addedNodes'][0]['children'][1];
		var shoutUser = mutation['addedNodes'][0]['children'][1];
		var shoutMsg = mutation['addedNodes'][0]['children'][2];
		
		
		if($(shoutClass).hasClass("shout")){
			console.log('yes');
			$(mutation['addedNodes'][0]).css('display','none');
			new Noty({
				type: 'info',
				text: "<span class='dimm'>"+ $(shoutUser).text().replace(':', '')+"</span> shouted: <span class='dimmmsg'>"+$(shoutMsg).html()+"</span>",
				container: ".noticef",
				theme: 'mint',
				timeout: 8000,
				progressBar: true,
				id: 'notices',
				closeWith: ['click', 'button'],
				  animation: {
					open: 'noty_effects_open',
					close: 'noty_effects_close'
				  }
			}).show();
			
			$(mutation['addedNodes'][0]).remove();
		} else {
			console.log('no');
		}
		*/
		if(mutation['addedNodes'][0]['classList'][0].replace(/^(\S*).*/, '$1') === mutation['previousSibling']['classList'][0].replace(/^(\S*).*/, '$1')) {
			var classlol = mutation['addedNodes'][0]['className'];
			$("." + classlol).eq(-1).attr('id', 'same');
		}
		
		if(mutation['addedNodes'][0]['className'] === 'poll-notify'){
			var pollClass = mutation['addedNodes'][0]['innerHTML'];
			console.log(pollClass);
			var pollClass2 = mutation['addedNodes'];

			var pollUser = $(pollClass2).html().split(" opened a poll")[0];
			console.log(pollUser);
			var pollMsg = $(pollClass2).html().match(/"(.*?)"/)[1];
			console.log(pollMsg);
			new Noty({
				type: 'info',
				text: "<span class='dimm'>"+pollUser+"</span> opened poll: <span class='dimmmsg'>"+pollMsg+"</span>",
				container: ".noticef",
				theme: 'mint',
				timeout: 12000,
				progressBar: true,
				id: 'noticep',
				closeWith: ['click', 'button'],
				  animation: {
					open: 'noty_effects_open',
					close: 'noty_effects_close'
				  }
			}).show();
			

			$( ".poll-notify, #noticep" ).click(function() {
				body.stop().animate({scrollTop: $("#maincontain")[0].scrollHeight}, "slow");
				$("#maincontain")[0].nanoscroller.reset();
			});
		}
	});
}); 

var config = { attributes: true, childList: true, characterData: true }; 
observer.observe(document.querySelector('#messagebuffer'), config); //create a new observer



var observer2 = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		console.log(mutation);
	});
}); 

observer2.observe(document.querySelector('#queue'), config); //create a new observer
//fix for scrolling when hovering over new YT embed
$("#maincontain .nano-slider").mousedown(function() {
	$("#main").addClass("disablehover");
	$("#main").mouseenter(function(eventData) {
		if(eventData.buttons == 0) {
			$("#main").removeClass("disablehover");
			$(this).off("mouseenter");
		}
	});
});

var isOverPanel;
$(window).ready(function() {
    scrollChat();
	$('#mediarefresh').click();
	$(".nano").hover(function(){
		$(".nano-slider").removeClass('invis');
		$(".timestamp").css('padding-right','15px');
		delay(function(){
			$(".nano-slider").addClass('invis');
			$(".timestamp").css('padding-right','5px');
		}, 1000);
	}, function(){
		$(".nano-slider").removeClass('invis');
	});
		


		$(".nano").on("update", function(event, vals){ 
			$(".nano-slider").removeClass('invis');
			$(".timestamp").css('padding-right','15px');
				if(!isOverPanel){
			  delay(function(){
				$(".nano-slider").addClass('invis');
				$(".timestamp").css('padding-right','5px');
				
			  }, 1000 );
				}
		});

	//Keep chat messages grouped up when page is first loaded
	$('div[class^=chat-msg-]').each(function(){
		$("span.shout").parent('div').remove();
		//get the previous div with correct class
		var prev = $(this).prev('div[class^=chat-msg-]');
		//if there's a previous element and it doesn't match the class
		if(prev.length > 0 && $(this).hasClass(prev.prop('class').replace(/^(\S*).*/, '$1'))){
			//remove the margin
			$(this).attr('id', 'same');
		}
	});
	
	$.ajax({
		url:scrollChat(),
		success:function(){
			$("#chatwrap .nano")[0].nanoscroller.reset();
		}
	});
	

});

//For some reason none of this will execute unless it's delayed. 
// Causes problems if user is tabbed out during this process
setTimeout(function(){
	
	$('.nano').nanoScroller();
	$( ".nano-pane" ).hover(function(){
		$(".nano-slider").removeClass('invis');
		$(".timestamp").css('padding-right','15px');
		isOverPanel = true;
	}, function() {
		$(".nano-slider").addClass('invis');
		$(".timestamp").css('padding-right','5px');

		isOverPanel = false;
	});

	if(hasPermission("playlistadd")) {
		if($('#currenttitle').text() === "Nothing Playing") {
			tol = false;
		} else {
			tol = true;
		}
		$('#showmediaurl')[0].click(); 
	}
	
}, 1500);
