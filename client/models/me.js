var app = require('ampersand-app');
var Model = require('./base');

module.exports = Model.extend({
    url: function () { return app.apiUrl + '/me'; },
    type: 'user',
    initialize: function () {
        this.listenTo(app, 'accessToken', function () {
            this.loggedIn = app.accessToken !== undefined;
            if (this.loggedIn) {
                this.fetch();
            }
        });
        this.loggedIn = app.accessToken !== undefined;
        if (this.loggedIn) { this.fetch(); }
    },
    props: {
        id: 'number',
        login: 'string',
        name: 'string',
        validated: 'boolean',
        dateFormat: ['string', 'true', 'dddd, MMM Do YYYY']
    },
    derived: {
        invalid: {
            deps: ['validated'],
            fn: function () {
                return !this.validated;
            }
        },
        displayName: {
            deps: ['loggedIn', 'name'],
            fn: function () {
                if (this.loggedIn) {
                    return this.name;
                }
                return 'Log in';
            }
        },
        link: {
            deps: ['loggedIn'],
            fn: function () {
                if (this.loggedIn) {
                    return '/me';
                }
                return '/login';
            }
        }
    },
    session: {
        loggedIn: ['boolean', true, false]
    },
    authenticate: function (login, password, options) {
        var payload = {
            data: {
                type: 'login',
                attributes: {
                    login: login,
                    password: password
                }
            }
        };
        var syncOptions = {
            url: app.apiUrl + '/login',
            data: JSON.stringify(payload),
            success: options.success,
            error: options.error
        };
        this.sync('create', this, syncOptions);
    }
});
