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
        formattedFull: {
            deps: ['distance', 'weight', 'reps', 'unit'],
            fn: function formattedFull() {
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
        formattedShort: {
            deps: ['distance', 'weight', 'reps', 'unit'],
            fn: function formattedShort() {
                var formatted = [];
                if (this.time) {
                    formatted.push(this.time);
                }
                if (this.time && this.distance) {
                    formatted.push('|');
                }
                if (this.distance) {
                    formatted.push(this.distance);
                    formatted.push(' ');
                    if (this.unit === 'miles') {
                        formatted.push ('mi');
                    } else {
                        formatted.push ('km');
                    }
                }
                if (this.weight) {
                    formatted.push(this.weight);
                }
                if (this.weight && this.reps) {
                    formatted.push('x');
                }
                if (this.reps) {
                    formatted.push(this.reps);
                }
                return formatted.join('');
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
