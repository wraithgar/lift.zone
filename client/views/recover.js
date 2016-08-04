'use strict';

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
            token: this.parent.token,
            password: password,
            passwordConfirm: passwordConfirm
        };
        var syncOptions = {
            url: App.apiUrl + '/user/reset',
            json: payload,
            success: function (resp) {

                App.setAccessToken(resp.token);
                App.navigate('/');
                App.view.message = 'All set, from now on log in with that password.  Go use the lift zone';
            },
            error: function () {

                App.view.message = 'Invalid recovery token.';
            }
        };
        Sync('create', null, syncOptions);
    }
});


