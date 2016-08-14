'use strict';

var App = require('ampersand-app');
var View = require('ampersand-view');
var ActivityView = require('../views/activity');

module.exports = View.extend({
    template: require('../templates/pages/show-workout.jade'),
    initialize: function (options) {

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
            hook: 'editLink',
            name: 'href'
        }
    },
    render: function () {

        this.renderWithTemplate();
        this.renderCollection(this.model.activities, ActivityView, this.queryByHook('activities'));
    }
});
