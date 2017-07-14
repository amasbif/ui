var stc = stc || {};
(function(util, $){
    
    /**
     * Uses detectmobilebrowsers.com regex to detect mobile browsers
     * @return {boolean} True if mobile or false
     */ 
    util.detectMobile = function(){
        var check = false;
        var rea = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge\ |maemo|midp|mmp|mobile.+firefox|netfront|opera\ m(ob|in)i|palm(\ os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows\ ce|xda|xiino/i;
        var reb = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a\ wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r\ |s\ )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1\ u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp(\ i|ip)|hs-c|ht(c(-|\ |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac(\ |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt(\ |\/)|klon|kpt\ |kwc-|kyo(c|k)|le(no|xi)|lg(\ g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-|\ |o|v)|zz)|mt(50|p1|v\ )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v\ )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-|\ )|webc|whit|wi(g\ |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i;
        (function(a){
            if(rea.test(a)||reb.test(a.substr(0,4))) {
                check = true;
            }
        })(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };
    
    /**
     * Persist isMobile boolean to avoid running regex on every call
     */
    util.isMobile = util.detectMobile();
    
    /**
     * Sets a cookie.
     * @param {String} cname Name of the cookie
     * @param {String} cvalue Value of the cookie
     * @param {Int} exdays Number of days the cookie will last
     */
    util.setCookie = function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };

    /**
     * Gets a cookie.
     * @param {String} cname The name of the cookie to retrieve
     * @return {String} The value of the cookie
     */
    util.getCookie = function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };
    
    /**
     * Creates a custom event and dispatches it straight away
     * 
     * @param {string} eventName the name of the event
     * @param {HTMLElement} [element=window] The DOM element to attach 
     * the event to (defaults to window)
     */
    util.createEvent = function (eventName, element) {
        element = element || window;
        var newEvent = new CustomEvent(eventName);
        element.dispatchEvent(newEvent);
    };
    
}(stc.util = stc.util || {}, jQuery));

/** 
 * Global variables
 */

var stc = stc || {};
(function(geo, $){

    /**
     * Replaces an element with the relevant culture's alternative
     * @param {String} country_code two-letter country ISO code 
     */
    geo.swapGeoAlternatives = function(country_code) {
        $('.stc-geo-alt').each(function(i,v) {
            if($(v).attr('data-geo') === country_code) {
                $(v).siblings().filter('.stc-geo-alt').addClass('hidden');
                $(v).removeClass('hidden');
            }
        }); 

        //select default country in drop-down
        $('select.stc-geo-select option').each(function(i,v) {
            if($(this).attr('data-geo') === country_code) {
                $(this).attr('selected','selected');
                return false;
            }
        });
    };

    /**
     * Locate the visitor by IP
     * 
     * @desc Uses Skype API to retrieve user's country ISO code and set a country cookie.
     * Falls back to using CloudFlare geo location service exposed on www.savethechildren.net
     * 
     * @return {string} 2-letter country ISO codde (if set)
     */
    geo.locate = function() {
        stc.geo.country = "";
        stc.geo.country = stc.util.getCookie('stc_country'); 
        if(typeof stc.geo.country === 'undefined' || stc.geo.country === ""){
            $.ajax({
                url: 'https://apps.skype.com/countrycode',
                timeout: 3000,
                jsonp: "jsoncallback",
                dataType: "jsonp"})
                .done(function(json){
                    stc.geo.country = json.country_code;
                    stc.util.setCookie('stc_country', stc.geo.country, 2);
                    stc.util.createEvent('countryIsSet');
                })
                //use CloudFlare fallback if Skype fails
                .fail(function(){
                    $.getJSON('https://www.savethechildren.net/webservices/geo/ajax.php?callback=?',
                        function(json){
                            stc.geo.country = json.country;
                            stc.util.setCookie('stc_country', stc.geo.country, 2);
                            stc.util.createEvent('countryIsSet');
                        });
                });
        }
        else {
            jQuery(function($) {
                stc.util.createEvent('countryIsSet');
            });
        }
        return stc.geo.country;
    };
    
    /**
     * Gets the user language based on browser settings
     * Uses https://ajaxhttpheaders.appspot.com to get accurate settings
     * @return {string} two-letter language code
     */
    geo.getUserLanguage = function() {
        geo.userLanguage = stc.util.getCookie('stc_user_language');
        if (typeof geo.userLanguage === 'undefined' || geo.userLanguage === "") {
            $.ajax({
                url: "https://ajaxhttpheaders.appspot.com",
                dataType: 'jsonp',
                success: function (headers) {
                    language = headers['Accept-Language'].substr(0, 2).toLowerCase();
                    geo.userLanguage = language;
                    stc.util.setCookie('stc_user_language', geo.userLanguage, 2);
                    stc.util.createEvent('userLanguageIsSet');
                    return geo.userLanguage;
                }
            });
        }
        else {
            stc.util.createEvent('userLanguageIsSet');
            return geo.userLanguage;
        }
        return geo.userLanguage;
    };

    /**
     * Gets the language of the page
     * @return {string} two-letter language code
     */
    geo.pageLanguage = document.documentElement.lang.substr(0,2).toLowerCase();
    
    /**
     * Declare empty array to hold translation strings
     */
    geo.strings = geo.strings || {};
    
    // Declare current page language translation strings obejct
    if(geo.pageLanguage && geo.pageLanguage !== "") {
        geo.strings[geo.pageLanguage] = geo.strings[geo.pageLanguage] || {};
    }
    
    /**
     * Translates a string from English into another language if the string exists
     * @param {string} original The original string to translate
     * @param {string} lang The two-letter language code to translate into, defaults to current page language
     * @return {string} The translated string if it exists or the original string
     */
    geo.t = function(original, lang) {
        lang = lang || geo.pageLanguage;
        if(!lang || lang === "") {
            return original;
        }
        //try to get language localized strings object
        var strings = geo.strings[lang];
        if(!strings || typeof(strings) !== 'object') {
            return original;
        }
        if(!strings[original] || strings[original] === "") {
            return original;
        }
        else {
            return strings[original];
        }
    };
    
    
    
    //locate on load
    stc.geo.locate();
    
    //language on load
    stc.geo.getUserLanguage();
    
    window.addEventListener("countryIsSet", function(e) { 
        stc.geo.swapGeoAlternatives(stc.geo.country);
    });

}(stc.geo = stc.geo || {}, jQuery));


var stc = stc || {};
(function(geo, $){
    
    /**
     * List of Member countries and their website URLs
     */
    geo.members = {
        AO: {
            url: "http://www.savethechildren.org.au/",
            title: "Australia"
        },
        CA: {
            url: "http://www.savethechildren.ca",
            title: "Canada"
        },
        DK: {
            url: "http://www.redbarnet.dk/",
            title: "Denmark"
        },
        DO: {
            url: "http://savethechildren.org.do/",
            title: "Dominican Republic"
        },
        FJ: {
            url: "http://www.savethechildren.org.fj",
            title: "Fiji"
        },
        FI: {
            url: "http://www.pelastakaalapset.fi/",
            title: "Finland"
        },
        DE: {
            url: "http://www.savethechildren.de/",
            title: "Germany"
        },
        HN: {
            url: "http://www.savethechildrenhonduras.org/",
            title: "Honduras"
        },
        HK: {
            url: "http://www.savethechildren.org.hk",
            title: "Hong Kong"
        },
        IS: {
            url: "http://www.barnaheill.is",
            title: "Iceland"
        },
        IN: {
            url: "http://www.savethechildren.in/",
            title: "India"
        },
        IT: {
            url: "http://www.savethechildren.it",
            title: "Italy"
        },
        JP: {
            url: "http://www.savechildren.or.jp",
            title: "Japan"
        },
        JO: {
            url: "http://jordan.savethechildren.net",
            title: "Jordan"
        },
        KR: {
            url: "http://www.sc.or.kr",
            title: "Korea"
        },
        LT: {
            url: "https://www.gelbekitvaikus.lt",
            title: "Lithuania"
        },
        MX: {
            url: "https://www.savethechildren.mx/",
            title: "Mexico"
        },
        NL: {
            url: "https://www.savethechildren.nl",
            title: "Netherlands"
        },
        NZ: {
            url: "http://www.savethechildren.org.nz",
            title: "New Zealand"
        },
        NO: {
            url: "http://www.reddbarna.no",
            title: "Norway"
        },
        RO: {
            url: "http://www.salvaticopiii.ro",
            title: "Romania"
        },
        ZA: {
            url: "http://www.savethechildren.org.za",
            title: "South Africa"
        },
        ES: {
            url: "http://www.savethechildren.es",
            title: "Spain"
        },
        SZ: {
            url: "http://www.savethechildren.org.sz",
            title: "Swaziland"
        },
        SE: {
            url: "http://www.rb.se",
            title: "Sweden"
        },
        CH: {
            url: "http://www.savethechildren.ch",
            title: "Switzerland"
        },
        GB: {
            url: "http://www.savethechildren.org.uk",
            title: "United Kingdom"
        },
        US: {
            url: "http://www.savethechildren.org",
            title: "United States"
        }
    };

    /**
     * Gets the user Member country object if it exists
     */
    geo.memberCountry = stc.geo.members[geo.country];
    
}(stc.geo = stc.geo || {}, jQuery));


var stc = stc || {};
(function(video, $){
    /**
     * Gets a YouTube video ID from a given YouTube URL.
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
            //on mobiles open video directly
            if(!stc.util.isMobile) {
                e.preventDefault();
                var ytsrc = $(this).attr('href');
                var ytid = stc.video.getYtId(ytsrc);
                ytsrc = stc.video.buildYtEmbed(ytid);
                var ytframe = $('<iframe/>');
                $(ytframe).attr('src', ytsrc);
                $(this).fadeOut(500, function() {
                    $(ytframe).appendTo($(this).parent()).fadeIn();
                });
            }
        });
    });
}(stc.video = stc.video || {}, jQuery));
