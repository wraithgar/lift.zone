var Collection = require('ampersand-collection');
var Activity = require('./base-activity');

module.exports = Collection.extend({
    model: Activity,
    indexes: ['name']
});

