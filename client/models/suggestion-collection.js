'use strict';

var Collection = require('ampersand-collection');
var Suggestion = require('./suggestion');

module.exports = Collection.extend({
    model: Suggestion,
    comparator: 'rank'
});
