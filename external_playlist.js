/*!
**|  Cytube Playlist Enhancements
**|  Written by Xaekai except where noted
**|  Edited by zeratul(biggles) to remove MoveMedia messages, fix playlist collapse
**|  Version 2017.05.20.2312
**|  Copyright 2014-2016
**|
**@preserve
*/
if(!playlistEnhancer){var playlistEnhancer={}}if(window[CHANNEL.name]&&window[CHANNEL.name].modulesOptions&&window[CHANNEL.name].modulesOptions.playlistEnhancer){playlistEnhancer.recentMedia=window[CHANNEL.name].modulesOptions.playlistEnhancer.recentMedia}else{playlistEnhancer.recentMedia=true}/*!
**|  Playlist Helper
**@preserve
*/
function playlist(active){var __selector="#queue > .queue_entry";var _playlist=[];if(active){__selector+=".queue_active"}$(__selector).each(function(){var data=$(this).data();var addedby;if($(this).attr("data-original-title")){addedby=$(this).attr("data-original-title").match(/: ([-\w\u00c0-\u00ff]{1,20})$/)[1]}else{addedby=$(this).attr("title").match(/: ([-\w\u00c0-\u00ff]{1,20})$/)[1]}_playlist.push({uid:data.uid,media:data.media,temp:data.temp,active:$(this).hasClass("queue_active"),addedby:addedby})});return active&&_playlist[0]||_playlist}function plsort_export(){return sorted_list=playlist().sort(((a,b)=>{return a.media.title<b.media.title?-1:a.media.title>b.media.title?1:0})).map((cv=>{return{name:cv.media.title,link:cv.media.type+":"+cv.media.id}})).map((cv=>{return cv.link+" "+cv.name}))}function generateThumbnailPopover(target){var css="playlist-thumbnail";var type=target.data().media.type;var id=target.data().media.id;var DOM='<img src="__url" class="__class">'.replace(/__class/,css);function applyPopover(thumb){target.popover({html:true,placement:function(){return!USEROPTS.layout.match(/synchtube/)?"left":"right"},trigger:"hover",content:thumb})}function genThumb(url){var thumb=DOM.replace(/__url/,url);return applyPopover(thumb)}if(type=="yt"){var url="http://img.youtube.com/vi/__id/0.jpg".replace(/__id/,id);genThumb(url);return target.addClass("thumbed")}if(type=="vi"){var api="http://vimeo.com/api/v2/video/__id.json".replace(/__id/,id);$.getJSON(api,function(data){var url=data[0].thumbnail_medium;genThumb(url)});return target.addClass("thumbed")}if(type=="dm"){var url="http://www.dailymotion.com/thumbnail/video/__id".replace(/__id/,id);genThumb(url);return target.addClass("thumbed")}if(type=="gd"){var url="http://thumbs.pink.horse/drive/__id".replace(/__id/,id);genThumb(url);return target.addClass("thumbed")}if(type=="gp"){var url="http://thumbs.pink.horse/picasa/__id".replace(/__id/,id);genThumb(url);return target.addClass("thumbed")}}function playlist_scan(){$("#queue > .queue_entry:not(.thumbed)").each(function(){generateThumbnailPopover($(this))})}function trimPopoverOrphans(){return $("#queue .popover").remove()}if(!CLIENT.thumbnail_scanner){CLIENT.thumbnail_scanner=true;$("head").append($("<style>").prop("id","thumbnailStyle").text(".playlist-thumbnail { max-height: 180px; max-width: 240px; border-radius: 4px; }"));playlist_scan();socket.on("queue",playlist_scan);socket.on("playlist",playlist_scan);socket.on("delete",function(){trimPopoverOrphans()});$("#queue").on("mouseleave",trimPopoverOrphans)}(function(){if(CLIENT.playlistInline){return}CLIENT.playlistInline=true;window.makeQueueEntry=function(item,addbtns){var video=item.media;var li=$("<li/>");li.addClass("queue_entry");li.addClass("pluid-"+item.uid);li.data("uid",item.uid);li.data("media",video);li.data("temp",item.temp);li.data("blame",item.queueby);if(video.thumb){$("<img/>").attr("src",video.thumb.url).css("float","left").css("clear","both").appendTo(li)}var title=$("<a/>").addClass("qe_title").appendTo(li).text(video.title).attr("href",formatURL(video)).attr("target","_blank");var time=$("<span/>").addClass("qe_time").appendTo(li);time.text(video.duration);var blame=$("<span/>").addClass("qe_blame").appendTo(li);blame.html("Added by: <span class='sbby'>"+item.queueby+"</span>");var clear=$("<div/>").addClass("qe_clear").appendTo(li);if(item.temp){li.addClass("queue_temp")}if(addbtns)addQueueButtons(li);return li};setTimeout(function(){socket.emit("requestPlaylist")},61e3)})();/*!
**|  Cytube Playlist Time
**|  Written by Spoon
**@preserve
*/
HTMLCollection.prototype.each=Array.prototype.each=NodeList.prototype.each=function(func,_this){var i=-1,bindeach=_this===undefined;while(++i<this.length){if(bindeach)_this=this[i];func.bind(_this)(this[i],i,this)}};document.body.insertAdjacentHTML("beforeEnd","<style>#queue li .qe_time:before { content: attr(data-timeleft); }</style>");var _mQE=window.makeQueueEntry;window.makeQueueEntry=function(item,addbtns){var li=_mQE(item,addbtns);li[0].dataset.seconds=item.media.seconds;return li};function calculateRemainingTime(){function secondsToTimeStr(d){d=Number(d);var h=Math.floor(d/3600);var m=Math.floor(d%3600/60);var s=Math.floor(d%3600%60);return(h>0?h+":"+(m<10?"0":""):"")+m+":"+(s<10?"0":"")+s}var q=document.querySelectorAll("#queue li");var m=document.querySelector("#plmeta");var active,cycle=[],total=0;var currentTime=m&&"playtime"in m.dataset&&m.dataset["playtime"]>=0?m.dataset["playtime"]:0;if(q.length==0)return;q.each(function injectDOM(){if(!this.querySelector(".qe_time"))return;if(!active){if(this.classList.contains("queue_active")){active=this;total+=parseInt(this.dataset.seconds)-currentTime;this.querySelector(".qe_time").dataset.timeleft="Time left: "+secondsToTimeStr(total)}else cycle.push(this);return}else{this.querySelector(".qe_time").dataset.timeleft="Time till: "+secondsToTimeStr(total);total+=parseInt(this.dataset.seconds)}});cycle.each(function(){this.querySelector(".qe_time").dataset.timeleft="Time till: "+secondsToTimeStr(total);total+=parseInt(this.dataset.seconds)})}socket.on("mediaUpdate",function(data){var meta=document.querySelector("#plmeta");if(meta&&(!meta.dataset["playtime"]||!data.paused)){meta.dataset["playtime"]=Math.abs(Math.ceil(data.currentTime))}if(!data.paused){calculateRemainingTime()}});socket.emit("requestPlaylist");/*!
**|  CyTube Simplied Leader
**|  Written by Xaekai
**|
**@preserve
*/
(function(){if(!$("#leader").length&&CLIENT.rank>=CHANNEL.perms.leaderctl){$("<button>").prop("id","leader").attr("title","Control current time of media").addClass("btn btn-sm btn-default").append($("<span>").addClass("glyphicon glyphicon-transfer")).insertAfter($("#shuffleplaylist")).on("click",function(){if(CLIENT.leader){socket.emit("assignLeader",{name:""})}else{socket.emit("assignLeader",{name:CLIENT.name})}});socket.on("setLeader",function(name){if(name===CLIENT.name){$("#leader").removeClass("btn-default").addClass("btn-warning")}else{$("#leader").addClass("btn-default").removeClass("btn-warning")}})}var minrank=Math.min(CHANNEL.perms.oplaylistdelete,CHANNEL.perms.oplaylistjump,CHANNEL.perms.oplaylistnext,CHANNEL.perms.playlistdelete,CHANNEL.perms.playlistjump,CHANNEL.perms.playlistnext);if(!$("#shrinkplaylist").length&&CLIENT.rank>=minrank){$("#queue").data().shrink=false;$("<button>").prop("id","shrinkplaylist").attr("title","Toggle playlist collapse").addClass("btn btn-sm btn-default").append($("<span>").addClass("glyphicon glyphicon-compressed")).insertAfter($("#shuffleplaylist")).on("click",function(){if(!$("#queue").data().shrink){$("#queue").data().shrink=true;$("head").append($("<style>").prop("id","playlistStyle").text("#queue div.btn-group, .qe_clear { display: none!important; }"))}else{$("#queue").data().shrink=false;$("#playlistStyle").remove()}$(this).toggleClass("btn-default btn-warning")})}})();/*!


**|  CyTube Recent Media History
**|  Written by Xaekai
**|  Credit to sym for the idea.
**|  Version 2016.07.04.0547
**|
**@preserve
*/

(function(CyTube_Recent_Media){return CyTube_Recent_Media(window,document,window.jQuery)})(function(window,document,$,undefined){if(!playlistEnhancer.recentMedia){return}if(CLIENT.rank<CHANNEL.perms.seeplaylist){return}if(typeof Storage==="undefined"){console.info("[XaeTube: Recent Media] Storage not supported. Aborting load.");return}else{console.info("[XaeTube: Recent Media] Loading Module.");if(localStorage[CHANNEL.name+"_RecentMedia"]===undefined){localStorage[CHANNEL.name+"_RecentMedia"]=JSON.stringify([])}}var RecentMedia=window[CHANNEL.name]["RecentMedia"]={maxhist:10,history:JSON.parse(localStorage[CHANNEL.name+"_RecentMedia"]),synch:function(){localStorage[CHANNEL.name+"_RecentMedia"]=JSON.stringify(this.history)},view:function(){function createEntry(media){var li=$("<li>").addClass("recent_entry queue_entry");var a=$("<a>").addClass("recent_link qe_title").attr("target","_blank").attr("href",media.link).text(media.title).appendTo(li);var time=$("<span>").addClass("qe_time").text(media.duration).appendTo(li);var blame=$("<span>").addClass("qe_blame").html("Added by: <span class='sbby'>"+media.blame+"</span>").appendTo(li);return li}$("#recentmedia-list").empty();if(this.history.length){for(var i=this.history.length-1;i>=0;i--){createEntry(this.history[i]).appendTo("#recentmedia-list")}}},update:function(data){var newEntry={title:data["title"],link:formatURL(data),duration:data["duration"],blame:$(".pluid-"+PL_CURRENT).data("blame")};if(newEntry.link==="#"){return}if(this.history.length&&newEntry.link===this.history[this.history.length-1]["link"]){return}this.history.push(newEntry);this.history=this.history.slice(this.history.length>this.maxhist?this.history.length-this.maxhist:0,this.history.length);this.synch()},init:function(){var self=this;var pane=$("<div>").attr("id","recentmedia").addClass("plcontrol-collapse col-lg-12 col-md-12 collapse in").prependTo("#rightpane-inner").append($("<div>").addClass("vertical-spacer")).append($("<ol>").attr("id","recentmedia-list").text("Initializing.")).attr("aria-expanded","true").css("height","0");var button=$("<button>").attr("id","showrecent").attr("title","Recently shown videos").attr("data-toggle","collapse").attr("data-target","#recentmedia").addClass("btn btn-sm btn-default collapsed active").append($("<span>").addClass("glyphicon glyphicon-time")).on("click", function(){var wasActive=$(this).hasClass("active");$(".plcontrol-collapse").collapse("hide");$("#plcontrol button.active").button("toggle");if(!wasActive){$('#maincontain .nano-content').stop().animate({scrollTop: $("#maincontain").height() }, "slow"); $(this).button("toggle")}self.view()}).insertAfter("#shuffleplaylist").click();var style=$("<style>").text("#recentmedia-list>li:first-child { border-top-width: 1px }").prependTo($("head"));socket.on("changeMedia",(data=>{this.update(data);this.view()}));socket.emit("playerReady")}}.init()});



/*!





**|  CyTube Quick Preferred Qualilty
**|  Written by Xaekai
**|
**@preserve
*/
$("#quickQuality").remove();
(function() {
    var qualityChoices = [{
        code: "auto",
        text: "Auto"
    }, {
        code: "240",
        text: "240p"
    }, {
        code: "360",
        text: "360p"
    }, {
        code: "480",
        text: "480p"
    }, {
        code: "720",
        text: "720p"
    }, {
        code: "1080",
        text: "1080p"
    }, {
        code: "best",
        text: "Highest"
    }];
    var current = qualityChoices.filter(function(i) {
        return i.code == USEROPTS.default_quality
    })[0]["text"];
    var quickQuality = $("<div/>").addClass("btn-group dropdown").prop("id", "quickQuality").prependTo("#videocontrols");
    $("<button/>").addClass("btn btn-default btn-sm dropdown-toggle").attr("type", "button").attr("title", "Preferred Quality").attr("href", "javascript:void(0)").attr("data-toggle", "dropdown").html("<span class='glyphicon glyphicon-hd-video'></span><strong> " + current + " </strong><span class='caret'></span>").appendTo(quickQuality);
    var quickChoices = $("<ul/>").addClass("dropdown-menu ul-double").appendTo(quickQuality);
    qualityChoices.filter(function(i) {
        console.log(i.code)
    });
    qualityChoices.filter(function(i) {
        var item = $("<li/>").addClass("li-double").html($("<a/>").text(i.text).attr("quality", i.code).click(function() {
            $("#quickQuality strong").text(" " + $(this).text());
            USEROPTS.default_quality = $(this).attr("quality");
            $("#us-default-quality").val(USEROPTS.default_quality);
            storeOpts();
            $("#mediarefresh").click()
        })).appendTo(quickChoices)
    })
})();

function changeStream(data) {
    Callbacks.changeMedia({
        currentTime: 0,
        duration: "--:--",
        id: data.id,
        meta: {
            embed: {
                src: String().concat("http://www.ustream.tv/embed/", data.id, "?v=3&wmode=direct&autoplay=1"),
                tag: "iframe"
            }
        },
        paused: false,
        seconds: 0,
        title: String().concat("Ustream.tv - channel/", data.name),
        type: "us"
    })
}