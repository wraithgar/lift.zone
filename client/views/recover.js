var View = require('ampersand-view');
var app = require('ampersand-app');
var sync = require('ampersand-sync');

module.exports = View.extend({
    template: require('../templates/views/recover.jade'),
    events: {
        'submit form': 'reset'
    },
    reset: function (e) {
        e.preventDefault();
        var password = this.query('[name=password]').value;
        var passwordConfirm = this.query('[name=passwordConfirm]').value;
        var payload = {
            data: {
                type: 'reset',
                attributes: {
                    code: this.parent.code,
                    password: password,
                    passwordConfirm: passwordConfirm
                }
            }
        };
        var syncOptions = {
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json'
            },
            url: app.apiUrl + '/reset',
            data: JSON.stringify(payload),
            success: function (resp) {
                app.setAccessToken(resp.data.attributes.token);
                app.me.fetch();
                app.view.message = 'All set, from now on log in with that password.  Go use the lift zone';
            },
            error: function () {
                app.view.message = 'Invalid recovery code.';
            }
        }
        sync('create', null, syncOptions);
    }
});


