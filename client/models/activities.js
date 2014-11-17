var Collection = require('ampersand-collection');
var Activity = require('models/activity');

module.exports = Collection.extend({
    model: Activity
});
