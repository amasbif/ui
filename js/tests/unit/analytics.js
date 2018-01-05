(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-3139343-4', 'auto');

jQuery(function ($) {
    QUnit.test('should send an event to GA', function (assert) {
        var done = assert.async();
        stc.analytics.sendPageView('test');
        //wait for callback to get hit
        window.setTimeout(function() {
            assert.ok(stc.analytics.lastEventTime > 0, "The GA event was recorded correctly");
            done();
        }, 100);
    });
});
