var Model = require('ampersand-state');
var LiftModel = require('models/lift531');

module.exports = Model.extend({
    initialize: function () {
        this.ohp.name = 'OHP';
        this.squat.name = 'Squat';
        this.bench.name = 'Bench';
        this.deadlift.name = 'Deadlift';
        if (localStorage && localStorage.wendler531) {
            try {
                this.set(JSON.parse(localStorage.wendler531));
            } catch(err) {
                localStorage.wendler531 = undefined;
            }
        }
    },
    save: function () {
        if (localStorage) {
            localStorage.wendler531 = JSON.stringify(this.toJSON());
        }
    },
    children: {
        ohp: LiftModel,
        squat: LiftModel,
        bench: LiftModel,
        deadlift: LiftModel
    }
});

