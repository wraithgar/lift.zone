var Model = require('ampersand-state');
var LiftModel = require('./lift531');

module.exports = Model.extend({
    children: {
        ohp: LiftModel,
        squat: LiftModel,
        bench: LiftModel,
        deadlift: LiftModel
    }
});

