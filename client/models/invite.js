var Model = require('ampersand-model');
var JsonApiMixin = require('./mixins/json-api');
var App = require('ampersand-app');

module.exports = Model.extend(JsonApiMixin, {
    urlRoot: function () {

        return App.apiUrl + '/invite';
    },
    type: 'invite',
    idAttribute: 'code',
    props: {
        code: 'string'
    }
});

