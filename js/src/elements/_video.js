
var stc = stc || {};
(function(video, $){
    /**
     * Gets a YouTube video ID from a given YouTube URL.
     * 
     * @param {string} url The URL of the YouTube video
     * @return {String} The YouTube video ID
     */
    video.getYtId = function(url) {
        var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length === 11) {
            return match[2];
        }
        else {
            return null;
        }
    };

    /**
     * Builds the YouTube embed code from a given video ID.
     * 
     * @param {String} vid The YouTuve video ID
     * @return {String} the YouTube embed code
     */
    video.buildYtEmbed = function(vid) {
        var params = {
            autoplay: 1,
            rel: 0,
            modestbranding: 1,
            showinfo: 0
        };
        return "https://www.youtube.com/embed/" + vid + "?" + $.param(params);
    };
    
    /**
    * Creates YouTube embed code from a YouTube link.
    * Fades the poster out and video in.
    */
    $(function ($) {
        $('.stc-yt a').click(function(e) {
            var ytsrc = $(this).attr('href');
            var ytid = stc.video.getYtId(ytsrc);
            //try to add GA event
            if(stc.analytics) {
                stc.analytics.sendEvent('Videos', 'Play', ytid);
            }
            //on mobiles open video directly
            if(!stc.util.isMobile) {
                e.preventDefault();
                var ytframe = $('<iframe/>');
                ytsrc = stc.video.buildYtEmbed(ytid);
                $(ytframe).attr('src', ytsrc);
                $(this).fadeOut(500, function() {
                    $(ytframe).appendTo($(this).parent()).fadeIn();
                });
            }
        });
    });
    
}(stc.video = stc.video || {}, jQuery));
