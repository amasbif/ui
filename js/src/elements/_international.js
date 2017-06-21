
/**
 * Replaces an element with the relevant culture's alternative
 * @param {String} iso 
 */
function swapGeoAlternatives(iso) {
    $('.stc-geo-alt').each(function(i,v) {
        if($(v).attr('data-iso') === iso) {
            $(v).siblings().filter('.stc-geo-alt').addClass('hidden');
            $(v).removeClass('hidden');
        }
    });
    
    //select default country in drop-down
    $('select.stc-geo-select option').each(function(i,v) {
        if($(this).attr('data-iso') === iso) {
            $(this).attr('selected','selected');
            return false;
        }
    });
}
window.addEventListener("countryIsSet", function(e) { 
    swapGeoAlternatives(iso);
});

/**
 * Uses Skype API to retrieve user's country ISO code and set an iso cookie.
 * Falls back to using CloudFlare geo location service exposed on www.savethechildren.net
 */
var isoEvent = new CustomEvent("countryIsSet");

function getUserCountry() {
    iso = getCookie('iso');
    if(!iso || iso === ""){
      $.ajax({
        url: 'https://apps.skype.com/countrycode',
        timeout: 3000,
        jsonp: "jsoncallback",
        dataType: "jsonp"})
        .done(function(json){
          iso = json.country_code;
          setCookie('iso', iso, 2);
          window.dispatchEvent(isoEvent);
        })
        //use CloudFlare fallback if Skype fails
        .fail(function(){
          $.getJSON('https://www.savethechildren.net/webservices/geo/ajax.php?callback=?',
            function(json){
              iso = json.country;
              setCookie('iso', iso, 2);
              window.dispatchEvent(isoEvent);
            });
        });
    }
}

