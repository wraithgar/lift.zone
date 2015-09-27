var Model = require('ampersand-model');
var ApiMixin = require('./mixins/api');
var App = require('ampersand-app');

module.exports = Model.extend(ApiMixin, {
    urlRoot: function () {

        return App.apiUrl + '/invite';
    },
    type: 'invite',
    idAttribute: 'code',
    props: {
        code: 'string'
    }
});

