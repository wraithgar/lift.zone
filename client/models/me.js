'use strict';

var App = require('ampersand-app');
var Model = require('ampersand-model');
var ApiMixin = require('./mixins/api-model');
var InviteCollection = require('./invites');

module.exports = Model.extend(ApiMixin, {
    url: function () {

        return App.apiUrl + '/user';
    },
    type: 'user',
    initialize: function () {

        this.listenToAndRun(App, 'accessToken', function () {

            this.loggedIn = App.accessToken !== undefined;
            if (this.loggedIn) {
                this.fetch({ success: function () {

                    App.workoutSummaries.fetch({ reset: true, success: function () {

                        App.workoutSummaries.fetched = true;
                    } });
                } });
            }
        });
    },
    props: {
        id: 'string',
        name: 'string',
        email: 'string',
        validated: 'boolean',
        preferences: 'object',
        scope: 'array',
        password: 'string',
        passwordConfirm: 'string'
    },
    derived: {
        isAdmin: {
            deps: ['scope'],
            fn: function () {

                if (!this.scope) {
                    return false;
                }
                return this.scope.indexOf('admin') > -1;
            }
        },
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
        },
        weightLb: {
            deps: ['preferences'],
            fn: function () {

                if (this.preferences.weightUnit === 'lb') {
                    return true;
                }
                return false;
            }
        }
    },
    session: {
        loggedIn: ['boolean', true, false]
    },
    collections: {
        invites: InviteCollection
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
