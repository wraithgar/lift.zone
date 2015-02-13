var app = require('ampersand-app');
var BaseModel = require('./base');

module.exports = BaseModel.extend({
    url: function () { return app.apiUrl + '/me'; },
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
        validated: 'number',
    },
    derived: {
        invalid: {
            deps: ['validated'],
            fn: function () {
                return this.validated !== 1;
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
    }
});
