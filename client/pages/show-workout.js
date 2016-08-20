'use strict';

var App = require('ampersand-app');
var View = require('ampersand-view');
var ActivityView = require('../views/workout-activity');
var ActivityShortView = require('../views/workout-activity-short');

module.exports = View.extend({
    template: require('../templates/pages/show-workout.jade'),
    props: {
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
        'model.name': {
            type: 'text',
            hook: 'workoutName'
        },
        'model.formattedDate': {
            type: 'text',
            hook: 'workoutDate'
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
        'model.shareLink': [{
            type: 'attribute',
            hook: 'share-link',
            name: 'href'
        }, {
            type: 'text',
            hook: 'share-link'
        }],
        'model.canShare': {
            type: 'toggle',
            hook: 'share-show'
        }
    },
    events: {
        'click [data-hook=change-format]': 'changeFormat',
        'click [data-hook=share-button]': 'share'
    },
    share: function (e) {

        e.preventDefault();
        return $(this.queryByHook('share-modal')).foundation('reveal', 'open');
    },
    render: function () {

        this.renderWithTemplate();
        this.renderCollection(this.model.activities, ActivityView, this.queryByHook('activities-long'));
        this.renderCollection(this.model.activities, ActivityShortView, this.queryByHook('activities-short'));
    },
    changeFormat: function (e) {

        e.preventDefault();
        this.format = e.target.hash.slice(1);
        window.location.hash = this.format;
    }
});
