var Model = require('ampersand-model');
var JsonApiMixin = require('./mixins/json-api');
var app = require('ampersand-app');

module.exports = Model.extend(JsonApiMixin, {
    urlRoot: function () { return app.apiUrl + '/invite'; },
    type: 'invite',
    idAttribute: 'code',
    props: {
        code: 'string'
    }
});

