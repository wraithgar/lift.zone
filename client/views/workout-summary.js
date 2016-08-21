'use strict';

var View = require('ampersand-view');
module.exports = View.extend({
    bindings: {
        'model.link': {
            type: 'attribute',
            hook: 'workout-name',
            name: 'href'
        },
        'model.name': {
            type: 'text',
            hook: 'workout-name'
        },
        'model.date': {
            type: 'text',
            hook: 'workout-date'
        },
        'model.activityLabel': {
            type: 'text',
            hook: 'workout-activities'
        }
    },
    template: require('../templates/views/workout-summary.jade')
});
