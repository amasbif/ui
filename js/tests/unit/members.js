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
    
    QUnit.test('Should create a Member country suggestion modal', function (assert) {
        assert.expect(1);
        stc.util.setCookie("stc_suggest_denied", "0", -1);
        stc.geo.suggestMemberSite(stc.geo.members.GB, $('#qunit-fixture'), -1);
        assert.ok($('.modal-body').text().indexOf(stc.geo.members.GB.title) > 1, "The modal window was opened and set to the right country");
        $('#memberSuggestModal').modal('hide');
    });
    
});
