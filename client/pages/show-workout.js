'use strict';

var App = require('ampersand-app');
var View = require('ampersand-view');
var ActivityView = require('../views/workout-activity');
var ActivityShortView = require('../views/workout-activity-short');
var WorkoutShareView = require('../views/workout-share');

module.exports = View.extend({
    template: require('../templates/pages/show-workout.jade'),
    session: {
        format: 'string'
    },
    initialize: function (options) {

        this.format = window.location.hash.slice(1) || 'short';
        var workoutSummary = App.workoutSummaries.get(options.date);
        if (!workoutSummary) {
            this.template = require('../templates/pages/not-found.jade');
        }
        else {
            this.model.id = workoutSummary.id;
            this.model.fetch();
        }
    },
    bindings: {
        format: [{
            type: 'switch',
            cases: {
                'long': '[data-hook=long-format]',
                'short': '[data-hook=short-format]',
                'raw': '[data-hook=raw-format]',
                'share': '[data-hook=share-format]'
            }
        }, {
            type: 'switchClass',
            name: 'active',
            cases: {
                'long': '[data-hook=format-nav-long]',
                'short': '[data-hook=format-nav-short]',
                'raw': '[data-hook=format-nav-raw]',
                'share': '[data-hook=format-nav-share]'
            }

        }],
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
        },
        'model.editLink': {
            type: 'attribute',
            hook: 'edit-link',
            name: 'href'
        },
        'model.canShare': {
            type: 'toggle',
            hook: 'share-format'
        }
    },
    events: {
        'click [data-hook=change-format]': 'changeFormat'
    },
    render: function () {

        this.renderWithTemplate();
        this.renderSubview(new WorkoutShareView({ model: this.model }), this.queryByHook('share-format'));
        this.renderCollection(this.model.activities, ActivityView, this.queryByHook('activities-long'));
        this.renderCollection(this.model.activities, ActivityShortView, this.queryByHook('activities-short'));
    },
    changeFormat: function (e) {

        e.preventDefault();
        this.format = e.target.hash.slice(1);
        window.location.hash = this.format;
    }
});
