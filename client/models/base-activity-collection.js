'use strict';

const Collection = require('ampersand-collection');
const Activity = require('./base-activity');

module.exports = Collection.extend({
    model: Activity,
    indexes: ['name']
});

