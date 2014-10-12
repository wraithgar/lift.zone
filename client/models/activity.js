var Model = require('ampersand-state');
var Reps = require('./reps');

module.exports = Model.extend({
    props: {
        name: 'string'
    },
    idAttribute: 'name',
    collections: {
        reps: Reps
    }
});
