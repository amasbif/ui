jQuery(function ($) {
    
    QUnit.test('should return a valid url for a member country', function (assert) {
        assert.ok(/^http.+$/.test(stc.geo.members.GB.url), 'Valid URL for United Kingdom country member');
    });
    
    QUnit.test('should add country member options to drop down', function (assert) {
        var selectHTML = '<select class="stc-geo-select">'
            + '<option>Default</option>'
            + '</select>';
        var $select = $(selectHTML).appendTo('#qunit-fixture');
        stc.geo.addMembersSelectOptions($select, 'url');
        assert.ok($('#qunit-fixture').find('select option').length > 1, 'country member options correctly added');
        stc.geo.swapGeoAlternatives("GB");
        assert.ok($('#qunit-fixture').find('select').val().indexOf('org.uk') > 1, 'Country Member URL correctly selected');
    });
    
});
