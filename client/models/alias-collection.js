var Collection = require('ampersand-rest-collection');
var app = require('ampersand-app');
var AliasModel = require('./alias');

module.exports = Collection.extend({
    url: function () { return app.apiUrl + '/aliases'; },
    model: AliasModel
});
