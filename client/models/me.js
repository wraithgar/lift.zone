var App = require('ampersand-app');
var Model = require('ampersand-model');
var JsonApiMixin = require('./mixins/json-api');

module.exports = Model.extend(JsonApiMixin, {
    url: function () {

        return App.apiUrl + '/me';
    },
    type: 'user',
    initialize: function () {

        this.listenTo(App, 'accessToken', function () {

            this.loggedIn = App.accessToken !== undefined;
            if (this.loggedIn) {
                this.fetch();
            }
        });
        this.loggedIn = App.accessToken !== undefined;
        if (this.loggedIn) { this.fetch(); }
    },
    props: {
        id: 'number',
        login: 'string',
        name: 'string',
        email: 'string',
        validated: 'boolean',
        smartmode: 'boolean',
        visible: 'boolean',
        password: 'string',
        passwordConfirm: 'string',
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
            url: App.apiUrl + '/login',
            json: payload,
            success: options.success,
            error: options.error
        };
        this.sync('create', this, syncOptions);
    }
});
