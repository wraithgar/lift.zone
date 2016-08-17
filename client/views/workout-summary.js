'use strict';

var View = require('ampersand-view');
module.exports = View.extend({
    bindings: {
        'model.link': {
            type: 'attribute',
            hook: 'workoutName',
            name: 'href'
        },
        'model.name': {
            type: 'text',
            hook: 'workoutName'
        },
        'model.date': {
            type: 'text',
            hook: 'workoutDate'
        },
        'model.activityLabel': {
            type: 'text',
            hook: 'workoutActivities'
        }
    },
    template: require('../templates/views/workout-summary.jade')
});
