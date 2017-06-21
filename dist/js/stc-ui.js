
/**
 * Uses detectmobilebrowsers.com regex to detect mobile browsers
 */
window.mobilecheck = function(){
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
 * Sets a cookie
 * @param {String} cnmae
 * @param {String)} cvalue 
 * @param {Int)} exdays  
 */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * Gets a cookie
 * @param {String)} cname 
 * @retuns (String)
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    ca.forEach(function(c) {
        while (c.charAt(0) === ' ') { 
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    });
    return "";
}

/** 
 * Global variables
 */

var isMobile = window.mobilecheck();

var iso = getUserCountry();


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



/**
 * Creates YouTube embed code from a YouTube link.
 * Fades the poster out and video in.
 */
jQuery(function ($) {
    $('.stc-yt a').click(function(e) {
        //on mobiles open video directly
        if(!isMobile) { 
            e.preventDefault();
            var ytsrc = $(this).attr('href');
            var ytid = getYtId(ytsrc);
            ytsrc = buildYtEmbed(ytid);
            var ytframe = $('<iframe/>');
            $(ytframe).attr('src', ytsrc);
            $(this).fadeOut(500, function() {
                $(ytframe).appendTo($(this).parent()).fadeIn();
            });
        }
    });
});

/**
 * Gets a YouTube video ID from a given YouTube URL
 * @param (string) url
 * @returns {String} 
 */
function getYtId(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    }
    else {
      return null;
    }
}

/**
 * Builds the YouTube embed code from a given video ID.
 * @param {String} vid
 * @returns {String}
 */
function buildYtEmbed(vid) {
    var params = {
        autoplay: 1,
        rel: 0,
        modestbranding: 1,
        showinfo: 0
    };
    return "https://www.youtube.com/embed/" + vid + "?" + $.param(params);
}

