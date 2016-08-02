'use strict';

const View = require('ampersand-view');
const App = require('ampersand-app');
const Sync = require('ampersand-sync');

module.exports = View.extend({
    template: require('../templates/views/signup.jade'),
    events: {
        'submit form': 'signup'
    },
    signup: function (e) {

        e.preventDefault();
        const self = this;
        const payload = {
            invite: self.model.token,
            name: self.query('[name=name]').value,
            email: self.query('[name=email]').value,
            password: self.query('[name=password]').value,
            passwordConfirm: self.query('[name=passwordConfirm]').value
        };
        const syncOptions = {
            url: App.apiUrl + '/user/signup',
            json: payload,
            success: function (response) {

                App.setAccessToken(response.token);
                App.navigate('/');
            },
            error: function (err) {

                if (err.statusCode === 409) {
                    $(self.queryByHook('taken')).foundation('reveal', 'open');
                }
                else {
                    $(self.queryByHook('error')).foundation('reveal', 'open');
                }
            }
        };
        Sync('create', null, syncOptions);
    }
});
