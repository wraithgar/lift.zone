'use strict';

var View = require('ampersand-view');
var App = require('ampersand-app');
var SummaryView = require('../views/workout-summary');

//TODO paginated subcollection of App.workoutSummaries
module.exports = View.extend({
    render: function () {

        this.renderWithTemplate();
        this.renderCollection(App.workoutSummaries, SummaryView, this.queryByHook('summaries'));
    },
    template: require('../templates/pages/workouts.jade')
});

