'use strict';

var View = require('ampersand-view');

module.exports = View.extend({
    template: require('../templates/views/admin-user.jade'),
    bindings: {
        'model.name': {
            type: 'text',
            hook: 'name'
        },
        'model.validated': {
            type: 'toggle',
            hook: 'validated'
        },
        'model.workouts': {
            type: 'text',
            hook: 'workouts'
        },
        'model.activities': {
            type: 'text',
            hook: 'activities'
        },
        'model.invites': {
            type: 'text',
            hook: 'invites'
        }
    }
});

