var View = require('ampersand-view');
var app = require('ampersand-app');
var sync = require('ampersand-sync');

module.exports = View.extend({
    template: require('../templates/views/signup.jade'),
    events: {
        'submit form': 'signup'
    },
    render: function () {
        this.renderWithTemplate(this);
        $(this.el).foundation();
        return this;
    },
    signup: function (e) {
        e.preventDefault();
        var self = this;
        var payload = {
            data: {
                type: 'signup',
                attributes: {
                    invite: self.model.code,
                    login: self.query('[name=login]').value,
                    name: self.query('[name=name]').value,
                    email: self.query('[name=email]').value,
                    password: self.query('[name=password]').value,
                    passwordConfirm: self.query('[name=passwordConfirm]').value
                }
            }
        };
        var syncOptions = {
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json'
            },
            url: app.apiUrl + '/signup',
            data: JSON.stringify(payload),
            success: function () {
                self.parent.stage = 'done';
            },
            error: function (resp) {
                $(self.queryByHook('error')).foundation('reveal', 'open');
            }
        };
        sync('create', null, syncOptions);
    }
});
