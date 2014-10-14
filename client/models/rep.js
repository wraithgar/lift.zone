var Model = require('ampersand-state');

module.exports = Model.extend({
    props: {
        'weight': 'number',
        'reps': 'number',
        'time': 'string',
        'distance': 'number',
        'unit': 'string',
        'pr': ['boolean', true, false]
    },
    derived: {
        formatted: {
            deps: ['weight', 'reps', 'unit'],
            fn: function () {
                var formatted = [];
                if (this.time) {
                    formatted.push(this.time);
                }
                if (this.time && this.distance) {
                    formatted.push('|');
                }
                if (this.distance) {
                    formatted.push(this.distance);
                    formatted.push(this.unit);
                }
                if (this.weight) {
                    formatted.push(this.weight);
                    formatted.push(this.unit);
                }
                if (this.weight && this.reps) {
                    formatted.push('x');
                }
                if (this.reps) {
                    formatted.push(this.reps);
                    formatted.push('reps');
                }
                return formatted.join(' ');
            }
        },
        nonpr: {
            deps: ['pr'],
            fn: function () {
                return !this.pr;
            }
        }
    }
});
