/*
    Playlist messages - currently supports moving videos and adding videos
    v1.02
    1.01 -- reduced addvideo msg delete time to 30s, force playlistEnhancer.moveReporting to false
    1.02 -- set LASTCHAT to {name: ""}
    written by zeratul
*/
(function() {
    if (!CLIENT.hasOwnProperty("playlistNotifs")) {
        CLIENT["playlistNotifs"] = {"showAdd":true, "showMove":true}
    } else return;
    function addChatHTML(htmlTxt, decay) {
        var el = $(htmlTxt);
        el.find("img").load(function () {
            if (SCROLLCHAT) {
                scrollChat();
            } else if ($(this).position().top < 0) {
                scrollAndIgnoreEvent(document.getElementById('messagebuffer').scrollTop + $(this).height());
            }
        });
        document.getElementById('messagebuffer').append(el[0]);
        /*setTimeout(()=>{
            $(el).remove();
        }, decay);*/
        scrollChat();
        window.LASTCHAT = {name: ""}
    }
    /*
    socket.on('moveVideo', function (data) {
        if (!CLIENT.playlistNotifs["showMove"]) return;
        var msg = "",
            liFrom = $('.pluid-' + data.from),
            fromIdx = liFrom.index('#queue li')+1,
            pl = document.getElementById('queue');
            
        if (!liFrom.length) return;
        var TITLE = liFrom.children('.qe_title').text();
        if (TITLE.length > 50)
            TITLE = TITLE.substr(0,50)+"...";

        if (data.after === "prepend")
            msg='<span class="mv-title">' + TITLE + '</span>' +
                ' moved to ' +
                '<span class="mv-to">#1</span>';
        else if (data.after === "append")
            msg='<span class="mv-title">' + TITLE + '</span>' +
                ' moved to ' +
                '<span class="mv-to">the bottom of the list</span>';
        else {
            var liAfter = $('.pluid-' + data.after);
            var afterIdx = liAfter.index()+2;
            if (!liAfter.length) return;
            msg='<span class="mv-title">' + TITLE + '</span>' +
                ' moved from ' +
                '<span class="mv-from">#' + fromIdx + '</span>' +
                ' to ' +
                '<span class="mv-to">#' + afterIdx + '</span>';
        }
        if (msg !== "")
            addChatHTML("<div class='chat-movevideo'><span class='timestamp'>[" + (new Date()).toTimeString().split(" ")[0] + "] </span><span class='mv'>" + msg + "</span></div>");
    })
*/
		
    socket.on('queue', function(data) {
		
        if (!CLIENT.playlistNotifs["showAdd"]) return;
        var TITLE = data.item.media.title;
        if (TITLE.length > 75)
            TITLE = TITLE.substr(0,75)+"...";
        var msg='<span class="av-queueby">' + data.item.queueby + '</span>' +
                ' added ' +
                '<span class="av-title">' + TITLE + '</span> to the playlist';
        var pl = document.getElementById('queue');

        /*if (data.after === "prepend")
            msg+=' to <span class="av-to">the top</span>';
        else if (data.after !== "append") {
            var after = $('.pluid-'+data.after);
            if (!after.length) return;
            var afterIdx = after.index('#queue li');
            msg+=' to <span class="av-to">#' + (afterIdx+2) + '</span>';
        }
		*/
        //addChatHTML("<div class='chat-addvideo'><span class='timestamp'>[" + (new Date()).toTimeString().split(" ")[0] + "] </span><span class='av'>" + msg + "</span></div>");
		new Noty({
			type: 'info',
			text: msg,
			container: ".noticef",
			theme: 'mint',
			timeout: 6000,
			progressBar: true,
			id: 'noticeb',
			closeWith: ['click', 'button'],
			  animation: {
				open: 'noty_effects_open',
				close: 'noty_effects_close'
			  }
		}).show();
    });

    if ((typeof playlistEnhancer) !== "undefined") playlistEnhancer["moveReporting"] = false;
})();