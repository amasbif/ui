(function() {
    'use strict';
 
    var page = require('webpage').create(),
        args = require('system').args,
        url = args[1];
 
    /**
     * Evaluate the page once initialised using the watch function.
     */
    page.onInitialized = function() {
        page.evaluate(watch);
    };
 
    /**
     * Whenever the page receives a callback, check if QUnit
     * is finished, and exit with the appropriate status.
     *
     * 1 === failed
     * 0 === passed
     */
    page.onCallback = function(message) {
 
        // Multiple callbacks can be passed to the page, but the only
        // one which should cause an exit is when the QUnit.done event
        // is fired.
 
        if (message && message.name === 'QUnit.done') {
            // The build will fail if there is no data passed to us by QUnit
            // or if there was at least one failing test.
            var failed = !message.data || message.data.failed;
            phantom.exit(failed ? 1 : 0);
        }
    };
 
    /**
     * Open a page at the url specified. The onInitialized event defined
     * above will be triggered automatically in order to evaluate the page.
     */
    page.open(url, function(status) {
        // If the page failed to open, exit as a failing build.
        if (status !== 'success') {
            phantom.exit(1);
        } 
 
        // Nothing else needs doing because the onInitialized event 
        // will now fire and trigger the defined callback above.
 
    });
 
    /**
     * Evaluates a given page, listening for the QUnit.done event.
     *
     * It's possible to listen to many more events than just the QUnit.done
     * event, such as logging, and individual tests finishing. You could then
     * log these events to the page, and have PhantomJS output the text to 
     * Travis.
     */
    function watch() {
        window.document.addEventListener('DOMContentLoaded', function() {
            // Once QUnit is finished, we trigger a callback to the page and
            // pass the results of the tests to it for evaluation.
            QUnit.done(function(result) {
                window.callPhantom({
                    'name': 'QUnit.done',
                    'data': result
                });
            });
        }, false);
    };
})();