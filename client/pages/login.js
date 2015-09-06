var View = require('ampersand-view');
var app = require('ampersand-app');

module.exports = View.extend({
    template: require('../templates/pages/login.jade'),
    events: {
        'submit form': 'authenticate'
    },
    render: function () {
        if (app.me.loggedIn) {
            return app.navigate('/');
        }
        this.renderWithTemplate(this);
        return this;
    },
    authenticate: function (e) {
        e.preventDefault();
        app.view.message = '';
        var login = this.query('[name=login]').value;
        var password = this.query('[name=password]').value;
        app.me.authenticate(login, password, {
            success: function (resp) {
                app.setAccessToken(resp.data.attributes.token);
                app.navigate('/');
            },
            error: function (model, resp) {
                app.log(resp);
                app.view.message = 'Invalid login.  Please try again.';
            }
        });
    }
});

