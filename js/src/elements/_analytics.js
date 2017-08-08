var stc = stc || {};

window.addEventListener('load', function(){
    window.removeEventListener('load', false);
    if(!window.ga || !ga.create) { 
        return false;
    }
       
    (function(analytics, ga, $){

        /**
         * Gets a GA property by wrapping ga.getAll();
         * @param {string} property The properry to retrieve.
         * @return {unresolved} The GA property if found.
         */
        analytics.getProperty = function(property) {
            return ga.getAll()[0].get(property);
        };
        
        analytics.trackingId = analytics.getProperty('trackingId');
        
        /**
         * Registers a GA ecommerce transaction for a donation.
         * 
         * @param {string} trans_id The transaction ID.
         * @param {string} item_name The product name.
         * @param {string} item_sku The product SKU.
         * @param {number} amount The donation amount.
         * @return {undefined}
         */
        analytics.sendDonation = function(trans_id, item_name, item_sku, amount) {
            if(!trans_id || !item_name || !item_sku || isNaN(amount)) {
                return false;
            }
            ga('require', 'ecommerce');
            ga('ecommerce:addTransaction', {
                'id': trans_id,
                'affiliation': stc.geo.t('Save the Children'),
                'revenue': amount
            });
            ga('ecommerce:addItem', {
                'id': trans_id,
                'name': item_name,
                'sku': item_sku,
                'category': stc.geo.t('Donation'),
                'price': amount,
                'quantity': '1'
            });
            ga('ecommerce:send', {hitCallback: analytics.callback});
        };
        
        /**
         * Sends an event to GA.
         * 
         * @param {type} category The event category.
         * @param {type} action The action to record.
         * @param {type} [label] The event label.
         * @return {undefined}
         */
        analytics.sendEvent = function (category, action, label) {
            if(!category || !action || !label) {
                return false;
            }
            ga('send', {
                hitType: 'event',
                eventCategory: category,
                eventAction: action,
                eventLabel: (label ? label : ''),
                hitCallback: analytics.callback
            });
        };     
        
        /**
         * Sends a page view to GA.
         * 
         * @param {string} [url] The path to record a view against.
         *   Defaults to current path.
         * @return {undefined}
         */
        analytics.sendPageView = function (url) {
            var url = url || location.pathname;
            ga('send', 'pageview', url, {hitCallback: analytics.callback});
        };
        
        analytics.callback = function() {
            analytics.lastEventTime = new Date().getTime();
        };

    }(stc.analytics = stc.analytics || {}, ga, jQuery));

});
