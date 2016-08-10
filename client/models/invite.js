'use strict';

var Model = require('ampersand-model');
var ApiMixin = require('./mixins/api-model');
var App = require('ampersand-app');

module.exports = Model.extend(ApiMixin, {
    urlRoot: function () {

        return App.apiUrl + '/invites';
    },
    type: 'invite',
    idAttribute: 'token',
    props: {
        token: 'string'
    }
});
