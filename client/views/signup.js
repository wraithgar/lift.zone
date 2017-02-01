'use strict';

var View = require('ampersand-view');
var App = require('ampersand-app');
var Sync = require('ampersand-sync');

module.exports = View.extend({
    template: require('../templates/views/signup.pug'),
    events: {
        'submit form': 'signup'
    },
    signup: function (e) {

        e.preventDefault();
        var self = this;
        var payload = {
            invite: self.model.token,
            name: self.query('[name=name]').value,
            email: self.query('[name=email]').value,
            password: self.query('[name=password]').value,
            passwordConfirm: self.query('[name=passwordConfirm]').value
        };
        var syncOptions = {
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
