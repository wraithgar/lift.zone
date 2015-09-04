var Model = require('./base');
var app = require('ampersand-app');

module.exports = Model.extend({
    urlRoot: function () { return app.apiUrl + '/invite'; },
    type: 'invite',
    idAttribute: 'code',
    props: {
        code: 'string'
    }
});

