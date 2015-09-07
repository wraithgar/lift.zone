var View = require('ampersand-view');
var App = require('ampersand-app');
var Sync = require('ampersand-sync');

module.exports = View.extend({
    template: require('../templates/views/request-recover.jade'),
    events: {
        'submit form': 'request'
    },
    request: function (e) {

        e.preventDefault(e);
        App.view.message = '';
        var email = this.query('[name=email]').value;
        var payload = {
            data: {
                type: 'login',
                attributes: {
                    email: email
                }
            }
        };
        var syncOptions = {
            headers: App.me.ajaxConfig().headers,
            url: App.apiUrl + '/recover',
            data: JSON.stringify(payload),
            success: function (model, resp) {

                App.view.message = 'Email sent, good luck.  Check your inbox and click the link.  The link expires in one day.';
            },
            error: function () {

                App.view.message = 'Unknown error trying to validate.';
            }
        };
        Sync('create', null, syncOptions);
    }
});
