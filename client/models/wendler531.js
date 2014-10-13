var Model = require('ampersand-state');
var LiftModel = require('./lift531');

module.exports = Model.extend({
    initialize: function () {
        this.ohp.name = 'OHP';
        this.squat.name = 'Squat';
        this.bench.name = 'Bench';
        this.deadlift.name = 'Deadlift';
    },
    children: {
        ohp: LiftModel,
        squat: LiftModel,
        bench: LiftModel,
        deadlift: LiftModel
    }
});

