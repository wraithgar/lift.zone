'use strict';

var View = require('ampersand-view');

module.exports = View.extend({
    template: require('../templates/pages/old-news.pug'),
    session: {
        assetsUrl: 'string'
    }
});


