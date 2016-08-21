'use strict';

var View = require('ampersand-view');

module.exports = View.extend({
    template: require('../templates/views/markdown-short.jade'),
    bindings: {
        'model.name': {
            type: 'text',
            hook: 'name'
        },
        'model.comment': {
            type: 'text',
            hook: 'comment'
        },
        'model.hasComment': {
            type: 'toggle',
            hook: 'comment-label'
        }
    }
});
