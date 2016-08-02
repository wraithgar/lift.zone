'use strict';

const Collection = require('ampersand-collection');
const Suggestion = require('./suggestion');

module.exports = Collection.extend({
    model: Suggestion
});
