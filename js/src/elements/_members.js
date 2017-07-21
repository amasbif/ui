var stc = stc || {};
(function(geo, $){
    
    /**
     * List of Member countries and their website URLs
     */
    geo.members = {
        AO: {
            iso: "AO",
            title: "Australia",
            url: "http://www.savethechildren.org.au/"
        },
        CA: {
            iso: "CA",
            title: "Canada",
            url: "http://www.savethechildren.ca"
        },
        DK: {
            iso: "DK",
            title: "Denmark",
            url: "http://www.redbarnet.dk/"
        },
        DO: {
            iso: "DO",
            title: "Dominican Republic",
            url: "http://savethechildren.org.do/"
        },
        FJ: {
            iso: "FJ",
            title: "Fiji",
            url: "http://www.savethechildren.org.fj"
        },
        FI: {
            iso: "FI",
            title: "Finland",
            url: "http://www.pelastakaalapset.fi/"
        },
        DE: {
            iso: "DE",
            title: "Germany",
            url: "http://www.savethechildren.de/"
        },
        HN: {
            iso: "HN",
            title: "Honduras",
            url: "http://www.savethechildrenhonduras.org/"
        },
        HK: {
            iso: "HK",
            title: "Hong Kong",
            url: "http://www.savethechildren.org.hk"
        },
        IS: {
            iso: "IS",
            title: "Iceland",
            url: "http://www.barnaheill.is"
        },
        IN: {
            iso: "IN",
            title: "India",
            url: "http://www.savethechildren.in/"
        },
        IT: {
            iso: "IT",
            title: "Italy",
            url: "http://www.savethechildren.it"
        },
        JP: {
            iso: "JP",
            title: "Japan",
            url: "http://www.savechildren.or.jp"
        },
        JO: {
            iso: "JO",
            title: "Jordan",
            url: "http://jordan.savethechildren.net"
        },
        KR: {
            iso: "KR",
            title: "Korea",
            url: "http://www.sc.or.kr"
        },
        LT: {
            iso: "LT",
            title: "Lithuania",
            url: "https://www.gelbekitvaikus.lt"
        },
        MX: {
            iso: "MX",
            title: "Mexico",
            url: "https://www.savethechildren.mx/"
        },
        NL: {
            iso: "NL",
            title: "Netherlands",
            url: "https://www.savethechildren.nl"
        },
        NZ: {
            iso: "NZ",
            title: "New Zealand",
            url: "http://www.savethechildren.org.nz"
        },
        NO: {
            iso: "NO",
            title: "Norway",
            url: "http://www.reddbarna.no"
        },
        RO: {
            iso: "RO",
            title: "Romania",
            url: "http://www.salvaticopiii.ro"
        },
        ZA: {
            iso: "ZA",
            title: "South Africa",
            url: "http://www.savethechildren.org.za"
        },
        ES: {
            iso: "ES",
            title: "Spain",
            url: "http://www.savethechildren.es"
        },
        SZ: {
            iso: "SZ",
            title: "Swaziland",
            url: "http://www.savethechildren.org.sz"
        },
        SE: {
            iso: "SE",
            title: "Sweden",
            url: "http://www.rb.se"
        },
        CH: {
            iso: "CH",
            title: "Switzerland",
            url: "http://www.savethechildren.ch"
        },
        GB: {
            iso: "GB",
            title: "United Kingdom",
            url: "http://www.savethechildren.org.uk"
        },
        US: {
            iso: "US",
            title: "United States",
            url: "http://www.savethechildren.org"
        }
    };
    
    /**
     * Redirects visitors to a Member website, defaults to current member country
     * @param {object} [member = geo.memberCountry] The Member object to redirect to
     */
    geo.goToMemberSite = function(member) {
        member = member || geo.memberCountry;
        if(typeof(member) !== "undefined" && typeof(member.url) !== "undefined") {
            window.location = member.url;
        }
    };
    
    /**
     * Adds Member country select options to a given drop-down
     * @param {object} select The select element to add options to
     * @param {string} attribute The Member object attribute to use as the option value paramater
     */
    geo.addMembersSelectOptions = function(select, attribute) {
        if(select[0].nodeName === "SELECT") {
            $.each(geo.members, function(i,v) {
                var value = v[attribute] || i;
                var option = $('<option>' + v.title + '</option>').attr({"value": value, "data-geo": i});
                $(select).append(option);
            });
        }
        //run the geo selection
        geo.swapGeoAlternatives();
        //if the value is a url, then add an onchange redirect behaviour 
        if(/url/.test(attribute)) {
            $(select).on('change', function() {
                window.location = $(this).val();
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
     *   The number of days to remember the visitor choice (if they choose to stay). Defaults to 1 day.
     */
    geo.suggestMemberSite = function(member, element, days) {
        member = member || geo.memberCountry;
        element = element || $('body');
        if(days !== 0 ) {
            days = days || 1;
        }
        if(typeof(member) !== "undefined" && typeof(member.url) !== "undefined" && stc.util.getCookie('stc_suggest_denied') !== "1") {
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
                            .append($('<button/>').attr({type:'button', class:'btn btn-default', 'data-dismiss':'modal'}).html('Stay here'))
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
        geo.memberCountry = stc.geo.members[geo.country];
    });
    
}(stc.geo = stc.geo || {}, jQuery));
