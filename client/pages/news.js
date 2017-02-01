'use strict';

var View = require('ampersand-view');

module.exports = View.extend({
    template: require('../templates/pages/news.pug'),
    session: {
        assetsUrl: 'string'
    }
});

