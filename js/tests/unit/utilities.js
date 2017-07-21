jQuery(function ($) {
    QUnit.test('should successfully create a cookie', function (assert) {
        assert.expect(1);
        //set a test cookie with a random value
        var cookieValue = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        stc.util.setCookie('unit_test', cookieValue, 1);
        assert.equal(stc.util.getCookie('unit_test'), cookieValue, "Cookie has the expected value");
    });

    QUnit.test('should successfully create a custom event and corresponding listener', function (assert) {
        assert.expect(1);
        //listen to custom event
        $(window).on("testEvent", function() {
            assert.ok(true, "The event was dispatched correctly");
        });
        // dispatch event
        stc.util.createEvent("testEvent");
    });

    QUnit.test('should correctly detect a local URL and output absolute URLs', function (assert) {
        assert.expect(2);
        var url = "/test/local/url";
        assert.ok(stc.util.isLocalUrl(url), "URL is correctly detected as local");
        assert.ok(stc.util.absoluteUrl(url).indexOf(url) > 1 && /^(?:[a-z]+:)?\/\//.test(stc.util.absoluteUrl(url)), "Absolute URL correctly given" + stc.util.absoluteUrl(url));
    });
});
