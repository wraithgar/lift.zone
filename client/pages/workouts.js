'use strict';

var View = require('ampersand-view');
var App = require('ampersand-app');
var SummaryView = require('../views/workout-summary');
var PaginatedSubcollection = require('ampersand-paginated-subcollection');
var Dom = require('ampersand-dom');

var perPage = 5;

module.exports = View.extend({
    initialize: function () {

        this.workoutSummaries = new PaginatedSubcollection(App.workoutSummaries, {
            limit: perPage
        });
    },
    rePaginate: function () {

        var offset = App.workoutSummaries.length - perPage;
        var prev = this.queryByHook('workoutsPrev');
        Dom.removeClass(prev, 'disabled');
        Dom.removeAttribute(prev, 'disabled');

        if (offset < 0) {
            offset = 0;
        }
        if (offset === 0) {
            Dom.addClass(prev, 'disabled');
            Dom.addAttribute(prev, 'disabled');
        }
        this.workoutSummaries.configure({ offset: offset });
    },
    render: function () {

        this.renderWithTemplate();
        this.renderCollection(this.workoutSummaries, SummaryView, this.queryByHook('summaries'));
        this.listenToAndRun(App.workoutSummaries, 'reset', this.rePaginate);
    },
    template: require('../templates/pages/workouts.jade'),
    events: {
        'click [data-hook=workoutsPrev]': 'prevWorkouts',
        'click [data-hook=workoutsNext]': 'nextWorkouts'
    },
    prevWorkouts: function () {

        var prev = this.queryByHook('workoutsPrev');
        var next = this.queryByHook('workoutsNext');
        var offset = this.workoutSummaries.offset - perPage;
        Dom.removeClass(next, 'disabled');
        Dom.removeAttribute(next, 'disabled');
        Dom.removeClass(prev, 'disabled');
        Dom.removeAttribute(prev, 'disabled');
        if (offset < 0) {
            offset = 0;
        }
        if (offset === 0) {
            Dom.addAttribute(prev, 'disabled');
            Dom.addClass(prev, 'disabled');
        }
        this.workoutSummaries.configure({ offset: offset });
    },
    nextWorkouts: function () {

        var prev = this.queryByHook('workoutsPrev');
        var next = this.queryByHook('workoutsNext');
        var max = App.workoutSummaries.length - perPage;
        var offset = this.workoutSummaries.offset + perPage;
        Dom.removeClass(next, 'disabled');
        Dom.removeAttribute(next, 'disabled');
        Dom.removeClass(prev, 'disabled');
        Dom.removeAttribute(prev, 'disabled');
        if (offset + perPage > App.workoutSummaries.length) {
            offset = max;
        }
        if (offset === max) {
            Dom.addAttribute(next, 'disabled');
            Dom.addClass(next, 'disabled');
        }
        this.workoutSummaries.configure({ offset: offset });
    }

});
