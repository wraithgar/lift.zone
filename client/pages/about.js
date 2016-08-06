'use strict';

var View = require('ampersand-view');

module.exports = View.extend({
    template: require('../templates/pages/about.jade'),
    session: {
        assetsUrl: 'string'
    }
});
