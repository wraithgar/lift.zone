'use strict';

var View = require('ampersand-view');
var ActivityView = require('../views/workout-activity');
var ActivityShortView = require('../views/workout-activity-short');

module.exports = View.extend({
    template: require('../templates/pages/public-workout.jade'),
    initialize: function () {

        this.format = window.location.hash.slice(1) || 'short';
    },
    props: {
        format: 'string'
    },
    bindings: {
        format: [{
            type: 'switch',
            cases: {
                'long': '[data-hook=long-format]',
                'short': '[data-hook=short-format]',
                'raw': '[data-hook=raw-format]'
            }
        }, {
            type: 'switchClass',
            name: 'active',
            cases: {
                'long': '[data-hook=format-nav-long]',
                'short': '[data-hook=format-nav-short]',
                'raw': '[data-hook=format-nav-raw]'
            }

        }],
        'model.user_name': {
            type: 'text',
            hook: 'workoutUser'
        },
        'model.name': {
            type: 'text',
            hook: 'workout-name'
        },
        'model.formattedDate': {
            type: 'text',
            hook: 'workout-date'
        },
        'model.raw': {
            type: 'text',
            hook: 'raw'
        }
    },
    events: {
        'click [data-hook=change-format]': 'changeFormat'
    },
    render: function () {

        var self = this;
        self.renderWithTemplate();
        self.renderCollection(self.model.activities, ActivityView, self.queryByHook('activities-long'));
        self.renderCollection(self.model.activities, ActivityShortView, self.queryByHook('activities-short'));
        self.model.fetchPublic({
            error: function () {

                self.template = require('../templates/pages/not-found.jade');
                self.renderWithTemplate();
            }
        });
    },
    changeFormat: function (e) {

        e.preventDefault();
        this.format = e.target.hash.slice(1);
        window.location.hash = this.format;
    }
});
