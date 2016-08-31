'use strict';

var View = require('ampersand-view');
var App = require('ampersand-app');

module.exports = View.extend({
    template: require('../templates/pages/login.jade'),
    events: {
        'submit form': 'authenticate'
    },
    render: function () {

        if (App.me.loggedIn) {
            return App.navigate('/');
        }
        this.renderWithTemplate(this);
        $(this.el).foundation();
        return this;
    },
    session: {
        'working': 'boolean',
        'login': ['string', true, 'Log in']
    },
    bindings: {
        login: {
            type: 'attribute',
            name: 'value',
            hook: 'login'
        },
        working: {
            type: 'booleanClass',
            hook: 'login',
            name: 'disabled'
        }
    },
    authenticate: function (e) {

        e.preventDefault();

        var self = this;
        self.login = 'Logging in…';
        self.working = true;
        App.view.message = '';
        var email = self.query('[name=email]').value;
        var password = self.query('[name=password]').value;
        App.me.authenticate(email, password, {
            success: function (response) {

                //enable the page
                App.setAccessToken(response.token);
                App.navigate('/');
            },
            error: function (model, resp) {

                //enable the page
                self.working = false;
                self.login = 'Log in';
                App.log(resp);
                App.view.message = 'Invalid login.  Please try again.';
            }
        });
    }
});

