'use strict';

const View = require('ampersand-view');
const App = require('ampersand-app');
const Sync = require('ampersand-sync');

module.exports = View.extend({
    template: require('../templates/views/recover.jade'),
    events: {
        'submit form': 'reset'
    },
    reset: function (e) {

        e.preventDefault();
        const password = this.query('[name=password]').value;
        const passwordConfirm = this.query('[name=passwordConfirm]').value;
        const payload = {
            token: this.parent.token,
            password: password,
            passwordConfirm: passwordConfirm
        };
        const syncOptions = {
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


