/*global app*/
var View = require('ampersand-view');
var templates = require('../templates');
var OHPView = require('../views/ohp531');

var fuzzyNumber = function fuzzyNumber(value) {
    if (value !== '') {
        return Number(value);
    } else {
        return undefined;
    }
};

module.exports = View.extend({
    template: templates.pages.wendler531,
    initialize: function () {
        this.ohpView = this.registerSubview(new OHPView({model: app.wendler531.ohp}));
        this.listenTo(app.wendler531.ohp, 'change:ready', this.renderOHP);
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
        app.wendler531.ohp.weight = fuzzyNumber(e.target.value);
    },
    setOHPReps: function (e) {
        e.preventDefault();
        app.wendler531.ohp.reps = fuzzyNumber(e.target.value);
    },
    setOHPExtra: function (e) {
        e.preventDefault();
        app.wendler531.ohp.extra = fuzzyNumber(e.target.value);
    },
    renderOHP: function () {
        if (app.wendler531.ohp.ready) {
            this.queryByHook('results').appendChild(this.ohpView.el);
        } else {
            if (this.ohpView.el.parentNode) { this.ohpView.el.parentNode.removeChild(this.ohpView.el); }
        }
    },
    setSquatWeight: function (e) {
        e.preventDefault();
    },
    setSquatReps: function (e) {
        e.preventDefault();
    },
    setBenchWeight: function (e) {
        e.preventDefault();
    },
    setBenchReps: function (e) {
        e.preventDefault();
    },
    setDeadliftWeight: function (e) {
        e.preventDefault();
    },
    setDeadliftReps: function (e) {
        e.preventDefault();
    },
});
