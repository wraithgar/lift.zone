'use strict';

var View = require('ampersand-view');

var RepView = View.extend({
    template: require('../templates/views/markdown-rep-long.jade'),
    bindings: {
        'model.formattedFull': {
            type: 'text',
            hook: 'rep'
        },
        'model.pr': {
            type: 'toggle',
            hook: 'pr'
        }
    }
});

module.exports = View.extend({
    template: require('../templates/views/markdown-activity.jade'),
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
    },
    render: function () {

        this.renderWithTemplate();
        this.renderCollection(this.model.sets, RepView, this.queryByHook('sets'));
    }
});
