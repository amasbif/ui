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
     * 
     * @param {String} cname Name of the cookie.
     * @param {String} cvalue Value of the cookie.
     * @param {Int} exdays Number of days the cookie will last.
     * @param {String} [domain] The domain name to set the cookie for.
     */
    util.setCookie = function(cname, cvalue, exdays, domain) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" +
                (domain ? ";domain=" + domain : "");
    };

    /**
     * Gets a cookie.
     * 
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
    
    /**
     * Parses a given URL to extract its attributes.
     * 
     * @param {string} url The URL to be parsed.
     * @return {object} The parsed URL object.
     * @see https://github.com/angular/angular.js/blob/v1.4.4/src/ng/urlUtils.js
     */
    util.parseURL = function (url) {
       
        var urlParsingNode = util.loadURLNode(url);

        // urlParsingNode provides the URLUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: (urlParsingNode.pathname.charAt(0) === '/')
                ? urlParsingNode.pathname
                : '/' + urlParsingNode.pathname
        };
    };
    
    /**
     * Loads the URL into an anchor DOM element.
     * 
     * @param {string} url The URL to parse.
     * @return {Element} The anchor element.
     */
    util.loadURLNode = function(url) {
        var urlParsingNode = document.createElement("a");
        var href = url;
        if (util.msie) {
            // Normalize before parse.  Refer Implementation Notes on why this is
            // done in two steps on IE.
            urlParsingNode.setAttribute("href", href);
            href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute('href', href);
        return urlParsingNode;
    };
    
    /**
     * Checks if a given URL is local or external.
     * 
     * @param {string} url The url to test
     * @return {Boolean} True if local or false
     */
    util.isLocalURL = function(url) {
        var parsedURL = util.parseURL(url);
        return parsedURL.hostname === window.location.hostname;
    };
    
    /* list of extensions associated with file downloads */
    util.fileDownloadExt = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'rtf', 'csv'];
    
    /**
     * Checks if a given URL is a file download.
     * 
     * @param {string} url The url to test
     * @return {Boolean} True if file or false
     */
    util.isFileURL = function(url) {
        var pattern = new RegExp('.+\\.(' + util.fileDownloadExt.join('|') + ')((\\?|#).+)?$', 'i');
        return pattern.test(url);
    };
    
    /**
    * Returns the passed in URL as an absolute URL.
    *
    * @param {string} url The URL string to be normalized to an absolute URL.
    * @return {string} The normalized, absolute URL.
    */
    util.absoluteURL = function(url) {
        var parsedURL = util.parseURL(url);
        return parsedURL.href;
    };
    
    /**
     * Adds utm code from the current URL to any given URL;
     * 
     * @param {string} url The URL to add utm code to.
     * @return {string} The updated URL.
     */
    util.forwardUTM = function(url) {
        var params = util.parseURLParams();
        if(jQuery.isEmptyObject(params)) {
            return url;
        }
        var urlParsingNode = util.loadURLNode(url);
        
        var queryString = "";
        $.each(params, function(i,v) {
            if(/^utm_/.test(i)) {    
                queryString += "&" + i + "=" + v;
            }
        });
        if(urlParsingNode.search) {
            urlParsingNode.search += queryString;
        }
        else {
            urlParsingNode.search = "?" + queryString.substr(1);
        }
        return urlParsingNode.href; 
    };
    
    /**
     * Adds UTM tracking code to a given URL.
     * 
     * @param {string} url The URL to add tracking to.
     * @param {string} source The UTM source.
     * @param {string} medium The UTM medium.
     * @param {string} campaign The UTM campaign.
     * @return {string} The updated URL.
     */
    util.addUTM = function(url, source, medium, campaign) {
        var params = util.parseURLParams(url);
        if(params.utm_source) {
            return url;
        }
        var urlParsingNode = util.loadURLNode(url);

        var queryString = "&utm_source=" + source + "&utm_medium=" + medium + "&utm_campaign=" + campaign;
        if(urlParsingNode.search) {
            urlParsingNode.search += queryString;
        }
        else {
            urlParsingNode.search = "?" + queryString.substr(1);
        }
        return urlParsingNode.href;
    };

    /**
     * Parses the current URL search string into key value pairs.
     * 
     * @param {string} [url=location.href] The URL to parse. Defaults to the current url.
     * @return {object} The key/value pairs of URL paramaters.
     */
    util.parseURLParams = function(url) {
        var url = url || location.href;
        var parsedParameters = {};
        url = util.parseURL(url);
        if(url.search && url.search.length > 0) {
            var uriParameters = url.search.split('&');
            $.each(uriParameters, function(i,v) {
                var parameter = v.split('=');
                if(parameter.length === 2) {
                    parsedParameters[parameter[0]] = decodeURIComponent(parameter[1]);
                }
            });
        }
        return parsedParameters;
    };
    
    /**
     * Redirects the browser to a given URL.
     * 
     * @param {string} url The URL to redirect the user to.
     * @param {object} options Extra optional parameters.
     */
    util.goToURL = function(url, options) {
        options = options || {};
        var track = options.track || true;
        var action = options.eventAction || 'Click';
        var label = options.eventLabel || url;
        if(track && stc.analytics && stc.analytics.sendEvent) {
            stc.analytics.sendEvent('Outbound link', action, label);
        }
        if(options.replace) {
            window.location.replace(url);
        }
        else {
            window.location.href = url;
        }
    };
    
    /**
     * Hides the HTML body on the page when the page loads. 
     * Use when redirecting users.
     */
    util.hideOnLoad = function() {
        $('body').hide();
    };
    
    /**
     * Shows the HTML body if the page content needs to be displayed. 
     * Use when redirecting users is not possible and content must appear.
     */
    util.unhide = function() {
        $('body').show();
    };
    
    /* checks if the browser is Internet Explorer */
    util.msie = ~window.navigator.userAgent.indexOf('MSIE ') 
            || ~window.navigator.userAgent.indexOf('Trident/');
    
    /**
     * Adds multiple listeners and binds them to a single callback function.
     * 
     * @param {array} events The array of events to listen to.
     * @param {string} name A unique name to give to this multi listener.
     * @param {type} callback The callback function to execute once all listeners have been fired.
     * @return {bool} False if no events are passed
     */
    util.listenToMultiEvents = function(events, name, callback) {
        if(events.length < 1) {
            return false;
        }
        stcEventsNumber = stcEventsNumber = [];
        stcEventsNumber[name] = stcEventsNumber[name] || 0;
        $.each(events, function(i,v) {
            window.addEventListener(v, function() {
                stcEventsNumber[name] += 1;
                if(stcEventsNumber[name] === events.length) {
                    stcEventsNumber[name] = 0;
                    callback();
                }
            });
        });
    };
    
    /* send a ready event that can be used by inline scripts */
    $(function() { 
        stc.util.createEvent("stcReady"); 
    });
    
    /* remove no-js class */
    $('body').removeClass("no-js");
    
}(stc.util = stc.util || {}, jQuery));


/* polyfill fix for custom event in Internet Explorer */
(function () {
    if (typeof window.CustomEvent === "function") {
        return false;
    } //If not IE
    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
})();

/** 
 * Global variables
 */

var stc = stc || {};

window.addEventListener('load', function(){
    window.removeEventListener('load', this, false);
    if(!window.ga || !ga.create) { 
        return false;
    }
       
    (function(analytics, ga, $){

        /**
         * Gets a GA property by wrapping ga.getAll();
         * @param {string} property The properry to retrieve.
         * @return {unresolved} The GA property if found.
         */
        analytics.getProperty = function(property) {
            return ga.getAll()[0].get(property);
        };
        
        analytics.trackingId = analytics.getProperty('trackingId');
        
        /**
         * Registers a GA ecommerce transaction for a donation.
         * 
         * @param {string} trans_id The transaction ID.
         * @param {string} item_name The product name.
         * @param {string} item_sku The product SKU.
         * @param {number} amount The donation amount.
         * @param {string} currency The three-letter currency code.
         * @return {undefined}
         */
        analytics.sendDonation = function(trans_id, item_name, item_sku, amount, currency) {
            if(!trans_id || !item_name || !item_sku || isNaN(amount)) {
                return false;
            }
            currency = currency || "USD";
            ga('require', 'ecommerce');
            ga('ecommerce:addTransaction', {
                'id': trans_id,
                'affiliation': stc.geo.t('Save the Children'),
                'revenue': amount,
                'currency': currency
            });
            ga('ecommerce:addItem', {
                'id': trans_id,
                'name': item_name,
                'sku': item_sku,
                'category': stc.geo.t('Donation'),
                'price': amount,
                'quantity': '1',
                'currency': currency
            });
            ga('ecommerce:send');
        };
        
        /* Check if a transaction object exists on the page and send it to ga */
        if(analytics.donation && analytics.donation.trans_id) {
            var params = Object.keys(analytics.donation).map(function (key) { return analytics.donation[key]; });
            analytics.sendDonation.apply(this, params);
        }
        
        /**
         * Sends an event to GA.
         * 
         * @param {type} category The event category.
         * @param {type} action The action to record.
         * @param {type} [label] The event label.
         * @return {undefined}
         */
        analytics.sendEvent = function (category, action, label) {
            if(!category || !action || !label) {
                return false;
            }
            ga('send', {
                hitType: 'event',
                eventCategory: category,
                eventAction: action,
                eventLabel: (label ? label : ''),
                hitCallback: analytics.callback
            });
        };
        
        /**
         * Sends a page view to GA.
         * 
         * @param {string} [url] The path to record a view against.
         *   Defaults to current path.
         * @return {undefined}
         */
        analytics.sendPageView = function (url) {
            var url = url || location.pathname;
            ga('send', 'pageview', url, {hitCallback: analytics.callback});
        };
        
        /* Callback is only used for unit testing */
        analytics.callback = function() {
            analytics.lastEventTime = new Date().getTime();
        };
        
        /* Add some default event tracking on DOM ready */
        $(function() {
            /* Track events on buttons with a data-event attribute */
            $('button[data-event]').on('click', function() {
                analytics.sendEvent($(this).attr('data-event'), 'click', $(this).text());
            });
            
            /* Track events for custom event, outbound and download links */
            $('a').on('click', function() {
                var url = $(this).attr('href');
                // Custom event is specified in data-event
                if($(this).attr('data-event')) {
                    analytics.sendEvent($(this).attr('data-event'), 'click', url);
                }
                // Link is a file download
                else if (stc.util.isFileURL(url)) {
                    analytics.sendEvent('Download', 'click', url);
                }
                // Link is outbound
                else if(!stc.util.isLocalURL(url)) {
                    analytics.sendEvent('Outbound link', 'click', url);
                }
            });
        });

    }(stc.analytics = stc.analytics || {}, ga, jQuery));

});

var stc = stc || {};

(function(util, $){
    
    /**
     * Adds a script dynamically and executes a callback function 
     * when the script has loaded.
     * 
     * @param {string} src The URL of the script to load.
     * @param {function} callback The callback function called upon load.
     */
    stc.util.addScript = function (src, callback) {
        var s = document.createElement("script");
        s.src = src;
        s.async = false;
        s.onload = callback;
        document.body.appendChild(s);
    };

    /**
     * Adds a stylesheet dynamically and executes a callback function 
     * when the CSS has loaded.
     * 
     * @param {string} href The URL of the stylesheet to load.
     * @param {function} callback The callback function called upon load.
     */
    stc.util.addCSS = function (href, callback) {
        var s = document.createElement("link");
        s.setAttribute("rel", "stylesheet");
        s.setAttribute("type", "text/css");
        s.setAttribute("href", href);		
        s.onload = callback;
        document.getElementsByTagName("head").item(0).appendChild(s);
    };


}(stc.util = stc.util || {}, jQuery));


var stc = stc || {};
(function(inter, $){
    /**
     * Displays an animated loader while an asynchronous actions takes place.
     * 
     * @param {string} [element=body] The html ELEMENT TO DISPLAY THE LOADER IN.
     *   Defaults to body.
     */
    inter.showLoader = function(element) {
        var element = element || $('body');
        var loaderHtml = '<div class="stc-loader">' +
                              '<div class="stc-loader-inner">' +
                                  '<i class="fa fstc fstc-circle fa-spin fa-4x"></i>' +
                                  '<span class="sr-only">Loading...</span>' +
                              '</div>' +
                         '</div>';
        $(element).append($(loaderHtml).hide().fadeIn("fast"));
    };
    
    inter.hideLoader = function(element) {
        var element = element || $('body');
        $(element).find('div.stc-loader').fadeOut("fast", function(e) { $(this).remove(); });
    }; 

    
}(stc.inter = stc.inter || {}, jQuery));

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
        $('select.stc-geo-select option').removeAttr('selected');
        $('select.stc-geo-select option').each(function(i,v) {
            if($(this).attr('data-geo') === country_code) {
                $(this).attr('selected','selected');
                return false;
            }
        });
    }; 
    
    /**
     * Changes the href attribute of a given link to a country-specific link.
     * @param {HTMLelement} linkElement The link element to modify.
     * @param {object} countryLinks The list of country links in a JSON object. 
     *   The object should have an iso  as key and url as value: {GB: '#urltoGB'}
     * @return {Boolean} False if no country set or invalid input.
     */
    geo.changeCountryLink = function(linkElement, countryLinks) {
        if(!geo.country || geo.country === "" || !countryLinks[geo.country]) {
            return false;
        }
        $(linkElement).attr('href', countryLinks[geo.country]);
    };

    /**
     * Locate the visitor by IP.
     * 
     * @desc Uses Skype API to retrieve user's country ISO code and set a country cookie.
     * Falls back to using CloudFlare geo location service exposed on www.savethechildren.net
     * 
     * @return {string} 2-letter country ISO code (if set)
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
     * Sets the user language variable and cookie.
     * @param {string} [lng] The two-letter language code. 
     * Defaults to the main browser language or the user-set value if present.
     * @return {String} The language code.
     */
    geo.setUserLanguage = function(lng) {
        if(!lng) {
            var lng = stc.util.getCookie('stc_user_language') || (navigator.languages ? navigator.languages[0] : navigator.language || navigator.userLanguage);
        }
        if(lng.length < 2) {
            return false;
        }
        stc.util.setCookie('stc_user_language', lng, 2);
        geo.userLanguage = lng;
        return lng;
    };
    
    /**
     * Sets the user country variable and cookie.
     * @param {string} iso The two-letter country code
     * @return {Boolean} True if country was set or false.
     */
    geo.setUserCountry = function(iso) {
        if(iso.length !== 2) {
            return false;
        }
        geo.country = iso.toUpperCase();
        stc.util.setCookie('stc_country', stc.geo.country, 2);
        stc.util.createEvent('countryIsSet');
        return true;
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
     * @param {string} [lang] The two-letter language code to translate into, defaults to current page language
     * @param {string} [interpol] An optional interpolation object of key/value pairs.
     * @return {string} The translated and interpolated string if it exists or the original string
     */
    geo.t = function(original, lang, interpol) {
        lang = lang || geo.pageLanguage;
        if(!lang || lang === "") {
            return geo.interpolate(original, interpol);
        }
        //try to get language localized strings object
        var strings = geo.strings[lang];
        if(!strings || typeof strings !== 'object') {
            return geo.interpolate(original, interpol);
        }
        if(!strings[original] || strings[original] === "") {
            return geo.interpolate(original, interpol);
        }
        else {
            return geo.interpolate(strings[original], interpol);
        }
    };
    
    /**
     * Interpolation method to substitute tokens.
     * 
     * @param {string} original The original string containing the tokens.
     * @param {type} interpol the interpolation object of key/value pairs.
     * @return {string} The resulting interpolated string.
     */
    geo.interpolate = function(original, interpol) {
        if(!interpol) {
            return original;
        }
        var final = original;
        for (var key in interpol) {
            // skip loop if the property is from prototype
            if (!interpol.hasOwnProperty(key)) {
                continue;
            }
            var obj = interpol[key];
            var re = new RegExp('%{' + key + '}', 'g');
            final = final.replace(re, obj);
        }
        return final;
    };
    
    /* Initialise some variables on page load */
    $(function() {
        geo.locate();
        geo.setUserLanguage();
    });
    
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
        "AU": {
            "iso": "AU",
            "title": "Australia",
            "url": "http://www.savethechildren.org.au",
            "url_donate": "https://www.savethechildren.org.au/donate/today",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "CA": {
            "iso": "CA",
            "title": "Canada",
            "url": "http://www.savethechildren.ca",
            "url_donate": "https://support.savethechildren.ca/DonatetoChildren",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "CO": {
            "iso": "CO",
            "title": "Colombia",
            "url": "https://www.savethechildren.org.co",
            "url_donate": "https://www.savethechildren.org.co/donar",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "DK": {
            "iso": "DK",
            "title": "Denmark",
            "url": "http://www.redbarnet.dk",
            "url_donate": "https://redbarnet.dk/stoet",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "DO": {
            "iso": "DO",
            "title": "Dominican Republic",
            "url": "http://savethechildren.org.do",
            "url_donate": "http://savethechildren.org.do",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "FJ": {
            "iso": "FJ",
            "title": "Fiji",
            "url": "http://www.savethechildren.org.fj",
            "url_donate": "http://www.savethechildren.org.fj/donate-now",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "FI": {
            "iso": "FI",
            "title": "Finland",
            "url": "http://www.pelastakaalapset.fi",
            "url_donate": "https://www.pelastakaalapset.fi/auta-lapsia/lahjoita/#/kertalahjoitus",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "DE": {
            "iso": "DE",
            "title": "Germany",
            "url": "http://www.savethechildren.de",
            "url_donate": "https://spenden.savethechildren.de",
            "mappedCountries": ["AT"],
            "supportedLanguages": []
        },
        "GT": {
            "iso": "GT",
            "title": "Guatemala",
            "url": "http://www.savethechildren.org.gt",
            "url_donate": "http://savethechildren.org.gt/como-ayudar",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "HN": {
            "iso": "HN",
            "title": "Honduras",
            "url": "http://www.savethechildrenhonduras.org",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "HK": {
            "iso": "HK",
            "title": "Hong Kong",
            "url": "http://www.savethechildren.org.hk",
            "url_donate": "https://savethechildren.org.hk/monthlygiving.aspx",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "IS": {
            "iso": "IS",
            "title": "Iceland",
            "url": "http://www.barnaheill.is",
            "url_donate": "http://www.barnaheill.is/Borninogthu/Einstaklingar/heillavinur",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "IN": {
            "iso": "IN",
            "title": "India",
            "url": "http://www.savethechildren.in",
            "url_donate": "https://support.savethechildren.in/#donate-form ",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "ID": {
            "iso": "ID",
            "title": "Indonesia",
            "url": "https://www.stc.or.id",
            "url_donate": "https://www.stc.or.id/donate",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "IT": {
            "iso": "IT",
            "title": "Italy",
            "url": "http://www.savethechildren.it",
            "url_donate": "https://www.savethechildren.it/dona-ora",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "JP": {
            "iso": "JP",
            "title": "Japan",
            "url": "http://www.savechildren.or.jp",
            "url_donate": "http://www.savechildren.or.jp/contribute",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "JO": {
            "iso": "JO",
            "title": "Jordan",
            "url": "http://jordan.savethechildren.net",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "KR": {
            "iso": "KR",
            "title": "Korea",
            "url": "http://www.sc.or.kr",
            "url_donate": "https://m.sc.or.kr/support/supportMonth.do",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "LT": {
            "iso": "LT",
            "title": "Lithuania",
            "url": "https://www.gelbekitvaikus.lt",
            "url_donate": "https://www.gelbekitvaikus.lt/paaukok",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "MX": {
            "iso": "MX",
            "title": "Mexico",
            "url": "https://www.savethechildren.mx",
            "url_donate": "https://www.savethechildren.mx/donar",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "NL": {
            "iso": "NL",
            "title": "Netherlands",
            "url": "https://www.savethechildren.nl",
            "url_donate": "https://www.savethechildren.nl/help-mee/donee",
            "mappedCountries": ["BE"],
            "supportedLanguages": []
        },
        "NZ": {
            "iso": "NZ",
            "title": "New Zealand",
            "url": "http://www.savethechildren.org.nz",
            "url_donate": "https://savethechildren.org.nz/how-to-help/donate",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "NO": {
            "iso": "NO",
            "title": "Norway",
            "url": "http://www.reddbarna.no",
            "url_donate": "https://www.reddbarna.no/gi",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "PH": {
            "iso": "PH",
            "title": "Philippines",
            "url": "http://www.savethechildren.org.ph",
            "url_donate": "https://donate.savethechildren.org.ph",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "RO": {
            "iso": "RO",
            "title": "Romania",
            "url": "http://www.salvaticopiii.ro",
            "url_donate": "http://www.salvaticopiii.ro/?id2=doneaza",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "ZA": {
            "iso": "ZA",
            "title": "South Africa",
            "url": "http://www.savethechildren.org.za",
            "url_donate": "https://www.savethechildren.org.za/donate",
            "mappedCountries": ["ZW", "NA"],
            "supportedLanguages": []
        },
        "ES": {
            "iso": "ES",
            "title": "Spain",
            "url": "http://www.savethechildren.es",
            "url_donate": "https://www.savethechildren.es/colaborar-ong/hazte-socio-y-cambia-la-vida-de-los-ninos-y-ninas-mas-vulnerables",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "SZ": {
            "iso": "SZ",
            "title": "Swaziland",
            "url": "http://www.savethechildren.org.sz",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "SE": {
            "iso": "SE",
            "title": "Sweden",
            "url": "http://www.rb.se",
            "url_donate": "https://www.raddabarnen.se/stod-oss/manadsgivare/#steg1",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "CH": {
            "iso": "CH",
            "title": "Switzerland",
            "url": "http://www.savethechildren.ch",
            "url_donate": "https://www.savethechildren.ch/de/online_spenden/spenden_neu.cfm",
            "mappedCountries": ["LI"],
            "supportedLanguages": []
        },
        "GB": {
            "iso": "GB",
            "title": "United Kingdom",
            "url": "http://www.savethechildren.org.uk",
            "url_donate": "https://secure.savethechildren.org.uk/donate",
            "mappedCountries": ["IE"],
            "supportedLanguages": []
        },
        "US": {
            "iso": "US",
            "title": "United States",
            "url": "http://www.savethechildren.org",
            "url_donate": "https://secure.savethechildren.org/site/c.8rKLIXMGIpI4E/b.8102415/k.1377/Please_Give_Monthly_to_Save_the_Children/apps/ka/sd/donor.asp",
            "mappedCountries": [],
            "supportedLanguages": []
        }
    };
    
    /**
     * Redirects visitors to a Member website, defaults to current member country.
     * 
     * @param {object} [member = geo.memberCountry] The Member object to redirect to.
     * @param {object} [options] The optional parameters to pass to util.goToUrl().
     * @return {boolean} True if redirection occurs or false.
     */
    geo.goToMemberSite = function(member, options) {
        member = member || geo.memberCountry;
        options = options || {};
        if(typeof member === "undefined" || typeof member.url === "undefined") {
            return false;
        }
        options.eventLabel = member.iso + " - " + member.url;
        stc.util.goToURL(member.url, options);
        return true;
    };
    
    /**
     * Hides page content and attempts to redirect visitors to a Member website.
     */
    geo.goToMemberSiteOnLoad = function() {
        stc.util.hideOnLoad();
        //wait for load event as well so that GA is available.
        stc.util.listenToMultiEvents(['load','countryIsSet'], 'redirectOnLoad',function() {
            if(!geo.goToMemberSite(null, {replace: true, eventAction: 'Redirect'})) {
                stc.util.unhide();
            }
        });
    };
    
    /**
     * Adds Member country select options to a given drop-down
     * @param {object} select The select element to add options to
     * @param {string} attribute The Member object attribute to use as the option value paramater
     */
    geo.addMembersSelectOptions = function(select, attribute) {
        if(select[0].nodeName === "SELECT") {
            $.each(geo.members, function(i,v) {
                if(attribute && !v[attribute]) {
                    return true;
                }
                var value = v[attribute] || i;
                var option = $('<option>' + v.title + '</option>').attr({"value": value, "data-geo": i});
                $(select).append(option);
            });
        }
        //run the geo selection
        geo.swapGeoAlternatives(geo.country);
        //if the value is a url, then add an onchange redirect behaviour 
        if(/url/.test(attribute)) {
            $(select).on('change', function() {
                stc.util.goToURL($(this).val(), {eventLabel: $(this).find('option:selected').attr('data-geo') + " - " + $(this).val()});
            }).closest('form').on('submit', function(e) {
                e.preventDefault();
                stc.util.goToURL($(select).val());
            });
        }
    };
    
    /**
     * Creates a modal window suggesting the visitor goes to the relevant Member country website.
     * @param {stc.member} [member = geo.countryMember] 
     *   The Member country to suggest to the visitor. Defaults to the current Member country if set.
     * @param {HTMLElement} [element = body]
     *   The HTML element to place the modal window in. Defaults to body.
     * @param {int} [days = 1]
     *   The number of days to remember the visitor's choice (if they choose to stay). Defaults to 1 day.
     */
    geo.suggestMemberSite = function(member, element, days) {
        member = member || geo.memberCountry;
        element = element || $('body');
        if(days !== 0 ) {
            days = days || 1;
        }
        if(typeof member !== "undefined" && typeof member.url !== "undefined" && stc.util.getCookie('stc_suggest_denied') !== "1") {
            var modal = $('<div/>').attr({id:'memberSuggestModal', class: 'modal fade', role: 'dialog', 'tab-index': '-1'})
                .append($('<div/>').attr({class:'modal-dialog', role: 'document'})
                    .append($('<div/>').attr({class:'modal-content'})
                        .append($('<div/>').attr({class:'modal-header'})
                            .append($('<button/>').attr({type:'button', class:'close', 'data-dismiss':'modal', 'aria-label':'Close'})
                                .append($('<span/>').attr('aria-hidden', 'true').html('&times;'))
                            )
                        )
                        .append($('<div/>').attr({class:'modal-body text-center'})
                            .append($('<h4/>').text('Welcome, ' + member.title + ' friend!'))
                            .append('<p>Good news, Save the Children has a website in ' + ($.inArray(member.iso, ['GB','US','NL']) > -1 ? "the " : "") + member.title + '.<br/>Do you wish to visit our ' + member.title + ' website?</p>')
                        )
                        .append($('<div/>').attr({class:'modal-footer'})
                            .append($('<button/>').attr({type:'button', class:'btn btn-default', 'data-dismiss':'modal'}).html('Stay on global page'))
                            .append($('<a>').attr({href:member.url, class:'btn btn-primary'}).html('Go to ' + member.title))
                        )
                    )
                );
            $(element).append($(modal).modal().on('hidden.bs.modal', function (e) {
                if(days > 0) {
                    stc.util.setCookie("stc_suggest_denied", "1", days);
                }
            })); 
        }
    };

    /**
     * Gets the user Member country object if it exists
     */ 
    window.addEventListener("countryIsSet", function(e) {
        geo.memberCountry = geo.members[geo.country];
        //check for mapped countries and reset user country if applicable
        if(typeof geo.memberCountry !== "object") {
            $.each(geo.members, function(i,v) {
                if($.inArray(geo.country, v.mappedCountries) > -1) {
                    geo.memberCountry = v;
                    geo.setUserCountry(v.iso);
                    return false;
                }
            });
        }
    });
    
}(stc.geo = stc.geo || {}, jQuery));


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

/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1||b[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){if(a(b.target).is(this))return b.handleObj.handler.apply(this,arguments)}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.7",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a("#"===f?[]:f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.7",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c).prop(c,!0)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c).prop(c,!1))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target).closest(".btn");b.call(d,"toggle"),a(c.target).is('input[type="radio"], input[type="checkbox"]')||(c.preventDefault(),d.is("input,button")?d.trigger("focus"):d.find("input:visible,button:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.7",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(a>this.$items.length-1||a<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){if(!this.sliding)return this.slide("next")},c.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.7",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",f)))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.7",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger(a.Event("shown.bs.dropdown",h))}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.7",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){document===a.target||this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);if(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),!c.isInStateTrue())return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element&&e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);if(this.$element.trigger(g),!g.isDefaultPrevented())return f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=window.SVGElement&&c instanceof window.SVGElement,g=d?{top:0,left:0}:f?null:b.offset(),h={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},i=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,h,i,g)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null,a.$element=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.7",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.7",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){
this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.7",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return e<c&&"top";if("bottom"==this.affixed)return null!=c?!(e+this.unpin<=f.top)&&"bottom":!(e+g<=a-d)&&"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&e<=c?"top":null!=d&&i+j>=a-d&&"bottom"},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);