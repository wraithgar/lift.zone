'use strict';

const View = require('ampersand-view');
const LiftView = require('../views/lift531');
const Debounce = require('lodash.debounce');

const fuzzyNumber = function fuzzyNumber(value) {

    if (value !== '') {
        return Number(value);
    }
    return undefined;
};

module.exports = View.extend({
    template: require('../templates/pages/wendler531.jade'),
    initialize: function () {

        this.ohpView = this.registerSubview(new LiftView({ model: this.model.ohp }));
        this.squatView = this.registerSubview(new LiftView({ model: this.model.squat }));
        this.benchView = this.registerSubview(new LiftView({ model: this.model.bench }));
        this.deadliftView = this.registerSubview(new LiftView({ model: this.model.deadlift }));
        this.saveModel = Debounce(this.model.save.bind(this.model), 250);
    },
    render: function () {

        this.renderWithTemplate();
        this.listenToAndRun(this.model.ohp, 'change:ready', this.renderOHP);
        this.listenToAndRun(this.model.squat, 'change:ready', this.renderSquat);
        this.listenToAndRun(this.model.bench, 'change:ready', this.renderBench);
        this.listenToAndRun(this.model.deadlift, 'change:ready', this.renderDeadlift);
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
    renderOHP: function () {

        if (this.model.ohp.ready) {
            this.queryByHook('results').appendChild(this.ohpView.el);
        }
        else {
            if (this.ohpView.el.parentNode) {
                this.ohpView.el.parentNode.removeChild(this.ohpView.el);
            }
        }
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
    renderSquat: function () {

        if (this.model.squat.ready) {
            this.queryByHook('results').appendChild(this.squatView.el);
        }
        else {
            if (this.squatView.el.parentNode) {
                this.squatView.el.parentNode.removeChild(this.squatView.el);
            }
        }
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
    renderBench: function () {

        if (this.model.bench.ready) {
            this.queryByHook('results').appendChild(this.benchView.el);
        }
        else {
            if (this.benchView.el.parentNode) {
                this.benchView.el.parentNode.removeChild(this.benchView.el);
            }
        }
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
    },
    renderDeadlift: function () {

        if (this.model.deadlift.ready) {
            this.queryByHook('results').appendChild(this.deadliftView.el);
        }
        else {
            if (this.deadliftView.el.parentNode) {
                this.deadliftView.el.parentNode.removeChild(this.deadliftView.el);
            }
        }
    }
});
