var View = require('ampersand-view');
var App = require('ampersand-app');
var Sync = require('ampersand-sync');

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
            code: this.parent.code,
            password: password,
            passwordConfirm: passwordConfirm
        };
        var syncOptions = {
            url: App.apiUrl + '/reset',
            json: payload,
            success: function (resp) {

                App.setAccessToken(resp.data.token);
                App.me.fetch();
                App.view.message = 'All set, from now on log in with that password.  Go use the lift zone';
            },
            error: function () {

                App.view.message = 'Invalid recovery code.';
            }
        };
        Sync('create', null, syncOptions);
    }
});


