var View = require('ampersand-view');
var app = require('ampersand-app');
var sync = require('ampersand-sync');

module.exports = View.extend({
    template: require('../templates/views/requestValidation.jade'),
    events: {
        'click [data-hook=request]': 'request'
    },
    bindings: {
        'model.email': {
            type: 'text',
            hook: 'email'
        },
    },
    request: function () {
        app.view.message = '';
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
        sync('create', null, syncOptions);
    }
});
