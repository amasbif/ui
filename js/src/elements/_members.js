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
