var caber = require('caber');
var debounce = require('lodash.debounce');
var moment = require('moment');

var BasePage = require('./base');
var ActivityView = require('../views/activity');
var templates = require('../templates');

var dateFormats = [
    'MM/DD/YYYY',
    'YYYY/MM/DD',
    'MM-DD-YYYY',
    'YYYY-MM-DD',
    'dddd'
];


module.exports = BasePage.extend({
    template: templates.pages.log,
    initialize: function () {
        this.throttledParse = debounce(this.userInputChanged, 500);
    },
    events: {
        'change [data-hook=smartMode]': 'changeSmartMode',
        'input [data-hook=workoutInput]': 'throttledParse',
        'input [data-hook=nameInput]': 'setName',
        'input [data-hook=dateInput]': 'setDate'
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
                } else {
                    return 'off';
                }
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
    parseWorkout: function (el) {
        var workout;
        var data = el.value;
        if (!this.smartMode) {
            this.model.unset('date');
            this.model.name = 'Workout';
            this.model.activities.reset(caber.parse(data));
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
        console.log(workout.activities);
        this.model.activities.reset(workout.activities);
    }

});


