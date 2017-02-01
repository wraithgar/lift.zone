'use strict';

var View = require('ampersand-view');

var SetView = View.extend({
    template: require('../templates/views/activity-history-set.pug'),
    bindings: {
        'model.formattedShort': {
            type: 'text',
            hook: 'set'
        },
        'model.pr': {
            type: 'booleanClass',
            hook: 'set',
            class: 'pr'
        }
    }
});

module.exports = View.extend({
    template: require('../templates/views/activity-history.pug'),
    render: function () {

        this.renderWithTemplate();
        this.renderCollection(this.model.sets, SetView, this.queryByHook('sets'));
    },
    bindings: {
        'model.workout_name': {
            type: 'text',
            hook: 'workout-name'
        },
        'model.workout_date': {
            type: 'text',
            hook: 'workout-date'
        },
        'model.showUrl': {
            type: 'attribute',
            name: 'href',
            hook: 'workout-name'
        },
        'model.comment': {
            type: 'text',
            hook: 'activity-comment'
        },
        'model.hasComment': {
            type: 'toggle',
            hook: 'toggle-comment'
        }
    }
});
