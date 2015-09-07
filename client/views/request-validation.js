var View = require('ampersand-view');
var App = require('ampersand-app');
var Sync = require('ampersand-sync');

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
        var syncOptions = {
            headers: app.me.ajaxConfig().headers,
            url: app.apiUrl + '/validate',
            success: function (model, resp) {

                app.view.message = 'Email sent.  Check your inbox and click the link.  The link expires in one week.';
            },
            error: function () {

                app.view.message = 'Unknown error trying to validate.';
            }
        };
        Sync('create', null, syncOptions);
    }
});
