jQuery(function ($) {
    
    QUnit.test('should return a valid iso code for the user', function (assert) {
        assert.ok(/^[A-Z][A-Z]$/.test(iso));
    });
    
    QUnit.test('should select the right country option', function (assert) {
        var selectHTML = '<select class="stc-geo-select">'
        + '<option>Default</option>'
        + '<option data-iso="GB" value="GB">GB</option>'
        + '<option data-iso="US" value="US">US</option>'
        + '</select>';
        var $select = $(selectHTML).appendTo('#qunit-fixture');
        swapGeoAlternatives("GB");
        assert.equal($('#qunit-fixture').find('select').val(), "GB", 'country correctly selected');

        var altHTML = '<ul class="test-alt">'
        + '<li class="stc-geo-alt">International</li>'
        + '<li class="stc-geo-alt hidden" data-iso="GB">UK</li>'
        + '<li class="stc-geo-alt hidden" data-iso="US">US</li>'
        + '<li class="stc-geo-alt hidden" data-iso="DE">DE</li>'
        + '</ul>';
        var $alt = $(altHTML).appendTo('#qunit-fixture');
        swapGeoAlternatives("US");
        assert.equal($('#qunit-fixture').find('ul.test-alt li:visible').text(), "US", 'country correctly selected');
    });
});