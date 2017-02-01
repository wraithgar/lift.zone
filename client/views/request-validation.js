'use strict';

var View = require('ampersand-view');
var App = require('ampersand-app');
var Sync = require('ampersand-sync');

module.exports = View.extend({
    template: require('../templates/views/request-validation.pug'),
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
        var syncOptions = {
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
