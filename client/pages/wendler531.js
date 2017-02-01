'use strict';

var View = require('ampersand-view');
var LiftView = require('../views/lift531');
var Debounce = require('lodash.debounce');

var fuzzyNumber = function fuzzyNumber(value) {

    if (value !== '') {
        return Number(value);
    }
    return undefined;
};

module.exports = View.extend({
    template: require('../templates/pages/wendler531.pug'),
    bindings: {
        'model.ohp.ready': {
            type: 'toggle',
            hook: 'ohp-results'
        },
        'model.squat.ready': {
            type: 'toggle',
            hook: 'squat-results'
        },
        'model.bench.ready': {
            type: 'toggle',
            hook: 'bench-results'
        },
        'model.deadlift.ready': {
            type: 'toggle',
            hook: 'deadlift-results'
        }
    },
    initialize: function () {

        this.saveModel = Debounce(this.model.save.bind(this.model), 250);
    },
    render: function () {

        this.renderWithTemplate(this);
        this.renderSubview(new LiftView({ model: this.model.ohp }), this.queryByHook('ohp-results'));
        this.renderSubview(new LiftView({ model: this.model.squat }), this.queryByHook('squat-results'));
        this.renderSubview(new LiftView({ model: this.model.bench }), this.queryByHook('bench-results'));
        this.renderSubview(new LiftView({ model: this.model.deadlift }), this.queryByHook('deadlift-results'));
    },
    events: {
        'input [data-hook=ohp-weight]': 'setOHPWeight',
        'input [data-hook=ohp-reps]': 'setOHPReps',
        'input [data-hook=ohp-extra]': 'setOHPExtra',
        'input [data-hook=squat-weight]': 'setSquatWeight',
        'input [data-hook=squat-reps]': 'setSquatReps',
        'input [data-hook=squat-extra]': 'setSquatExtra',
        'input [data-hook=bench-weight]': 'setBenchWeight',
        'input [data-hook=bench-reps]': 'setBenchReps',
        'input [data-hook=bench-extra]': 'setBenchExtra',
        'input [data-hook=deadlift-weight]': 'setDeadliftWeight',
        'input [data-hook=deadlift-reps]': 'setDeadliftReps',
        'input [data-hook=deadlift-extra]': 'setDeadliftExtra'
    },
    setOHPWeight: function (e) {

        e.preventDefault();
        this.model.ohp.weight = fuzzyNumber(e.target.value);
        this.saveModel();
    },
    setOHPReps: function (e) {

        e.preventDefault();
        this.model.ohp.reps = fuzzyNumber(e.target.value);
        this.saveModel();
    },
    setOHPExtra: function (e) {

        e.preventDefault();
        this.model.ohp.extra = fuzzyNumber(e.target.value);
        this.saveModel();
    },
    setSquatWeight: function (e) {

        e.preventDefault();
        this.model.squat.weight = fuzzyNumber(e.target.value);
        this.saveModel();
    },
    setSquatReps: function (e) {

        e.preventDefault();
        this.model.squat.reps = fuzzyNumber(e.target.value);
        this.saveModel();
    },
    setSquatExtra: function (e) {

        e.preventDefault();
        this.model.squat.extra = fuzzyNumber(e.target.value);
        this.saveModel();
    },
    setBenchWeight: function (e) {

        e.preventDefault();
        this.model.bench.weight = fuzzyNumber(e.target.value);
        this.saveModel();
    },
    setBenchReps: function (e) {

        e.preventDefault();
        this.model.bench.reps = fuzzyNumber(e.target.value);
        this.saveModel();
    },
    setBenchExtra: function (e) {

        e.preventDefault();
        this.model.bench.extra = fuzzyNumber(e.target.value);
        this.saveModel();
    },
    setDeadliftWeight: function (e) {

        e.preventDefault();
        this.model.deadlift.weight = fuzzyNumber(e.target.value);
        this.saveModel();
    },
    setDeadliftReps: function (e) {

        e.preventDefault();
        this.model.deadlift.reps = fuzzyNumber(e.target.value);
        this.saveModel();
    },
    setDeadliftExtra: function (e) {

        e.preventDefault();
        this.model.deadlift.extra = fuzzyNumber(e.target.value);
        this.saveModel();
    }
});
