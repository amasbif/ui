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
        var countryEvent = new CustomEvent("countryIsSet");
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
    
    //locate on load
    stc.geo.locate();
    
    window.addEventListener("countryIsSet", function(e) { 
        stc.geo.swapGeoAlternatives(stc.geo.country);
    });

}(stc.geo = stc.geo || {}, jQuery));

