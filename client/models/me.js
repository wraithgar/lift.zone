'use strict';

var App = require('ampersand-app');
var Model = require('ampersand-model');
var ApiMixin = require('./mixins/api');

module.exports = Model.extend(ApiMixin, {
    url: function () {

        return App.apiUrl + '/user';
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
        if (this.loggedIn) {
            this.fetch();
        }
    },
    props: {
        id: 'string',
        name: 'string',
        email: 'string',
        validated: 'boolean',
        preferences: 'object',
        password: 'string',
        passwordConfirm: 'string'
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
                    return '#/me';
                }
                return '#/login';
            }
        }
    },
    session: {
        loggedIn: ['boolean', true, false]
    },
    authenticate: function (email, password, options) {

        var payload = {
            email: email,
            password: password
        };
        var syncOptions = {
            url: App.apiUrl + '/user/login',
            json: payload,
            success: options.success,
            error: options.error
        };
        this.sync('create', this, syncOptions);
    }
});
