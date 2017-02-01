'use strict';

var View = require('ampersand-view');

module.exports = View.extend({
    template: require('../templates/pages/about.pug'),
    session: {
        assetsUrl: 'string'
    }
});
