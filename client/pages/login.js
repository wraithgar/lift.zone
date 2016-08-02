'use strict';

const View = require('ampersand-view');
const App = require('ampersand-app');

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
        return this;
    },
    authenticate: function (e) {

        e.preventDefault();
        App.view.message = '';
        const email = this.query('[name=email]').value;
        const password = this.query('[name=password]').value;
        App.me.authenticate(email, password, {
            success: function (response) {

                App.setAccessToken(response.token);
                App.navigate('/');
            },
            error: function (model, resp) {

                App.log(resp);
                App.view.message = 'Invalid login.  Please try again.';
            }
        });
    }
});

