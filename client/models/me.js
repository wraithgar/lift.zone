var app = require('ampersand-app');
var BaseModel = require('./base');

module.exports = BaseModel.extend({
    url: function () { return app.apiUrl + '/me'; },
    props: {
        id: 'number',
        login: 'string',
        name: 'string'
    }
});
