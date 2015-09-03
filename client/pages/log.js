/*global $*/
'use strict';

var caber = require('caber');
var debounce = require('lodash.debounce');
var moment = require('moment');
var app = require('ampersand-app');

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
        this.throttledParse = debounce(this.userInputChanged, 500);
        this.listenTo(this.model, 'change:date', this.checkExisting);
        this.checkExisting(this.model, this.model.dateId);
    },
    events: {
        'change [data-hook=smartMode]': 'changeSmartMode',
        'input [data-hook=workoutInput]': 'throttledParse',
        'input [data-hook=nameInput]': 'setName',
        'input [data-hook=dateInput]': 'setDate',
        'click [data-hook=saveWorkout]': 'saveWorkout'
    },
    checkExisting: function (model, newDate) {
        var self = this;
        model.checkExisting(newDate, function () {
            if (model.exists) {
                return $(self.queryByHook('workoutExists')).foundation('reveal', 'open');
            }
        });
    },
    bindings: {
        smartMode: [{
            type: 'booleanClass',
            hook: 'smartLabel',
            yes: 'success',
            no: 'info'
        }, {
            type: 'toggle',
            no: '[data-hook=nameLabel]'
        }, {
            type: 'toggle',
            no: '[data-hook=dateLabel]'
        }],
        smartLabel: {
            type: 'text',
            hook: 'smartLabel'
        },
        'model.name': {
            type: 'text',
            hook: 'workoutName'
        },
        'model.formattedDate': {
            type: 'text',
            hook: 'workoutDate'
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
        this.renderCollection(this.model.activities, ActivityView, this.queryByHook('workoutActivities'));
        return this;
    },
    changeSmartMode: function (e) {
        this.smartMode = e.target.checked;
        this.parseWorkout(this.queryByHook('workoutInput'));
    },
    setName: function (e) {
        var name = e.target.value;
        if (name === '') {
            this.model.unset('name');
        } else {
            this.model.name = e.target.value;
        }
    },
    setDate: function (e) {
        var date = e.target.value;
        if (date === '') {
            this.model.unset('date');
        } else {
            this.model.date = moment(e.target.value, dateFormats);
        }
    },
    userInputChanged: function(e) {
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
            } else {
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
        var workout;
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
            this.model.unset('date');
            this.model.activities.reset();
            return;
        }
        workout = caber.workout(data);
        if (workout.name) {
            this.model.name = workout.name;
        } else {
            this.model.unset('name');
        }
        if (workout.date) {
            this.model.date = moment(workout.date, dateFormats);
        } else {
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
            return $(self.queryByHook('workoutExists')).foundation('reveal', 'open');
        }
        if (!ready) {
            return $(self.queryByHook('newActivities')).foundation('reveal', 'open');
        }
        self.model.save(null, {
            success: function () {
                app.navigate('/workouts/' + self.model.dateId);
            }
        });
    }
});
