/*global app*/
var BaseModel = require('./base');

module.exports = BaseModel.extend({
    urlRoot: function () { return app.apiUrl + '/me'; },
    props: {
        id: 'number',
        login: 'string',
        name: 'string'
    }
});
