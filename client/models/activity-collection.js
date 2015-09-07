var Collection = require('ampersand-collection');
var Activity = require('./activity');

module.exports = Collection.extend({
    model: Activity,
    indexes: ['name']
});
