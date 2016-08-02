'use strict';

const Collection = require('ampersand-collection');

module.exports = Collection.extend({
    model: require('./set')
});

