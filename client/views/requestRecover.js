var View = require('ampersand-view');
var app = require('ampersand-app');
var sync = require('ampersand-sync');

module.exports = View.extend({
    template: require('../templates/views/requestRecover.jade'),
    events: {
        'submit form': 'request'
    },
    render: function () {
        this.renderWithTemplate(this);
        $(this.el).foundation();
        return this;
    },
    request: function (e) {
        e.preventDefault(e);
        app.view.message = '';
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
            headers: app.me.ajaxConfig().headers,
            url: app.apiUrl + '/recover',
            data: JSON.stringify(payload),
            success: function (model, resp) {
                app.view.message = 'Email sent, good luck.  Check your inbox and click the link.  The link expires in one day.';
            },
            error: function () {
                app.view.message = 'Unknown error trying to validate.';
            }
        };
        sync('create', null, syncOptions);
    }
});
