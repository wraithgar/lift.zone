'use strict';

const View = require('ampersand-view');
const App = require('ampersand-app');
const Sync = require('ampersand-sync');

module.exports = View.extend({
    template: require('../templates/views/request-validation.jade'),
    events: {
        'click [data-hook=request]': 'request'
    },
    bindings: {
        'model.email': {
            type: 'text',
            hook: 'email'
        }
    },
    request: function () {

        App.view.message = '';
        const syncOptions = {
            headers: App.me.ajaxConfig().headers,
            url: App.apiUrl + '/user/validate',
            success: function (model, resp) {

                App.view.message = 'Email sent.  Check your inbox and click the link.  The link expires in one day.';
            },
            error: function () {

                App.view.message = 'Unknown error trying to validate.';
            }
        };
        Sync('create', null, syncOptions);
    }
});
