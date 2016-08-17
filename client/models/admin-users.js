'use strict';

var App = require('ampersand-app');
var Collection = require('ampersand-rest-collection');
var State = require('ampersand-state');

var ApiMixin = require('./mixins/api-collection');

var AdminUser = State.extend({
    props: {
        id: 'string',
        name: 'string',
        email: 'string',
        validated: 'boolean',
        activities: 'number',
        workouts: 'number',
        invites: 'number'
    }
});

var AdminUsersCollection = Collection.extend(ApiMixin, {
    url: function () {

        return App.apiUrl + '/admin/users';
    },
    model: AdminUser
});

module.exports = AdminUsersCollection;
