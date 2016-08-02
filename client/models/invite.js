'use strict';

const Model = require('ampersand-model');
const ApiMixin = require('./mixins/api');
const App = require('ampersand-app');

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
