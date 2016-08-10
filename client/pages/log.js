'use strict';

var Caber = require('caber');
var Debounce = require('lodash.debounce');
var Moment = require('moment');
var App = require('ampersand-app');

var View = require('ampersand-view');
var ActivityView = require('../views/activity');

var dateFormats = [
    'MM/DD/YYYY',
    'YYYY/MM/DD',
    'MM-DD-YYYY',
    'YYYY-MM-DD',
    'dddd'
];


module.exports = View.extend({
    template: require('../templates/pages/log.jade'),
    initialize: function () {

        this.throttledParse = Debounce(this.userInputChanged, 500);
        this.listenTo(this.model, 'change:date', this.checkExisting);
        this.checkExisting(this.model, this.model.dateId);
        var year = (new Date()).getFullYear();
        App.workoutDates.fetchYear(year);
    },
    events: {
        'change [data-hook=smartMode]': 'changeSmartMode',
        'input [data-hook=workout-input]': 'throttledParse',
        'input [data-hook=name-input]': 'setName',
        'input [data-hook=date-input]': 'setDate',
        'click [data-hook=saveWorkout]': 'saveWorkout'
    },
    checkExisting: function (model, newDate, ctx) {

        if (!ctx || !ctx.xhr) {
            var date =  Moment(newDate).format('YYYY-MM-DD');
            var exists = App.workoutDates.get(date);
            if (exists) {

                return $(this.queryByHook('workout-exists')).foundation('reveal', 'open');
            }
        }
    },
    bindings: {
        smartMode: [{
            type: 'booleanClass',
            hook: 'smartLabel',
            yes: 'success',
            no: 'info'
        }, {
            type: 'toggle',
            no: '[data-hook=name-label]'
        }, {
            type: 'toggle',
            no: '[data-hook=date-label]'
        }],
        smartLabel: {
            type: 'text',
            hook: 'smartLabel'
        },
        'model.name': {
            type: 'text',
            hook: 'workout-name'
        },
        'model.formattedDate': {
            type: 'text',
            hook: 'workout-date'
        }
    },
    props: {
        smartMode: ['boolean', true, true]
    },
    derived: {
        smartLabel: {
            deps: ['smartMode'],
            fn: function () {

                if (this.smartMode) {
                    return 'on';
                }
                return 'off';
            }
        }
    },
    render: function () {

        this.renderWithTemplate();
        this.renderCollection(this.model.activities, ActivityView, this.queryByHook('workout-activities'));
        return this;
    },
    changeSmartMode: function (e) {

        this.smartMode = e.target.checked;
        this.parseWorkout(this.queryByHook('workout-input'));
    },
    setName: function (e) {

        var name = e.target.value;
        if (name === '') {
            this.model.unset('name');
        }
        else {
            this.model.name = e.target.value;
        }
    },
    setDate: function (e) {

        var date = e.target.value;
        if (date === '') {
            this.model.unset('date');
        }
        else if (this.model.dateId !== Moment(e.target.value, dateFormats).format('YYYY-MM-DD')) {
            this.model.date = Moment(e.target.value, dateFormats);
        }
    },
    userInputChanged: function (e) {

        this.parseWorkout(e.target);
    },
    addActivities: function (activities) {

        var activityNames = [];
        //We need to do a janky merge by alternate index so that our search() functions only have to run once
        //find things to add
        activities.forEach(function (activity) {

            activityNames.push(activity.name);
            if (!this.model.activities.get(activity.name, 'name')) {
                this.model.activities.add(activity);
            }
            else {
                this.model.activities.get(activity.name, 'name').set(activity);
            }
        }, this);
        //find things to remove
        this.model.activities.forEach(function (activity) {

            if (activityNames.indexOf(activity.name) === -1) {
                this.model.activities.remove(activity);
            }
        }, this);
    },
    parseWorkout: function (el) {

        var data = el.value;
        this.model.raw = data;
        if (!this.smartMode) {
            this.model.unset('date');
            this.model.name = 'Workout';
            this.addActivities(workout.activities);
            return;
        }
        if (!data) {
            this.model.unset('name');
            if (this.model.dateId !== Moment().format('YYYY-MM-DD')) {
                this.model.unset('date');
            }
            this.model.activities.reset();
            return;
        }
        var workout = Caber.workout(data);
        if (workout.name) {
            this.model.name = workout.name;
        }
        else {
            this.model.unset('name');
        }
        if (workout.date) {
            if (this.model.dateId !== workout.date.format('YYYY-MM-DD')) {
                this.model.date = workout.date;
            }
        }
        else if (this.model.dateId !== Moment().format('YYYY-MM-DD')) {
            this.model.unset('date');
        }
        this.addActivities(workout.activities);
    },
    saveWorkout: function () {

        var self = this;
        var ready = self.model.activities.every(function (activity) {

            return activity.ready;
        });
        if (this.model.exists) {
            return $(self.queryByHook('workout-exists')).foundation('reveal', 'open');
        }
        if (!ready) {
            return $(self.queryByHook('new-activities')).foundation('reveal', 'open');
        }
        self.model.save(null, {
            success: function () {

                App.navigate('/workouts/' + self.model.dateId);
            }
        });
    }
});
