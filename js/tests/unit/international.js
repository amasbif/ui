jQuery(function ($) {
    
    QUnit.test('should return a valid country code for the user', function (assert) {
        assert.ok(/^[A-Z][A-Z]$/.test(stc.geo.country));
    });
    
    QUnit.test('should select the right country option', function (assert) {
        var selectHTML = '<select class="stc-geo-select">'
        + '<option>Default</option>'
        + '<option data-geo="GB" value="GB">GB</option>'
        + '<option data-geo="US" value="US">US</option>'
        + '</select>';
        var $select = $(selectHTML).appendTo('#qunit-fixture');
        stc.geo.swapGeoAlternatives("GB");
        assert.equal($('#qunit-fixture').find('select').val(), "GB", 'country correctly selected');

        var altHTML = '<ul class="test-alt">'
        + '<li class="stc-geo-alt">International</li>'
        + '<li class="stc-geo-alt hidden" data-geo="GB">UK</li>'
        + '<li class="stc-geo-alt hidden" data-geo="US">US</li>'
        + '<li class="stc-geo-alt hidden" data-geo="DE">DE</li>'
        + '</ul>';
        var $alt = $(altHTML).appendTo('#qunit-fixture');
        stc.geo.swapGeoAlternatives("US");
        assert.equal($('#qunit-fixture').find('ul.test-alt li:visible').text(), "US", 'country correctly selected');
    });
    
    QUnit.test('Should return a valid user language', function (assert) {
        assert.expect(2);
        assert.ok(/^[a-z][a-z]$/.test(stc.geo.userLanguage), "The user language is valid");
        assert.equal(stc.geo.pageLanguage, "en", "Page language is English");
    });
    
    QUnit.test('Should return a valid translation', function (assert) {
        assert.expect(1);
        stc.geo.strings.fr = stc.geo.strings.fr || {};
        stc.geo.strings.fr.bigmac = 'LE big mac';
        assert.equal(stc.geo.t("bigmac", "fr"), "LE big mac", "Word correctly translated into French equivalent");
    });
    
});
