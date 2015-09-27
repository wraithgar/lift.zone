var View = require('ampersand-view');
var App = require('ampersand-app');
var Sync = require('ampersand-sync');

module.exports = View.extend({
    template: require('../templates/views/signup.jade'),
    events: {
        'submit form': 'signup'
    },
    signup: function (e) {

        e.preventDefault();
        var self = this;
        var payload = {
            invite: self.model.code,
            login: self.query('[name=login]').value,
            name: self.query('[name=name]').value,
            email: self.query('[name=email]').value,
            password: self.query('[name=password]').value,
            passwordConfirm: self.query('[name=passwordConfirm]').value
        };
        var syncOptions = {
            url: App.apiUrl + '/signup',
            json: payload,
            success: function () {

                self.parent.stage = 'done';
            },
            error: function () {

                $(self.queryByHook('error')).foundation('reveal', 'open');
            }
        };
        Sync('create', null, syncOptions);
    }
});
